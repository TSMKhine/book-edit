import Image from 'next/image';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import { cn } from '@/libs/utils';
import { ZwibblerClass } from '@/libs/zwibbler/zwibbler-def';
import STAMP_MAP from './StampMap';

declare let Zwibbler: ZwibblerClass;

export default function StampWrapper({ tabIndex }: any) {
  const [ctx] = useAtom(contextAtom);

  const stamp = STAMP_MAP[tabIndex];
  const stampThumbnail = stamp.preview ?? stamp.images;

  const handleStampClick = async (
    url?: string,
    imgScale = 1.0,
    lockAspectRatio = false
  ) => {
    ctx.begin();
    if (url) {
      const viewPoint = ctx.getViewRectangle();

      const { width, height } = await Zwibbler.getImageSize(url);
      const ratio = height / width;

      const nodeId = ctx.createNode('ImageNode', {
        url,
        lockAspectRatio,
      });
      ctx.scaleNode(nodeId, imgScale, imgScale, width / 2, height / 2);

      if (ratio > 1) {
        // 縦長

        ctx.setNodeProperties(nodeId, {
          width,
          height: width * ratio,
        });

        ctx.translateNode(
          nodeId,
          viewPoint.width / 2 + viewPoint.x - width / 2,
          viewPoint.height / 2 + viewPoint.y - (width * ratio) / 2
        );
      } else {
        // 横長

        ctx.setNodeProperties(nodeId, {
          width: height / ratio,
          height,
        });

        ctx.translateNode(
          nodeId,
          viewPoint.width / 2 + viewPoint.x - height / ratio / 2,
          viewPoint.height / 2 + viewPoint.y - height / 2
        );
      }
    }
    ctx.commit();
  };

  return (
    <div
      className={cn(
        'grid h-full place-items-center gap-x-3 gap-y-4',
        stamp.gridCols
      )}
    >
      {stampThumbnail.map((thumbnail, index) => {
        return (
          <div
            key={index}
            className="flex h-full w-full items-center justify-center p-2 text-center"
          >
            <div className={cn('relative', stamp.layout)}>
              {thumbnail.src && (
                <Image
                  src={thumbnail.src}
                  alt=""
                  fill
                  sizes="50vw"
                  priority
                  className={cn(
                    'cursor-pointer object-contain',
                    'origin-center transition-transform duration-200 hover:scale-105'
                  )}
                  onClick={() =>
                    handleStampClick(
                      stamp.images[index].src,
                      stamp.imgScale,
                      stamp.lockAspectRatio
                    )
                  }
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
