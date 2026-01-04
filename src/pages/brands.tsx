import { useEffect, useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

type Brand = {
  id: number;
  brandName: string;
};

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [name, setName] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();

  async function getBrands() {
    const res = await fetch("https://store-api.softclub.tj/Brand/get-brands", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    setBrands(json.data);
  }

  async function addBrand() {
    if (!name) return;
    await fetch(
      `https://store-api.softclub.tj/Brand/add-brand?BrandName=${name}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setName("");
    getBrands();
  }

  async function deleteBrand(id: number) {
    await fetch(`https://store-api.softclub.tj/Brand/delete-brand?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    getBrands();
  }

  function openEditModal(e: Brand) {
    setEditId(e.id);
    setEditName(e.brandName);
    setEditOpen(true);
  }

  async function editBrand() {
    if (!editId || !editName) return;
    await fetch(
      `https://store-api.softclub.tj/Brand/update-brand?Id=${editId}&BrandName=${editName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setEditOpen(false);
    getBrands();
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow border dark:border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 border-e dark:border-slate-800">
          <h1 className="text-lg font-semibold">Brands</h1>
          <div className="flex gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New brand name"
              className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addBrand}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Add brand
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 text-center">ID</th>
                <th className="px-6 py-3 text-center">Brand name</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((e) => (
                <tr
                  key={e.id}
                  className="border-t dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  <td className="px-6 py-4 text-center text-gray-500">
                    #{e.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-center">
                    {e.brandName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(e)}
                        className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBrand(e.id)}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {brands.length == 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No brands found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title="Edit brand"
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        onOk={editBrand}
        okType="primary"
      >
        <input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Modal>
    </div>
  );
};

export default Brands;
