import { useEffect, useState } from "react";
import Loader from "./loader";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
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
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

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
  async function addSubCategory(e: any) {
    e.preventDefault();
    try {
      await fetch(
        `https://store-api.softclub.tj/SubCategory/add-sub-category?CategoryId=${categId}&SubCategoryName=${subCategoryName}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getCategories();
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteSubCategory(id: number | string) {
    try {
      await fetch(
        `https://store-api.softclub.tj/SubCategory/delete-sub-category?id=${id}`,
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
    if (categs.length == 1) setCategId(categs[0].id);
  }, [categs]);
  function openEditModal(sub: any) {
    setEditId(sub.id);
    setEditName(sub.subCategoryName);
    setEditCategoryId(categId);
    setEditOpen(true);
  }
  async function editSubCategory() {
    await fetch(
      `https://store-api.softclub.tj/SubCategory/update-sub-category?Id=${editId}&CategoryId=${editCategoryId}&SubCategoryName=${editName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setEditOpen(false);
    setLoading(true);
    getCategories();
  }
  useEffect(() => {
    getCategories();
    getCategs();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
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
      <form
        onSubmit={addSubCategory}
        className="flex flex-col sm:flex-row gap-2 max-w-xl items-center"
      >
        <input
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          placeholder="Subcategory description"
          className="p-2 w-full sm:w-54 border border-gray-400 rounded"
        />
        <select
          value={categId ?? ""}
          className="border border-gray-400 w-fit py-2.75 sm:w-62 p-2 rounded"
          onChange={(e) => setCategId(Number(e.target.value))}
        >
          {categs.map((e: any) => (
            <option key={e.id} value={e.id}>
              {e.categoryName}
            </option>
          ))}
        </select>
        <button className="px-4 py-2 rounded bg-blue-500 w-full sm:w-auto">
          Add
        </button>
      </form>
      <div className=" pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((e) => (
          <div
            key={e.id}
            className="group bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <div className="p-4 flex flex-col text-center">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white group-hover:text-blue-500 transition">
                {e.subCategoryName}
              </h2>
              <p className="text-sm text-gray-500 mt-2">ID: {e.id}</p>
              <div className="flex items-center gap-2 ">
                <button
                  onClick={() => deleteSubCategory(e.id)}
                  className="mt-2 w-full py-2 rounded-lg bg-red-500/90 hover:bg-red-600 text-white text-sm font-medium transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(e)}
                  className="mt-2 w-full py-2 rounded-lg bg-yellow-500 text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
        <Modal
          title="Edit SubCategory"
          open={editOpen}
          onCancel={() => setEditOpen(false)}
          onOk={editSubCategory}
          okType="link"
        >
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Subcategory name"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <select
            value={editCategoryId ?? ""}
            onChange={(e) => setEditCategoryId(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          >
            {categs.map((e: any) => (
              <option key={e.id} value={e.id}>
                {e.categoryName}
              </option>
            ))}
          </select>
        </Modal>
      </div>
    </div>
  );
};
export default Categories;
