import Image from "next/image";
import SidebarWithLogo from "./shared-components";

export default function Home() {
  return (
    <div >
      <SidebarWithLogo />
      <h1>Welcome to MyHaki dashboard!</h1>
    </div>
  );
}
