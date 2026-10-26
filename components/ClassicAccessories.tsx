
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import "./ClassicAccessories.css";

export type ClassicApp = "notepad" | "paint" | "explorer";

type Folder = "desktop" | "documents" | "programs";

type Props = {
  onOpenApp: (
    id:
      | "cafe"
      | "parlour"
      | "simulator"
      | "school"
      | "bengali"
      | "bin"
  ) => void;
  request?: {
    app: ClassicApp;
    id: number;
  } | null;
};

const NOTE_KEY = "nostalgia-v42-notepad";

const COLORS = [
  "#000000", "#808080", "#800000", "#ff0000",
  "#808000", "#ffff00", "#008000", "#00ff00",
  "#008080", "#00ffff", "#000080", "#0000ff",
  "#800080", "#ff00ff", "#ffffff", "#c0c0c0",
];

const APPS: {
  id: ClassicApp;
  icon: string;
  title: string;
}[] = [
  { id: "notepad", icon: "📝", title: "Notepad" },
  { id: "paint", icon: "🎨", title: "Paint" },
  { id: "explorer", icon: "📂", title: "File Explorer" },
];

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function saveText(text: string) {
  downloadBlob(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
    "My_Childhood_Notes.txt"
  );
}

export default function ClassicAccessories({
  onOpenApp,
  request,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState<ClassicApp | null>(null);
  const [maximized, setMaximized] = useState(false);

  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [folder, setFolder] = useState<Folder>("desktop");

  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const previousRef = useRef<{ x: number; y: number } | null>(null);


  useEffect(() => {
    setMounted(true);

    try {
      const saved = localStorage.getItem(NOTE_KEY) ?? "";
      setNote(saved);
      setSavedNote(saved);
    } catch {}

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(NOTE_KEY, savedNote);
    } catch {}
  }, [savedNote, loaded]);
  useEffect(() => {
  if (!request) return;
  setOpened(request.app);
  setMaximized(false);
}, [request]);

  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpened(null);
        return;
      }

      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "s" &&
        opened === "notepad"
      ) {
        event.preventDefault();
        setSavedNote(note);
      }
    }

    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [opened, note]);

  
const setupCanvas = useCallback(
  (canvas: HTMLCanvasElement | null) => {
    canvasRef.current = canvas;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  },
  []
);


  function openApp(id: ClassicApp) {
    setOpened(id);
    setMaximized(false);

    if (id === "explorer") setFolder("desktop");
  }

  function openExternal(
    id: Parameters<Props["onOpenApp"]>[0]
  ) {
    setOpened(null);
    onOpenApp(id);
  }

  function canvasPoint(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = event.currentTarget;
    const rectangle = canvas.getBoundingClientRect();

    return {
      x: (event.clientX - rectangle.left) *
        (canvas.width / rectangle.width),
      y: (event.clientY - rectangle.top) *
        (canvas.height / rectangle.height),
    };
  }

  function beginDrawing(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const point = canvasPoint(event);
    drawingRef.current = true;
    previousRef.current = point;

    context.fillStyle = tool === "eraser" ? "#ffffff" : color;
    context.beginPath();
    context.arc(
      point.x,
      point.y,
      brushSize / 2,
      0,
      Math.PI * 2
    );
    context.fill();

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrawing(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current || !previousRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;

    const current = canvasPoint(event);

    context.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    context.lineWidth = tool === "eraser" ? brushSize * 3 : brushSize;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(previousRef.current.x, previousRef.current.y);
    context.lineTo(current.x, current.y);
    context.stroke();

    previousRef.current = current;
  }

  function finishDrawing() {
    drawingRef.current = false;
    previousRef.current = null;
  }

  function clearCanvas() {
    if (!window.confirm("Clear the entire drawing?")) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function downloadImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, "My_90s_Painting.png");
    }, "image/png");
  }

  const notepad = (
    <div className="v42-notepad">
      <div className="v42-notepad-menu">
        <button
          onClick={() => {
            if (note !== savedNote && !window.confirm(
              "Create new file? Unsaved changes will be lost."
            )) return;
            setNote("");
            setSavedNote("");
          }}
        >
          New
        </button>
        <button onClick={() => setSavedNote(note)}>Save</button>
        <button onClick={() => saveText(note)}>Download .txt</button>
      </div>

      <textarea
        aria-label="Notepad text editor"
        spellCheck={false}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Dear Diary,

Today I remembered my school days..."
      />

      <div className="v42-notepad-status">
        <span>
          {note === savedNote ? "Saved locally" : "Unsaved changes"}
        </span>
        <span>{note.length} characters</span>
        <span>UTF-8</span>
      </div>
    </div>
  );

  const paint = (
    <div className="v42-paint">
      <div className="v42-paint-toolbar">
        <button
          className={tool === "brush" ? "active" : ""}
          onClick={() => setTool("brush")}
        >
          ✏️ Pencil
        </button>
        <button
          className={tool === "eraser" ? "active" : ""}
          onClick={() => setTool("eraser")}
        >
          ◻ Eraser
        </button>
        <label>
          Size
          <input
            type="range"
            min={1}
            max={30}
            value={brushSize}
            onChange={(event) => setBrushSize(Number(event.target.value))}
          />
          {brushSize}px
        </label>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={downloadImage}>💾 Save PNG</button>
      </div>

      <div className="v42-colorbar">
        {COLORS.map((value) => (
          <button
            key={value}
            aria-label={`Select color ${value}`}
            title={value}
            className={color === value && tool === "brush" ? "selected" : ""}
            style={{ background: value }}
            onClick={() => {
              setColor(value);
              setTool("brush");
            }}
          />
        ))}

        <input
          type="color"
          title="Custom color"
          aria-label="Custom drawing color"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
            setTool("brush");
          }}
        />
      </div>

      <div className="v42-canvas-scroll">
        <canvas
          ref={setupCanvas}
          width={800}
          height={470}
          onPointerDown={beginDrawing}
          onPointerMove={moveDrawing}
          onPointerUp={finishDrawing}
          onPointerCancel={finishDrawing}
          onLostPointerCapture={finishDrawing}
          aria-label="Paint drawing canvas"
        />
      </div>

      <div className="v42-paint-status">
        800 × 470 · Mouse / Touch Drawing · PNG Export
      </div>
    </div>
  );

  const explorer = (
    <div className="v42-explorer">
      <div className="v42-explorer-toolbar">
        <button
          disabled={folder === "desktop"}
          onClick={() => setFolder("desktop")}
        >
          ◀ Back
        </button>
        <button onClick={() => setFolder("desktop")}>⌂ Desktop</button>
        <span>
          Address: C:\{folder === "desktop"
            ? "Desktop"
            : folder === "documents"
            ? "My Documents"
            : "Program Files"}
        </span>
      </div>

      <div className="v42-explorer-layout">
        <aside>
          <strong>Folders</strong>
          <button onClick={() => setFolder("desktop")}>
            🖥 Desktop
          </button>
          <button onClick={() => setFolder("documents")}>
            📁 My Documents
          </button>
          <button onClick={() => setFolder("programs")}>
            💾 Program Files
          </button>
        </aside>

        <div className="v42-explorer-items">
          {folder === "desktop" && (
            <>
              <button onClick={() => setFolder("documents")}>
                <span>📁</span>My Documents
              </button>
              <button onClick={() => setFolder("programs")}>
                <span>📁</span>Program Files
              </button>
              <button onClick={() => openApp("notepad")}>
                <span>📝</span>Notepad
              </button>
              <button onClick={() => openApp("paint")}>
                <span>🎨</span>Paint
              </button>
              <button onClick={() => openExternal("bin")}>
                <span>📸</span>Memory Box
              </button>
            </>
          )}

          {folder === "documents" && (
            <>
              <button onClick={() => openApp("notepad")}>
                <span>📄</span>My Notes.txt
              </button>
              <button onClick={() => openExternal("cafe")}>
                <span>📁</span>Cyber Café Documents
              </button>
              <button onClick={() => openExternal("school")}>
                <span>📚</span>School Diary
              </button>
              <button onClick={() => openExternal("bengali")}>
                <span>📒</span>Bengali Memories
              </button>
            </>
          )}

          {folder === "programs" && (
            <>
              <button onClick={() => openApp("notepad")}>
                <span>📝</span>Notepad.exe
              </button>
              <button onClick={() => openApp("paint")}>
                <span>🎨</span>Paint.exe
              </button>
              <button onClick={() => openExternal("cafe")}>
                <span>💻</span>CyberCafe.exe
              </button>
              <button onClick={() => openExternal("parlour")}>
                <span>🎮</span>Games.exe
              </button>
              <button onClick={() => openExternal("simulator")}>
                <span>📺</span>DesiCableTV.exe
              </button>
            </>
          )}
        </div>
      </div>

      <div className="v42-explorer-footer">
        Virtual file explorer · Your real computer files are not accessed
      </div>
    </div>
  );

  return (
    <>
      <div className="v42-desktop-shortcuts">
        {APPS.map((app) => (
          <button
            key={app.id}
            className="v42-shortcut"
            title={`Open ${app.title}`}
            onClick={() => openApp(app.id)}
          >
            <span>{app.icon}</span>
            <small>{app.title}</small>
          </button>
        ))}
      </div>

      {mounted && opened && createPortal(
        <div
          className="v42-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpened(null);
            }
          }}
        >
          <div className={`v42-window ${maximized ? "maximized" : ""}`}>
            <div className="v42-titlebar">
              <strong>
                {APPS.find((app) => app.id === opened)?.icon}
                {" "}
                {opened === "notepad"
                  ? "Untitled - Notepad"
                  : opened === "paint"
                  ? "Untitled - Paint"
                  : "Exploring - My Computer"}
              </strong>

              <div>
                <button
                  onClick={() => setMaximized(!maximized)}
                  title={maximized ? "Restore" : "Maximize"}
                  aria-label={maximized ? "Restore window" : "Maximize window"}
                >
                  {maximized ? "❐" : "□"}
                </button>
                <button
                  onClick={() => setOpened(null)}
                  title="Close"
                  aria-label="Close window"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="v42-window-body">
              {opened === "notepad"
                ? notepad
                : opened === "paint"
                ? paint
                : explorer}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
