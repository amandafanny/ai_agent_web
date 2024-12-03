"use client";
import { setCookie } from "@/lib/cookie";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const login = async (event: any) => {
    event.preventDefault(); // 阻止默认提交行为
    if (password !== "" && username !== "") {
      const data = await (
        await fetch("/api/login", {
          body: JSON.stringify({
            username,
            password,
          }),
          method: "post",
        })
      ).json();
      console.log("data", data);
      if (data.code === 0) {
        console.log("注册成功");
        setCookie("token", data.data.token);
        window.location.href = "/";
      }
    }
  };
  return (
    <main className="text-center">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-8 w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">登录</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                用户名
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                placeholder="请输入用户名"
                required
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                密码
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="请输入密码"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={login}
              >
                登录
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-500 hover:text-blue-800">
              忘记密码？
            </a>
          </div>
          <div className="mt-4 text-center">
            <span>没有账号？</span>
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-800"
            >
              注册
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
