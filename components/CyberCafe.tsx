
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./CyberCafe.css";

type Page =
  | "home"
  | "orkut"
  | "friends"
  | "communities"
  | "messenger"
  | "documents"
  | "music";

type Connection = "offline" | "connecting" | "online";

type Scrap = {
  id: number;
  author: string;
  text: string;
  date: string;
};

type Note = {
  id: number;
  name: string;
  content: string;
};

type Message = {
  id: number;
  from: "me" | "buddy" | "system";
  text: string;
};

type Website = {
  title: string;
  address: string;
  description: string;
  page: Page;
};

const STORE = "nostalgia-cyber-cafe-complete-v1";

const WEBSITES: Website[] = [
  {
    title: "Orkut — Your Scrapbook",
    address: "www.orkut.com",
    description: "Friends, scraps, fans and old-school communities.",
    page: "orkut",
  },
  {
    title: "Yahoo! Messenger",
    address: "messenger.yahoo.com",
    description: "Chat with your school friend and send a BUZZ.",
    page: "messenger",
  },
  {
    title: "My Documents",
    address: "C:\\My Documents",
    description: "School projects, notes and childhood files.",
    page: "documents",
  },
  {
    title: "Winamp-style Music Player",
    address: "C:\\Program Files\\Music Player",
    description: "Listen to original retro computer melodies.",
    page: "music",
  },
  {
    title: "Orkut Friends",
    address: "www.orkut.com/Friends",
    description: "Remember those school-time friendships.",
    page: "friends",
  },
  {
    title: "Orkut Communities",
    address: "www.orkut.com/Communities",
    description: "Join nostalgic online communities.",
    page: "communities",
  },
];

const INITIAL_SCRAPS: Scrap[] = [
  {
    id: 1,
    author: "School Bestie",
    text: "Hiiii! Kal cyber cafe jabi? :D",
    date: "12 Aug 2007",
  },
  {
    id: 2,
    author: "Old Classmate",
    text: "Happy Friendship Day! Keep scrapping :)",
    date: "23 Sep 2007",
  },
];

const INITIAL_NOTES: Note[] = [
  {
    id: 1,
    name: "School_Project.txt",
    content:
      "MY SCHOOL PROJECT - 2005\n\nTopic: My Favourite Computer\n\nI like computers because I can draw in Paint, play games and explore the internet.",
  },
  {
    id: 2,
    name: "Exam_Routine.txt",
    content:
      "EXAM ROUTINE\n\nMonday - English\nTuesday - Mathematics\nWednesday - Science\nThursday - History\n\nDon't forget the geometry box!",
  },
  {
    id: 3,
    name: "Friendship.txt",
    content:
      "Best friends forever!\n\nLunch break, last bench, slam books, school picnic and our favourite memories.",
  },
];

const BOT_REPLIES = [
  "Hiiiii! Kemon achis? :D",
  "Kal school er por dekha hobe?",
  "Orkut e amar testimonial likhe dis!",
  "BRB... Maa dakche!",
  "Aaj Road Rash khelbi?",
  "Net eto slow keno re?",
  "Tui oi notun mobile ringtone ta peyechis?",
  "School er tiffin e aaj ki chilo?",
  "Yahoo te abar buzz dis na! :P",
];

const BUDDIES = [
  { name: "School Bestie", mood: "Available", icon: "🟢" },
  { name: "Cyber Cafe Friend", mood: "Busy", icon: "🟡" },
  { name: "Last Bench Gang", mood: "Offline", icon: "⚪" },
];

const COMMUNITIES = [
  { name: "I Love My School Days", members: "25,417", icon: "🏫" },
  { name: "90s Indian Childhood", members: "18,092", icon: "📼" },
  { name: "Kolkata & Bengali Friends", members: "8,341", icon: "🎭" },
  { name: "Road Rash Fans", members: "12,706", icon: "🏍️" },
];

const MELODIES = [
  {
    title: "Cyber Cafe Evening",
    subtitle: "Original 8-bit melody",
    notes: [392, 440, 523, 440, 392, 330, 349, 392],
  },
  {
    title: "School Bell Memories",
    subtitle: "Original pixel tune",
    notes: [523, 659, 784, 659, 523, 440, 392, 523],
  },
  {
    title: "Dial-Up Dreams",
    subtitle: "Original synth theme",
    notes: [294, 349, 440, 587, 523, 440, 349, 294],
  },
];

const URLS: Record<Page, string> = {
  home: "http://www.google.co.in/",
  orkut: "http://www.orkut.com/",
  friends: "http://www.orkut.com/Friends",
  communities: "http://www.orkut.com/Communities",
  messenger: "http://messenger.yahoo.com/",
  documents: "C:\\My Documents",
  music: "C:\\Program Files\\RetroPlayer.exe",
};

function displayTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hrs, mins, secs]
    .map((num) => String(num).padStart(2, "0"))
    .join(":");
}

export default function CyberCafe() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("90s Kid");
  const [connection, setConnection] = useState<Connection>("offline");
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const [page, setPage] = useState<Page>("home");
  const [history, setHistory] = useState<Page[]>(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [address, setAddress] = useState(URLS.home);
  const [search, setSearch] = useState("");
  const [resultsQuery, setResultsQuery] = useState("");

  const [scraps, setScraps] = useState<Scrap[]>(INITIAL_SCRAPS);
  const [scrapText, setScrapText] = useState("");
  const [joined, setJoined] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  const [buddy, setBuddy] = useState("School Bestie");
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "system", text: "You are signed in to Messenger." },
    { id: 2, from: "buddy", text: "Hiiii! Kemon achis? :D" },
  ]);

  const [track, setTrack] = useState(0);
  const [playingMusic, setPlayingMusic] = useState(false);

  const audioRef = useRef<AudioContext | null>(null);
  const messageId = useRef(10);
  const scheduledReplies = useRef<ReturnType<typeof setTimeout>[]>([]);
  const chatBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const saved = JSON.parse(raw);
        if (typeof saved.username === "string") {
          setUsername(saved.username.slice(0, 25));
        }
        if (Array.isArray(saved.scraps)) {
          setScraps(
            saved.scraps
              .filter(
                (item: Scrap) =>
                  typeof item.id === "number" &&
                  typeof item.author === "string" &&
                  typeof item.text === "string" &&
                  typeof item.date === "string"
              )
              .slice(0, 100)
          );
        }
        if (Array.isArray(saved.notes)) {
          setNotes(
            saved.notes
              .filter(
                (item: Note) =>
                  typeof item.id === "number" &&
                  typeof item.name === "string" &&
                  typeof item.content === "string"
              )
              .slice(0, 30)
          );
        }
        if (Array.isArray(saved.joined)) {
          setJoined(saved.joined.filter((item: unknown) => typeof item === "string"));
        }
      } else {
        // Migrate the previous cyber cafe profile and scraps.
        const oldName = localStorage.getItem("nostalgia-cafe-profile");
        if (oldName) setUsername(oldName.slice(0, 25));

        const oldScraps = JSON.parse(
          localStorage.getItem("nostalgia-cafe-scraps") || "null"
        );
        if (Array.isArray(oldScraps)) {
          setScraps(
            oldScraps
              .filter((item) => typeof item?.message === "string")
              .map((item) => ({
                id: item.id,
                author: item.author,
                text: item.message,
                date: item.date,
              }))
          );
        }
      }
    } catch {
      // Use demo data if storage is unavailable.
    }

    setLoaded(true);

    return () => {
      scheduledReplies.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(
        STORE,
        JSON.stringify({ username, scraps, notes, joined })
      );
    } catch {}
  }, [loaded, username, scraps, notes, joined]);

  useEffect(() => {
    if (!loggedIn) return;
    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [loggedIn]);

  useEffect(() => {
    if (connection !== "connecting") return;
    const timer = setInterval(() => {
      setProgress((previous) => Math.min(100, previous + 4));
    }, 120);
    return () => clearInterval(timer);
  }, [connection]);

  useEffect(() => {
    if (connection === "connecting" && progress >= 100) {
      setConnection("online");
    }
  }, [connection, progress]);

  const tone = useCallback((frequency: number, duration = 0.14) => {
    if (!soundOn || typeof window === "undefined") return;

    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      if (ctx.state === "suspended") void ctx.resume();

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "square";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.022, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    } catch {
      // Audio is optional.
    }
  }, [soundOn]);

  useEffect(() => {
    if (!playingMusic || !loggedIn) return;

    let noteIndex = 0;
    const timer = setInterval(() => {
      const melody = MELODIES[track];
      tone(melody.notes[noteIndex % melody.notes.length], 0.22);
      noteIndex++;
    }, 300);

    return () => clearInterval(timer);
  }, [playingMusic, loggedIn, track, tone]);

  useEffect(() => {
    if (connection === "connecting" && soundOn) {
      const tones = [350, 450, 620, 920, 400, 1100, 550];
      let index = 0;

      const timer = setInterval(() => {
        tone(tones[index % tones.length], 0.09);
        index++;
      }, 230);

      return () => clearInterval(timer);
    }
  }, [connection, soundOn, tone]);

  useEffect(() => {
    chatBottom.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  function login() {
    if (!username.trim()) return;
    setLoggedIn(true);
    setSeconds(0);
    tone(650, 0.22);
  }

  function logout() {
    setLoggedIn(false);
    setConnection("offline");
    setProgress(0);
    setPlayingMusic(false);
    setPage("home");
    setHistory(["home"]);
    setHistoryIndex(0);
    setAddress(URLS.home);
    tone(280, 0.24);
  }

  function connect() {
    if (connection !== "offline") return;
    setProgress(0);
    setConnection("connecting");
    tone(450);
  }

  function disconnect() {
    setConnection("offline");
    setProgress(0);
    setPlayingMusic(false);
    tone(240);
  }

  function navigate(next: Page) {
    if (connection !== "online" && next !== "documents" && next !== "music") {
      return;
    }

    setPage(next);
    setAddress(URLS[next]);

    const nextHistory = [...history.slice(0, historyIndex + 1), next];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    tone(540, 0.07);
  }

  function travel(delta: number) {
    const next = historyIndex + delta;
    if (next < 0 || next >= history.length) return;

    const nextPage = history[next];
    setHistoryIndex(next);
    setPage(nextPage);
    setAddress(URLS[nextPage]);
  }

  function goAddress() {
    const value = address.trim().toLowerCase();

    if (value.includes("orkut") && value.includes("friends")) navigate("friends");
    else if (value.includes("orkut") && value.includes("communities")) navigate("communities");
    else if (value.includes("orkut")) navigate("orkut");
    else if (value.includes("yahoo") || value.includes("messenger")) navigate("messenger");
    else if (value.includes("music") || value.includes("player")) navigate("music");
    else if (value.includes("documents") || value.startsWith("c:")) navigate("documents");
    else {
      navigate("home");
      setSearch(value);
      setResultsQuery(value);
    }
  }

  function postScrap() {
    const text = scrapText.trim().slice(0, 300);
    if (!text) return;

    setScraps((previous) => [
      {
        id: Date.now(),
        author: username.trim(),
        text,
        date: new Date().toLocaleDateString("en-IN"),
      },
      ...previous,
    ].slice(0, 100));

    setScrapText("");
    tone(720);
  }

  function sendMessage(message = chatText) {
    const text = message.trim().slice(0, 250);
    if (!text || connection !== "online") return;

    const id = ++messageId.current;
    setMessages((previous) => [...previous, { id, from: "me", text }]);
    setChatText("");
    tone(text === "BUZZ!!!" ? 900 : 680);

    const timer = setTimeout(() => {
      const reply =
        BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      const replyId = ++messageId.current;

      setMessages((previous) => [
        ...previous,
        { id: replyId, from: "buddy", text: reply },
      ]);
    }, 900);

    scheduledReplies.current.push(timer);
  }

  function saveNote() {
    if (activeNote === null) return;

    setNotes((previous) =>
      previous.map((note) =>
        note.id === activeNote
          ? { ...note, content: noteDraft.slice(0, 4000) }
          : note
      )
    );
    tone(720);
  }

  function createNote() {
    const id = Date.now();
    const name = `My_Note_${notes.length + 1}.txt`;

    setNotes((previous) => [...previous, { id, name, content: "" }]);
    setActiveNote(id);
    setNoteDraft("");
    tone(610);
  }

  const sessionCost = ((seconds / 3600) * 20).toFixed(2);

  if (!loggedIn) {
    return (
      <div className="xp-login">
        <div className="xp-login-top">NOSTALGIA CYBER CAFÉ 2005</div>
        <div className="xp-login-middle">
          <div className="xp-login-brand">
            <div className="xp-windows-logo">🪟</div>
            <h1>Windows XP</h1>
            <p>Inspired by the classic computer login experience</p>
          </div>
          <div className="xp-login-form">
            <div className="xp-user-icon">👤</div>
            <label htmlFor="xp-username">Cyber Café Guest Name</label>
            <input
              id="xp-username"
              value={username}
              maxLength={25}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="Enter nickname"
            />
            <button onClick={login} disabled={!username.trim()}>
              <span>➜</span> LOG IN
            </button>
            <small>No password or real account required</small>
          </div>
        </div>
        <div className="xp-login-bottom">
          <span>💻 SILICON CYBER CAFÉ · INDIA</span>
          <span>₹20 / HOUR · DEMO SESSION</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cafe-complete">
      <div className="cafe3-header">
        <div>
          <strong>💻 SILICON CYBER CAFÉ</strong>
          <span>INDIA · 2005 · INTERNET • PRINT • SCAN • GAMES</span>
        </div>
        <button onClick={logout}>⏻ LOG OUT</button>
      </div>

      <div className="cafe3-session">
        <span>👤 {username}</span>
        <span>⏱ {displayTime(seconds)}</span>
        <span>₹{sessionCost} demo bill</span>
        <span className={connection === "online" ? "online" : "offline"}>
          ● {connection.toUpperCase()}
        </span>
      </div>

      <div className="cafe3-modem">
        <div>
          <strong>☎ BSNL DIAL-UP MODEM</strong>
          <p>
            {connection === "offline"
              ? "Not connected — dial your internet service provider."
              : connection === "connecting"
              ? `Dialing 172222... Connecting ${progress}%`
              : "Connected at 56.6 Kbps (simulation)."}
          </p>
        </div>
        {connection === "connecting" && (
          <div className="cafe3-progress">
            <div style={{ width: `${progress}%` }} />
          </div>
        )}
        <div className="cafe3-modem-buttons">
          <button onClick={connect} disabled={connection !== "offline"}>
            ☎ CONNECT
          </button>
          <button onClick={disconnect} disabled={connection === "offline"}>
            ✕ DISCONNECT
          </button>
          <label>
            <input
              type="checkbox"
              checked={soundOn}
              onChange={(e) => setSoundOn(e.target.checked)}
            />
            Sound
          </label>
        </div>
      </div>

      <div className="cafe3-ie">
        <div className="cafe3-ie-title">
          🌐 Internet Explorer — Nostalgia Edition
          <span>□ ×</span>
        </div>

        <div className="cafe3-ie-menu">File　 Edit　 View　 Favorites　 Tools　 Help</div>

        <div className="cafe3-toolbar">
          <button disabled={historyIndex === 0} onClick={() => travel(-1)}>
            ◀ Back
          </button>
          <button
            disabled={historyIndex >= history.length - 1}
            onClick={() => travel(1)}
          >
            Forward ▶
          </button>
          <button onClick={() => navigate("home")}>⌂ Home</button>
          <button onClick={() => setResultsQuery(search)}>↻ Refresh</button>
        </div>

        <div className="cafe3-address">
          <label htmlFor="cafe3-url">Address</label>
          <input
            id="cafe3-url"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goAddress()}
          />
          <button onClick={goAddress}>Go ▶</button>
        </div>

        <div className="cafe3-bookmarks">
          <button onClick={() => navigate("home")}>🌐 Home</button>
          <button onClick={() => navigate("orkut")}>👥 Orkut</button>
          <button onClick={() => navigate("messenger")}>💬 Messenger</button>
          <button onClick={() => navigate("documents")}>📁 Documents</button>
          <button onClick={() => navigate("music")}>🎵 Music</button>
        </div>

        <div className="cafe3-webpage">
          {connection !== "online" &&
          !["documents", "music"].includes(page) ? (
            <div className="cafe3-offline">
              <span>🌐</span>
              <h2>Internet Explorer cannot display the webpage</h2>
              <p>You are not connected to the Internet.</p>
              <button onClick={connect}>Connect Now</button>
              <small>Use the BSNL Dial-Up modem above.</small>
            </div>
          ) : page === "home" ? (
            <div className="cafe3-home">
              <div className="cafe3-google">
                <span>G</span><span>o</span><span>o</span>
                <span>g</span><span>l</span><span>e</span>
                <small>India</small>
              </div>
              <p>Search the Indian Internet · Cyber Café 2005</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setResultsQuery(search.trim());
                }}
              >
                <input
                  aria-label="Retro internet search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Orkut, Yahoo, Documents..."
                />
                <button type="submit">Search</button>
              </form>

              <div className="cafe3-directory">
                {WEBSITES.filter((site) =>
                  !resultsQuery ||
                  `${site.title} ${site.description}`
                    .toLowerCase()
                    .includes(resultsQuery.toLowerCase())
                ).map((site) => (
                  <div key={site.address}>
                    <button onClick={() => navigate(site.page)}>
                      {site.title}
                    </button>
                    <small>{site.address}</small>
                    <p>{site.description}</p>
                  </div>
                ))}
                {resultsQuery && !WEBSITES.some((site) =>
                  `${site.title} ${site.description}`
                    .toLowerCase()
                    .includes(resultsQuery.toLowerCase())
                ) && <p>No results in the simulated directory.</p>}
              </div>
            </div>
          ) : page === "orkut" || page === "friends" || page === "communities" ? (
            <div className="cafe3-orkut">
              <header>
                <strong>orkut</strong>
                <span>a little piece of the old internet</span>
              </header>
              <nav>
                <button onClick={() => navigate("orkut")}>Scrapbook</button>
                <button onClick={() => navigate("friends")}>Friends</button>
                <button onClick={() => navigate("communities")}>Communities</button>
              </nav>
              <div className="cafe3-orkut-layout">
                <aside>
                  <div className="cafe3-avatar">🙂</div>
                  <h3>{username}</h3>
                  <p>📍 India</p>
                  <p>♥ Cool · Friendly · Trustworthy</p>
                  <small>Friends: 247</small>
                  <small>Scraps: {scraps.length}</small>
                </aside>

                <section>
                  {page === "orkut" ? (
                    <>
                      <h2>{username}'s scrapbook</h2>
                      <div className="cafe3-orkut-note">
                        Write something your friends will remember!
                      </div>
                      <textarea
                        value={scrapText}
                        onChange={(e) => setScrapText(e.target.value)}
                        maxLength={300}
                        rows={3}
                        placeholder="Hiiii! Remember those school days?"
                        aria-label="Write a scrapbook message"
                      />
                      <button className="cafe3-primary" onClick={postScrap}>
                        POST SCRAP
                      </button>
                      <div className="cafe3-scraps">
                        {scraps.map((scrap) => (
                          <article key={scrap.id}>
                            <strong>{scrap.author}</strong>
                            <small>{scrap.date}</small>
                            <p>{scrap.text}</p>
                          </article>
                        ))}
                      </div>
                    </>
                  ) : page === "friends" ? (
                    <>
                      <h2>My Friends (247)</h2>
                      <p>Some familiar faces from childhood...</p>
                      {BUDDIES.map((item) => (
                        <div className="cafe3-friend" key={item.name}>
                          <span>{item.icon}</span>
                          <strong>{item.name}</strong>
                          <small>{item.mood}</small>
                        </div>
                      ))}
                      <p className="cafe3-muted">
                        Friend count is a nostalgic demo, not real users.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2>My Communities</h2>
                      {COMMUNITIES.map((community) => {
                        const member = joined.includes(community.name);
                        return (
                          <div className="cafe3-community" key={community.name}>
                            <span>{community.icon}</span>
                            <div>
                              <strong>{community.name}</strong>
                              <small>{community.members} demo members</small>
                            </div>
                            <button
                              onClick={() => setJoined((previous) =>
                                member
                                  ? previous.filter((name) => name !== community.name)
                                  : [...previous, community.name]
                              )}
                            >
                              {member ? "Joined ✓" : "Join"}
                            </button>
                          </div>
                        );
                      })}
                    </>
                  )}
                </section>
              </div>
            </div>
          ) : page === "messenger" ? (
            <div className="cafe3-messenger">
              <aside>
                <h3>Y! Messenger</h3>
                <p>🙂 {username}</p>
                <strong>Friends</strong>
                {BUDDIES.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setBuddy(item.name);
                      tone(620);
                    }}
                    className={buddy === item.name ? "active" : ""}
                  >
                    {item.icon} {item.name}
                  </button>
                ))}
              </aside>
              <section>
                <div className="cafe3-chat-title">💬 {buddy}</div>
                <div className="cafe3-chat-messages">
                  {messages.map((message) => (
                    <p key={message.id} className={`from-${message.from}`}>
                      <strong>
                        {message.from === "me" ? username :
                         message.from === "buddy" ? buddy : "System"}:
                      </strong>{" "}
                      {message.text}
                    </p>
                  ))}
                  <div ref={chatBottom} />
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <input
                    aria-label="Chat message"
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    maxLength={250}
                    placeholder="Type a message..."
                  />
                  <button type="submit">SEND</button>
                </form>
                <button
                  className="cafe3-buzz"
                  onClick={() => sendMessage("BUZZ!!!")}
                >
                  ⚡ BUZZ!
                </button>
                <small>Messages are simulated; no one else receives them.</small>
              </section>
            </div>
          ) : page === "documents" ? (
            <div className="cafe3-documents">
              <header>
                <strong>📁 My Documents</strong>
                <button onClick={createNote}>+ New Text File</button>
              </header>
              {activeNote === null ? (
                <div className="cafe3-file-list">
                  {notes.map((note) => (
                    <button
                      key={note.id}
                      onClick={() => {
                        setActiveNote(note.id);
                        setNoteDraft(note.content);
                      }}
                    >
                      <span>📄</span>
                      <strong>{note.name}</strong>
                      <small>Text Document</small>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="cafe3-notepad">
                  <div>
                    <strong>
                      📝 {notes.find((note) => note.id === activeNote)?.name}
                    </strong>
                    <button onClick={() => setActiveNote(null)}>✕ Close</button>
                  </div>
                  <textarea
                    aria-label="Edit text document"
                    value={noteDraft}
                    maxLength={4000}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    rows={11}
                  />
                  <button onClick={saveNote}>💾 Save File</button>
                  <small>Saved locally in this browser.</small>
                </div>
              )}
            </div>
          ) : (
            <div className="cafe3-music">
              <div className="cafe3-winamp">
                <div className="cafe3-winamp-title">♫ RETRO MUSIC PLAYER 2.0</div>
                <div className="cafe3-music-screen">
                  <span>{playingMusic ? "▶ PLAYING" : "■ STOPPED"}</span>
                  <strong>{MELODIES[track].title}</strong>
                  <small>{MELODIES[track].subtitle}</small>
                  <div className="cafe3-equalizer">
                    {Array.from({ length: 15 }, (_, i) => (
                      <i
                        key={i}
                        style={{ height: playingMusic ? `${20 + (i * 17) % 75}%` : "8%" }}
                      />
                    ))}
                  </div>
                </div>
                <div className="cafe3-player-controls">
                  <button onClick={() => setTrack((track + MELODIES.length - 1) % MELODIES.length)}>
                    ◀◀
                  </button>
                  <button onClick={() => setPlayingMusic(true)}>▶</button>
                  <button onClick={() => setPlayingMusic(false)}>■</button>
                  <button onClick={() => setTrack((track + 1) % MELODIES.length)}>
                    ▶▶
                  </button>
                </div>
                <div className="cafe3-tracklist">
                  {MELODIES.map((melody, index) => (
                    <button
                      key={melody.title}
                      className={track === index ? "active" : ""}
                      onClick={() => {
                        setTrack(index);
                        setPlayingMusic(true);
                      }}
                    >
                      {index + 1}. {melody.title}
                    </button>
                  ))}
                </div>
              </div>
              <p>Original synthesized retro tunes. Not Bollywood recordings.</p>
            </div>
          )}
        </div>

        <div className="cafe3-status">
          <span>{connection === "online" ? "✓ Internet Connected" : "Offline / Local Computer"}</span>
          <span>🌐 Simulated Internet Zone</span>
        </div>
      </div>

      <div className="cafe3-bottom">
        <span>🖥 Silicon Cyber Café · Windows XP-inspired experience</span>
        <span>Session: {displayTime(seconds)} · ₹{sessionCost}</span>
      </div>
    </div>
  );
}
