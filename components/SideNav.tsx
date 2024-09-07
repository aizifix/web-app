"use client";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SideNav = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost/attendance/user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "logout",
        }),
      });
      const data = await response.json();

      if (data.success) {
        sessionStorage.removeItem("user");
        router.replace("/"); // Redirect to login page after logout
      } else {
        console.error("Failed to logout:", data.error);
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="w-[230px] h-[100vh] border-r border-[#c7c7c7] fixed left-0 top-0">
      <div className="flex justify-center items-center py-3">
        <Image alt="Logo" src={Logo} height={100} />
      </div>
      <div className="flex flex-col justify-between h-[calc(100vh-200px)]">
        <ul className="flex flex-col gap-2 px-2">
          <li className="bg-transparent text-black py-2 px-4 rounded-[0.35rem] hover:bg-[#277c49] hover:cursor-pointer hover:text-white flex items-center gap-2">
            <i className="bx bxs-dashboard text-xl" />
            <Link href="/admin/routes/dashboard">Dashboard</Link>
          </li>
          <li className="bg-transparent text-black py-2 px-4 rounded-[0.35rem] hover:bg-[#277c49] hover:cursor-pointer hover:text-white flex items-center gap-2">
            <i className="bx bxs-calendar-event text-xl" />
            <Link href="/admin/routes/events">Events</Link>
          </li>
          <li className="bg-transparent text-black py-2 px-4 rounded-[0.35rem] hover:bg-[#277c49] hover:cursor-pointer hover:text-white flex items-center gap-2">
            <i className="bx bxs-check-circle text-xl" />
            <Link href="/admin/routes/attendance">Attendance</Link>
          </li>
          <li className="bg-transparent text-black py-2 px-4 rounded-[0.35rem] hover:bg-[#277c49] hover:cursor-pointer hover:text-white flex items-center gap-2">
            <i className="bx bxs-user-detail text-xl" />
            <Link href="/admin/routes/users">Users</Link>
          </li>
          <li className="bg-transparent text-black py-2 px-4 rounded-[0.35rem] hover:bg-[#277c49] hover:cursor-pointer hover:text-white flex items-center gap-2">
            <i className="bx bxs-group text-xl" />
            <Link href="/admin/routes/tribus">Tribus</Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-2 px-2">
          <li className="bg-transparent text-black py-2 px-4 rounded-[0.35rem] hover:bg-[#277c49] hover:cursor-pointer hover:text-white flex items-center gap-2">
            <i className="bx bxs-exit text-xl" />
            <span onClick={handleLogout}>Log out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
