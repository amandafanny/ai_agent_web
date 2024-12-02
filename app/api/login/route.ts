export const POST = async (request: Request) => {
  const requestData = JSON.parse(await request.text());

  return await fetch("http://pythix-api.erc7527.com/api/login", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: 1,
      username: requestData.username,
      password: requestData.password,
    }),
    method: "post",
  });
};
