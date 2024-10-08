import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import jsPDF from 'jspdf';
import { db } from '@/libs/dexie/db';
import { contextAtom } from '@/stores/canvas';

import PrintButton from '@/assets/icon/toolbar/other/save_btn_04_off.svg';

function downloadDataUriToFile(dataUri: string, filename: string) {
  const base64Data = dataUri.split(',')[1];
  const binaryData = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    int8Array[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([int8Array]);

  const linkElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob);
  linkElement.setAttribute('href', href);
  linkElement.setAttribute('target', '_blank');
  linkElement.setAttribute('download', filename);

  linkElement.click();
}

export default function FilePrint() {
  const [ctx] = useAtom(contextAtom);
  const pathname = usePathname();

  const handlePrint = async () => {
    const pdf = new jsPDF();
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = pdf.internal.pageSize.getHeight();

    // get file title
    const noteId = pathname.split('/').pop() as string;
    const note = await db.note.get(noteId);
    const filename = `${note?.title}.pdf` || 'download.pdf';

    // generate pdf
    const pageCount = ctx.getPageCount();
    for (let page = 0; page < pageCount; page++) {
      const pngData = ctx.save({ format: 'png', page });
      page !== 0 && pdf.addPage();
      pdf.addImage(pngData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    // NOTE: for safari download
    downloadDataUriToFile(pdf.output('datauristring'), filename);
  };

  return (
    <>
      <button onClick={handlePrint}>
        {/* <PrintButton /> */}
        <Image src={PrintButton} width={256} height={44} alt="" />
      </button>
    </>
  );
}
