import { openai } from "@ai-sdk/openai";
import { getEdgeRuntimeResponse } from "@assistant-ui/react/edge";

// This optional property can be used to specify the maximum duration in seconds that your function can run for. This can't be set when the runtime is set to edge

export const maxDuration = 30;

export const POST = async (request: Request) => {
  const requestData = await request.json();
  console.log("requestData", JSON.stringify(requestData));

  const re = getEdgeRuntimeResponse({
    options: {
      // model: createOpenAI({
      //   baseURL: "http://127.0.0.1:8000",
      // })("gpt-4"),
      model: openai("gpt-3.5-turbo"),
    },
    requestData,
    abortSignal: request.signal,
  });

  return re;
};
