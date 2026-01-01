import { useEffect, useState } from "react";
import { MdDelete, MdOutlineAddCircle } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import Loader from "./loader";
import { Modal } from "antd";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
type Product = {
  id: number;
  productName: string;
  price: number;
  discountPrice: number;
  image: string;
};
const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, showModal] = useState<boolean>(false);
  const [brands, setBrands] = useState<any>(null);
  const [brandId, setBrandId] = useState<number | undefined>();
  const [colors, setColors] = useState<any>(null);
  const [colorId, setColorId] = useState<number | undefined>();
  const navigate = useNavigate();
  async function deleteProduct(id: number | string) {
    try {
      await fetch(
        `https://store-api.softclub.tj/Product/delete-product?id=${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getProducts();
    } catch (er) {
      console.error(er);
    }
  }
  const getBrands = async () => {
    try {
      const res = await fetch("https://store-api.softclub.tj/Brand/get-brands");
      const json = await res.json();
      setBrands(json.data);
    } catch (err) {
      setError("Ошибка загрузки товаров");
    } finally {
      setLoading(false);
    }
  };
  const getColors = async () => {
    try {
      const res = await fetch("https://store-api.softclub.tj/Color/get-colors");
      const json = await res.json();
      setColors(json.data);
    } catch (err) {
      setError("Ошибка загрузки товаров");
    } finally {
      setLoading(false);
    }
  };
  const getProducts = async () => {
    try {
      const res = await fetch(
        "https://store-api.softclub.tj/Product/get-products"
      );
      const json = await res.json();
      setProducts(json.data.products);
    } catch (err) {
      setError("Ошибка загрузки товаров");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
    getBrands();
    getColors();
  }, []);
  if (loading)
    return (
      <div className="text-center pt-20 flex justify-center max-w-350 m-auto">
        <Loader />
      </div>
    );
  if (error) {
    return (
      <div className="text-center pt-20 flex justify-center max-w-350 m-auto">
        <Loader />
      </div>
    );
  }
  return (
    <div className="max-w-375 m-auto">
      <div className="flex justify-end">
        <div
          onClick={() => showModal(true)}
          className="flex items-center bg-blue-500 px-4 py-3 mb-5 rounded-2xl gap-1 justify-center"
        >
          <MdOutlineAddCircle /> <span>Добавить</span>
        </div>
      </div>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => {
          const discount = Math.round(
            ((p.price - p.discountPrice) / p.price) * 100
          );
          return (
            <div
              key={p.id}
              className="max-w-70 w-full mx-auto relative bg-white dark:bg-slate-900 rounded-2xl shadow hover:shadow-2xl transition p-4"
            >
              <AiFillInfoCircle
                onClick={() => navigate(`/products/${p.id}`)}
                size={24}
              />
              <HiX size={20} className="absolute ml-11 bg-red-500 rounded" />
              {discount && (
                <span className="absolute top-6 right-12 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {discount}%
                </span>
              )}
              <img
                src={`https://store-api.softclub.tj/images/${p.image}`}
                className="h-48 w-full object-contain "
              />
              <p className="mt-3 text-sm text-yellow-500">★ 4.8 (26)</p>
              <h2 className="font-semibold mt-1 truncate">{p.productName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-red-500 font-bold">
                  {p.discountPrice} $
                </span>
                <span className="line-through text-gray-400 text-sm">
                  {p.price} $
                </span>
              </div>
              <button
                onClick={() => deleteProduct(p.id)}
                className="flex items-center text-center m-auto justify-center gap-1 mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
              >
                <MdDelete /> <span>Удалить</span>
              </button>
            </div>
          );
        })}
        <Modal
          open={modal}
          onOk={() => showModal(false)}
          onCancel={() => showModal(false)}
          title="Add product"
          okType="link"
        >
          <input
            type="file"
            multiple
            className="p-2 w-full border rounded mx-2 my-3"
          />
          <select
            value={brandId}
            onChange={(e) => setBrandId(Number(e.target.value))}
            className="mx-2 my-3 w-full border p-2 rounded"
          >
            {brands?.map((e: any) => (
              <option key={e.id} value={e.id}>
                {e.brandName}
              </option>
            ))}
          </select>
          <select
            value={colorId}
            onChange={(e) => setColorId(Number(e.target.value))}
            className="mx-2 my-3 w-full border p-2 rounded"
          >
            {colors?.map((e: any) => (
              <option key={e.id} value={e.id}>
                {e.colorName}
              </option>
            ))}
          </select>
        </Modal>
      </div>
    </div>
  );
};
export default Home;
