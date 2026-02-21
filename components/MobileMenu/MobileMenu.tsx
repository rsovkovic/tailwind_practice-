// 'use client';

// import { X } from 'lucide-react';
// import MainNavigation from '../MainNavigation/MainNavigation';

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onLogout: () => void;
// }

// export const MobileMenu = ({ isOpen, onClose, onLogout }: MobileMenuProps) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-y-0 right-0 z-50 flex w-2/3 flex-col bg-zinc-900 p-8 md:hidden">
//       {/* Close Button */}
//       <button className="self-end text-white" onClick={onClose}>
//         <X size={32} />
//       </button>

//       {/* UserNav (ТЗ: у вигляді бургер-меню) */}
//       <nav className="mt-20 flex flex-col items-center gap-8">
//         <MainNavigation isMobile onClose={onClose} />
//       </nav>

//       {/* Logout (ТЗ: кнопка Log out має бути доступна) */}
//       <div className="mt-auto flex justify-center">
//         <button
//           onClick={() => {
//             onLogout();
//             onClose();
//           }}
//           className="rounded-full border border-white/20 px-10 py-3 text-lg text-white"
//         >
//           Log out
//         </button>
//       </div>
//     </div>
//   );
// };

'use client';

// import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MainNavigation from '../MainNavigation/MainNavigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const MobileMenu = ({ isOpen, onClose, onLogout }: MobileMenuProps) => {
  return (
    // AnimatePresence потрібен для анімації "виходу" (коли isOpen стає false)
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* 1. Backdrop (Затемнення фону) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* 2. Сама панель меню */}
          <motion.div
            initial={{ x: '100%' }} // Починає за межами екрана справа
            animate={{ x: 0 }} // Заїжджає в екран
            exit={{ x: '100%' }} // Виїжджає назад
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 flex w-2/3 flex-col bg-zinc-900 p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button className="self-end" onClick={onClose}>
              <svg className="h-7 w-7 stroke-white">
                <use href="/sprite.svg#icon-close-menu" />
              </svg>
              {/* <X size={32} /> */}
            </button>

            {/* UserNav */}
            <nav className="mt-20 flex flex-col items-center gap-8">
              <MainNavigation isMobile onClose={onClose} />
            </nav>

            {/* Logout */}
            <div className="mt-auto flex justify-center">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="rounded-full border border-white/20 px-5 py-3 font-bold text-white transition duration-200 ease-out hover:bg-white hover:text-black active:scale-95"
              >
                Log out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
