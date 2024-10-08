import { cn } from '@/libs/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
  index: number;
  toolbarIndex: number | null;
}

const ToolbarButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function ToolbarButton({ isSelected, index, toolbarIndex, ...props }, ref) {
    const { className, children } = props;

    return (
      <>
        <button
          ref={ref}
          className={cn(
            className,
            'relative h-fit w-14 rounded-full shadow-md sm:w-16 md:w-[4.5rem]',
            isSelected &&
              'outline outline-4 -outline-offset-[3px] outline-destructive sm:outline-[6px]'
          )}
          {...props}
        >
          {children}
        </button>
        {/* except eraser */}
        {index !== 3 && toolbarIndex === index && (
          <div className="absolute top-0 flex w-full -translate-y-1 justify-center">
            <span className="block h-0 w-0 border-[20px] border-b-0 border-solid border-transparent border-t-neutral-200"></span>
          </div>
        )}
      </>
    );
  }
);

export default ToolbarButton;
