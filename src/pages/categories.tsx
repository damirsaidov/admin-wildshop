import { useEffect, useState } from "react";
import Loader from "./loader";
type Category = {
  id: number;
  categoryName: string;
  image?: string;
};
const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const getCategories = async () => {
    try {
      const res = await fetch(
        "https://store-api.softclub.tj/Category/get-categories"
      );
      const json = await res.json();
      setCategories(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  async function deleteCateg(id: number) {
    try {
      await fetch(
        `https://store-api.softclub.tj/Category/delete-category?id=${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getCategories();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((c: any) => (
        <div
          key={c.id}
          className="group bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
        >
          <div className="h-40 bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
            <img
              src={`https://store-api.softclub.tj/images/${c.categoryImage}`}
              className="h-full object-contain"
            />
          </div>
          <div className="p-4 text-center">
            <h1 className="text-lg font-semibold group-hover:text-blue-500 transition">
              {c.categoryName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Category #{c.id}</p>
            <button
              onClick={() => deleteCateg(c.id)}
              className="mt-4 cursor-pointer w-full py-2 rounded-lg bg-red-500/90 hover:bg-red-600 text-white text-sm font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Categories;