import Image, { StaticImageData } from 'next/image';
import { useAtom } from 'jotai';
import { CANVAS_LAYER } from '@/constants/canvas';
import { contextAtom } from '@/stores/canvas';

import { setBackgroundImage } from '../PageMenu';

export default function BackgroundWrapper({
  imageData,
  children,
}: {
  imageData?: StaticImageData;
  children?: React.ReactNode;
}) {
  const [ctx] = useAtom(contextAtom);

  const handleBackground = async (imageData?: StaticImageData) => {
    // get background nodes
    const nodes = ctx.getLayerNodes(CANVAS_LAYER.BACKGROUND);

    // delete background
    ctx.deleteNodes(nodes);

    if (imageData?.src) {
      const imgRatio = imageData.height / imageData.width;
      setBackgroundImage(ctx, imageData.src, imgRatio);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="px-4">
        <div
          className="aspect-A4 relative w-full cursor-pointer border border-gray-300 text-center shadow"
          onClick={() => handleBackground(imageData)}
        >
          <div className="flex h-full items-center justify-center bg-white">
            {imageData ? (
              <Image src={imageData} alt="" width={200} height={200} priority />
            ) : null}
          </div>
        </div>
      </div>
      <div className="mx-auto pt-4">{children}</div>
    </div>
  );
}
