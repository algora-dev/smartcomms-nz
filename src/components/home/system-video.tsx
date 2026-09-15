"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * System overview video: autoplay (muted) when scrolled into view,
 * pause when scrolled away. Custom navy/teal controls appear on hover:
 * play/pause + restart + sound on/off, plus a draggable YouTube-style
 * timeline so users can start from anywhere. Autoplay with sound is
 * blocked by browsers, so it starts muted with a clear unmute control.
 */
export function SystemVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [scrubbing, setScrubbing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Lazy-load the source only when the video approaches the viewport.
          if (!video.src) {
            video.src = "/videos/scnz-system-overview.mp4";
            video.load();
          }
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { rootMargin: "200px", threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (!scrubbing && video.duration) {
        setProgress(video.currentTime / video.duration);
      }
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [scrubbing]);

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

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setProgress(0);
    video.play().then(() => setPlaying(true)).catch(() => {});
  };

  const seekFromClientX = useCallback((clientX: number) => {
    const video = videoRef.current;
    const bar = barRef.current;
    if (!video || !bar || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setProgress(ratio);
    video.currentTime = ratio * video.duration;
  }, []);

  const onScrubStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setScrubbing(true);
    seekFromClientX(e.clientX);
    const onMove = (ev: PointerEvent) => seekFromClientX(ev.clientX);
    const onUp = (ev: PointerEvent) => {
      seekFromClientX(ev.clientX);
      setScrubbing(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onScrubKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const step = video.duration / 20;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      video.currentTime = Math.min(video.duration, video.currentTime + step);
      setProgress(video.currentTime / video.duration);
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      video.currentTime = Math.max(0, video.currentTime - step);
      setProgress(video.currentTime / video.duration);
      e.preventDefault();
    } else if (e.key === "Home") {
      video.currentTime = 0;
      setProgress(0);
      e.preventDefault();
    } else if (e.key === "End") {
      video.currentTime = video.duration;
      setProgress(1);
      e.preventDefault();
    }
  };

  const buttonClass =
    "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[#0b2d5b]/85 text-white backdrop-blur-sm transition-all duration-200 hover:bg-[#16407d] hover:shadow-[0_0_0_1px_rgba(44,177,165,0.45),0_6px_22px_rgba(44,177,165,0.5)]";

  return (
    <section className="sc-container py-10">
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-navy,#0b2d5b)] shadow-[0_16px_48px_rgba(11,45,91,0.12)]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <video
          ref={videoRef}
          className="block w-full h-auto bg-[#0b2d5b]"
          muted
          playsInline
          preload="none"
          aria-label="SmartComms system overview video"
          onClick={togglePlay}
        />

        {/* Controls — visible on hover (and while paused) */}
        <div
          className="absolute bottom-4 left-4 right-4 flex items-center gap-3 transition-opacity duration-200"
          style={{ opacity: hovering || !playing ? 1 : 0 }}
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className={buttonClass}
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
            onClick={restart}
            aria-label="Restart video from the beginning"
            className={buttonClass}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className={buttonClass}
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

          {/* Draggable timeline */}
          <div
            ref={barRef}
            role="slider"
            tabIndex={0}
            aria-label="Seek video"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            onPointerDown={onScrubStart}
            onKeyDown={onScrubKey}
            className="group relative h-11 flex min-w-0 flex-1 cursor-pointer items-center"
          >
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/25">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#2CB1A5]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_3px_rgba(44,177,165,0.55)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ left: `${progress * 100}%`, opacity: hovering || scrubbing || !playing ? 1 : 0 }}
            />
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-[var(--sc-slate)]">
        A quick overview of how a connected communication system fits together.
      </p>
    </section>
  );
}
