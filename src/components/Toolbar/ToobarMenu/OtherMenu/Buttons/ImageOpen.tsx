import Image from 'next/image';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import ActionButton from '@/components/Dialog/ActionButton';
import { convertToBase64 } from '@/libs/utils';
import { ZwibblerClass } from '@/libs/zwibbler/zwibbler-def';
import { FILE_SIZE_LIMIT } from '@/constants/value';

import ImageOpenButton from '@/assets/icon/toolbar/other/save_btn_01_off.svg';
import DialogText from '@/assets/dialog/dialog_txt_10.svg';
import OKButtonText from '@/assets/dialog/dialog_btn_03.svg';

declare let Zwibbler: ZwibblerClass;

const LIMIT_SIZE = 300;

export default function ImageOpen() {
  const [ctx] = useAtom(contextAtom);
  const [open, setOpen] = useState<boolean>(false);

  const handleImageOpen = async () => {
    ctx
      .openFile({
        format: 'File',
        accept: 'image/png, image/jpeg',
      })
      .then(async function (response) {
        const file = response.data;

        // limit 10MB
        if (file.size > FILE_SIZE_LIMIT) {
          setOpen(true);
          return;
        } else {
          ctx.begin();
          const url = await convertToBase64(file);

          const { width, height } = await Zwibbler.getImageSize(url);
          const ratio = height / width;

          const nodeId = ctx.createNode('ImageNode', {
            url,
            lockAspectRatio: true,
          });

          // get scale
          let imgScale = 1;
          if (ratio > 1) {
            imgScale = LIMIT_SIZE / height;
          } else {
            imgScale = LIMIT_SIZE / width;
          }
          ctx.scaleNode(nodeId, imgScale, imgScale, width / 2, height / 2);

          // translate image node
          const viewPoint = ctx.getViewRectangle();
          if (ratio > 1) {
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
          ctx.commit();
        }
      });
  };

  return (
    <>
      <button onClick={handleImageOpen}>
        {/* <ImageOpenButton /> */}
        <Image src={ImageOpenButton} width={257} height={45} alt="" />
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <DialogText /> */}
            <Image src={DialogText} width={384} height={40} alt="" />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <ActionButton onPointerUp={() => setOpen(false)}>
              {/* <OKButtonText /> */}
              <Image src={OKButtonText} width={124} height={42} alt="" />
            </ActionButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
