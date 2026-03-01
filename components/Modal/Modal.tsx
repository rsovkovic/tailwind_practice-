import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed top-0 left-0 z-9999 flex h-screen w-screen items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative mx-5 h-auto min-w-83 rounded-md bg-(--bg-blok) p-10 md:w-125 md:p-12.5">
        <button
          className="absolute top-3 right-3 self-end"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className="h-7 w-7 stroke-white">
            <use href="/sprite.svg#icon-close-menu" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
