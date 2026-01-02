import { useEffect, useState } from "react";
import Loader from "./loader";
type Color = {
  id: number;
  colorName: string;
};
const Colors = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [colorName, setColorName] = useState<string>("");
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
        `https://store-api.softclub.tj/Color/add-color?ColorName=${colorName}`,
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
      <form onSubmit={addColor} className="flex gap-2 max-w-100 items-center">
        <input
          value={colorName}
          onChange={(e) => setColorName(encodeURIComponent(e.target.value))}
          placeholder="Product description"
          className="p-2 w-full border rounded mx-2 my-3"
        />
        <button className="px-6 py-2 rounded-xl bg-blue-500 border ">
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
              <button
                onClick={() => deleteColor(e.id)}
                className="mt-4 w-full py-2 rounded-lg bg-red-500/90 hover:bg-red-600 text-white text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Colors;