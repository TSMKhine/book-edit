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
import { FILE_SIZE_LIMIT, NOTE_LIMIT } from '@/constants/value';
import { ZwibblerClass } from '@/libs/zwibbler/zwibbler-def';
import { convertToBase64 } from '@/libs/utils';
import { setBackgroundImage } from '../PageMenu';

import LoadBgButton from '@/assets/icon/toolbar/page/page_btn_02_off.svg';
import DialogPageLimitText from '@/assets/dialog/dialog_txt_05.svg';
import DialogSizeLimitText from '@/assets/dialog/dialog_txt_10.svg';
import OKButtonText from '@/assets/dialog/dialog_btn_03.svg';

declare let Zwibbler: ZwibblerClass;

// メッセージの種類（追加、読込）
let isPageLimitMsg = true;

export default function LoadPageButton() {
  const [ctx] = useAtom(contextAtom);
  const [open, setOpen] = useState<boolean>(false);

  const loadBackgroundImage = async () => {
    if (ctx.getPageCount() > NOTE_LIMIT - 1) {
      isPageLimitMsg = true;
      setOpen(true);
    } else {
      ctx
        .openFile({
          format: 'File',
          // format: 'data-uri',
          accept: 'image/png, image/jpeg',
        })
        .then(async function (response) {
          const file = response.data;

          // limit 10MB
          if (file.size > FILE_SIZE_LIMIT) {
            isPageLimitMsg = false;
            setOpen(true);
            return;
          } else {
            //新ページ追加して追加したページを現ページに設定する
            ctx.setCurrentPage(ctx.addPage());

            // fileをdata-uriに変換
            const url = await convertToBase64(file);

            // イメージのサイズ、比率を取得
            const imgSize = await Zwibbler.getImageSize(url);
            const imgRatio = imgSize.height / imgSize.width;
            setBackgroundImage(ctx, url, imgRatio);
          }
        });
    }
  };

  return (
    <>
      <button onClick={loadBackgroundImage}>
        {/* <LoadBgButton /> */}
        <Image src={LoadBgButton} width={176} height={44} alt="" />
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {isPageLimitMsg ? (
              // <DialogPageLimitText />
              <Image src={DialogPageLimitText} width={384} height={80} alt="" />
            ) : (
              // <DialogSizeLimitText />
              <Image src={DialogSizeLimitText} width={384} height={80} alt="" />
            )}
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
