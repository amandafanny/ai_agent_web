"use client";
import Link from "next/link";

// async function streamMessage({
//   model,
//   system,
//   messages,
//   tools,
//   toolChoice,
//   ...options
// }: StreamMessageOptions) {
//   return model.doStream({
//     inputFormat: "messages",
//     mode: {
//       type: "regular",
//       ...(tools ? { tools } : undefined),
//       ...(toolChoice ? { toolChoice } : undefined),
//     },
//     prompt: convertToLanguageModelPrompt(system, messages),
//     ...(options as Partial<LanguageModelV1CallOptions>),
//   });
// }

export default function Home() {
  // const runtime = useEdgeRuntime({
  //   api: "/api/chat",
  // });

  return (
    <main className="h-dvh">
      <div className="text-center mt-[3rem]">
        <Link href="/agent">Agent</Link>
        {/* <AssistantModal runtime={runtime} /> */}
      </div>
    </main>
  );
}
