import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

interface YoutubeVideoPlayerProps {
    state: 'FORM' | 'VIDEO';
    onSave?: () => void;
    onEdit?: () => void;
}

const YoutubeVideoPlayer = ({state, onSave, onEdit}: YoutubeVideoPlayerProps) => {

    const [url, setUrl] = useState<string>();
    const [urlInput, setUrlInput] = useState<string>();

    useEffect(() => {
        setUrl(localStorage.getItem("videoURL") || undefined);
    }, []);
    
    const handleSave = () => {
      if (!urlInput?.trim()) return;
      localStorage.setItem("videoURL", urlInput);
      typeof onSave === 'function' && onSave();
    };

    const renderForm = () => {
        return (
            <>
                <input
                type="text"
                placeholder="Enter YouTube URL"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
            </>
            )
    }

    const renderVideo = () => {
    
      return (
        <>
          {url ? (
            <>
              <ReactPlayer
                url={url}
                playing
                controls
                config={{ youtube: { playerVars: { autoplay: 1 } } }}
              />
              <button onClick={onEdit}>Edit</button>
            </>
          ) : (
            <p>No video selected. Go back to home.</p>
          )}
        </>
      );
    }
  return (
    <>
        <h1>Youtube Video Player</h1>
        {state === 'FORM' ? renderForm() : renderVideo()}
    </>
  )
}

export default YoutubeVideoPlayer;