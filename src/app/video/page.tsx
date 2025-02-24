"use client";

import { useRouter } from "next/navigation";
import YoutubeVideoPlayer from "@/components/YoutubeVideoPlayer";

export default function Video() {
  const router = useRouter();

  const onGifClick = () => router.push('/gif');

  return (
    <div className="flex flex-col items-center">
      <YoutubeVideoPlayer state={"VIDEO"} onEdit={() => router.push('/')} />
      <button onClick={onGifClick} className="bg-purple-600 from-red-200 text-white px-4 py-2 rounded-3xl">Show me a GIF</button>
    </div>
  );
}