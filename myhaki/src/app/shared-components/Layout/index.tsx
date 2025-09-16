import SidebarWithLogo from "../SideBar/index";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout flex">
      <div className="flex-shrink-0 w-[250px]">
        <SidebarWithLogo />
      </div>
      <main className="main-content flex-1">
        {children}
      </main>
    </div>
  );
}
