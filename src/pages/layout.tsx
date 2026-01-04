import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiColorFilterAiLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { TbBrandAppgallery } from "react-icons/tb";
import { useEffect, useState } from "react";
const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  if (!localStorage.getItem("token")) localStorage.removeItem("name");
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    document.body.classList.add("dark");
    return () => document.body.classList.remove("dark");
  }, []);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded transition ${
      isActive
        ? "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white"
        : "hover:bg-gray-100 dark:hover:bg-slate-800"
    }`;
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100">
      <aside
      style={{display:localStorage.getItem('token') ? "block" : "none"}}
        className={`fixed md:static top-0 left-0 z-50 min-h-screen pt-16 md:pt-0 w-64 bg-white dark:bg-[#020617] border-r dark:border-slate-800 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div
          className="p-6 text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Админ панель
        </div>
        <nav className="flex flex-col gap-2 px-4">
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            <AiOutlineProduct size={18} />
            Продукты
          </NavLink>
          <NavLink
            to="categories"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            <MdOutlineCategory size={18} />
            Категории
          </NavLink>
          <NavLink
            to="subCategories"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            <BiCategory size={18} />
            Субкатегории
          </NavLink>
          <NavLink
            to="brands"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            <TbBrandAppgallery size={18} />
            Бренды
          </NavLink>
          <NavLink
            to="colors"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            <RiColorFilterAiLine size={18} />
            Цвета
          </NavLink>
          <NavLink
            to="profile"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            <CgProfile size={18} />
            Профиль
          </NavLink>
        </nav>
      </aside>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
      <div className="flex-1 flex flex-col">
        <header className="h-16 px-6 flex items-center justify-between bg-white dark:bg-[#020617] border-b dark:border-slate-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
            <h1 className="font-semibold disnon text-lg">Админ таблица</h1>
          </div>
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
