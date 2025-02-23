"use client";

import { useRouter } from "next/navigation";
import YoutubeVideoPlayer from "@/components/YoutubeVideoPlayer";

export default function Video() {
  const router = useRouter();

  const onGifClick = () => router.push('/gif');

  return (
    <>
      <YoutubeVideoPlayer state={"VIDEO"} onEdit={() => router.push('/')} />
      <button onClick={onGifClick}>Show me a GIF</button>
    </>
  );
}