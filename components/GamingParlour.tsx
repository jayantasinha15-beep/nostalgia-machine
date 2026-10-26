
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./GamingParlour.css";

type Game = "bike" | "snake" | "brick";
type Direction = "up" | "down" | "left" | "right";
type Status = "ready" | "playing" | "over" | "paused";

type BikeObject = {
  id: number;
  lane: number;
  y: number;
  kind: "car" | "coin";
};

type Point = { x: number; y: number };

const BEST_KEY = "nostalgia-gaming-parlour-best-v37";
const GRID_SIZE = 15;

const initialSnake: Point[] = [
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 },
];

const initialFood = { x: 10, y: 7 };

const GAMES = [
  {
    id: "bike" as Game,
    icon: "🏍️",
    title: "Gully Bike Racer",
    description: "Dodge traffic, grab coins and survive the highway.",
  },
  {
    id: "snake" as Game,
    icon: "🐍",
    title: "Nokia Snake",
    description: "Eat the pixel food. Don't hit yourself or the wall.",
  },
  {
    id: "brick" as Game,
    icon: "🧱",
    title: "Brick Catcher",
    description: "Catch the glowing square before it changes place.",
  },
];

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function samePoint(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y;
}

function newFood(body: Point[]): Point | null {
  const empty: Point[] = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!body.some((part) => part.x === x && part.y === y)) {
        empty.push({ x, y });
      }
    }
  }

  return empty.length ? empty[rand(empty.length)] : null;
}

export default function GamingParlour() {
  const [game, setGame] = useState<Game>("bike");
  const [status, setStatus] = useState<Status>("ready");
  const [scores, setScores] = useState<Record<Game, number>>({
    bike: 0,
    snake: 0,
    brick: 0,
  });
  const [best, setBest] = useState<Record<Game, number>>({
    bike: 0,
    snake: 0,
    brick: 0,
  });
  const [sound, setSound] = useState(true);

  const [lane, setLane] = useState(1);
  const [bikeObjects, setBikeObjects] = useState<BikeObject[]>([]);
  const [distance, setDistance] = useState(0);
  const [health, setHealth] = useState(3);

  const [snake, setSnake] = useState<Point[]>(initialSnake);
  const [food, setFood] = useState<Point>(initialFood);
  const [snakeDirection, setSnakeDirection] = useState<Direction>("right");

  const [brickCell, setBrickCell] = useState(12);
  const [brickSeconds, setBrickSeconds] = useState(30);

  const scoreRef = useRef(scores);
  const laneRef = useRef(lane);
  const snakeRef = useRef(snake);
  const directionRef = useRef<Direction>("right");
  const nextDirectionRef = useRef<Direction>("right");
  const soundRef = useRef(sound);
  const audioRef = useRef<AudioContext | null>(null);
  const objectsRef = useRef<BikeObject[]>([]);
  const objectIdRef = useRef(0);
  const tickRef = useRef(0);
  const bestRef = useRef(best);

  useEffect(() => { scoreRef.current = scores; }, [scores]);
  useEffect(() => { bestRef.current = best; }, [best]);
  useEffect(() => { laneRef.current = lane; }, [lane]);
  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { soundRef.current = sound; }, [sound]);

  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(BEST_KEY) || "{}");
      setBest({
        bike: Math.max(0, Number(value.bike) || 0),
        snake: Math.max(0, Number(value.snake) || 0),
        brick: Math.max(0, Number(value.brick) || 0),
      });
    } catch {}
  }, []);

  const playTone = useCallback((frequency: number) => {
    if (!soundRef.current) return;

    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      if (ctx.state === "suspended") void ctx.resume();

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001, ctx.currentTime + 0.09
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.09);
    } catch {}
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        void audioRef.current.close().catch(() => {});
      }
    };
  }, []);

  const addScore = useCallback((currentGame: Game, amount: number) => {
    setScores((current) => {
      const next = {
        ...current,
        [currentGame]: current[currentGame] + amount,
      };
      scoreRef.current = next;

      if (next[currentGame] > (bestRef.current[currentGame] ?? 0)) {
        const newBest = {
          ...bestRef.current,
          [currentGame]: next[currentGame],
        };
        bestRef.current = newBest;
        setBest(newBest);
        try {
          localStorage.setItem(BEST_KEY, JSON.stringify(newBest));
        } catch {}
      }
      return next;
    });
  }, []);

  function startGame() {
    setScores((old) => ({ ...old, [game]: 0 }));
    scoreRef.current = { ...scoreRef.current, [game]: 0 };
    setStatus("playing");
    tickRef.current = 0;

    if (game === "bike") {
      laneRef.current = 1;
      setLane(1);
      objectsRef.current = [];
      setBikeObjects([]);
      setDistance(0);
      setHealth(3);
    }

    if (game === "snake") {
      snakeRef.current = [...initialSnake];
      setSnake([...initialSnake]);
      setFood(initialFood);
      directionRef.current = "right";
      nextDirectionRef.current = "right";
      setSnakeDirection("right");
    }

    if (game === "brick") {
      setBrickCell(rand(25));
      setBrickSeconds(30);
    }

    playTone(680);
  }

  function changeGame(next: Game) {
    setGame(next);
    setStatus("ready");
    playTone(480);
  }

  function moveBike(direction: number) {
    if (game !== "bike" || status !== "playing") return;
    setLane((previous) => {
      const next = Math.max(0, Math.min(2, previous + direction));
      laneRef.current = next;
      return next;
    });
    playTone(390);
  }

  const turnSnake = useCallback((direction: Direction) => {
    if (game !== "snake" || status !== "playing") return;

    const opposite: Record<Direction, Direction> = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    if (opposite[directionRef.current] === direction) return;
    nextDirectionRef.current = direction;
  }, [game, status]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      const focused = event.target as HTMLElement | null;
      if (
        focused &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(focused.tagName)
      ) return;

      const key = event.key.toLowerCase();
      const controls = [
        "arrowleft", "arrowright", "arrowup", "arrowdown",
        "w", "a", "s", "d", " ",
      ];

      if (controls.includes(key)) event.preventDefault();

      if (key === " " && !event.repeat) {
        if (status === "ready" || status === "over") startGame();
        else setStatus(status === "playing" ? "paused" : "playing");
      }

      if (game === "bike") {
        if (key === "arrowleft" || key === "a") moveBike(-1);
        if (key === "arrowright" || key === "d") moveBike(1);
      }

      if (game === "snake") {
        const mapped: Record<string, Direction> = {
          arrowup: "up", w: "up",
          arrowdown: "down", s: "down",
          arrowleft: "left", a: "left",
          arrowright: "right", d: "right",
        };
        if (mapped[key]) turnSnake(mapped[key]);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // Keyboard handler uses current render's game and status.
  }, [game, status, turnSnake]);

  /* BIKE RACING LOOP */
  useEffect(() => {
    if (game !== "bike" || status !== "playing") return;

    const timer = setInterval(() => {
      tickRef.current++;

      const moving = objectsRef.current
        .map((object) => ({ ...object, y: object.y + 7 }))
        .filter((object) => object.y < 105);

      if (tickRef.current % 6 === 0) {
        moving.push({
          id: ++objectIdRef.current,
          lane: rand(3),
          y: -12,
          kind: Math.random() < 0.7 ? "car" : "coin",
        });
      }

      let damage = 0;
      let earned = 0;

      const remaining = moving.filter((object) => {
        if (
          object.y >= 78 &&
          object.y <= 91 &&
          object.lane === laneRef.current
        ) {
          if (object.kind === "coin") earned += 25;
          else damage += 1;
          return false;
        }
        return true;
      });

      objectsRef.current = remaining;
      setBikeObjects(remaining);
      setDistance((previous) => previous + 1);

      if (earned) {
        addScore("bike", earned);
        playTone(900);
      }
      if (tickRef.current % 10 === 0) addScore("bike", 5);

      if (damage) {
        setHealth((old) => {
          const next = Math.max(0, old - damage);
          if (next === 0) setStatus("over");
          return next;
        });
        playTone(150);
      }
    }, 120);

    return () => clearInterval(timer);
  }, [game, status, addScore, playTone]);

  /* SNAKE LOOP */
  useEffect(() => {
    if (game !== "snake" || status !== "playing") return;

    const timer = setInterval(() => {
      const nextDirection = nextDirectionRef.current;
      directionRef.current = nextDirection;
      setSnakeDirection(nextDirection);

      const current = snakeRef.current;
      const head = current[0];

      const delta: Record<Direction, Point> = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      };

      const move = delta[nextDirection];
      const nextHead = {
        x: head.x + move.x,
        y: head.y + move.y,
      };
      const eating = samePoint(nextHead, food);

      const checkBody = eating ? current : current.slice(0, -1);

      if (
        nextHead.x < 0 || nextHead.x >= GRID_SIZE ||
        nextHead.y < 0 || nextHead.y >= GRID_SIZE ||
        checkBody.some((part) => samePoint(part, nextHead))
      ) {
        setStatus("over");
        playTone(170);
        return;
      }

      const nextBody = [nextHead, ...current];
      if (!eating) nextBody.pop();

      snakeRef.current = nextBody;
      setSnake(nextBody);

      if (eating) {
        addScore("snake", 10);
        playTone(880);

        const nextFood = newFood(nextBody);
        if (nextFood) setFood(nextFood);
        else setStatus("over");
      }
    }, 180);

    return () => clearInterval(timer);
  }, [game, status, food, addScore, playTone]);

  /* BRICK CATCHER LOOP */
  useEffect(() => {
    if (game !== "brick" || status !== "playing") return;

    const timer = setInterval(() => {
      setBrickSeconds((old) => {
        if (old <= 1) {
          setStatus("over");
          return 0;
        }
        return old - 1;
      });
      setBrickCell(rand(25));
    }, 1000);

    return () => clearInterval(timer);
  }, [game, status]);

  function hitBrick(index: number) {
    if (game !== "brick" || status !== "playing") return;

    if (index === brickCell) {
      addScore("brick", 10);
      setBrickCell(rand(25));
      playTone(850);
    } else {
      playTone(160);
    }
  }

  const activeGame = GAMES.find((item) => item.id === game)!;

  return (
    <div className="parlour">
      <header className="parlour-header">
        <div>
          <strong>🎮 RAJU VIDEO GAME PARLOUR</strong>
          <small>EST. 1998 • COIN OPERATED • HIGH SCORES</small>
        </div>
        <span>₹5 / GAME</span>
      </header>

      <div className="parlour-topline">
        <span>🟢 MACHINE READY</span>
        <label>
          <input
            type="checkbox"
            checked={sound}
            onChange={(event) => setSound(event.target.checked)}
          />
          8-BIT SOUND
        </label>
      </div>

      <div className="parlour-game-picker">
        {GAMES.map((item) => (
          <button
            key={item.id}
            onClick={() => changeGame(item.id)}
            className={game === item.id ? "active" : ""}
          >
            <span>{item.icon}</span>
            <strong>{item.title}</strong>
          </button>
        ))}
      </div>

      <div className="parlour-machine">
        <div className="parlour-machine-title">
          <span>★ ARCADE 1999 ★</span>
          <span>{activeGame.title.toUpperCase()}</span>
        </div>

        <div className="parlour-screen">
          <div className="parlour-scorebar">
            <span>SCORE: {scores[game]}</span>
            <span>HI: {best[game]}</span>
          </div>

          {game === "bike" && (
            <div className="parlour-bike-road">
              <div className="parlour-road-lines" />

              {bikeObjects.map((object) => (
                <div
                  key={object.id}
                  className={`parlour-road-object ${object.kind}`}
                  style={{
                    left: `${(object.lane + 0.5) * (100 / 3)}%`,
                    top: `${object.y}%`,
                  }}
                >
                  {object.kind === "car" ? "🚗" : "🪙"}
                </div>
              ))}

              <div
                className="parlour-player-bike"
                style={{
                  left: `${(lane + 0.5) * (100 / 3)}%`,
                }}
              >
                🏍️
              </div>

              <div className="parlour-bike-hud">
                ❤️ {health} · {distance}m
              </div>
            </div>
          )}

          {game === "snake" && (
            <div className="parlour-snake-grid">
              {Array.from(
                { length: GRID_SIZE * GRID_SIZE },
                (_, index) => {
                  const x = index % GRID_SIZE;
                  const y = Math.floor(index / GRID_SIZE);
                  const isHead = samePoint(snake[0], { x, y });
                  const isBody = snake.some((part) => samePoint(part, { x, y }));
                  const isFood = samePoint(food, { x, y });

                  return (
                    <div
                      key={index}
                      className={
                        isHead ? "snake-cell head" :
                        isBody ? "snake-cell body" :
                        isFood ? "snake-cell food" :
                        "snake-cell"
                      }
                    />
                  );
                }
              )}
            </div>
          )}

          {game === "brick" && (
            <div className="parlour-brick-wrap">
              <div className="parlour-brick-time">
                TIME LEFT: {brickSeconds}s
              </div>
              <div className="parlour-brick-grid">
                {Array.from({ length: 25 }, (_, index) => (
                  <button
                    key={index}
                    className={
                      status === "playing" && index === brickCell
                        ? "parlour-brick-cell active"
                        : "parlour-brick-cell"
                    }
                    onClick={() => hitBrick(index)}
                    aria-label={`Brick ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {status !== "playing" && (
            <div className="parlour-overlay">
              <strong>
                {status === "ready" ? "INSERT COIN" :
                 status === "paused" ? "PAUSED" :
                 "GAME OVER"}
              </strong>
              <p>
                {status === "over"
                  ? `YOUR SCORE: ${scores[game]}`
                  : activeGame.description}
              </p>
              <button
                onClick={() =>
                  status === "paused" ? setStatus("playing") : startGame()
                }
              >
                {status === "paused"
                  ? "▶ RESUME"
                  : status === "over"
                  ? "↻ PLAY AGAIN"
                  : "▶ START GAME"}
              </button>
            </div>
          )}
        </div>

        <div className="parlour-control-panel">
          {game === "bike" ? (
            <>
              <button
                onClick={() => moveBike(-1)}
                disabled={status !== "playing"}
              >
                ◀ LEFT
              </button>
              <button
                onClick={() => moveBike(1)}
                disabled={status !== "playing"}
              >
                RIGHT ▶
              </button>
            </>
          ) : game === "snake" ? (
            <div className="parlour-dpad">
              <button onClick={() => turnSnake("up")}>▲</button>
              <div>
                <button onClick={() => turnSnake("left")}>◀</button>
                <button onClick={() => turnSnake("down")}>▼</button>
                <button onClick={() => turnSnake("right")}>▶</button>
              </div>
            </div>
          ) : (
            <span>TOUCH THE FLASHING SQUARE!</span>
          )}

          <button
            onClick={() => {
              if (status === "ready" || status === "over") startGame();
              else setStatus(status === "playing" ? "paused" : "playing");
            }}
            className="parlour-pause"
          >
            {status === "playing" ? "Ⅱ PAUSE" :
             status === "paused" ? "▶ RESUME" : "▶ START"}
          </button>
        </div>
      </div>

      <div className="parlour-instructions">
        <strong>HOW TO PLAY</strong>
        <p>
          {game === "bike"
            ? "Use ← → or A / D to change lanes. Dodge cars, collect coins. Three hits = game over."
            : game === "snake"
            ? "Use arrow keys / WASD or the on-screen D-pad. Eat food to grow. Avoid walls and your own body."
            : "Click the glowing square before it moves. You have 30 seconds to get the highest score."}
        </p>
        <small>
          Keyboard Space = Start/Pause. Scores are saved only in this browser.
          The ₹5 game price is decorative — no real payment.
        </small>
      </div>
    </div>
  );
}
