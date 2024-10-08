import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAtom, useSetAtom } from 'jotai';

import { MainScope, ZwibblerClass } from '@/libs/zwibbler/zwibbler-def';
import { ZwibblerInitializer } from '@/libs/zwibbler/Initialize';
import { ZwibblerConfig } from '@/libs/zwibbler/ZwibblerConfig';
import controller from '@/libs/zwibbler/customController';

import { contextAtom, selectedNodesAtom, toolNameAtom } from '@/stores/canvas';
import { showRulerAtom } from '@/stores/ui';

import Header from '@/components/Header';
import Toolbar from '@/components/Toolbar';
import SelectMenu from '@/components/SelectMenu';
import RootLayer from '@/components/Layer/RootLayer';
import CompassStep from '@/components/Ruler/CompassTool/CompassStep';

import useNote from '@/hooks/useNote';
import { stopAudio } from '@/libs/audio';
import { TRulerKind } from '@/types/ui';

import CanvasPosition from './CanvasPosition';
import PickTool from './PickTool';
import ZoomTool from './ZoomTool';

declare let Zwibbler: ZwibblerClass;

ZwibblerInitializer.onStartup((Zwibbler) => {
  Zwibbler.controller('controller', controller);
});

export default function Canvas({ noteId }: { noteId: string }) {
  const setCtx = useSetAtom(contextAtom);
  const setToolName = useSetAtom(toolNameAtom);
  const setSelectedNodes = useSetAtom(selectedNodesAtom);
  const [showRuler, setShowRuler] = useAtom(showRulerAtom);

  const zwibblerEl = useRef<HTMLDivElement | null>(null);
  const scope = useRef<MainScope>({} as any);

  const { saveNote, getNote } = useNote();

  useEffect(() => {
    if (!zwibblerEl.current) {
      console.error('Element ref was null');
      return;
    }

    if (!('Zwibbler' in window)) {
      console.info('Not Loaded');
      redirect('/');
    }

    ZwibblerInitializer.start();

    Zwibbler.attach(zwibblerEl.current, scope.current);

    const { ctx } = scope.current;

    ctx.on('selected-nodes', () => {
      const selectedNodes = ctx.getSelectedNodes();
      if (selectedNodes.length) {
        setSelectedNodes(selectedNodes);
        // console.log('Summary', ctx.summary);
      }
    });

    ctx.on('tool-changed', (toolname) => {
      setToolName(toolname);
    });

    ctx.on('document-changed', async () => {
      if (ctx.dirty()) {
        saveNote(ctx, noteId);
      } else {
        saveNote(ctx, noteId, false);
      }
    });

    ctx.on('start-transform', (e) => {
      const type = e.transformType;
      for (let i = 0; i < e.nodes.length; i++) {
        let node = e.nodes[i];
        if (
          (ctx.getNodeProperty(node, '_lockCopy') && type === 'copy') ||
          (ctx.getNodeProperty(node, '_lockDelete') && type === 'delete')
        ) {
          e.nodes.splice(i, 1);
          i--;
        }
      }
    });

    ctx.on('set-page', (pageNumber) => {
      ctx.usePickTool();
      ctx.setZoom('width');

      // close all ruler
      setShowRuler((prev) => {
        let newState = { ...prev };
        for (let key in newState) {
          newState[key as TRulerKind] = false;
        }
        return newState;
      });
    });

    ctx.on('edit-text-shown', (editBox) => {
      scope.current.isTextEditMode = true;
    });

    ctx.on('edit-text-hidden', () => {
      scope.current.isTextEditMode = false;
      ctx.clearSelection();
    });

    setCtx(ctx);

    return () => {
      if (scope.current) {
        scope.current.ctx.destroy();
        stopAudio(ctx);
      }
      if (zwibblerEl.current) {
        Zwibbler.detach(zwibblerEl.current);
      }
    };
  }, []);

  useEffect(() => {
    getNote(scope.current.ctx, noteId);
  }, [noteId]);

  return (
    <>
      <div
        id="zwibbler-canvas"
        className="flex w-full flex-auto flex-col overflow-hidden"
        {...ZwibblerConfig}
        ref={zwibblerEl}
        z-controller="controller"
        z-class="{tablet:tablet}"
      >
        {/* header */}
        <div id="main-header" className="z-50 h-12 sm:h-16">
          <Header />
        </div>

        {/* canvas */}
        <div className="relative flex-grow">
          <div className="zwibbler z-40 flex h-full">
            <div z-canvas="" className="relative flex-1"></div>
          </div>

          {/* canvas top */}
          <div className="pointer-events-none absolute top-0 z-50 h-full w-full">
            {showRuler.compass && <CompassStep />}
          </div>

          {/* canvas bottom */}
          <div className="pointer-events-none absolute bottom-0 z-50 mb-5 flex w-full justify-between">
            <div className="pl-6">
              <PickTool />
            </div>
            <div className="pr-6">
              <ZoomTool />
            </div>

            <div className="absolute bottom-0 w-full">
              <SelectMenu />
            </div>
          </div>
        </div>

        {/*  hidden menu for canvas postion */}
        <div className="pointer-events-none invisible absolute bottom-full">
          <CanvasPosition />
        </div>

        {/* layer */}
        <div className="absolute z-40">
          <RootLayer />
        </div>

        {/* toolbar */}
        <div className="z-50 h-24 sm:h-28">
          <Toolbar />
        </div>
      </div>
    </>
  );
}
