import Image from 'next/image';
import { use, useState } from 'react';
import { useAtom } from 'jotai';
import { contextAtom, toolNameAtom } from '@/stores/canvas';
import { CANVAS_LAYER, CANVAS_SIZE, TOOL, WIDTH } from '@/constants/canvas';
import { StaticImageData } from 'next/image';
import PickButtonOffIcon from '@/assets/icon/common/menu_btn_pick_off.svg';
import qrIcon from '@/assets/icon/common/scan_me_qr_code.jpg';
import NextButtonOnIcon from '@/assets/icon/common/next.svg';
import BackButtonOnIcon from '@/assets/icon/common/back.svg';
import MultiPickButtonOffIcon from '@/assets/icon/common/menu_btn_multipick_off.svg';
import MultiPickButtonOnIcon from '@/assets/icon/common/menu_btn_multipick_on.svg';
import BACKGROUND_MAP from './BackgroundMap';
import zIndex from '@mui/material/styles/zIndex';

export default function PageMove({ noteId }: { noteId: string }) {
  const [ctx] = useAtom(contextAtom);
  const [toolName] = useAtom(toolNameAtom);
  // const [showQrImage, setShowQrImage] = useAtom(showQrImageAtom);

  const [isMultiPick, setMultiPick] = useState(false);

  const addImageBackground = (imageData: StaticImageData) => {
    const nodeId = ctx.createNode('ImageNode', {
      url: imageData.src,
      layer: CANVAS_LAYER.BACKGROUND,
      zIndex: -1,
      preventUndo: true,
      preventRedo: true,
    });
    ctx.setNodeProperties(nodeId, {
      width: CANVAS_SIZE.WIDTH,
      height: CANVAS_SIZE.HEIGHT,
    });
    ctx.clearUndo();
  };

  const handleNextTool = () => {
    // ctx.nextPage();

    if (ctx.nextPage() === undefined && ctx.getPageCount() < 5) {
      ctx.setCurrentPage(ctx.addPage());
      // ctx.nextPage();

      var node = ctx.getNodeObject(ctx.getPageNode());
      var pageNo = ctx.getCurrentPage();

      var nodeLength = node?.children.length || 0;
      var backgroundMap;
      if (noteId === 'kokugo1') {
        backgroundMap = BACKGROUND_MAP[0];
        pageNo = ctx.getCurrentPage() + 1;
      }

      if (noteId === 'kokugo2') {
        backgroundMap = BACKGROUND_MAP[1];
      }

      if (nodeLength === 0) {
        var imageData = backgroundMap?.images[pageNo].data;
        if (imageData) {
          addImageBackground(imageData);
        }
      }
      if (pageNo == 3) {
        var imageNode = ctx.createNode('ImageNode', {
          url: qrIcon.src,
        });
        ctx.setNodeProperties(imageNode, {
          width: 100,
          lockPosition: true,
          lockRotation: true,
          lockSize: true,
          _qrNode: true,
          lockEditMode: true,
          layer: CANVAS_LAYER.BACKGROUND,
          // allowSelectBox: false,
        });
        ctx.translateNode(imageNode, 200, 200);

        // var imageNode = ctx.createNode('ImageNode', {
        //   url: PickButtonOffIcon,
        //   // lockPosition: true,
        //   // _qrNode: true,
        // });
        // ctx.translate(imageNode, 100, 100);
        ctx.clearUndo();
      }
      //   var htmlNode = ctx.createHTMLNode('QrCodeTab', {
      //     // The properties you specify are completely up to you.
      //     // videoID: 'ZxMl1SDJ7po',

      //     style: {
      //       marginLeft: '200px',
      //       marginTop: '200px',
      //     },
      //     lockPosition: true,
      //     opacity: 0.0,
      //     _qrNode: true,
      //     // As a special case, the style property is applied to the HTML.
      //   });
      //   ctx.clearUndo();
      //   console.log('htmlNode', htmlNode);
      // }
    }
  };
  const handleBackTool = () => {
    ctx.previousPage();
    ctx.clearUndo();
  };

  return (
    <>
      <div className="relative h-full">
        <button
          className="pointer-events-auto absolute bottom-0  h-14 w-14 rounded-full shadow-md"
          onClick={handleBackTool}
        >
          <Image src={BackButtonOnIcon} width={56} height={56} alt="" />
        </button>
        <button
          className="pointer-events-auto absolute bottom-0 left-20 h-14 w-14 rounded-full shadow-md"
          onClick={handleNextTool}
        >
          <Image src={NextButtonOnIcon} width={56} height={56} alt="" />
        </button>
      </div>
      {/* <div>
        
      </div> */}
    </>
  );
}
