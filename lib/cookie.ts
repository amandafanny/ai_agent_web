// export const setCookie = async (name: string, value: unknown, days = 1) => {
//   // 获取当前时间
//   const date = new Date();

//   // 设置过期时间，单位为天
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

//   await cookieStore.set({
//     name,
//     value,
//     expires: date.valueOf(),
//   });
// };

export const setCookie = async (name: string, value: unknown, days = 1) => {
  // 获取当前时间
  const date = new Date();

  // 设置过期时间，单位为天
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  const expires = "expires=" + date.toUTCString();

  try {
    // 检查 cookieStore 是否存在
    if (typeof cookieStore !== "undefined") {
      // 使用 cookieStore API 设置 cookie
      await cookieStore.set({
        name,
        value: String(value), // 确保 value 是字符串
        expires: date.valueOf(),
      });
    } else {
      document.cookie = `${name}=${encodeURIComponent(
        String(value)
      )}; ${expires}; path=/`;
    }
  } catch (error) {
    console.log("cookieStore API 不支持或出错，使用 document.cookie:", error);
    // 使用 document.cookie 设置 cookie
    document.cookie = `${name}=${encodeURIComponent(
      String(value)
    )}; ${expires}; path=/`;
  }
};

// // 设置 cookie
// document.cookie = "username=John Doe; path=/";

// // 获取所有 cookie
// const allCookies = document.cookie;
// console.log(allCookies);
