
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getIndianMemories,
  indianMemories,
  type VaultCategory,
} from "@/lib/india-vault-data";

import RetroStartup from "./RetroStartup";

import dynamic from "next/dynamic";

const IndianTV = dynamic(
  () => import("./IndianTV"),
  {
    ssr: false,
    loading: () => (
      <div className="v45-loading">
        📺 Loading Desi Cable TV...
      </div>
    ),
  }
);

const CyberCafe = dynamic(
  () => import("./CyberCafe"),
  {
    ssr: false,
    loading: () => (
      <div className="v45-loading">
        💻 Connecting to Cyber Café...
      </div>
    ),
  }
);

const GamingParlour = dynamic(
  () => import("./GamingParlour"),
  {
    ssr: false,
    loading: () => (
      <div className="v45-loading">
        🎮 Loading Gaming Parlour...
      </div>
    ),
  }
);

import IndianMemories from "./IndianMemories";
import "./DesktopV40.css";
import DesktopAccessories from "./DesktopAccessories";
import ClassicAccessories, {
  type ClassicApp,
} from "./ClassicAccessories";

import DraggableIconsV43 from "./DraggableIconsV43";
import RetroToolsV43, {
  type RetroTool,
} from "./RetroToolsV43";
import "./DesktopV43.css";

import ControlPanelV44, {
  type ControlPanelRequest,
} from "./ControlPanelV44";
import "./MobileOptimizeV45.css";



type AppId =
  | "simulator"
  | "cafe"
  | "parlour"
  | "tv"
  | "snacks"
  | "games"
  | "tech"
  | "music"
  | "school"
  | "festivals"
  | "bengali"
  | "pet"
  | "brick"
  | "bin";

type WallpaperId = "teal" | "bliss" | "midnight" | "purple";

type DesktopApp = {
  id: AppId;
  icon: string;
  name: string;
  filename: string;
  category?: VaultCategory;
};

const APPS: DesktopApp[] = [
  {
    id: "simulator",
    icon: "📡",
    name: "Desi Cable TV '99",
    filename: "DesiCableTV.exe",
  },
  {
    id: "cafe",
    icon: "💻",
    name: "Cyber Café 2005",
    filename: "CyberCafe2005.exe",
  },
  {
    id: "parlour",
    icon: "🎮",
    name: "Gaming Parlour",
    filename: "RajuGameParlour.exe",
  },
  {
    id: "tv",
    icon: "📺",
    name: "Indian TV & Toons",
    filename: "DesiTV.exe",
    category: "TV & Cartoons",
  },
  {
    id: "snacks",
    icon: "🍬",
    name: "Snacks & Toys",
    filename: "Snacks.exe",
    category: "Snacks & Toys",
  },
  {
    id: "games",
    icon: "🏏",
    name: "Gully Games",
    filename: "GullyGames.exe",
    category: "Gully Games",
  },
  {
    id: "tech",
    icon: "💾",
    name: "Old Technology",
    filename: "OldTechnology.exe",
    category: "Technology",
  },
  {
    id: "music",
    icon: "📼",
    name: "Bollywood Mixtape",
    filename: "Mixtape.exe",
    category: "Music & Movies",
  },
  {
    id: "school",
    icon: "📚",
    name: "School Diary",
    filename: "SchoolDiary.exe",
    category: "School Days",
  },
  {
    id: "festivals",
    icon: "🪔",
    name: "Indian Festivals",
    filename: "Festivals.exe",
    category: "Festivals",
  },
  {
    id: "bengali",
    icon: "🎭",
    name: "Bengali Memories",
    filename: "Bengali.exe",
    category: "Bengali Memories",
  },
  {
    id: "pet",
    icon: "🥚",
    name: "Virtual Pet",
    filename: "VirtualPet.exe",
  },
  {
    id: "brick",
    icon: "🕹️",
    name: "Brick Game 9999",
    filename: "BrickGame.exe",
  },
  {
    id: "bin",
    icon: "🗑️",
    name: "Saved Memories",
    filename: "Memories",
  },
];

const WALLPAPERS: {
  id: WallpaperId;
  name: string;
  description: string;
}[] = [
  {
    id: "teal",
    name: "Classic Teal",
    description: "Windows 98-inspired",
  },
  {
    id: "bliss",
    name: "Green Hills",
    description: "XP-era inspired",
  },
  {
    id: "midnight",
    name: "Midnight Blue",
    description: "Cyber Café night",
  },
  {
    id: "purple",
    name: "Retro Purple",
    description: "Arcade evening",
  },
];

const FAVORITES_KEY = "india-vault-favorites-v3";
const PET_KEY = "india-vault-pet-v3";
const SETTINGS_KEY = "nostalgia-desktop-v40-settings";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function formatClock(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function NostalgiaMachine() {
  const [initialized, setInitialized] = useState(false);
  const [booting, setBooting] = useState(false);

  const [opened, setOpened] = useState<AppId | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const [position, setPosition] = useState({
    x: 265,
    y: 88,
  });

  const [startOpen, setStartOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [runOpen, setRunOpen] = useState(false);
  const [runValue, setRunValue] = useState("");

  const [wallpaper, setWallpaper] = useState<WallpaperId>("teal");
  const [crt, setCrt] = useState(false);
  const [sound, setSound] = useState(true);
  const [clock, setClock] = useState<Date | null>(null);

  const [year, setYear] = useState(2005);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const [petName, setPetName] = useState("PIXEL");
  const [petFood, setPetFood] = useState(65);
  const [petHappy, setPetHappy] = useState(75);
  const [petMessage, setPetMessage] = useState(
    "Your digital friend is waiting!"
  );

  const [brickPlaying, setBrickPlaying] = useState(false);
  const [brickScore, setBrickScore] = useState(0);
  const [brickBest, setBrickBest] = useState(0);
  const [brickCell, setBrickCell] = useState(12);

  const windowRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  
const [controlPanelRequest, setControlPanelRequest] =
  useState<ControlPanelRequest | null>(null);

const controlPanelRequestId = useRef(0);

function openControlPanel(
  tab: "appearance" | "display" | "screensaver" | "sound" =
    "appearance"
) {
  controlPanelRequestId.current += 1;

  setStartOpen(false);
  setControlPanelRequest({
    id: controlPanelRequestId.current,
    tab,
  });
}

  
const [retroToolRequest, setRetroToolRequest] = useState<{
  tool: RetroTool;
  id: number;
} | null>(null);

function openRetroTool(tool: RetroTool) {
  setStartOpen(false);
  setRetroToolRequest({
    tool,
    id: Date.now(),
  });
}


  const dragRef = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);
  const [classicRequest, setClassicRequest] = useState<{
  app: ClassicApp;
  id: number;
} | null>(null);

  const finishBoot = useCallback(() => {
    setBooting(false);
  }, []);

  useEffect(() => {
    try {
      setBooting(
        localStorage.getItem("vault-skip-boot") !== "yes"
      );

      const savedFavorites = JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || "[]"
      );

      if (Array.isArray(savedFavorites)) {
        setFavorites(
          savedFavorites.filter(
            (value): value is string => typeof value === "string"
          )
        );
      }

      const savedPet = JSON.parse(
        localStorage.getItem(PET_KEY) || "null"
      );

      if (savedPet && typeof savedPet === "object") {
        if (typeof savedPet.name === "string") {
          setPetName(savedPet.name.slice(0, 12));
        }

        if (typeof savedPet.food === "number") {
          setPetFood(clamp(savedPet.food, 0, 100));
        }

        if (typeof savedPet.happy === "number") {
          setPetHappy(clamp(savedPet.happy, 0, 100));
        }
      }

      const savedSettings = JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "null"
      );

      if (savedSettings) {
        if (
          ["teal", "bliss", "midnight", "purple"].includes(
            savedSettings.wallpaper
          )
        ) {
          setWallpaper(savedSettings.wallpaper);
        }

        if (typeof savedSettings.crt === "boolean") {
          setCrt(savedSettings.crt);
        }

        if (typeof savedSettings.sound === "boolean") {
          setSound(savedSettings.sound);
        }
      }
    } catch {
      // Continue with default desktop settings.
    }

    setClock(new Date());
    setReady(true);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
      );
    } catch {}
  }, [favorites, ready]);

  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(
        PET_KEY,
        JSON.stringify({
          name: petName,
          food: petFood,
          happy: petHappy,
        })
      );
    } catch {}
  }, [petName, petFood, petHappy, ready]);

  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ wallpaper, crt, sound })
      );
    } catch {}
  }, [wallpaper, crt, sound, ready]);

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date());
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!brickPlaying || opened !== "brick" || minimized) return;

    const timer = setInterval(() => {
      setBrickCell(Math.floor(Math.random() * 25));
    }, 1100);

    return () => clearInterval(timer);
  }, [brickPlaying, opened, minimized]);

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (runOpen) {
        setRunOpen(false);
      } else if (settingsOpen) {
        setSettingsOpen(false);
      } else if (startOpen) {
        setStartOpen(false);
      }
    };

    window.addEventListener("keydown", closeWithEscape);

    return () =>
      window.removeEventListener("keydown", closeWithEscape);
  }, [startOpen, settingsOpen, runOpen]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        void audioRef.current.close().catch(() => {});
      }
    };
  }, []);

  function playSound(
    frequency = 500,
    duration = 0.11,
    type: OscillatorType = "square"
  ) {
    if (!sound) return;

    try {
      if (!audioRef.current) {
        audioRef.current = new AudioContext();
      }

      const context = audioRef.current;

      if (context.state === "suspended") {
        void context.resume();
      }

      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(
        frequency,
        context.currentTime
      );

      gain.gain.setValueAtTime(0.025, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + duration
      );

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start();
      oscillator.stop(context.currentTime + duration);
    } catch {
      // Desktop also works without browser audio.
    }
  }

  function playOpenSound() {
    playSound(650, 0.13, "sine");
  }

  function openApp(id: AppId) {
    setOpened(id);
    setMinimized(false);
    setMaximized(false);
    setStartOpen(false);
    setSettingsOpen(false);
    setRunOpen(false);

    const wide = ["simulator", "cafe", "parlour"].includes(id);
    const windowWidth = wide ? 820 : 690;

    setPosition({
      x:
        window.innerWidth < 760
          ? 8
          : Math.max(0, Math.min(265, window.innerWidth - windowWidth)),
      y: window.innerWidth < 760 ? 80 : 55,
    });

    playOpenSound();
  }

  function closeApp() {
    setOpened(null);
    setMinimized(false);
    setMaximized(false);
    setBrickPlaying(false);
    playSound(270, 0.15, "sine");
  }

  function minimizeApp() {
    setMinimized(true);
    setStartOpen(false);
    playSound(350, 0.08);
  }

  function toggleMaximize() {
    setMaximized((previous) => !previous);
    playSound(720, 0.09, "sine");
  }

  function toggleStartMenu() {
    setStartOpen((previous) => !previous);
    setSettingsOpen(false);
    setRunOpen(false);
    playSound(520, 0.07);
  }

  function pointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (maximized) return;
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    if (
      (event.target as HTMLElement).closest(
        "button, input, select, textarea, a"
      )
    ) {
      return;
    }

    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: position.x,
      top: position.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || maximized) return;

    const width = windowRef.current?.offsetWidth || 690;

    setPosition({
      x: clamp(
        drag.left + event.clientX - drag.x,
        0,
        Math.max(0, window.innerWidth - width)
      ),
      y: clamp(
        drag.top + event.clientY - drag.y,
        40,
        Math.max(40, window.innerHeight - 65)
      ),
    });
  }

  function changeYear(value: number) {
    setYear(clamp(value, 1990, 2020));
    playSound(525, 0.06);
  }

  function toggleFavorite(id: string) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );

    playSound(780, 0.09);
  }

  function careForPet(action: "feed" | "play" | "sleep") {
    if (action === "feed") {
      setPetFood((value) => clamp(value + 20, 0, 100));
      setPetMessage("Yum yum! Thank you! 🍔");
    } else if (action === "play") {
      setPetHappy((value) => clamp(value + 18, 0, 100));
      setPetFood((value) => clamp(value - 8, 0, 100));
      setPetMessage("That was so fun! 🎾");
    } else {
      setPetHappy((value) => clamp(value + 10, 0, 100));
      setPetMessage("Zzz... Feeling refreshed! 💤");
    }

    playSound(740, 0.09);
  }

  function hitBrick(index: number) {
    if (!brickPlaying) return;

    if (index === brickCell) {
      const next = brickScore + 10;
      setBrickScore(next);
      setBrickBest((old) => Math.max(old, next));
      setBrickCell(Math.floor(Math.random() * 25));
      playSound(900, 0.08);
    } else {
      setBrickScore((old) => Math.max(0, old - 5));
      playSound(180, 0.1);
    }
  }

  function runCommand() {
    const command = runValue.trim().toLowerCase();

    const commands: Record<string, AppId> = {
      tv: "simulator",
      "tv.exe": "simulator",
      cable: "simulator",
      cafe: "cafe",
      cybercafe: "cafe",
      games: "parlour",
      parlour: "parlour",
      memories: "bin",
      notepad: "school",
      pet: "pet",
      brick: "brick",
      cartoons: "tv",
      snacks: "snacks",
      bengali: "bengali",
      festivals: "festivals",
    };

    const matchingApp =
      APPS.find(
        (app) =>
          app.filename.toLowerCase() === command ||
          app.name.toLowerCase() === command
      )?.id || commands[command];

    if (matchingApp) {
      setRunValue("");
      openApp(matchingApp);
      return;
    }

    window.alert(
      "Windows cannot find '" +
        runValue +
        "'.\n\nTry: cafe, tv, games, memories, notepad."
    );
  }

  const activeApp = APPS.find((app) => app.id === opened);

  const favoritesCount = useMemo(
    () =>
      indianMemories.filter((memory) =>
        favorites.includes(memory.id)
      ).length,
    [favorites]
  );

  function renderPet() {
    return (
      <div className="win-page pet-page">
        <h2 className="retro-heading">🥚 Virtual Pet 1997</h2>
        <p>Take care of your digital friend!</p>

        <div className="pet-device">
          <div className="pet-screen">
            <div className="pet-status">♥ DIGITAL PET ♥</div>

            <div className="pet-character">
              {petFood < 20 ? "😢" : petHappy > 80 ? "😻" : "🐣"}
            </div>

            <strong>{petName}</strong>
            <small>{petMessage}</small>
          </div>

          <div className="pet-device-buttons">
            <button onClick={() => careForPet("feed")}>
              🍔 Feed
            </button>
            <button onClick={() => careForPet("play")}>
              🎾 Play
            </button>
            <button onClick={() => careForPet("sleep")}>
              💤 Sleep
            </button>
          </div>
        </div>

        <div className="pet-meters">
          <label>Fullness: {petFood}%</label>
          <progress value={petFood} max={100} />
          <label>Happiness: {petHappy}%</label>
          <progress value={petHappy} max={100} />
        </div>

        <div className="year-picker">
          <label htmlFor="pet-name">Pet Name:</label>
          <input
            id="pet-name"
            maxLength={12}
            value={petName}
            onChange={(event) => setPetName(event.target.value)}
          />
        </div>
      </div>
    );
  }

  function renderBrick() {
    return (
      <div className="win-page brick-page">
        <h2 className="retro-heading">🕹️ Brick Game 9999</h2>
        <p>Catch the moving square to score points!</p>

        <div className="brick-machine">
          <div className="brick-stats">
            <span>SCORE: {brickScore}</span>
            <span>BEST: {brickBest}</span>
          </div>

          <div className="brick-display">
            {Array.from({ length: 25 }, (_, index) => (
              <button
                key={index}
                className={
                  brickPlaying && brickCell === index
                    ? "block active-block"
                    : "block"
                }
                onClick={() => hitBrick(index)}
                aria-label={`Grid cell ${index + 1}`}
              />
            ))}
          </div>

          <p>Click the dark square before it moves!</p>

          <button
            className="retro-play"
            onClick={() => {
              if (!brickPlaying) {
                setBrickScore(0);
                setBrickCell(Math.floor(Math.random() * 25));
              }

              setBrickPlaying((previous) => !previous);
              playSound(680);
            }}
          >
            {brickPlaying ? "■ STOP GAME" : "▶ START GAME"}
          </button>
        </div>
      </div>
    );
  }

  function renderApp() {
    if (opened === "simulator") {
      return (
        <IndianTV
          year={year}
          sound={sound}
          onYearChange={changeYear}
        />
      );
    }

    if (opened === "cafe") {
      return <CyberCafe />;
    }

    if (opened === "parlour") {
      return <GamingParlour />;
    }

    if (opened === "pet") {
      return renderPet();
    }

    if (opened === "brick") {
      return renderBrick();
    }

    return (
      <IndianMemories
        key={opened}
        year={year}
        onYearChange={changeYear}
        initialCategory={activeApp?.category}
        savedOnly={opened === "bin"}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  if (!initialized) {
    return (
      <div className="v31-initializing">
        LOADING NOSTALGIA OS...
      </div>
    );
  }

  if (booting) {
    return <RetroStartup onComplete={finishBoot} />;
  }

  return (
    <main
      className={`vault v40-desktop wallpaper-${wallpaper} ${
        crt ? "crt-on" : ""
      }`}
    >
      <div className="vault-topbar">
        <div className="vault-brand">
          ★ NOSTALGIA-90S.VAULT
        </div>

        <div className="marquee-text">
          <span>
            INDIAN CHILDHOOD FLASHBACK ✦
            CYBER CAFÉ ✦ VIDEO GAME PARLOUR ✦
            ORKUT ✦ PUJO ✦ GULLY CRICKET ✦
          </span>
        </div>

        <div className="vault-top-controls">
          <button onClick={() => setCrt((old) => !old)}>
            CRT: {crt ? "ON" : "OFF"}
          </button>

          <button onClick={() => setSound((old) => !old)}>
            ☎ {sound ? "Sound On" : "Muted"}
          </button>
        </div>
      </div>

      <div
        className="desktop"
        onClick={() => {
          if (startOpen) setStartOpen(false);
        }}
      >
        
<button
  type="button"
  className="v44-desktop-shortcut"
  onClick={() => openControlPanel()}
  title="Open Control Panel"
>
  <span>⚙️</span>
  <small>Control Panel</small>
</button>

<DesktopAccessories
  onOpenApp={openApp}
  wallpaper={wallpaper}
  onWallpaperChange={setWallpaper}
  onDisplayProperties={() => {
    setStartOpen(false);
    setSettingsOpen(true);
  }}
/>
        

<ClassicAccessories
  onOpenApp={openApp}
  request={classicRequest}
/>


        
<DraggableIconsV43
  apps={APPS}
  onOpen={openApp}
/>


        {opened && !minimized && (
          <div
            ref={windowRef}
            className={[
              "retro-window",
              ["simulator", "cafe", "parlour"].includes(opened)
                ? "v31-wide-window"
                : "",
              maximized ? "v40-maximized" : "",
            ].join(" ")}
            style={
              maximized
                ? undefined
                : {
                    left: position.x,
                    top: position.y,
                  }
            }
          >
            <div
              className="window-titlebar"
              onPointerDown={pointerDown}
              onPointerMove={pointerMove}
              onPointerUp={() => {
                dragRef.current = null;
              }}
              onLostPointerCapture={() => {
                dragRef.current = null;
              }}
              onDoubleClick={toggleMaximize}
            >
              <div className="window-title">
                <span>{activeApp?.icon}</span>
                <strong>{activeApp?.filename}</strong>
              </div>

              <div className="window-buttons">
                <button
                  onClick={minimizeApp}
                  aria-label="Minimize window"
                  title="Minimize"
                >
                  _
                </button>

                <button
                  onClick={toggleMaximize}
                  aria-label={
                    maximized ? "Restore window" : "Maximize window"
                  }
                  title={maximized ? "Restore" : "Maximize"}
                >
                  {maximized ? "❐" : "□"}
                </button>

                <button
                  onClick={closeApp}
                  aria-label="Close window"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="window-menu">
              <button onClick={() => playSound(480)}>
                File
              </button>
              <button onClick={() => playSound(540)}>
                Edit
              </button>
              <button onClick={() => playSound(610)}>
                View
              </button>

              <button
                onClick={() =>
                  window.alert(
                    "Nostalgia OS V4.0\n\n" +
                    "Windows 98 Desktop Experience\n\n" +
                    "Start Menu, Wallpapers, System Sounds,\n" +
                    "Maximize, Restore and Indian Childhood Memories."
                  )
                }
              >
                Help
              </button>
            </div>

            <div className="window-content">
              {renderApp()}
            </div>

            <div className="window-status">
              <span>{activeApp?.filename}</span>
              <span>INDIA EDITION V4.0 ✓</span>
            </div>
          </div>
        )}

        
      </div>

      {startOpen && (
        <>
          <button
            className="v40-menu-dismiss"
            aria-label="Close Start Menu"
            onClick={() => setStartOpen(false)}
          />

          <div className="v40-start-menu">
            <div className="v40-start-side">
              <span>WINDOWS</span>
              <strong>98</strong>
            </div>

            <div className="v40-menu-items">
              <div className="v40-menu-heading">
                🖥 NOSTALGIA OS V4.0
              </div>

              <div className="v40-menu-group-label">
                PROGRAMS
                </div>
<button
  onClick={() => {
    setStartOpen(false);
    setClassicRequest({
      app: "notepad",
      id: Date.now(),
    });
  }}
>
  📝 Notepad
</button>

<button
  onClick={() => {
    setStartOpen(false);
    setClassicRequest({
      app: "paint",
      id: Date.now(),
    });
  }}
>
  🎨 Paint
</button>

<button
  onClick={() => {
    setStartOpen(false);
    setClassicRequest({
      app: "explorer",
      id: Date.now(),
    });
  }}
>
  📂 File Explorer
</button>

<button onClick={() => openRetroTool("calculator")}>
  🧮 Calculator
</button>

<button onClick={() => openRetroTool("calendar")}>
  📅 Calendar
</button>

<button onClick={() => openControlPanel()}>
  ⚙️ Control Panel
</button>

<button onClick={() => openControlPanel("screensaver")}>
  🌙 Screensaver Settings
</button>



              

              <button onClick={() => openApp("simulator")}>
                📺 Desi Cable TV
              </button>

              <button onClick={() => openApp("cafe")}>
                💻 Cyber Café 2005
              </button>

              <button onClick={() => openApp("parlour")}>
                🎮 Indian Gaming Parlour
              </button>

              <button onClick={() => openApp("bengali")}>
                🎭 Bengali Memories
              </button>

              <button onClick={() => openApp("bin")}>
                📁 My Saved Memories ({favoritesCount})
              </button>

              <div className="v40-menu-separator" />

              
<button
  onClick={() => {
    window.dispatchEvent(
      new Event("nostalgia-reset-icons")
    );
    setStartOpen(false);
  }}
>
  ▦ Arrange Desktop Icons
</button>

              <button
                onClick={() => {
                  setStartOpen(false);
                  setSettingsOpen(true);
                  playSound(650);
                }}
              >
                🎨 Display Properties
              </button>

              <button
                onClick={() => {
                  setStartOpen(false);
                  setRunOpen(true);
                  setRunValue("");
                }}
              >
                🏃 Run...
              </button>
              
<button
  onClick={() => {
    window.location.href = "/about";
  }}
>
  📖 About Nostalgia Vault
</button>

<button
  onClick={() => {
    window.location.href = "/contact";
  }}
>
  ✉️ Contact Us
</button>

<button
  onClick={() => {
    window.location.href = "/privacy-policy";
  }}
>
  🔒 Privacy Policy
</button>

<button
  onClick={() => {
    window.location.href = "/disclaimer";
  }}
>
  ⚠️ Disclaimer
</button>


              

              <div className="v40-menu-separator" />
              

              <button
                onClick={() => {
                  setStartOpen(false);
                  setOpened(null);
                  setBrickPlaying(false);
                  setBooting(true);
                  playSound(270);
                }}
              >
                ⏻ Restart Nostalgia OS
              </button>
            </div>
          </div>
        </>
      )}

      {settingsOpen && (
        <div className="v40-dialog-backdrop">
          <div
            className="v40-settings-window"
            role="dialog"
            aria-modal="true"
            aria-label="Display Properties"
          >
            <div className="v40-dialog-titlebar">
              <strong>🎨 Display Properties</strong>
              <button
                onClick={() => setSettingsOpen(false)}
                aria-label="Close display settings"
              >
                ×
              </button>
            </div>

            <div className="v40-dialog-content">
              <h3>Background</h3>
              <p>
                Choose your Nostalgia OS desktop wallpaper.
              </p>

              <div className={`v40-wallpaper-preview wallpaper-${wallpaper}`}>
                <div className="v40-preview-icon">
                  🖥️
                  <small>My Computer</small>
                </div>
              </div>

              <div className="v40-wallpaper-choices">
                {WALLPAPERS.map((entry) => (
                  <button
                    key={entry.id}
                    className={
                      wallpaper === entry.id ? "selected" : ""
                    }
                    onClick={() => {
                      setWallpaper(entry.id);
                      playSound(610, 0.06);
                    }}
                  >
                    <span
                      className={`v40-wallpaper-swatch wallpaper-${entry.id}`}
                    />
                    <span>
                      <strong>{entry.name}</strong>
                      <small>{entry.description}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="v40-settings-options">
                <label>
                  <input
                    type="checkbox"
                    checked={crt}
                    onChange={(event) => setCrt(event.target.checked)}
                  />
                  CRT Screen Effect
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={sound}
                    onChange={(event) => setSound(event.target.checked)}
                  />
                  System Sounds
                </label>
              </div>

              <div className="v40-dialog-actions">
                <button
                  onClick={() => setSettingsOpen(false)}
                >
                  OK
                </button>

                <button
                  onClick={() => setSettingsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {runOpen && (
        <div className="v40-dialog-backdrop">
          <form
            className="v40-run-window"
            role="dialog"
            aria-modal="true"
            aria-label="Run Program"
            onSubmit={(event) => {
              event.preventDefault();
              runCommand();
            }}
          >
            <div className="v40-dialog-titlebar">
              <strong>🏃 Run</strong>
              <button
                type="button"
                onClick={() => setRunOpen(false)}
                aria-label="Close Run"
              >
                ×
              </button>
            </div>

            <div className="v40-dialog-content">
              <p>
                Type the name of a program to open it.
              </p>

              <label htmlFor="v40-run-input">
                Open:
              </label>

              <input
                id="v40-run-input"
                autoFocus
                value={runValue}
                onChange={(event) =>
                  setRunValue(event.target.value)
                }
                placeholder="cafe"
              />

              <small>
                Examples: cafe, tv, games, memories, bengali
              </small>

              <div className="v40-dialog-actions">
                <button type="submit">OK</button>
                <button
                  type="button"
                  onClick={() => setRunOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      
<RetroToolsV43 request={retroToolRequest} />

<ControlPanelV44
  request={controlPanelRequest}
  wallpaper={wallpaper}
  onWallpaperChange={setWallpaper}
  sound={sound}
  onSoundChange={setSound}
  crt={crt}
  onCrtChange={setCrt}
/>


      <div className="taskbar v40-taskbar">
        <button
          className={`start-button ${startOpen ? "v40-start-active" : ""}`}
          onClick={toggleStartMenu}
          aria-expanded={startOpen}
        >
          <span>🪟</span> Start
        </button>

        {opened && (
          <button
            className={`task-button ${
              !minimized ? "task-active" : ""
            }`}
            onClick={() => {
              setMinimized((old) => !old);
              setStartOpen(false);
              playSound(480, 0.07);
            }}
          >
            {activeApp?.icon} {activeApp?.filename}
          </button>
        )}

        <div className="v40-taskbar-spacer" />

        <button
          className="v40-quick-settings"
          title="Display Properties"
          onClick={() => {
            setSettingsOpen(true);
            setStartOpen(false);
          }}
        >
          🎨
        </button>

        <button
          className="v31-reboot-button"
          onClick={() => {
            setOpened(null);
            setBrickPlaying(false);
            setStartOpen(false);
            setBooting(true);
          }}
          title="Replay startup"
        >
          ↻ Boot
        </button>

        <div
          className="taskbar-clock v40-clock"
          title={clock?.toLocaleDateString("en-IN") ?? ""}
        >
          <span>🔊</span>
          <strong>{clock ? formatClock(clock) : "--:--"}</strong>
        </div>
      </div>
    </main>
  );
}
