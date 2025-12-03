import SideBar from "../components/SideBar";
import RightSidebar from "../components/RightSidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex justify-center min-h-screen ">
      <SideBar />

      <main className="flex justify-items-start lg:min-w-[600px] max-w-[600px] border-r border-r-gray-200">
        {children}
      </main>

      <div className="hidden lg:block">
        {/* <RightSidebar /> */}
      </div>
    </div>
  );
}
