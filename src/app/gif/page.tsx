"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GifPage() {
  const router = useRouter();

  return (
    <>
    
      <Image
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG40ODVmd3IxeGtheDB5bG84emF2Y3NsbmQxdDN6dWdtd2J2NzVqeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aT3yNpYqMzOaN1ScRL/giphy.gif"
        alt="Funny GIF"
        width="400"
        height="400"
      />
      <button onClick={() => router.back()}>Back</button>
    </>
  );
}