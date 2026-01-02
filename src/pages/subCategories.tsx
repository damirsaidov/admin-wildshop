import { useEffect, useState } from "react";
import Loader from "./loader";
type SubCategory = {
  id: number;
  subCategoryName: string;
};
const Categories = () => {
  const [categories, setCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [categId, setCategId] = useState<any>(null);
  const [categs, setCategs] = useState<any>([]);
  async function getCategs() {
    try {
      let res = await fetch(
        "https://store-api.softclub.tj/Category/get-categories"
      );
      let data = await res.json();
      setCategs(data.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function addSubCategory(e:any) {
    e.preventDefault()
    try {
      await fetch(
        `https://store-api.softclub.tj/SubCategory/add-sub-category?CategoryId=${categId}&SubCategoryName=${subCategoryName}`, {method:"POST", headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}}
      );
      getCategories()
    } catch (error) {
      console.error(error);
    }
  }
  const getCategories = async () => {
    try {
      const res = await fetch(
        "https://store-api.softclub.tj/SubCategory/get-sub-category"
      );
      const json = await res.json();
      setCategories(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
    getCategs();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-6">
      <form onSubmit={addSubCategory} className="flex gap-2 max-w-150 items-center">
        <input
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          placeholder="Subcategory description"
          className="p-2 w-75 border border-gray-400 rounded   mx-2 my-3"
        />
        <select
          value={categId}
          className="border border-gray-400 w-fit px-6 py-3 rounded-xl"
          onChange={(e) => setCategId(e.target.value)}
        >
          {categs.map((e: any) => (
            <option value={e.id}>{e.categoryName}</option>
          ))}
        </select>
        <button className="px-6 py-2 border-0 rounded-xl bg-blue-500">
          Add
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((e) => (
          <div
            key={e.id}
            className="group bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <div className="p-6 flex flex-col text-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-500 transition">
                {e.subCategoryName}
              </h2>
              <p className="text-sm text-gray-500 mt-2">ID: {e.id}</p>
              <button className="mt-4 w-full py-2 rounded-lg bg-red-500/90 hover:bg-red-600 text-white text-sm font-medium transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Categories;
