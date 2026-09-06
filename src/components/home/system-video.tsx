"use client";

import { useEffect, useRef, useState } from "react";

/**
 * System overview video: autoplay (muted) when scrolled into view,
 * pause when scrolled away. Custom navy/teal controls appear on hover:
 * play/pause + sound on/off. Autoplay with sound is blocked by browsers,
 * so it starts muted with a clear unmute control.
 */
export function SystemVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section className="sc-container py-10">
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-navy,#0b2d5b)] shadow-[0_16px_48px_rgba(11,45,91,0.12)]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <video
          ref={videoRef}
          className="block w-full h-auto"
          src="/videos/scnz-system-overview.mp4"
          muted
          playsInline
          preload="metadata"
          aria-label="SmartComms system overview video"
          onClick={togglePlay}
        />

        {/* Controls — visible on hover (and while paused) */}
        <div
          className="absolute bottom-4 right-4 flex items-center gap-2 transition-opacity duration-200"
          style={{ opacity: hovering || !playing ? 1 : 0 }}
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[#0b2d5b]/85 text-white backdrop-blur-sm transition-all duration-200 hover:bg-[#16407d] hover:shadow-[0_0_0_1px_rgba(44,177,165,0.45),0_6px_22px_rgba(44,177,165,0.5)]"
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <rect x="2" y="1" width="4" height="14" rx="1" />
                <rect x="10" y="1" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M3 1.5v13l11-6.5L3 1.5Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[#0b2d5b]/85 text-white backdrop-blur-sm transition-all duration-200 hover:bg-[#16407d] hover:shadow-[0_0_0_1px_rgba(44,177,165,0.45),0_6px_22px_rgba(44,177,165,0.5)]"
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="m22 9-6 6M16 9l6 6" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-[var(--sc-slate)]">
        A quick overview of how a connected communication system fits together.
      </p>
    </section>
  );
}
