import Image from 'next/image';
import { useRef, useState } from 'react';
import { useAtom } from 'jotai';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import CancelButton from '@/components/Dialog/CancelButton';
import ActionButton from '@/components/Dialog/ActionButton';

import { FILENAME_LIMIT } from '@/constants/value';
import { contextAtom } from '@/stores/canvas';
import { getDefaultFilename } from '@/libs/utils';

import SaveButton from '@/assets/icon/toolbar/other/save_btn_02_off.svg';
import DialogText from '@/assets/dialog/dialog_txt_07.svg';
import CancelButtonText from '@/assets/dialog/dialog_btn_01.svg';
import OKButtonText from '@/assets/dialog/dialog_btn_04.svg';

function downloadFile(text: string, filename: string) {
  const blob = new Blob([text]);

  const linkElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob);
  linkElement.setAttribute('href', href);
  linkElement.setAttribute('target', '_blank');
  linkElement.setAttribute('download', filename);

  linkElement.click();
}

export default function FileSave() {
  const [ctx] = useAtom(contextAtom);
  const [fileName, setFileName] = useState(getDefaultFilename());
  const [open, setOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!fileName.length) {
      inputRef.current?.focus();
      return;
    }

    if (fileName.length > FILENAME_LIMIT) {
      alert('Filename is too long');
    } else {
      const data = ctx.save();

      downloadFile(data, `${fileName}.zw`);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <button
            onClick={() => {
              setFileName(getDefaultFilename());
            }}
          >
            {/* <SaveButton /> */}
            <Image src={SaveButton} width={256} height={44} alt="" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <DialogText /> */}
            <Image src={DialogText} width={384} height={40} alt="" />
          </AlertDialogHeader>
          <div className="px-6">
            <Input
              ref={inputRef}
              type="text"
              maxLength={FILENAME_LIMIT}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <AlertDialogFooter className="sm:justify-between">
            <CancelButton onPointerUp={() => setOpen(false)}>
              {/* <CancelButtonText /> */}
              <Image src={CancelButtonText} width={124} height={42} alt="" />
            </CancelButton>
            <ActionButton onPointerUp={handleSave}>
              {/* <OKButtonText /> */}
              <Image src={OKButtonText} width={124} height={42} alt="" />
            </ActionButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
