import { cn } from '@/libs/utils';

export default function Loading({ isStart }: { isStart: boolean }) {
  return (
    <div
      className={cn(
        'absolute z-[9999] grid h-full w-full place-content-center',
        isStart ? '' : 'bg-honeydew'
      )}
    >
      <div className="global-loader h-5 w-36 rounded-full"></div>
    </div>
  );
}
