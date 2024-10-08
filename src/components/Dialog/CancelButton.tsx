import { cn } from '@/libs/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function CancelButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'h-[42px] w-[124px] rounded-full active:opacity-80',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
