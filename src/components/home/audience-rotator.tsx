"use client";

import { useEffect, useRef, useState } from "react";

const AUDIENCES = ["schools", "hospitals", "corrections", "campuses", "large facilities"];

/**
 * Hero keyword rotator: fades between audience words.
 * The full message is server-rendered as static text (first audience word),
 * so the hero communicates even if JS never runs.
 */
export function AudienceRotator() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const i = setInterval(() => {
      if (!mounted.current) return;
      setVisible(false);
      setTimeout(() => {
        if (!mounted.current) return;
        setIndex((v) => (v + 1) % AUDIENCES.length);
        setVisible(true);
      }, 350);
    }, 2600);
    return () => {
      mounted.current = false;
      clearInterval(i);
    };
  }, []);

  return (
    <span
      className="transition-opacity duration-300 ease-in-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {AUDIENCES[index]}
    </span>
  );
}
