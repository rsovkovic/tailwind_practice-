import React, { forwardRef, InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  children?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, children, className = '', ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex w-full flex-col gap-1">
        <div
          className={`flex items-center rounded-xl bg-(--input-bg) px-4 py-3.5 transition-colors focus-within:border ${error ? 'border-(--error-red)' : 'border-foreground'} ${className} `}
        >
          <label
            htmlFor={id}
            className="mr-2 cursor-pointer text-sm font-medium whitespace-nowrap text-(--text-secondary)"
          >
            {label}
          </label>
          <input
            id={id}
            ref={ref}
            {...props}
            className="placeholder:text-foreground text-foreground w-full [appearance:textfield] border-none bg-transparent p-0 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {children}
        </div>
        {error && (
          <p className="ml-2 text-[10px] text-(--error-red)">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
