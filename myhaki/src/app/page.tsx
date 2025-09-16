import Image from "next/image";
import Sidebar from "./shared-components/SideBar";
import Layout from "./shared-components/Layout";

export default function Home() {
  return (
    <div >
      <Sidebar />
      <h1>Welcome to MyHaki dashboard!</h1>
    </div>
  );
}
