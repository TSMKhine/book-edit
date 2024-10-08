import { CANVAS_LAYER, CANVAS_SIZE } from '@/constants/canvas';
import { ZwibblerContext } from '@/libs/zwibbler/zwibbler-def';

import PageList from './PageList';
import PageBackground from './PageBackground';

export default function PageMenu(props: {
  showPageList: Boolean;
  toggleShowPageList: Function;
}) {
  const { showPageList, toggleShowPageList } = props;

  return (
    <div className="h-fit w-screen max-w-screen-md rounded-lg bg-neutral-200 p-2">
      <div className="h-full bg-white">
        <div className="relative">
          <PageList isShow={showPageList} handleToggle={toggleShowPageList} />

          <PageBackground
            isShow={!showPageList}
            handleToggle={toggleShowPageList}
          />
        </div>
      </div>
    </div>
  );
}

// FIXME: common function
export const setBackgroundImage = (
  ctx: ZwibblerContext,
  imageUrl: string,
  imgRatio: number
) => {
  ctx.begin();
  // 背景を作成
  const nodeId = ctx.createNode('ImageNode', {
    url: imageUrl,
    layer: CANVAS_LAYER.BACKGROUND,
    zIndex: -1,
  });

  if (imgRatio > 1.414) {
    // A4の比率より縦が長い場合
    // イメージのサイズ設定
    ctx.setNodeProperties(nodeId, {
      width: CANVAS_SIZE.HEIGHT / imgRatio,
      height: CANVAS_SIZE.HEIGHT,
    });
    // 中央寄せ
    ctx.translateNode(
      nodeId,
      (CANVAS_SIZE.WIDTH - CANVAS_SIZE.HEIGHT / imgRatio) / 2,
      0
    );
  } else {
    // A4の比率より横が長い場合
    // イメージのサイズ設定
    ctx.setNodeProperties(nodeId, {
      width: CANVAS_SIZE.WIDTH,
      height: CANVAS_SIZE.WIDTH * imgRatio,
    });
    // 中央寄せ
    ctx.translateNode(
      nodeId,
      0,
      (CANVAS_SIZE.HEIGHT - CANVAS_SIZE.WIDTH * imgRatio) / 2
    );
  }
  ctx.commit();
};
