import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"));
const ConditionalSidebar = dynamic(
  () => import("@/components/sidebar/ConditionalSidebar")
);

const AdminMainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col  items-center h-screen ">
      <Navbar />
      <div className="w-full h-full flex-grow flex  justify-center  ">
        <div className="">
          <ConditionalSidebar />
        </div>
        <main className="p-4 w-[80vw] ">{children}</main>
      </div>
    </div>
  );
};

export default AdminMainLayout;
