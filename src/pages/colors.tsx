import { useEffect, useState } from "react";
import Loader from "./loader";
import { Modal } from "antd";
type Color = {
  id: number;
  colorName: string;
};
const Colors = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [colorName, setColorName] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [id, setId] = useState<number | string | null>(null);
  async function editColor() {
    setModal(false);
    try {
      await fetch(
        `https://store-api.softclub.tj/Color/update-color?Id=${id}&ColorName=${editName}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getColors();
    } catch (error) {
      console.error(error);
    }
  }
  const getColors = async () => {
    try {
      const res = await fetch("https://store-api.softclub.tj/Color/get-colors");
      const json = await res.json();
      setColors(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  async function addColor(e: any) {
    e.preventDefault();
    try {
      await fetch(
        `https://store-api.softclub.tj/Color/add-color?ColorName=${encodeURIComponent(
          colorName
        )}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getColors();
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteColor(e: number) {
    try {
      await fetch(`https://store-api.softclub.tj/Color/delete-color?id=${e}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      getColors();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getColors();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-6">
      <form onSubmit={addColor} className="flex gap-1 max-w-100 items-center">
        <input
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          placeholder="Product description"
          className="p-2 w-full border border-gray-400 rounded mx-2 my-3"
        />
        <button className="px-6 py-2 rounded-xl bg-blue-500 border-0 ">
          Add
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {colors.map((e) => (
          <div
            key={e.id}
            className="group relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            <div
              style={{ backgroundColor: e.colorName }}
              className="h-24 w-full"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-500 transition">
                {e.colorName}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Color ID: {e.id}</p>
              <div className="flex items-center gap-2 ">
                <button
                  onClick={() => deleteColor(e.id)}
                  className="mt-2 w-full py-2 rounded bg-red-500/90 hover:bg-red-600 text-white text-sm font-medium transition"
                >
                  Delete
                </button>
                <button
                  className="mt-2 w-full py-2 rounded bg-yellow-500 text-white"
                  onClick={() => [
                    setEditName(e.colorName),
                    setId(e.id),
                    setModal(true),
                  ]}
                >
                  Изменить
                </button>
              </div>
            </div>
          </div>
        ))}
        <Modal
          open={modal}
          onOk={editColor}
          onCancel={() => setModal(false)}
          title="Изменить цвет"
          okType="link"
        >
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Имя цвета"
            className="m-2 w-[95%] border px-4 py-2 rounded"
            required
          />
        </Modal>
      </div>
    </div>
  );
};
export default Colors;
