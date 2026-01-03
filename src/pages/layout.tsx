import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiColorFilterAiLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { useEffect } from "react";
const Layout = () => {
  if (!localStorage.getItem("token")) localStorage.removeItem("name");
  const navigate = useNavigate();
  function roleUser() {
    if (!localStorage.getItem("token")) navigate("/login");
  }
  useEffect(() => {
    roleUser();
  }, []);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded transition ${
      isActive
        ? "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white"
        : "hover:bg-gray-100 dark:hover:bg-slate-800"
    }`;
  return (
    <div
      onMouseEnter={() =>
        localStorage.getItem("token") ? "" : navigate("/login")
      }
      className="min-h-screen flex bg-gray-100 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100"
    >
      <aside
        style={{ display: localStorage.getItem("token") ? "block" : "none" }}
        className="w-64 bg-white dark:bg-[#020617] border-r dark:border-slate-800"
      >
        <div
          className="p-6 text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Админ панель
        </div>
        <nav className="flex flex-col gap-2 px-4">
          <NavLink to="/" className={linkClass}>
            <AiOutlineProduct size={18} />
            Продукты
          </NavLink>
          <NavLink to="categories" className={linkClass}>
            <MdOutlineCategory size={18} />
            Категории
          </NavLink>
          <NavLink to="subCategories" className={linkClass}>
            <BiCategory size={18} />
            Субкатегории
          </NavLink>
          <NavLink to="colors" className={linkClass}>
            <RiColorFilterAiLine size={18} />
            Цвета
          </NavLink>
          <NavLink to="profile" className={linkClass}>
            <CgProfile size={18} />
            Профиль
          </NavLink>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 px-6 flex items-center justify-between bg-white dark:bg-[#020617] border-b dark:border-slate-800">
          <h1 className="font-semibold text-lg">Админ таблица</h1>
          <div className="flex items-center gap-4">
            <IoMdHome
              size={25}
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
            {localStorage.getItem("token") ? (
              <FaUser
                size={20}
                className="cursor-pointer"
                onClick={() => navigate("profile")}
              />
            ) : (
              <CiLogin
                size={24}
                className="cursor-pointer"
                onClick={() => navigate("/login")}
              />
            )}
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;