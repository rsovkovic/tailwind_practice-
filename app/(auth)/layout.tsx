// import Image from 'next/image';

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="bg-background flex min-h-screen items-center justify-center p-5">
//       <div className="bg-secondary-bg flex min-h-175 w-full max-w-7xl space-x-5 overflow-hidden rounded-[30px]">
//         {/* Ліва частина (сюди будуть "прилітати" форми) */}
//         <div className="flex w-full flex-col justify-between rounded-[30px] p-10 md:p-16 lg:w-1/2">
//           <div>
//             <div className="mb-10 flex items-center gap-2">
//               {/* Твоє лого */}
//               <span className="font-bold tracking-tighter text-white uppercase">
//                 Read Journey
//               </span>
//             </div>
//             <h1 className="mb-10 text-5xl leading-tight font-semibold text-white md:text-6xl">
//               Expand your mind, reading a{' '}
//               <span className="text-[#686868]">book</span>
//             </h1>
//             {children} {/* Тут буде або LoginForm, або RegisterForm */}
//           </div>
//         </div>

//         {/* Права частина (iPhone) */}
//         <div className="bg-secondary-bg hidden w-1/2 items-center justify-center p-10 lg:flex">
//           <div className="relative aspect-9/19 w-full max-w-87.5">
//             {/* Тут встав свою картинку айфона */}
//             <Image
//               src="/iPhone 15 Black.png"
//               alt="App preview"
//               fill
//               className="object-contain" // Зберігає пропорції всередині контейнера
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background container flex min-h-screen items-center justify-center p-5 md:p-8">
      {/* Головний контейнер з твоїм --bg-secondary */}
      <div className="flex min-h-175 w-full max-w-7xl flex-col gap-3 overflow-hidden rounded-[30px] lg:flex-row">
        {/* ЛІВА ЧАСТИНА: Форми та Лого */}
        <div className="bg-secondary-bg flex w-full flex-col rounded-[30px] p-8 md:p-16 lg:w-1/2">
          {/* Логотип */}
          <div className="mb-10 flex items-center gap-2 md:mb-20">
            <div className="flex h-8 w-8 items-center justify-center">
              {/* Сюди можна вставити SVG іконку логотипу */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8H22V24H10V8Z" fill="white" />
              </svg>
            </div>
            <span className="text-foreground text-xl font-bold tracking-tighter uppercase">
              Read Journey
            </span>
          </div>

          {/* Заголовок (Expand your mind...) */}
          <h1 className="text-foreground mb-10 max-w-112.5 text-5xl leading-[1.1] font-semibold md:text-6xl">
            Expand your mind, reading{' '}
            <span className="text-(--text-secondary)">a book</span>
          </h1>

          {/* Сюди підставляються форми (LoginForm або RegisterForm) */}
          <div className="grow">{children}</div>
        </div>

        {/* ПРАВА ЧАСТИНА: iPhone m-5  h-full */}
        <div className="bg-secondary-bg hidden items-end justify-center overflow-hidden rounded-[30px] px-10 pt-10 lg:flex lg:w-1/2">
          <div className="relative w-full max-w-100">
            {/* Використовуємо Next.js Image для оптимізації */}
            <Image
              src="/iPhone 15 Black.png" // Поклади картинку в папку public
              alt="iPhone App Preview"
              width={405}
              height={735}
              // className="object-contain" // Зберігає пропорції всередині контейнера
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
