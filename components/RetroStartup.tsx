
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onComplete: () => void;
};

const BOOT_LINES = [
  "NOSTALGIA BIOS VERSION 3.1",
  "COPYRIGHT (C) 1998-2026 MEMORY SYSTEMS",
  "",
  "MEMORY TEST: 640K OK",
  "CHECKING FLOPPY DRIVE A: ... OK",
  "DETECTING SOUND BLASTER ... OK",
  "LOADING INDIAN CHILDHOOD MEMORIES ... OK",
  "LOADING DOORDARSHAN CHANNELS ... OK",
  "LOADING SCHOOL TIFFIN ... OK",
  "LOADING GULLY CRICKET ... OK",
  "",
  "STARTING NOSTALGIA-90S.VAULT ...",
];

export default function RetroStartup({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [skipNextTime, setSkipNextTime] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("vault-skip-boot");
    setSkipNextTime(saved === "yes");

    const interval = setInterval(() => {
      setProgress((previous) => Math.min(100, previous + 2));
    }, 65);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100 || finished.current) return;
    finished.current = true;

    const timer = setTimeout(onComplete, 650);
    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  function toggleSkip() {
    const next = !skipNextTime;
    setSkipNextTime(next);
    localStorage.setItem("vault-skip-boot", next ? "yes" : "no");
  }

  function finish() {
    if (finished.current) return;
    finished.current = true;
    onComplete();
  }

  const linesVisible = Math.max(
    1,
    Math.floor((progress / 100) * BOOT_LINES.length)
  );

  return (
    <div className="boot-screen">
      <div className="boot-content">
        <div className="boot-logo">
          <span>★</span> NOSTALGIA OS
        </div>

        <div className="boot-subtitle">
          INDIA EDITION · VERSION 3.1
        </div>

        <div className="boot-terminal">
          {BOOT_LINES.slice(0, linesVisible).map((line, index) => (
            <div key={index}>{line || "\u00a0"}</div>
          ))}
          <span className="boot-cursor">█</span>
        </div>

        <div className="boot-progress-label">
          INITIALIZING MEMORIES ... {progress}%
        </div>

        <div
          className="boot-progress-track"
          role="progressbar"
          aria-label="Startup progress"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div style={{ width: `${progress}%` }} />
        </div>

        <div className="boot-options">
          <label>
            <input
              type="checkbox"
              checked={skipNextTime}
              onChange={toggleSkip}
            />
            Skip boot animation next time
          </label>

          <button type="button" onClick={finish}>
            SKIP BOOT ▶
          </button>
        </div>
      </div>

      <div className="boot-footer">
        PRESS SKIP TO ENTER YOUR CHILDHOOD
      </div>
    </div>
  );
}
