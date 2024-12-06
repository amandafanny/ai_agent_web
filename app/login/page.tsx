"use client";
import { setCookie } from "@/lib/cookie";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        window.location.href = "/agent";
      }
    }
  };
  return (
    <main className="text-center">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-8 w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                placeholder="please enter username"
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
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="please enter password"
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
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <span>No account?</span>
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-800"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
