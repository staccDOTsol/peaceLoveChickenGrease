import React, { useEffect, useRef } from "react";
// import "./styles.css";

export default function Autoplay() {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div>
      <div>
        <video
          style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
          playsInline
          loop
          muted
          controls
          src="./collection.mp4"
          ref={videoEl}
        />
      </div>
    </div>
  );
}
