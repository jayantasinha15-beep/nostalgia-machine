
"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export type RetroTool = "calculator" | "calendar";

type Props = {
  request: { tool: RetroTool; id: number } | null;
};

type Operation = "+" | "-" | "×" | "÷" | null;

const CALENDAR_KEY = "nostalgia-v43-calendar";

function dateKey(year: number, month: number, day: number) {
  return [
    String(year).padStart(4, "0"),
    String(month + 1).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
}

function calculate(a: number, b: number, op: Operation) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

export default function RetroToolsV43({ request }: Props) {
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState<RetroTool | null>(null);

  // Calculator
  const [display, setDisplay] = useState("0");
  const [operand, setOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [fresh, setFresh] = useState(true);
  const [history, setHistory] = useState("");

  // Calendar
  const [today] = useState(() => new Date());
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [memories, setMemories] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const data = JSON.parse(
        localStorage.getItem(CALENDAR_KEY) || "{}"
      );

      if (data && typeof data === "object" && !Array.isArray(data)) {
        setMemories(data);
      }
    } catch {}

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        CALENDAR_KEY,
        JSON.stringify(memories)
      );
    } catch {}
  }, [memories, loaded]);

  useEffect(() => {
    if (!request) return;
    setOpened(request.tool);
  }, [request]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpened(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () =>
      window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function resetCalculator() {
    setDisplay("0");
    setOperand(null);
    setOperation(null);
    setFresh(true);
    setHistory("");
  }

  function inputDigit(digit: string) {
    if (display === "Error") {
      setDisplay(digit === "." ? "0." : digit);
      setFresh(false);
      return;
    }

    if (fresh) {
      setDisplay(digit === "." ? "0." : digit);
      setFresh(false);
      return;
    }

    if (digit === "." && display.includes(".")) return;

    setDisplay((previous) => {
      if (previous === "0" && digit !== ".") return digit;
      if (previous.length > 15) return previous;
      return previous + digit;
    });
  }

  function chooseOperation(next: Operation) {
    const current = Number(display);
    if (!Number.isFinite(current)) return;

    if (operand !== null && operation && !fresh) {
      const result = calculate(operand, current, operation);

      if (!Number.isFinite(result)) {
        setDisplay("Error");
        setOperand(null);
        setOperation(null);
        setFresh(true);
        return;
      }

      setDisplay(String(Number(result.toPrecision(12))));
      setOperand(result);
    } else {
      setOperand(current);
    }

    setOperation(next);
    setHistory(`${display} ${next}`);
    setFresh(true);
  }

  function equals() {
    if (operand === null || !operation) return;

    const current = Number(display);
    const result = calculate(operand, current, operation);

    setHistory(`${operand} ${operation} ${current} =`);
    setDisplay(
      Number.isFinite(result)
        ? String(Number(result.toPrecision(12)))
        : "Error"
    );

    setOperand(null);
    setOperation(null);
    setFresh(true);
  }

  function calculatorAction(value: string) {
    if (/^[0-9.]$/.test(value)) {
      inputDigit(value);
      return;
    }

    if (["+", "-", "×", "÷"].includes(value)) {
      chooseOperation(value as Operation);
      return;
    }

    if (value === "=") {
      equals();
      return;
    }

    if (value === "C") {
      resetCalculator();
      return;
    }

    if (value === "CE") {
      setDisplay("0");
      setFresh(true);
      return;
    }

    if (value === "←") {
      setDisplay((old) =>
        old.length <= 1 || fresh ? "0" : old.slice(0, -1)
      );
      return;
    }

    if (value === "±") {
      setDisplay((old) =>
        String(Number(old) * -1)
      );
      return;
    }

    if (value === "%") {
      const current = Number(display);
      const result =
        operand !== null && operation
          ? (operand * current) / 100
          : current / 100;

      setDisplay(String(result));
      setFresh(false);
      return;
    }

    if (value === "√") {
      const result = Math.sqrt(Number(display));
      setDisplay(Number.isFinite(result) ? String(result) : "Error");
      setFresh(true);
    }
  }

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = useMemo(() => {
    const result: (number | null)[] = [];

    for (let i = 0; i < firstWeekday; i++) {
      result.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      result.push(day);
    }

    while (result.length % 7 !== 0) result.push(null);

    return result;
  }, [firstWeekday, daysInMonth]);

  const selectedKey = dateKey(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );

  const calendarTitle = viewDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  function changeMonth(delta: number) {
    setViewDate((previous) => new Date(
      previous.getFullYear(),
      previous.getMonth() + delta,
      1
    ));
  }

  function chooseDay(day: number) {
    setSelectedDate(new Date(year, month, day));
  }

  function backToToday() {
    const now = new Date();
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  }

  if (!mounted || !opened) return null;

  return createPortal(
    <div
      className="v43-tool-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpened(null);
      }}
    >
      <div
        className={`v43-tool-window ${
          opened === "calendar" ? "v43-calendar-window" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={opened === "calculator" ? "Calculator" : "Calendar"}
      >
        <div className="v43-tool-titlebar">
          <strong>
            {opened === "calculator" ? "🧮 Calculator" : "📅 Calendar"}
          </strong>
          <button onClick={() => setOpened(null)} aria-label="Close">
            ×
          </button>
        </div>

        {opened === "calculator" ? (
          <div className="v43-calculator">
            <div className="v43-calc-menu">View　 Edit　 Help</div>

            <div className="v43-calc-screen">
              <small>{history || "Standard"}</small>
              <strong>{display}</strong>
            </div>

            <div className="v43-calc-grid">
              {[
                "←", "CE", "C", "÷",
                "7", "8", "9", "×",
                "4", "5", "6", "-",
                "1", "2", "3", "+",
                "±", "0", ".", "=",
                "%", "√",
              ].map((value) => (
                <button
                  key={value}
                  className={[
                    "v43-calc-key",
                    ["+", "-", "×", "÷", "="].includes(value)
                      ? "operator"
                      : "",
                    value === "=" ? "equals" : "",
                  ].join(" ")}
                  onClick={() => calculatorAction(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="v43-calc-footer">
              Nostalgia OS · Standard Calculator
            </div>
          </div>
        ) : (
          <div className="v43-calendar">
            <div className="v43-calendar-header">
              <button onClick={() => changeMonth(-1)}>◀</button>
              <strong>{calendarTitle}</strong>
              <button onClick={() => changeMonth(1)}>▶</button>
            </div>

            <div className="v43-calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (weekday) => (
                  <div key={weekday} className="v43-weekday">
                    {weekday}
                  </div>
                )
              )}

              {cells.map((day, index) => {
                if (day === null) {
                  return (
                    <span
                      className="v43-empty-day"
                      key={`blank-${index}`}
                    />
                  );
                }

                const key = dateKey(year, month, day);

                const isToday =
                  today.getFullYear() === year &&
                  today.getMonth() === month &&
                  today.getDate() === day;

                const isSelected = key === selectedKey;
                const hasMemory = Boolean(memories[key]?.trim());

                return (
                  <button
                    key={key}
                    className={[
                      "v43-day",
                      isToday ? "today" : "",
                      isSelected ? "selected" : "",
                    ].join(" ")}
                    onClick={() => chooseDay(day)}
                    title={hasMemory ? "Memory saved" : key}
                  >
                    <span>{day}</span>
                    {hasMemory && <i aria-label="Memory saved" />}
                  </button>
                );
              })}
            </div>

            <div className="v43-calendar-notes">
              <div className="v43-memory-heading">
                <strong>
                  {selectedDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>

                <button onClick={backToToday}>Today</button>
              </div>

              <label htmlFor="v43-memory-text">
                ✏️ Your memory for this day
              </label>

              <textarea
                id="v43-memory-text"
                value={memories[selectedKey] || ""}
                onChange={(event) => {
                  const value = event.target.value;

                  setMemories((previous) => {
                    const next = { ...previous };

                    if (value.trim()) next[selectedKey] = value;
                    else delete next[selectedKey];

                    return next;
                  });
                }}
                placeholder="Write something special about this day..."
                maxLength={2000}
              />

              <small>
                💾 Memories are saved automatically in this browser.
              </small>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
