"use client";

import { useRouter } from "next/navigation";
import YoutubeVideoPlayer from "@/components/YoutubeVideoPlayer";

export default function Video() {
  const router = useRouter();

  return (
    <YoutubeVideoPlayer state={"VIDEO"} onEdit={() => router.push('/')} />
  );
}