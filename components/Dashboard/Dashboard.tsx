interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  return (
    <aside className="bg-secondary-bg flex h-fit w-full shrink-0 flex-col rounded-[30px] p-5 lg:w-88.25 xl:gap-5">
      {children}
    </aside>
  );
};
