import Image from 'next/image';
import { useEffect, useState } from 'react';
import ToolbarButton from '@/components/Toolbar/ToolbarButton';
import {
  PenMenu,
  TextMenu,
  FigureMenu,
  StampMenu,
  StickyMenu,
  RulerMenu,
  OtherMenu,
} from '@/components/Toolbar/ToobarMenu';
import { cn, getLineWidth } from '@/libs/utils';
import { useAtom } from 'jotai';
import {
  contextAtom,
  penToolAtom,
  textToolAtom,
  toolNameAtom,
} from '@/stores/canvas';
import { EraserTool } from '@/libs/zwibbler/customTools/EraserTool';
import { BRUSH_TYPE, TOOL } from '@/constants/canvas';
import { LineBrushTool } from '@/libs/zwibbler/customTools/LineBrushTool';

import PenIcon from '@/assets/icon/toolbar/tool_btn_write01_off.svg';
import TextIcon from '@/assets/icon/toolbar/tool_btn_text01_off.svg';
import FigureIcon from '@/assets/icon/toolbar/tool_btn_figure01_off.svg';
import EraserIcon from '@/assets/icon/toolbar/tool_btn_erase01_off.svg';
import StampIcon from '@/assets/icon/toolbar/tool_btn_stamp01_off.svg';
import StickyIcon from '@/assets/icon/toolbar/tool_btn_sticky01_off.svg';
import CompassIcon from '@/assets/icon/toolbar/tool_btn_item01_off.svg';
import OtherIcon from '@/assets/icon/toolbar/tool_btn_save01_off.svg';
import PageIcon from '@/assets/icon/toolbar/tool_btn_note01_off.svg';

export interface IToolbarMenu {
  key: string;
  name: string;
  // icon: React.FC<React.SVGProps<SVGElement>>;
  icon: any;
  toolname?: string;
  component?: JSX.Element;
  position?: string;
  parentStyle?: string;
  childStyle?: string;
  onClick: () => void;
}

export default function Toolbar() {
  const [ctx] = useAtom(contextAtom);
  const [toolName] = useAtom(toolNameAtom);
  const [penTool] = useAtom(penToolAtom);
  const [textTool] = useAtom(textToolAtom);
  const [toolbarIndex, setToolbarIndex] = useState<number | null>(null);

  const [showPageList, setshowPageList] = useState(true);
  const toggleShowPageList = () => {
    setshowPageList((prev) => !prev);
  };

  const TOOLBAR_MENU: IToolbarMenu[] = [
    {
      key: 'pen',
      name: 'ペン',
      icon: PenIcon,
      toolname: TOOL.BRUSH,
      component: <PenMenu />,
      parentStyle: 'relative',
      childStyle: 'left-0',
      onClick: () => {
        if (penTool.type === BRUSH_TYPE.LINE) {
          ctx.useCustomTool(
            new LineBrushTool(ctx, penTool.width, penTool.color)
          );
        } else {
          ctx.useBrushTool({
            lineWidth: getLineWidth(penTool.width, penTool.type),
            strokeStyle: penTool.color,
            ...(penTool.type === BRUSH_TYPE.MARKER && { opacity: 0.3 }),
            _brushType: penTool.type,
            _lineWidth: penTool.width,
            lockPosition: true,
            lockSize: true,
            lockRotation: true,
            // lockRotation: true,
            lockEditMode: true,
            _lockCopy: true,
          });
        }
      },
    },
    {
      key: 'text',
      name: '文字',
      icon: TextIcon,
      toolname: TOOL.TEXT,
      component: <TextMenu />,
      parentStyle: 'relative',
      childStyle: 'left-0',
      onClick: () => {
        ctx.useTextTool({
          fontName: textTool.fontName,
          fontSize: textTool.size,
          textFillStyle: textTool.color,
          writingMode: textTool.writingMode,
          // lockAspectRatio: true,
          // lockRotation: true,
        });
      },
    },
    {
      key: 'figure',
      name: '図形',
      icon: FigureIcon,
      component: <FigureMenu />,
      parentStyle: 'relative',
      childStyle: 'left-0 -translate-x-1/4',
      onClick: () => {
        ctx.usePickTool();
      },
    },
    {
      key: 'eraser',
      name: '消しゴム',
      icon: EraserIcon,
      toolname: TOOL.ERASER,
      onClick: () => {
        ctx.clearSelection();
        ctx.useCustomTool(new EraserTool(ctx));
      },
    },
    {
      key: 'stamp',
      name: 'スタンプ',
      icon: StampIcon,
      component: <StampMenu />,
      childStyle: 'left-1/2 -translate-x-1/2',
      onClick: () => {
        ctx.usePickTool();
      },
    },
    {
      key: 'sticky',
      name: 'めくり紙',
      icon: StickyIcon,
      component: <StickyMenu />,
      parentStyle: 'relative',
      childStyle: 'right-0 translate-x-1/4',
      onClick: () => {
        ctx.usePickTool();
      },
    },
    {
      key: 'compass',
      name: '定規・コンパス',
      icon: CompassIcon,
      component: <RulerMenu />,
      childStyle: '-translate-x-1/2 left-1/2',
      onClick: () => {
        ctx.usePickTool();
      },
    },
    {
      key: 'other',
      name: 'その他',
      icon: OtherIcon,
      component: <OtherMenu />,
      parentStyle: 'relative',
      childStyle: 'right-0',
      onClick: () => {
        ctx.usePickTool();
      },
    },
  ];

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      const currentEl = e.target as HTMLElement;

      const canvasEl = document.querySelector(
        '.zwibbler-canvas-holder'
      ) as HTMLElement;
      const headerEl = document.querySelector('#main-header') as HTMLElement;

      if (canvasEl.contains(currentEl) || headerEl.contains(currentEl)) {
        setToolbarIndex(null);
      }
    };

    document.addEventListener('pointerdown', handleClick, true);
    return () => {
      document.removeEventListener('pointerdown', handleClick, true);
    };
  }, []);

  return (
    <div className="mx-auto h-full">
      <div className="relative h-full">
        {/* buttons */}
        <div
          className="h-full bg-lightcoral"
          style={{ boxShadow: '2px 2px 10px 10px rgba(0,0,0,0.3)' }}
        >
          <div className="relative flex h-full items-center justify-evenly px-2 pb-2">
            {TOOLBAR_MENU.map((toolbar, index) => {
              return (
                <div
                  key={toolbar.key}
                  className={cn(
                    'flex h-full items-center justify-center',
                    toolbar.parentStyle
                  )}
                >
                  {/* button */}
                  <ToolbarButton
                    index={index}
                    toolbarIndex={toolbarIndex}
                    isSelected={
                      toolName === toolbar.toolname || toolbarIndex === index
                    }
                    onClick={() => {
                      ctx.clearSelection();
                      setToolbarIndex(toolbarIndex === index ? null : index);
                      toolbar.onClick && toolbar.onClick();
                    }}
                  >
                    {/* {<toolbar.icon />} */}
                    <Image
                      src={toolbar.icon}
                      width={76}
                      height={76}
                      alt=""
                      priority
                    />
                  </ToolbarButton>

                  {/* panel */}
                  <div
                    className={cn(
                      toolbar.childStyle,
                      'absolute w-fit pb-1',
                      toolbarIndex === index
                        ? 'visible bottom-full'
                        : 'invisible h-0'
                    )}
                  >
                    {toolbar.component}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
