import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

interface YoutubeVideoPlayerProps {
  state: "FORM" | "VIDEO";
  onSave?: () => void;
  onEdit?: () => void;
}

const YoutubeVideoPlayer = ({ state, onSave, onEdit }: YoutubeVideoPlayerProps) => {
  const [url, setUrl] = useState<string>();
  const [urlInput, setUrlInput] = useState<string>();
  const [lastPlayed, setLastPlayed] = useState<number>(0);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    const savedUrl = localStorage.getItem("videoURL") || undefined;
    const savedTime = parseFloat(localStorage.getItem("videoTime") || "0");

    setUrl(savedUrl);
    setLastPlayed(savedTime);
  }, []);

  const handleSave = () => {
    if (!urlInput?.trim()) return;
    localStorage.setItem("videoURL", urlInput);
    localStorage.setItem("videoTime", "0");
    setLastPlayed(0);
    if (typeof onSave === "function") onSave();
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    localStorage.setItem("videoTime", progress.playedSeconds.toString());
    setLastPlayed(progress.playedSeconds);
  };

  const handleReady = () => {
    if (playerRef.current && lastPlayed > 0) {
      playerRef.current.seekTo(lastPlayed, "seconds");
    }
  };

  const renderForm = () => (
    <div className="flex justify-center py-36 gap-4">
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        className="rounded-3xl px-2 w-[36rem] text-black"
      />
      <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-3xl">Save</button>
    </div>
  );

  const renderVideo = () => (
    <div className="flex flex-col items-center py-12 gap-4">
      {url ? (
        <>
          <ReactPlayer
            ref={playerRef}
            url={url}
            playing
            controls
            onReady={handleReady}
            onProgress={handleProgress}
            config={{
              youtube: { playerVars: { autoplay: 1 } },
            }}
          />
          <button onClick={onEdit} className="bg-yellow-600 text-white px-4 py-2 rounded-3xl">Edit</button>
        </>
      ) : (
        <p>No video selected. Go back to home.</p>
      )}
    </div>
  );

  return (
    <>
      {state === "FORM" ? renderForm() : renderVideo()}
    </>
  );
};

export default YoutubeVideoPlayer;