
"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Point = { x: number; y: number };

type IconItem<T extends string> = {
  id: T;
  name: string;
  icon: string;
};

type Props<T extends string> = {
  apps: IconItem<T>[];
  onOpen: (id: T) => void;
  onResetRegister?: (reset: () => void) => void;
};

const DESKTOP_KEY = "nostalgia-v43-icon-layout";
const MOBILE_KEY = "nostalgia-v46-mobile-icon-order";

const CELL_X = 103;
const CELL_Y = 87;
const START_X = 12;
const START_Y = 8;

function defaultPosition(index: number): Point {
  return {
    x: START_X + (index % 3) * CELL_X,
    y: START_Y + Math.floor(index / 3) * CELL_Y,
  };
}

export default function DraggableIconsV43<T extends string>({
  apps,
  onOpen,
  onResetRegister,
}: Props<T>) {
  const [desktopPositions, setDesktopPositions] = useState<
    Record<string, Point>
  >({});

  const [mobileOrder, setMobileOrder] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  const layerRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<Record<string, Point>>({});
  const mobileOrderRef = useRef<string[]>([]);
  const suppressClickRef = useRef(false);

  const dragRef = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    moved: boolean;
    mobile: boolean;
  } | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");

    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    try {
      const savedDesktop = JSON.parse(
        localStorage.getItem(DESKTOP_KEY) || "{}"
      );

      if (
        savedDesktop &&
        typeof savedDesktop === "object" &&
        !Array.isArray(savedDesktop)
      ) {
        const valid: Record<string, Point> = {};

        for (const app of apps) {
          const point = savedDesktop[app.id];

          if (
            point &&
            Number.isFinite(point.x) &&
            Number.isFinite(point.y)
          ) {
            valid[app.id] = {
              x: Math.max(0, point.x),
              y: Math.max(0, point.y),
            };
          }
        }

        positionsRef.current = valid;
        setDesktopPositions(valid);
      }
    } catch {}

    try {
      const savedMobile = JSON.parse(
        localStorage.getItem(MOBILE_KEY) || "[]"
      );

      if (Array.isArray(savedMobile)) {
        const ids = apps.map((app) => app.id);

        const valid = [
          ...savedMobile.filter(
            (id): id is string =>
              typeof id === "string" && ids.includes(id as T)
          ),
          ...ids.filter((id) => !savedMobile.includes(id)),
        ];

        const unique = [...new Set(valid)];

        mobileOrderRef.current = unique;
        setMobileOrder(unique);
      }
    } catch {}
  }, [apps]);

  useEffect(() => {
    function resetLayout() {
      positionsRef.current = {};
      mobileOrderRef.current = [];

      setDesktopPositions({});
      setMobileOrder([]);
      setSelected(null);

      try {
        localStorage.removeItem(DESKTOP_KEY);
        localStorage.removeItem(MOBILE_KEY);
      } catch {}
    }

    onResetRegister?.(resetLayout);

    window.addEventListener("nostalgia-reset-icons", resetLayout);

    return () => {
      window.removeEventListener(
        "nostalgia-reset-icons",
        resetLayout
      );
    };
  }, [onResetRegister]);

  function saveDesktop(next: Record<string, Point>) {
    positionsRef.current = next;
    setDesktopPositions(next);

    try {
      localStorage.setItem(DESKTOP_KEY, JSON.stringify(next));
    } catch {}
  }

  function saveMobile(next: string[]) {
    mobileOrderRef.current = next;
    setMobileOrder(next);

    try {
      localStorage.setItem(MOBILE_KEY, JSON.stringify(next));
    } catch {}
  }

  function reorderMobile(sourceId: string, targetId: string) {
    if (sourceId === targetId) return;

    const base = mobileOrderRef.current.length
      ? [...mobileOrderRef.current]
      : apps.map((app) => app.id);

    const sourceIndex = base.indexOf(sourceId);
    const targetIndex = base.indexOf(targetId);

    if (sourceIndex < 0 || targetIndex < 0) return;

    base.splice(sourceIndex, 1);
    base.splice(targetIndex, 0, sourceId);

    saveMobile(base);
  }

  function startDrag(
    event: ReactPointerEvent<HTMLButtonElement>,
    id: string,
    index: number
  ) {
    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    event.stopPropagation();

    const point =
      desktopPositions[id] ?? defaultPosition(index);

    dragRef.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialX: point.x,
      initialY: point.y,
      moved: false,
      mobile: isMobile,
    };

    suppressClickRef.current = false;
    setSelected(id);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(
    event: ReactPointerEvent<HTMLButtonElement>
  ) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (!drag.moved && Math.hypot(dx, dy) < 8) return;

    drag.moved = true;
    setDragging(drag.id);

    if (drag.mobile) {
      // Mobile uses grid reordering, not free positioning.
      return;
    }

    const layer = layerRef.current;
    const maxX = Math.max(
      0,
      (layer?.clientWidth || window.innerWidth) - 94
    );

    const point = {
      x: Math.max(
        0,
        Math.min(maxX, drag.initialX + dx)
      ),
      y: Math.max(0, drag.initialY + dy),
    };

    // Keep the latest position available on pointer-up.
    positionsRef.current = {
      ...positionsRef.current,
      [drag.id]: point,
    };

    setDesktopPositions(positionsRef.current);
  }

  function endDrag(
    event: ReactPointerEvent<HTMLButtonElement>
  ) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    if (drag.moved) {
      suppressClickRef.current = true;

      if (drag.mobile) {
        const target = document
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest("[data-v46-icon-id]");

        const targetId = target?.getAttribute(
          "data-v46-icon-id"
        );

        if (targetId) {
          reorderMobile(drag.id, targetId);
        }
      } else {
        saveDesktop({ ...positionsRef.current });
      }
    }

    dragRef.current = null;
    setDragging(null);

    if (
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  }

  const order = mobileOrder.length
    ? mobileOrder
    : apps.map((app) => app.id);

  return (
    <div
      ref={layerRef}
      className="v43-icon-layer"
    >
      {apps.map((app, index) => {
        const point =
          desktopPositions[app.id] ??
          defaultPosition(index);

        const mobileIndex = order.indexOf(app.id);

        return (
          <button
            key={app.id}
            type="button"
            data-v46-icon-id={app.id}
            className={[
              "v43-desktop-icon",
              selected === app.id
                ? "v43-icon-selected"
                : "",
              dragging === app.id
                ? "v43-icon-dragging"
                : "",
            ].join(" ")}
            style={{
              left: point.x,
              top: point.y,
              order: mobileIndex < 0 ? index : mobileIndex,
            }}
            title={app.name}
            onPointerDown={(event) =>
              startDrag(event, app.id, index)
            }
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={(event) => {
              dragRef.current = null;
              setDragging(null);

              if (
                event.currentTarget.hasPointerCapture(
                  event.pointerId
                )
              ) {
                event.currentTarget.releasePointerCapture(
                  event.pointerId
                );
              }
            }}
            onClick={(event) => {
              event.stopPropagation();

              if (suppressClickRef.current) {
                suppressClickRef.current = false;
                return;
              }

              setSelected(app.id);
              onOpen(app.id);
            }}
          >
            <span className="v43-icon-image">
              {app.icon}
            </span>
            <span className="v43-icon-label">
              {app.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
