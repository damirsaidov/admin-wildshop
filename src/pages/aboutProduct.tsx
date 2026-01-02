import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./loader";
const AboutProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>([])
  async function getProduct() {
    try {
        let res = await fetch(`https://store-api.softclub.tj/Product/get-product-by-id?id=${id}`)
        let data = await res.json()
        setData(data)
    } catch (error) {
        console.error(error);
    }
  }
  useEffect(() => {
    getProduct()
  },[])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const product = data?.data;
  const mainImage = product?.images?.[selectedImageIndex]?.images;
  if(!data) return <Loader/>  
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6">
          <ol className="flex items-center space-x-3 text-sm text-gray-500">
            <li>
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer hover:text-indigo-600 transition-colors"
              >
                Главная
              </span>
            </li>
            <li>•</li>
            <li>
              <span
                onClick={() => navigate("/products")}
                className="cursor-pointer hover:text-indigo-600 transition-colors"
              >
                Продукты
              </span>
            </li>
            <li>•</li>
            <li className="font-medium text-gray-700 truncate max-w-60">
              {product?.productName}
            </li>
          </ol>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-start xl:gap-16">
          <div className="flex flex-col lg:flex-row gap-6 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
              {product?.images?.map((img: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`
                    w-20 h-20 lg:w-24 lg:h-24 shrink-0 rounded-xl overflow-hidden 
                    border-2 transition-all cursor-pointer
                    ${
                      idx === selectedImageIndex
                        ? "border-indigo-500 shadow-md"
                        : "border-transparent hover:border-gray-300"
                    }
                  `}
                >
                  <img
                    src={`https://store-api.softclub.tj/images/${img.images}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              ))}
            </div>
            <div className="flex-1 order-1 lg:order-2 rounded-2xl">
              <img
                src={`https://store-api.softclub.tj/images/${mainImage}`}
                className="w-122 object-cover p-4 rounded-2xl"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 tracking-tight">
              {product?.productName}
            </h1>
            <div className="mt-4 text-4xl sm:text-5xl font-black text-indigo-600">
              ${product?.price}
              <span className="ml-2 text-2xl line-through font-normal text-gray-500">
                ${product?.discountPrice}
              </span>
            </div>
            {product?.description && (
              <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
            {product?.color && (
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-gray-700">Цвет:</span>
                <div
                  className="w-10 h-10 rounded-full shadow-md ring-1 ring-offset-2 ring-gray-200"
                  style={{ backgroundColor: product.color }}
                  title={product.color}
                />
              </div>
            )}
            <div className="flex items-center gap-4 text-lg">
              <span className="font-medium text-gray-700">В наличии:</span>
              <span className="font-bold text-emerald-600">
                {product?.quantity} шт
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 sm:flex-none px-8 py-4 rounded-xl text-gray-700 bg-white border-2 border-gray-300 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-98 cursor-pointer"
              >
                Назад
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutProduct;