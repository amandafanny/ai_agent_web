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

export const getCookie = async (name: string): Promise<string | null> => {
  try {
    // 检查 cookieStore 是否支持
    if (typeof cookieStore !== "undefined") {
      // 使用 cookieStore API 获取 cookie
      const cookie = await cookieStore.get(name);
      return cookie ? cookie.value : null;
    } else {
      // 使用 document.cookie 获取 cookie 并解析
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    }
  } catch (error) {
    console.error("Error while getting cookie:", error);
    // 作为最后手段，尝试使用 document.cookie 来获取 cookie
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  }
};
