
"use client";

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import "./ControlPanelV44.css";

type Wallpaper = "teal" | "bliss" | "midnight" | "purple";
type Theme = "win98" | "win95" | "gaming";
type Tab = "appearance" | "display" | "screensaver" | "sound";
type IdleMinutes = 0 | 1 | 2 | 5 | 10;

export type ControlPanelRequest = {
  id: number;
  tab?: Tab;
};

type Props = {
  request: ControlPanelRequest | null;
  wallpaper: Wallpaper;
  onWallpaperChange: Dispatch<SetStateAction<Wallpaper>>;
  sound: boolean;
  onSoundChange: Dispatch<SetStateAction<boolean>>;
  crt: boolean;
  onCrtChange: Dispatch<SetStateAction<boolean>>;
};

const STORAGE_KEY = "nostalgia-v44-control-panel";

const THEMES: {
  id: Theme;
  name: string;
  description: string;
}[] = [
  {
    id: "win98",
    name: "Windows 98 Classic",
    description: "Silver windows and navy titlebars",
  },
  {
    id: "win95",
    name: "Windows 95 Grey",
    description: "Old-school charcoal and grey",
  },
  {
    id: "gaming",
    name: "Retro Gaming Dark",
    description: "Arcade-style dark purple",
  },
];

const WALLPAPERS: {
  id: Wallpaper;
  label: string;
}[] = [
  { id: "teal", label: "Classic Teal" },
  { id: "bliss", label: "Green Hills" },
  { id: "midnight", label: "Midnight Blue" },
  { id: "purple", label: "Retro Purple" },
];

export default function ControlPanelV44({
  request,
  wallpaper,
  onWallpaperChange,
  sound,
  onSoundChange,
  crt,
  onCrtChange,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("appearance");

  const [theme, setTheme] = useState<Theme>("win98");
  const [idleMinutes, setIdleMinutes] = useState<IdleMinutes>(2);
  const [screensaverEnabled, setScreensaverEnabled] = useState(true);
  const [screensaverActive, setScreensaverActive] = useState(false);

  const [hydrated, setHydrated] = useState(false);
  const [clock, setClock] = useState("");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(false);
  const lastActivityRef = useRef(0);

  useEffect(() => {
    setMounted(true);

    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );

      if (
        ["win98", "win95", "gaming"].includes(saved.theme)
      ) {
        setTheme(saved.theme);
      }

      if ([0, 1, 2, 5, 10].includes(saved.idleMinutes)) {
        setIdleMinutes(saved.idleMinutes);
      }

      if (typeof saved.screensaverEnabled === "boolean") {
        setScreensaverEnabled(saved.screensaverEnabled);
      }
    } catch {
      // Use defaults.
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          theme,
          idleMinutes,
          screensaverEnabled,
        })
      );
    } catch {}
  }, [theme, idleMinutes, screensaverEnabled, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    document.body.setAttribute("data-v44-theme", theme);

    return () => {
      document.body.removeAttribute("data-v44-theme");
    };
  }, [theme, hydrated]);

  useEffect(() => {
    if (!request) return;
    setTab(request.tab || "appearance");
    setOpen(true);
    setScreensaverActive(false);
  }, [request]);

  useEffect(() => {
    activeRef.current = screensaverActive;
  }, [screensaverActive]);

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();

    const interval = window.setInterval(updateClock, 30000);

    return () => window.clearInterval(interval);
  }, []);

  // Reset the idle countdown whenever the user interacts.
  useEffect(() => {
    if (!hydrated) return;

    const clearTimer = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const resetTimer = () => {
      clearTimer();

      if (activeRef.current) {
        activeRef.current = false;
        setScreensaverActive(false);
      }

      if (!screensaverEnabled || idleMinutes === 0 || open) {
        return;
      }

      timerRef.current = setTimeout(() => {
        activeRef.current = true;
        setScreensaverActive(true);
      }, idleMinutes * 60000);
    };

    const onActivity = () => {
      const now = Date.now();

      // Avoid excessive state / timer work during mouse movement.
      if (!activeRef.current && now - lastActivityRef.current < 500) {
        return;
      }

      lastActivityRef.current = now;
      resetTimer();
    };

    resetTimer();

    const events = [
      "pointermove",
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
    ] as const;

    events.forEach((event) =>
      window.addEventListener(event, onActivity, { passive: true })
    );

    return () => {
      clearTimer();

      events.forEach((event) =>
        window.removeEventListener(event, onActivity)
      );
    };
  }, [hydrated, screensaverEnabled, idleMinutes, open]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (screensaverActive) {
        activeRef.current = false;
        setScreensaverActive(false);
      } else if (open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", escape);

    return () => window.removeEventListener("keydown", escape);
  }, [open, screensaverActive]);

  function previewScreensaver() {
    setOpen(false);
    activeRef.current = true;
    setScreensaverActive(true);
  }

  function resetAppearance() {
    setTheme("win98");
    onWallpaperChange("teal");
    onSoundChange(true);
    onCrtChange(false);
    setScreensaverEnabled(true);
    setIdleMinutes(2);
  }

  const panel = (
    <>
      {open && (
        <div
          className="v44-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            className="v44-window"
            role="dialog"
            aria-modal="true"
            aria-label="Control Panel"
          >
            <div className="v44-titlebar">
              <strong>⚙️ Control Panel — Nostalgia OS</strong>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close Control Panel"
              >
                ×
              </button>
            </div>

            <div className="v44-menu-line">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Help</span>
            </div>

            <div className="v44-panel-heading">
              <span>🖥️</span>
              <div>
                <h2>Control Panel</h2>
                <p>Customize your retro computer experience.</p>
              </div>
            </div>

            <div className="v44-tabs">
              {(
                [
                  ["appearance", "🎨 Themes"],
                  ["display", "🖥 Display"],
                  ["screensaver", "🌙 Screensaver"],
                  ["sound", "🔊 Sound"],
                ] as [Tab, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  className={tab === id ? "active" : ""}
                  onClick={() => setTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="v44-panel-content">
              {tab === "appearance" && (
                <>
                  <h3>Desktop Themes</h3>
                  <p>Select a classic Windows-inspired interface.</p>

                  <div className="v44-theme-list">
                    {THEMES.map((item) => (
                      <button
                        key={item.id}
                        className={
                          theme === item.id ? "selected" : ""
                        }
                        onClick={() => setTheme(item.id)}
                      >
                        <div
                          className={`v44-theme-preview v44-preview-${item.id}`}
                        >
                          <div className="v44-preview-bar">
                            My Computer
                            <span>□ ×</span>
                          </div>
                          <div className="v44-preview-body">
                            📁　💾　🖥️
                          </div>
                        </div>

                        <strong>{item.name}</strong>
                        <small>{item.description}</small>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {tab === "display" && (
                <>
                  <h3>Display Properties</h3>
                  <p>Choose your wallpaper and CRT effect.</p>

                  <div
                    className={`v44-wallpaper-preview wallpaper-${wallpaper}`}
                  >
                    <span>🖥️</span>
                    <small>My Computer</small>
                  </div>

                  <div className="v44-wallpapers">
                    {WALLPAPERS.map((item) => (
                      <button
                        key={item.id}
                        className={
                          wallpaper === item.id ? "selected" : ""
                        }
                        onClick={() =>
                          onWallpaperChange(item.id)
                        }
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <label className="v44-check">
                    <input
                      type="checkbox"
                      checked={crt}
                      onChange={(event) =>
                        onCrtChange(event.target.checked)
                      }
                    />
                    Enable CRT scanline effect
                  </label>
                </>
              )}

              {tab === "screensaver" && (
                <>
                  <h3>Screensaver Settings</h3>
                  <p>
                    Show a retro animation when the computer
                    is inactive.
                  </p>

                  <label className="v44-check">
                    <input
                      type="checkbox"
                      checked={screensaverEnabled}
                      onChange={(event) =>
                        setScreensaverEnabled(event.target.checked)
                      }
                    />
                    Enable automatic screensaver
                  </label>

                  <label className="v44-field">
                    Wait before starting
                    <select
                      value={idleMinutes}
                      disabled={!screensaverEnabled}
                      onChange={(event) =>
                        setIdleMinutes(
                          Number(event.target.value) as IdleMinutes
                        )
                      }
                    >
                      <option value={0}>Never</option>
                      <option value={1}>1 minute</option>
                      <option value={2}>2 minutes</option>
                      <option value={5}>5 minutes</option>
                      <option value={10}>10 minutes</option>
                    </select>
                  </label>

                  <div className="v44-screensaver-sample">
                    <strong>NOSTALGIA</strong>
                    <span>★ 90S.VAULT ★</span>
                    <small>Press any key to return</small>
                  </div>

                  <button
                    className="v44-action"
                    onClick={previewScreensaver}
                  >
                    ▶ Preview Screensaver
                  </button>
                </>
              )}

              {tab === "sound" && (
                <>
                  <h3>Sound Settings</h3>
                  <p>Control the retro desktop sounds.</p>

                  <label className="v44-check">
                    <input
                      type="checkbox"
                      checked={sound}
                      onChange={(event) =>
                        onSoundChange(event.target.checked)
                      }
                    />
                    Enable desktop system sounds
                  </label>

                  <div className="v44-info">
                    System sounds play when you open Windows,
                    Start Menu and other desktop controls.
                  </div>
                </>
              )}
            </div>

            <div className="v44-actions">
              <button onClick={resetAppearance}>
                Restore Defaults
              </button>
              <span />
              <button onClick={() => setOpen(false)}>
                OK
              </button>
              <button onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {screensaverActive && (
        <div
          className="v44-screensaver"
          role="button"
          tabIndex={0}
          aria-label="Exit screensaver"
          onPointerDown={() => {
            activeRef.current = false;
            setScreensaverActive(false);
          }}
          onKeyDown={() => {
            activeRef.current = false;
            setScreensaverActive(false);
          }}
        >
          <div className="v44-saver-stars" />
          <div className="v44-saver-logo">
            <span>✦ NOSTALGIA ✦</span>
            <strong>90S.VAULT</strong>
            <small>YOUR CHILDHOOD IS STILL HERE</small>
          </div>

          <div className="v44-saver-clock">{clock}</div>

          <div className="v44-saver-tip">
            Move mouse, click or press a key to return
          </div>
        </div>
      )}
    </>
  );

  if (!mounted) return null;

  return createPortal(panel, document.body);
}
