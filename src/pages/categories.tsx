import { useEffect, useState } from "react";
import Loader from "./loader";
import { Modal, Upload } from "antd";
type Category = {
  id: number;
  categoryName: string;
  categoryImage: string;
};
const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const getCategories = async () => {
    try {
      const res = await fetch(
        "https://store-api.softclub.tj/Category/get-categories"
      );
      const json = await res.json();
      setCategories(json.data);
    } finally {
      setLoading(false);
    }
  };
  async function addCategory() {
    if (!name || !file) return;
    const formData = new FormData();
    formData.append("CategoryName", name);
    formData.append("CategoryImage", file);
    await fetch("https://store-api.softclub.tj/Category/add-category", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    setName("");
    setFile(null);
    setLoading(true);
    getCategories();
  }
  async function deleteCateg(id: number) {
    await fetch(
      `https://store-api.softclub.tj/Category/delete-category?id=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setLoading(true);
    getCategories();
  }
  function openEditModal(c: Category) {
    setEditId(c.id);
    setEditName(c.categoryName);
    setEditFile(null);
    setEditOpen(true);
  }
  async function editCategory() {
    const formData = new FormData();
    formData.append("Id", String(editId));
    formData.append("CategoryName", editName);
    if (editFile) formData.append("CategoryImage", editFile);
    await fetch("https://store-api.softclub.tj/Category/update-category", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    setEditOpen(false);
    setLoading(true);
    getCategories();
  }

  useEffect(() => {
    getCategories();
  }, []);
  if (loading) {
    return (
      <div className="text-center flex justify-center mt-20 text-gray-500">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="flex gap-3 p-4">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="category-input border px-3 py-2 rounded"
        />
        <input
          type="file"
          className="border px-3 py-2 rounded"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={addCategory}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>
      <div className="p-4 grid grid-cols-2 flex-wrap sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((e) => (
          <div
            key={e.id}
            className=" category-card group  group bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <div className="h-28 sm:h-36 bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
              <img
                src={`https://store-api.softclub.tj/images/${e.categoryImage}`}
                className="h-full object-contain"
              />
            </div>
            <div className="p-4 text-center">
              <h1 className="text-sm sm:text-base font-semibold group-hover:text-blue-500 transition">
                {e.categoryName}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Category #{e.id}</p>
              <div className="flex items-center gap-2 ">
                <button
                  onClick={() => deleteCateg(e.id)}
                  className="mt-2 w-full py-2 rounded bg-red-500/90 hover:bg-red-600 text-white  transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(e)}
                  className="mt-2 w-full py-2 rounded bg-yellow-500 text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
        <Modal
          title="Изменить категорию"
          open={editOpen}
          onCancel={() => setEditOpen(false)}
          onOk={editCategory}
          okType="link"
        >
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Category name"
            className="m-2 w-[95%] border px-4 py-2 rounded"
            required
          />
          <Upload
            beforeUpload={(file) => {
              setEditFile(file);
              return false;
            }}
            className="w-full"
            maxCount={1}
          >
            <button className="m-2 w-full border-0 rounded bg-blue-600 px-6 py-2 text-white ">
              Выберете изображение
            </button>
          </Upload>
        </Modal>
      </div>
    </>
  );
};

export default Categories;
