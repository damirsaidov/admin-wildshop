import { Outlet, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
const Layout = () => {
  if (!localStorage.getItem("token")) localStorage.removeItem("name")
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-white dark:bg-[#020617] border-r dark:border-slate-800">
        <div
          className="p-6 text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Админ панель
        </div>
        <nav className="flex flex-col gap-2 px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <AiOutlineProduct size={18} />
            Продукты
          </button>
          <button
            onClick={() => navigate("profile")}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <CgProfile size={18} />
            Профиль
          </button>
          <button
            onClick={() => navigate("categories")}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <MdOutlineCategory size={18} />
            Категории
          </button>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 px-6 flex items-center justify-between bg-white dark:bg-[#020617] border-b dark:border-slate-800">
          <h1 className="font-semibold text-lg">Админ таблица</h1>
          <div className="flex items-center gap-4">
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
