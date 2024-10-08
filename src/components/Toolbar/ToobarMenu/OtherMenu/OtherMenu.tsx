import { FileSave, FileOpen, FilePrint, ImageOpen } from './Buttons';

export default function OtherMenu() {
  return (
    <div className="w-72 rounded-lg bg-neutral-200 p-2">
      <div className="h-full bg-white">
        <div className="flex h-full flex-col gap-2 p-3">
          <ImageOpen />
          <FileSave />
          <FileOpen />
          <FilePrint />
        </div>
      </div>
    </div>
  );
}
