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
    <>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </>
  );

  const renderVideo = () => (
    <>
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
          <button onClick={onEdit}>Edit</button>
        </>
      ) : (
        <p>No video selected. Go back to home.</p>
      )}
    </>
  );

  return (
    <>
      <h1>Youtube Video Player</h1>
      {state === "FORM" ? renderForm() : renderVideo()}
    </>
  );
};

export default YoutubeVideoPlayer;