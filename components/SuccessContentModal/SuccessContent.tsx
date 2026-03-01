export default function SuccessContent({
  type,
}: {
  type: 'added' | 'finished';
}) {
  const isAdded = type === 'added';
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="mb-5 text-6xl">
        {isAdded ? '👍' : '🌵'} {/* Або картинки з макету */}
      </div>
      <h3 className="text-foreground mb-2 text-xl font-bold">
        {isAdded ? 'Good job!' : 'Congratulations!'}
      </h3>
      <p className="text-sm text-[#6868]">
        {isAdded
          ? 'Your book is now in the library. The journey begins!'
          : 'You have read the book. Well done!'}
      </p>
    </div>
  );
}
