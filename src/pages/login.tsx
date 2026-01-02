import { Input } from "antd";
import useMessage from "antd/es/message/useMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [messageApi, context] = useMessage();
  async function login() {
    if(!name || !pass) alert("Заполните все поля")
    try {
      const res = await fetch("https://store-api.softclub.tj/Account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: name, password: pass }),
      });
      if (!res.ok) {
        throw new Error("Invalid password or username!");
      }
      const data = await res.json();
      localStorage.setItem("token", data.data);
      localStorage.setItem("name", name);
      if (name != "SuperAdmin") {
        messageApi.error("Вы не являетесь администратором!");
        localStorage.removeItem("token")
        return;
      } else {
        messageApi.success("Вход успешен");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Неправильный пароль или имя!");
    }
  }
  const handleLogin = async (e: any) => {
    e.preventDefault();
    login();
  };
  return (
    <div>
      {context}
      <div className="lgin mediaa flex flex-col w-150 self-center m-auto rounded-3xl mt-10 shadow-2xl border-gray-400 p-4 ">
        <h1 className="text-center text-2xl p-2">Войти</h1>
        <form onSubmit={handleLogin}>
          <Input
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "99%", backgroundColor:"black", color:"white" }}

            className="plc w-full"
            placeholder="Имя пользователя"
          />
          <Input
            value={pass}
            onChange={(e: any) => setPass(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "99%",backgroundColor:"black", color:"white"  }
          }
            className="plc w-full"
            type={"password"}
            placeholder="Пароль"
          />
          <button type="submit" className="w-full card-btn text-center">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
