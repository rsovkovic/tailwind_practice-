export const Quote = () => {
  return (
    <div className="mt-5 flex items-center gap-4 rounded-[20px] bg-(--bg-blok) p-5">
      <span className="text-4xl">📚</span> {/* Або іконка зі спрайту */}
      <p className="text-sm leading-tight text-(--text-secondary)">
        &quot;Books are{' '}
        <span className="text-foreground font-medium">windows</span> to the
        world, and reading is a journey into the unknown.&quot;
      </p>
    </div>
  );
};
