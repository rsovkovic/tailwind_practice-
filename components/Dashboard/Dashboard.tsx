interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  return (
    <aside className="flex h-fit w-full shrink-0 flex-col rounded-[30px] bg-[#1F1F1F] p-5 lg:w-88.25 lg:p-10">
      {children}
    </aside>
  );
};
