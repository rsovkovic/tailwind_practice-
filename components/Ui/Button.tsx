import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading,
  className = '',
  ...props
}: ButtonProps) => {
  // Базові стилі (однакові для всіх кнопок)
  const baseStyles =
    'w-fit rounded-full px-7 py-3 font-bold transition duration-200 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-sm lg:text-base';

  // Стилі для різних варіантів
  const variants = {
    // Темна кнопка (як у Login/Register)
    primary:
      'bg-foreground text-background hover:bg-transparent hover:text-foreground border border-transparent hover:border-white/20',

    // Прозора з бордером (як Add Book)
    outline:
      'border border-white/20 text-foreground hover:bg-foreground hover:text-background',

    // Варіант без фону (якщо знадобиться)
    ghost: 'text-foreground hover:bg-white/10',
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
