
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Clip = {
  title: string;
  videoId: string;
  description: string;
  source: string;
  era: string;
};

type Channel = {
  id: string;
  name: string;
  icon: string;
  from: number;
  to: number;
  color: string;
  programs: string[];
  clips: Clip[];
  language: "Hindi" | "Bengali" | "Mixed";
  officialUrl?: string;
};

const CHANNELS: Channel[] = [
  {
    id: "dd",
    name: "DD National",
    icon: "📺",
    from: 1990,
    to: 2020,
    color: "#edae51",
    language: "Hindi",
    programs: [
      "Shaktimaan",
      "Byomkesh Bakshi",
      "Flop Show",
      "Rangoli",
      "Chitrahaar",
      "Malgudi Days",
    ],
    clips: [
      {
        title: "Doordarshan During the 1980s",
        videoId: "kjpXlimbJGI",
        description: "Travel back to the golden years of Indian television.",
        source: "Prasar Bharati Archives",
        era: "1980s Archive",
      },
      {
        title: "The Journey of Doordarshan",
        videoId: "B9UGPSZZVHY",
        description: "Historical memories of India's public broadcaster.",
        source: "Prasar Bharati Archives",
        era: "Archive Documentary",
      },
      {
        title: "Shaktimaan — Promo",
        videoId: "uge0Q8NOKng",
        description: "Promotional video associated with the superhero.",
        source: "Shaktimaan Archive",
        era: "90s Nostalgia",
      },
      {
        title: "Byomkesh Bakshi — Ep 12: Kiley Ka Rahasya",
        videoId: "bb-kGfRIpKg",
        description: "A classic detective mystery.",
        source: "Prasar Bharati",
        era: "1993 Series",
      },
      {
        title: "Byomkesh Bakshi — Ep 18: Amrit Ki Maut",
        videoId: "UR7Vcm1G9P4",
        description: "Rajit Kapur as the famous detective.",
        source: "Prasar Bharati",
        era: "1993 Series",
      },
      {
        title: "Byomkesh Bakshi — Ep 13: Chiriya Ghar",
        videoId: "3bTGfpcDvrw",
        description: "Another memorable mystery.",
        source: "Prasar Bharati",
        era: "1993 Series",
      },
      {
        title: "Byomkesh Bakshi — Ep 9: AgniBaan",
        videoId: "NokiooOu6wk",
        description: "Classic Doordarshan detective drama.",
        source: "Prasar Bharati",
        era: "1993 Series",
      },
      {
        title: "Jaspal Bhatti's Flop Show — Ep 10",
        videoId: "tdKmTGIDDyw",
        description: "Classic Indian satirical comedy.",
        source: "Prasar Bharati",
        era: "Classic Comedy",
      },
      {
        title: "Prasar Bharati — 1990s Archive",
        videoId: "zwjLzbr0Dxk",
        description: "A historic recording from the 1990s collection.",
        source: "Prasar Bharati Archives",
        era: "1990s",
      },
      {
        title: "Prasar Bharati — 2000s Archive",
        videoId: "6p75IT4_8xg",
        description: "Recording from the 2000s archival collection.",
        source: "Prasar Bharati Archives",
        era: "2000s",
      },
    ],
  },
  {
    id: "dd-bangla",
    name: "DD Bangla",
    icon: "🐚",
    from: 1992,
    to: 2020,
    color: "#e6a25f",
    language: "Bengali",
    officialUrl: "https://prasarbharati.gov.in/dd-bangla/",
    programs: [
      "পুরোনো বাংলা নাটক",
      "দূরদর্শন কলকাতা",
      "বাংলা সংবাদ",
      "রবীন্দ্রসংগীত",
      "নজরুলগীতি",
      "পয়লা বৈশাখ অনুষ্ঠান",
      "দুর্গাপুজোর বিশেষ অনুষ্ঠান",
    ],
    clips: [],
  },
  {
    id: "zee-bangla",
    name: "Zee Bangla / Alpha Bangla",
    icon: "🎭",
    from: 1999,
    to: 2020,
    color: "#d580c0",
    language: "Bengali",
    officialUrl: "https://www.youtube.com/@zeebangla",
    programs: [
      "এক আকাশের নিচে",
      "বাংলা পারিবারিক ধারাবাহিক",
      "সা রে গা মা পা",
      "বাংলা বিনোদন অনুষ্ঠান",
    ],
    clips: [
      {
        title: "Ek Akasher Neeche — Episode 1",
        videoId: "MADma7Z8DDg",
        description: "এক আকাশের নিচে ধারাবাহিকের প্রথম পর্ব।",
        source: "Zee Bangla Official",
        era: "Classic Bengali Serial",
      },
      {
        title: "Ek Akasher Neeche — Episode 125",
        videoId: "yKQLNjG7AZ0",
        description: "পুরোনো বাংলা পারিবারিক ধারাবাহিকের ১২৫তম পর্ব।",
        source: "Zee Bangla Official",
        era: "Classic Bengali Serial",
      },
    ],
  },
  {
    id: "metro",
    name: "DD Metro",
    icon: "📡",
    from: 1993,
    to: 2003,
    color: "#90c5eb",
    language: "Hindi",
    programs: ["Superhit Muqabla", "90s Entertainment"],
    clips: [],
  },
  {
    id: "cn",
    name: "Cartoon Network India",
    icon: "🎨",
    from: 1995,
    to: 2020,
    color: "#ad94e8",
    language: "Mixed",
    programs: [
      "Dexter's Laboratory",
      "SWAT Kats",
      "Powerpuff Girls",
      "Tom and Jerry",
    ],
    clips: [],
  },
  {
    id: "pogo",
    name: "Pogo India",
    icon: "🏯",
    from: 2004,
    to: 2020,
    color: "#83c77a",
    language: "Hindi",
    programs: ["Takeshi's Castle", "MAD", "Chhota Bheem"],
    clips: [],
  },
  {
    id: "hungama",
    name: "Hungama TV",
    icon: "⚡",
    from: 2004,
    to: 2020,
    color: "#f3ad6a",
    language: "Hindi",
    programs: ["Doraemon", "Shin-chan", "Pokémon"],
    clips: [],
  },
  {
    id: "zee",
    name: "Zee TV",
    icon: "🎤",
    from: 1992,
    to: 2020,
    color: "#e78bb5",
    language: "Hindi",
    programs: ["Antakshari", "Sa Re Ga Ma"],
    clips: [],
  },
];

type Props = {
  year: number;
  sound: boolean;
  onYearChange: (value: number) => void;
};

export default function IndianTV({
  year,
  sound,
  onYearChange,
}: Props) {
  const [power, setPower] = useState(true);
  const [channelId, setChannelId] = useState("dd");
  const [clipIndex, setClipIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(65);
  const [staticEffect, setStaticEffect] = useState(false);
  const [clipSearch, setClipSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState<
    "All" | "Bengali"
  >("All");

  const staticTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  const available = useMemo(
    () =>
      CHANNELS.filter(
        (item) => year >= item.from && year <= item.to
      ),
    [year]
  );

  const channels = useMemo(
    () =>
      available.filter(
        (item) =>
          languageFilter === "All" || item.language === "Bengali"
      ),
    [available, languageFilter]
  );

  const channel =
    channels.find((item) => item.id === channelId) ??
    channels[0] ??
    null;

  const channelIndex = channel
    ? channels.findIndex((item) => item.id === channel.id)
    : 0;

  const clip = channel?.clips[clipIndex] ?? null;

  const filteredClips = useMemo(() => {
    if (!channel) return [];

    const query = clipSearch.trim().toLowerCase();

    return channel.clips
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter(
        (item) =>
          !query ||
          `${item.title} ${item.source} ${item.era}`
            .toLowerCase()
            .includes(query)
      );
  }, [channel, clipSearch]);

  useEffect(() => {
    return () => {
      if (staticTimer.current) clearTimeout(staticTimer.current);
      if (audioContext.current) {
        void audioContext.current.close().catch(() => {});
      }
    };
  }, []);

  function playBeep(frequency = 450) {
    if (!sound || volume === 0) return;

    try {
      if (!audioContext.current) {
        audioContext.current = new AudioContext();
      }

      const ctx = audioContext.current;
      if (ctx.state === "suspended") void ctx.resume();

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(
        frequency,
        ctx.currentTime
      );
      oscillator.frequency.exponentialRampToValueAtTime(
        100,
        ctx.currentTime + 0.16
      );

      gain.gain.setValueAtTime(
        Math.max(0.0001, (volume / 100) * 0.025),
        ctx.currentTime
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.16
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.16);
    } catch {
      // Browser may block audio until user interaction.
    }
  }

  function flash() {
    if (staticTimer.current) clearTimeout(staticTimer.current);

    setStaticEffect(true);
    staticTimer.current = setTimeout(() => {
      setStaticEffect(false);
    }, 340);
  }

  function chooseChannel(id: string) {
    setChannelId(id);
    setClipIndex(0);
    setPlaying(false);
    setClipSearch("");
    setPower(true);
    flash();
    playBeep(720);
  }

  function switchChannel(direction: number) {
    if (!power || channels.length === 0) return;

    const index =
      (channelIndex + direction + channels.length) %
      channels.length;

    chooseChannel(channels[index].id);
  }

  function selectClip(index: number) {
    setClipIndex(index);
    setPlaying(false);
    flash();
    playBeep(600);
  }

  function nextClip() {
    if (!channel || channel.clips.length === 0) return;

    setClipIndex(
      (clipIndex + 1) % channel.clips.length
    );
    setPlaying(false);
    flash();
    playBeep(580);
  }

  function changeYear(value: number) {
    onYearChange(value);
    setClipIndex(0);
    setPlaying(false);
    setClipSearch("");
    flash();
    playBeep(500);
  }

  function changeLanguage(value: "All" | "Bengali") {
    setLanguageFilter(value);
    setClipIndex(0);
    setPlaying(false);
    setClipSearch("");
    flash();
    playBeep(650);
  }

  function togglePower() {
    setPower((previous) => !previous);
    setPlaying(false);
    flash();
    playBeep(180);
  }

  const showVideo = power && playing && Boolean(clip?.videoId);

  return (
    <div className="indian-tv-app">
      <div className="tv-v31-heading">
        <strong>📺 DESI CABLE TV '99</strong>
        <span>INDIA + BENGAL ARCHIVES · V3.4</span>
      </div>

      <div className="tv-v31-year">
        <label htmlFor="archive-tv-year">YEAR:</label>

        <select
          id="archive-tv-year"
          value={year}
          onChange={(event) =>
            changeYear(Number(event.target.value))
          }
        >
          {Array.from(
            { length: 31 },
            (_, index) => 1990 + index
          ).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <span>{channels.length} channels</span>
      </div>

      <div className="old-tabs">
        <button
          className={languageFilter === "All" ? "pressed" : ""}
          onClick={() => changeLanguage("All")}
        >
          🇮🇳 All India
        </button>
        <button
          className={languageFilter === "Bengali" ? "pressed" : ""}
          onClick={() => changeLanguage("Bengali")}
        >
          বাংলা TV
        </button>
      </div>

      <div className="tv-v31-cabinet">
        <div className="tv-v31-brand">
          <span>BHARATVISION</span>
          <span>COLOUR TELEVISION</span>
        </div>

        <div className="tv-v31-bezel">
          <div className="tv-v31-screen tv-real-screen">
            {showVideo && clip ? (
              <iframe
                key={`${channel?.id}-${clip.videoId}`}
                className="real-tv-iframe"
                src={`https://www.youtube-nocookie.com/embed/${clip.videoId}?autoplay=1&playsinline=1&controls=1`}
                title={clip.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : power ? (
              <div
                className="tv-real-placeholder"
                style={{
                  background: `radial-gradient(circle, ${
                    channel?.color ?? "#666"
                  }, #182441 88%)`,
                }}
              >
                <div className="tv-real-station">
                  <span>
                    {channel?.icon} {channel?.name ?? "No Signal"}
                  </span>

                  <strong>
                    CH {String(channelIndex + 1).padStart(2, "0")}
                  </strong>
                </div>

                <div className="tv-real-center">
                  <span className="tv-real-icon">
                    {channel?.icon ?? "📺"}
                  </span>

                  <h3>
                    {clip?.title ??
                      (channel?.id === "dd-bangla"
                        ? "সেই পুরোনো দূরদর্শন বাংলা"
                        : channel?.name ?? "No Signal")}
                  </h3>

                  <p>
                    {clip?.description ??
                      (channel?.language === "Bengali"
                        ? "পুরোনো বাংলা টিভি, নাটক, গান ও শৈশবের স্মৃতি।"
                        : "Remember the golden age of Indian television.")}
                  </p>

                  {clip?.videoId ? (
                    <button
                      className="tv-real-play"
                      onClick={() => setPlaying(true)}
                    >
                      ▶ PLAY ORIGINAL VIDEO
                    </button>
                  ) : (
                    
<div className="tv-real-unavailable">
  {channel?.id === "dd-bangla" ? (
    <div>
      <p>📺 দূরদর্শন বাংলার পুরোনো দিনের স্মৃতি</p>
      <a
        href="https://prasarbharati.gov.in/dd-bangla/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "8px 12px",
          background: "#fff3d5",
          color: "#151515",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        ▶ DD Bangla Official Archive
      </a>
    </div>
  ) : (
    "ORIGINAL VIDEO NOT AVAILABLE"
  )}
</div>

                  )}
                </div>

                <div className="tv-real-footer">
                  <span>YEAR {year}</span>
                  <span>{clip?.source ?? "NOSTALGIA MODE"}</span>
                </div>
              </div>
            ) : (
              <div className="tv-v31-off" />
            )}

            {!showVideo && (
              <>
                <div className="tv-v31-scanlines" />
                <div className="tv-v31-glass" />
                {staticEffect && power && (
                  <div className="tv-v31-static" />
                )}
              </>
            )}
          </div>
        </div>

        <div className="tv-v31-controls">
          <button
            className={`tv-v31-power ${power ? "active" : ""}`}
            onClick={togglePower}
            aria-label={power ? "Turn off TV" : "Turn on TV"}
          >
            ⏻
            <small>POWER</small>
          </button>

          <div className="tv-v31-channels">
            <button
              onClick={() => switchChannel(-1)}
              disabled={!power || channels.length === 0}
            >
              CH −
            </button>

            <div>
              {String(channelIndex + 1).padStart(2, "0")}
            </div>

            <button
              onClick={() => switchChannel(1)}
              disabled={!power || channels.length === 0}
            >
              CH +
            </button>
          </div>

          <div className="tv-v31-volume">
            <label htmlFor="archive-sfx">SFX</label>
            <input
              id="archive-sfx"
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(event) =>
                setVolume(Number(event.target.value))
              }
            />
          </div>
        </div>
      </div>

      <div className="tv-v31-guide">
        <div className="tv-v31-guide-title">
          📡 CHANNEL GUIDE — {year}
        </div>

        <div className="tv-v31-channel-list">
          {channels.map((item, index) => (
            <button
              key={item.id}
              className={channel?.id === item.id ? "selected" : ""}
              onClick={() => chooseChannel(item.id)}
            >
              <span>{item.icon}</span>
              <strong>{item.name}</strong>
              <small>
                {item.clips.length > 0
                  ? `${item.clips.length} clips`
                  : "Memories"}
              </small>
            </button>
          ))}
        </div>

        {power && channel && (
          <div className="tv-real-program-guide">
            <strong>
              {channel.language === "Bengali"
                ? "📺 পুরোনো দিনের অনুষ্ঠানের স্মৃতি"
                : "REMEMBER THESE SHOWS?"}
            </strong>
            <p>{channel.programs.join(" · ")}</p>

            {channel.officialUrl && (
              <p>
                <a
                  href={channel.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official channel / archive ↗
                </a>
              </p>
            )}
          </div>
        )}

        {power && channel && channel.clips.length > 0 && (
          <div className="tv-real-clips">
            <div className="tv-real-clips-heading">
              <strong>📼 ORIGINAL VIDEO ARCHIVE</strong>
              <button onClick={nextClip}>NEXT CLIP ▶</button>
            </div>

            <div className="year-picker">
              <label htmlFor="clip-search">SEARCH:</label>
              <input
                id="clip-search"
                value={clipSearch}
                onChange={(event) =>
                  setClipSearch(event.target.value)
                }
                placeholder="Search TV episodes..."
                style={{ flex: 1, minWidth: 130 }}
              />
            </div>

            {filteredClips.map((item) => (
              <button
                key={`${item.videoId}-${item.originalIndex}`}
                className={
                  item.originalIndex === clipIndex ? "active" : ""
                }
                onClick={() => selectClip(item.originalIndex)}
              >
                <span>📼</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.era} · {item.source}</small>
                </span>
              </button>
            ))}

            {filteredClips.length === 0 && (
              <p>No matching clips found.</p>
            )}

            {clip?.videoId && (
              <p className="tv-real-source">
                <a
                  href={`https://www.youtube.com/watch?v=${clip.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch original video on YouTube ↗
                </a>
              </p>
            )}
          </div>
        )}

        <p className="tv-v31-note">
          Original videos are played using the publisher's YouTube
          embed. Some publishers may restrict embedding. Selecting
          a year simulates the channel era, not an exact historical
          broadcast schedule. Video volume is controlled inside
          YouTube; SFX controls the tuning sounds.
        </p>
      </div>
    </div>
  );
}
