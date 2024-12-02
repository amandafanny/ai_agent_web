export const setCookie = async (name: string, value: unknown, days = 1) => {
  // 获取当前时间
  const date = new Date();

  // 设置过期时间，单位为天
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  await cookieStore.set({
    name,
    value,
    expires: date.valueOf(),
  });
};
