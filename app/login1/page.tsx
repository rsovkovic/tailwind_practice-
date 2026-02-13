'use client';

import LoginForm from '@/components/LoginForm/LoginForm';

// export default function ProfileCard() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
//       {/* Основний контейнер: тінь, закруглення та перехід при наведенні */}
//       <div className="group w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
//         {/* Верхня декоративна частина */}
//         <div className="h-24 bg-linear-to-r from-blue-500 to-purple-600" />

//         {/* Контент картки */}
//         <div className="px-6 pb-8">
//           <div className="relative -mt-12 flex justify-center">
//             {/* Аватар з білою обводкою */}
//             <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-md">
//               <img
//                 src="https://api.dicebear.com"
//                 alt="Avatar"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </div>

//           <div className="mt-4 text-center">
//             <h3 className="text-xl font-bold text-slate-800">
//               Олексій Розробник
//             </h3>
//             <p className="text-sm font-medium text-blue-600">
//               Frontend Engineer (Next.js)
//             </p>
//             <p className="mt-3 text-sm text-slate-500">
//               Вивчаю Tailwind 4, щоб створювати інтерфейси швидше, ніж кава
//               охолоне. ☕️
//             </p>
//           </div>

//           {/* Кнопки дій */}
//           <div className="mt-6 flex gap-3">
//             <button className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95">
//               Підписатися
//             </button>
//             <button className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95">
//               Повідомлення
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function Login() {
  return (
    <div className="bg-secondary-bg container">
      <LoginForm />
    </div>
  );
}
