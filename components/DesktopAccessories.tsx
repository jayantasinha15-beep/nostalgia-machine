
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./DesktopAccessories.css";

type Accessory = "computer" | "bin" | null;
type Drive = "floppy" | "system" | "cdrom" | null;
type Wallpaper = "teal" | "bliss" | "midnight" | "purple";

type RecycledFile = {
  id: number;
  name: string;
  deletedAt: string;
};

type Props = {
  onOpenApp: (id: "cafe" | "parlour" | "bin") => void;
  wallpaper: Wallpaper;
  onWallpaperChange: (value: Wallpaper) => void;
  onDisplayProperties: () => void;
};

const BIN_KEY = "nostalgia-v41-recycle-bin";

const wallpaperOrder: Wallpaper[] = [
  "teal",
  "bliss",
  "midnight",
  "purple",
];

function ComputerIcon() {
  return (
    <svg viewBox="0 0 48 48" width="42" height="42" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="5" y="3" width="35" height="29" fill="#242424" />
      <rect x="7" y="5" width="31" height="25" fill="#d5d4ca" />
      <rect x="10" y="8" width="25" height="18" fill="#076b85" />
      <rect x="13" y="11" width="19" height="12" fill="#2cb5b6" />
      <rect x="20" y="32" width="6" height="6" fill="#a5a5a5" />
      <rect x="13" y="38" width="20" height="4" fill="#383838" />
      <rect x="5" y="42" width="36" height="4" fill="#c7c7c7" />
      <rect x="31" y="28" width="3" height="2" fill="#42ac45" />
    </svg>
  );
}

function BinIcon({ full }: { full: boolean }) {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" shapeRendering="crispEdges">
      {full && (
        <>
          <rect x="17" y="6" width="9" height="11" fill="#f4bc38" />
          <rect x="24" y="9" width="8" height="9" fill="#72c2a0" />
        </>
      )}
      <rect x="13" y="12" width="25" height="4" fill="#333" />
      <rect x="19" y="9" width="12" height="4" fill="#e0e0e0" />
      <path d="M15 17 L36 17 L33 43 L18 43 Z" fill="#dde9eb" stroke="#363c45" strokeWidth="2" />
      <rect x="20" y="21" width="3" height="17" fill="#91b9d2" />
      <rect x="26" y="21" width="3" height="17" fill="#91b9d2" />
      <rect x="32" y="21" width="2" height="17" fill="#91b9d2" />
    </svg>
  );
}

export default function DesktopAccessories({
  onOpenApp,
  wallpaper,
  onWallpaperChange,
  onDisplayProperties,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState<Accessory>(null);
  const [drive, setDrive] = useState<Drive>(null);
  const [selectedIcon, setSelectedIcon] = useState<Accessory>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [files, setFiles] = useState<RecycledFile[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    setMounted(true);

    try {
      const saved = JSON.parse(localStorage.getItem(BIN_KEY) || "[]");
      if (Array.isArray(saved)) {
        setFiles(
          saved.filter(
            (item): item is RecycledFile =>
              typeof item?.id === "number" &&
              typeof item?.name === "string" &&
              typeof item?.deletedAt === "string"
          ).slice(0, 30)
        );
      }
    } catch {}

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(BIN_KEY, JSON.stringify(files));
    } catch {}
  }, [files, loaded]);

  useEffect(() => {
    const update = () => setClock(new Date().toLocaleDateString("en-IN"));
    update();

    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const rightClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const desktop = target.closest(".v40-desktop .desktop");
      if (!desktop) return;

      if (
        target.closest(
          ".retro-window, .desktop-icon, .v41-accessory-icon, .desktop-right, button, input"
        )
      ) {
        return;
      }

      event.preventDefault();
      setContextMenu({
        x: Math.min(event.clientX, window.innerWidth - 215),
        y: Math.min(event.clientY, window.innerHeight - 270),
      });
    };

    const dismiss = () => setContextMenu(null);

    document.addEventListener("contextmenu", rightClick);
    document.addEventListener("click", dismiss);
    const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") dismiss();
};

window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("contextmenu", rightClick);
      document.removeEventListener("click", dismiss);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function recycleDemoFile() {
    setFiles((old) => [
      {
        id: Date.now(),
        name: `Old_Desktop_Note_${old.length + 1}.txt`,
        deletedAt: new Date().toLocaleString("en-IN"),
      },
      ...old,
    ].slice(0, 30));
    setOpened("bin");
    setContextMenu(null);
  }

  function restoreFile(id: number) {
    setFiles((old) => old.filter((file) => file.id !== id));
  }

  function cycleWallpaper() {
    const index = wallpaperOrder.indexOf(wallpaper);
    onWallpaperChange(
      wallpaperOrder[(index + 1) % wallpaperOrder.length]
    );
    setContextMenu(null);
  }

  function openAccessory(next: Accessory) {
    setOpened(next);
    setDrive(null);
    setSelectedIcon(next);
    setContextMenu(null);
  }

  const body = (
    <>
      {contextMenu && (
        <div
          className="v41-context"
          role="menu"
          style={{ left: Math.max(4, contextMenu.x), top: Math.max(4, contextMenu.y) }}
          onClick={(event) => event.stopPropagation()}
        >
          <button onClick={() => setContextMenu(null)}>↻ Refresh</button>
          <button
            onClick={() => {
              document.querySelector(".desktop")?.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setContextMenu(null);
            }}
          >
            ▦ Arrange Icons
          </button>
          <div className="v41-menu-line" />
          <button onClick={cycleWallpaper}>🎨 Next Wallpaper</button>
          <button
            onClick={() => {
              onDisplayProperties();
              setContextMenu(null);
            }}
          >
            🖥 Display Properties
          </button>
          <div className="v41-menu-line" />
          <button onClick={recycleDemoFile}>📄 New Demo File → Recycle Bin</button>
          <button
            onClick={() => {
              onOpenApp("cafe");
              setContextMenu(null);
            }}
          >
            💻 Open Cyber Café
          </button>
          <button
            onClick={() => {
              onOpenApp("parlour");
              setContextMenu(null);
            }}
          >
            🎮 Open Gaming Parlour
          </button>
        </div>
      )}

      {opened && (
        <div className="v41-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpened(null);
        }}>
          <div className="v41-window" role="dialog" aria-modal="true" aria-label={opened === "computer" ? "My Computer" : "Recycle Bin"}>
            <div className="v41-window-title">
              <strong>{opened === "computer" ? "🖥 My Computer" : "🗑 Recycle Bin"}</strong>
              <button onClick={() => setOpened(null)} aria-label="Close">×</button>
            </div>
            <div className="v41-window-menu">
              <span>File</span><span>Edit</span><span>View</span><span>Help</span>
            </div>
            <div className="v41-window-toolbar">
              <button onClick={() => setDrive(null)} disabled={!drive}>◀ Back</button>
              <button onClick={() => setDrive(null)}>⌂ Up</button>
              <span>{opened === "computer" ? "My Computer" : "Recycle Bin"}</span>
            </div>

            <div className="v41-window-content">
              {opened === "computer" ? (
                <>
                  {!drive ? (
                    <>
                      <p className="v41-explorer-heading">Contents of My Computer</p>
                      <div className="v41-drives">
                        <button onClick={() => setDrive("floppy")}>
                          <span>💾</span>
                          <strong>3½ Floppy (A:)</strong>
                        </button>
                        <button onClick={() => setDrive("system")}>
                          <span>🖥️</span>
                          <strong>Local Disk (C:)</strong>
                        </button>
                        <button onClick={() => setDrive("cdrom")}>
                          <span>💿</span>
                          <strong>CD-ROM (D:)</strong>
                        </button>
                        <button onClick={() => {
                          setOpened(null);
                          onOpenApp("cafe");
                        }}>
                          <span>📁</span>
                          <strong>My Documents</strong>
                        </button>
                      </div>
                    </>
                  ) : drive === "floppy" ? (
                    <div className="v41-drive-detail">
                      <span>💾</span>
                      <h3>3½ Floppy (A:)</h3>
                      <p>Please insert a disk into drive A:</p>
                      <small>This is a simulated floppy drive.</small>
                    </div>
                  ) : drive === "cdrom" ? (
                    <div className="v41-drive-detail">
                      <span>💿</span>
                      <h3>CD-ROM (D:)</h3>
                      <p>No disc inserted.</p>
                      <small>Remember game CDs and music CDs?</small>
                    </div>
                  ) : (
                    <>
                      <p className="v41-explorer-heading">Local Disk (C:)</p>
                      <div className="v41-drives">
                        <button onClick={() => {setOpened(null); onOpenApp("cafe");}}>
                          <span>📁</span>
                          <strong>My Documents</strong>
                        </button>
                        <button onClick={() => {setOpened(null); onOpenApp("parlour");}}>
                          <span>🎮</span>
                          <strong>Program Files</strong>
                        </button>
                        <button onClick={() => {setOpened(null); onOpenApp("bin");}}>
                          <span>📸</span>
                          <strong>Memory Archive</strong>
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="v41-bin-heading">
                    <strong>{files.length} deleted demo item(s)</strong>
                    <button disabled={files.length === 0} onClick={() => setFiles([])}>
                      Empty Recycle Bin
                    </button>
                  </div>
                  {files.length === 0 ? (
                    <div className="v41-empty">
                      <span>🗑️</span>
                      <h3>Recycle Bin is empty</h3>
                      <p>Right-click an empty part of the desktop to create a demo deleted file.</p>
                    </div>
                  ) : (
                    <div className="v41-bin-list">
                      {files.map((file) => (
                        <div key={file.id}>
                          <span>📄</span>
                          <div>
                            <strong>{file.name}</strong>
                            <small>Deleted: {file.deletedAt}</small>
                          </div>
                          <button onClick={() => restoreFile(file.id)}>Restore</button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="v41-window-footer">
              <span>{opened === "computer" ? "Virtual computer · no access to real drives" : "Demo recycle bin · browser storage"}</span>
              <span>{clock}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="v41-accessories">
        <button
          className={`v41-accessory-icon ${selectedIcon === "computer" ? "selected" : ""}`}
          onClick={() => openAccessory("computer")}
        >
          <ComputerIcon />
          <span>My Computer</span>
        </button>
        <button
          className={`v41-accessory-icon ${selectedIcon === "bin" ? "selected" : ""}`}
          onClick={() => openAccessory("bin")}
        >
          <BinIcon full={files.length > 0} />
          <span>Recycle Bin</span>
        </button>
      </div>
      {mounted && createPortal(body, document.body)}
    </>
  );
}
