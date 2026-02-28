// import { Loader2 } from 'lucide-react';

// export const PageLoader = () => (
//   <div className="flex h-screen w-full items-center justify-center bg-[#111111]">
//     {/* animate-spin робить іконку рухомою */}
//     <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
//   </div>
// );

interface LoaderProps {
  fullScreen?: boolean;
}

export const PageLoader = ({ fullScreen = false }: LoaderProps) => {
  const dots = Array.from({ length: 8 });

  return (
    <div
      className={`z-50 flex items-center justify-center bg-[#111111]/60 backdrop-blur-sm ${fullScreen ? 'fixed inset-0' : 'absolute inset-0 min-h-[300px]'}`}
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        {dots.map((_, i) => (
          <div
            key={i}
            className="animate-loader-pulse absolute h-4.5 w-4.5 rounded-full"
            style={
              {
                // Градієнт від білого до вашого смарагдового кольору
                background: 'radial-gradient(circle, #ffffff 0%, #10b981 70%)',
                // Розрахунок кута для кожної кульки
                transform: `rotate(${i * 45}deg) translate(45px)`,
                // Затримка анімації
                animationDelay: `${i * 0.15}s`,
                // Передаємо дистанцію в CSS змінну для анімації
                '--tw-translate-dist': '45px',
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};
