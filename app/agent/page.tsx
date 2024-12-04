"use client";

import { useEffect, useState } from "react";
import useToken from "../_hooks/useToken";
import SHA256 from "crypto-js/sha256";

type MessageType = "agent" | "user";

interface Message {
  type: MessageType;
  content: string;
  hash: string;
}

export default function Agent() {
  const [messageList, setMessageList] = useState<Message[]>([
    { content: "What can I do for you?", hash: "1", type: "agent" },
  ]);
  const [msg, setMsg] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const token = useToken();

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
      setMessageList((prevMessages: Message[]) => {
        const list = [
          ...prevMessages,
          {
            type: "user" as MessageType,
            content: msg,
            hash: SHA256(msg).toString(),
          },
        ];
        if (list.length < 10) {
          return list;
        }
        return list.slice(-10);
      });
      setMsg("");
    }
  };

  useEffect(() => {
    if (token === null) {
      return;
    }
    // 建立 WebSocket 连接
    const ws = new WebSocket(`ws://3.236.55.247:8000/chat?token=${token}`);

    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket连接已建立");
    };

    ws.onmessage = (event) => {
      console.log("收到消息:", event.data);
      if (event.data !== "") {
        setMessageList((prevMessages: Message[]) => {
          const list = [
            ...prevMessages,
            {
              type: "agent" as MessageType,
              content: event.data,
              hash: SHA256(event.data).toString(),
            },
          ];
          if (list.length < 10) {
            return list;
          }
          return list.slice(-10);
        });
      }
    };

    ws.onclose = () => {
      console.log("WebSocket连接已关闭");
    };

    ws.onerror = (error) => {
      console.error("WebSocket错误:", error);
    };

    // 清理: 组件卸载时关闭 WebSocket 连接
    return () => {
      if (ws) ws.close();
    };
  }, [token]);

  return (
    <main className="h-dvh flex">
      <div className="mx-auto w-[50%] mt-[3rem] flex flex-col">
        <div className="grow bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
          <div className="space-y-6">
            {messageList.map((val) => {
              if (val.type === "agent") {
                return (
                  <div key={val.hash} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                        A
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="bg-gray-100 p-4 rounded-lg max-w-sm">
                        {val.content}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={val.hash} className="flex items-start justify-end">
                  <div className="mr-3">
                    <div className="bg-blue-100 p-4 rounded-lg max-w-sm">
                      {val.content}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                      U
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex my-[1rem]">
          <input
            type="text"
            placeholder="Enter..."
            className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:border-blue-500"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
