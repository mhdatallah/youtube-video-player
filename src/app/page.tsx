"use client";

import { useRouter } from "next/navigation";
import YoutubeVideoPlayer from "@/components/YoutubeVideoPlayer";

export default function Home() {
  const router = useRouter();

  return (
    <YoutubeVideoPlayer state={"FORM"} onSave={() => router.push('/video')} />
  );
}