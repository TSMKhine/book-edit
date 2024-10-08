import { Fragment, useCallback } from 'react';
import { useAtom } from 'jotai';
import { cn } from '@/libs/utils';
import { contextAtom, selectedNodesAtom } from '@/stores/canvas';
import {
  LockButton,
  CopyButton,
  DeleteButton,
  LayerButton,
  PenColorButton,
  PenWidthButton,
  TextFontButton,
  TextSizeButton,
  TextColorButton,
  FigureColorButton,
  FigureFillButton,
  FigureWidthButton,
  LinkButton,
  RecordButton,
  TextDirectionButton,
  FigureDirectionButton,
  StickyDirectionButton,
  RotateMagnetButton,
} from '@/components/SelectMenu/Buttons';
import { NODE_TYPE, RULER_KIND } from '@/constants/canvas';
import { focusedRulerAtom, showRulerAtom } from '@/stores/ui';

export default function SelectMenu() {
  const [ctx] = useAtom(contextAtom);
  const [selectedNodes] = useAtom(selectedNodesAtom);
  const [focusedRuler] = useAtom(focusedRulerAtom);
  const [showRuler] = useAtom(showRulerAtom);

  const selectedNodeType = ctx?.summary?.properties.$type;
  const isSticky = ctx?.summary?.properties._isSticky;
  const isLock = ctx?.summary?.properties._isLock;

  const makeMenuItems = useCallback(() => {
    const MenuItems: JSX.Element[] = [];
    // ロック
    MenuItems.push(<LockButton />);

    if (!isLock) {
      // 削除
      MenuItems.push(<DeleteButton />);

      // 線以外
      selectedNodeType !== NODE_TYPE.BRUSH && MenuItems.push(<CopyButton />);

      // レイヤー
      MenuItems.push(<LayerButton />);

      // 線のみ
      selectedNodeType === NODE_TYPE.BRUSH &&
        MenuItems.push(<PenColorButton />, <PenWidthButton />);

      // 文字のみ
      selectedNodeType === NODE_TYPE.TEXT &&
        MenuItems.push(
          <TextFontButton />,
          <TextSizeButton />,
          <TextColorButton />,
          <TextDirectionButton />
        );

      // 単純図形のみ
      selectedNodeType === NODE_TYPE.PATH &&
        isSticky === false &&
        MenuItems.push(
          <FigureColorButton />,
          <FigureFillButton />,
          <FigureWidthButton />,
          <FigureDirectionButton />
        );

      // めくり紙
      selectedNodeType === NODE_TYPE.PATH &&
        isSticky &&
        MenuItems.push(<StickyDirectionButton />);

      // 単数選択のみ
      selectedNodes.length === 1 &&
        MenuItems.push(<LinkButton />, <RecordButton />);
    }
    return MenuItems;
  }, [selectedNodes]);

  const menuItems = makeMenuItems();

  return (
    <div className="relative flex h-fit justify-center">
      <div
        z-class="{'node-selected': ctx.getSelectedNodes().length !== 0 && !isTextEditMode}"
        className={cn(
          'pointer-events-auto invisible absolute bottom-0 translate-y-8 opacity-0 transition-all duration-150 ease-in-out'
        )}
      >
        <div
          className={cn(
            'grid gap-5 rounded-xl border border-destructive bg-background p-1 shadow-md',
            menuItems.length > 7 && 'grid-rows-2'
          )}
          style={{
            gridTemplateColumns: `repeat(${menuItems.length > 7 ? Math.round(menuItems.length / 2) : menuItems.length}, minmax(0, 1fr))`,
          }}
        >
          {menuItems.map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
        </div>
      </div>

      {/* only clear ruler */}
      <div
        className={cn(
          'pointer-events-auto invisible absolute bottom-0 translate-y-8 opacity-0 transition-all duration-150 ease-in-out',
          showRuler.clearRuler && focusedRuler === RULER_KIND.CLEAR_RULER
            ? 'visible translate-y-0 opacity-100'
            : ''
        )}
      >
        <div className="flex w-fit rounded-xl border border-destructive bg-background p-1 shadow-md">
          <RotateMagnetButton />
        </div>
      </div>
    </div>
  );
}
