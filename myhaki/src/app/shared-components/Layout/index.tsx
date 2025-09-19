import Sidebar from "../SideBar/index";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout flex">
      <div className="flex-shrink-0 w-[250px]">
        <Sidebar />
      </div>
      <main className="main-content flex-1 px-8">
        {children}
      </main>
    </div>
  );
}