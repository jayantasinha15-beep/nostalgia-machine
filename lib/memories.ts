export type Category =
  | "Games"
  | "Cartoons"
  | "Technology"
  | "Music"
  | "School"
  | "Lifestyle";

export type Memory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: Category;
  from: number;
  to: number;
  exactYear?: number;
  color: string;
  photo: string;
  photoAlt: string;
};

export const categories: Category[] = [
  "Games",
  "Cartoons",
  "Technology",
  "Music",
  "School",
  "Lifestyle",
];

export const memories: Memory[] = [
  {
    id: "video-cassette",
    title: "VHS Movie Nights",
    description:
      "Renting video cassettes, rewinding tapes and watching movies together with the whole family felt like a weekly celebration.",
    icon: "📼",
    category: "Technology",
    from: 1990,
    to: 2002,
    color: "purple",
    photo:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Video cassette and old media setup",
  },
  {
    id: "cassette",
    title: "Audio Cassette Collection",
    description:
      "Recording songs from FM radio, writing labels by hand and fixing tangled tape with a pencil was a real skill.",
    icon: "📻",
    category: "Music",
    from: 1990,
    to: 2005,
    color: "orange",
    photo:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Audio cassette tapes on a table",
  },
  {
    id: "dd",
    title: "Doordarshan Evenings",
    description:
      "Families gathered in front of the TV and waited patiently for favourite programmes and weekend specials.",
    icon: "📺",
    category: "Lifestyle",
    from: 1990,
    to: 2000,
    color: "blue",
    photo:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Old television in a retro room",
  },
  {
    id: "mario",
    title: "Super Mario",
    description:
      "Jumping over obstacles, collecting coins and sharing turns with siblings or cousins made every session memorable.",
    icon: "🍄",
    category: "Games",
    from: 1990,
    to: 2008,
    color: "red",
    photo:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Retro gaming console and controller",
  },
  {
    id: "brick",
    title: "Brick Game",
    description:
      "That tiny handheld device with falling blocks and mysterious sounds could keep you entertained for hours.",
    icon: "🕹️",
    category: "Games",
    from: 1993,
    to: 2008,
    color: "green",
    photo:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Handheld gaming device",
  },
  {
    id: "school-bell",
    title: "The Last School Bell",
    description:
      "That final bell meant freedom, playground time and a race to the school gate.",
    icon: "🔔",
    category: "School",
    from: 1990,
    to: 2020,
    color: "yellow",
    photo:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
    photoAlt: "School corridor and bell mood",
  },
  {
    id: "tiffin",
    title: "Sharing School Tiffin",
    description:
      "Your own lunch was normal, but your friend’s tiffin always felt more special.",
    icon: "🍱",
    category: "School",
    from: 1990,
    to: 2020,
    color: "orange",
    photo:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Lunch boxes and snacks",
  },
  {
    id: "cricket",
    title: "Gully Cricket",
    description:
      "One bat, one tennis ball, bricks as wickets and unlimited arguments over run-out decisions.",
    icon: "🏏",
    category: "Games",
    from: 1990,
    to: 2020,
    color: "green",
    photo:
      "https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Street cricket scene",
  },
  {
    id: "antakshari",
    title: "Family Antakshari",
    description:
      "Long train journeys, family gatherings and endless singing battles made it unforgettable.",
    icon: "🎤",
    category: "Music",
    from: 1990,
    to: 2015,
    color: "pink",
    photo:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Microphone and music mood",
  },
  {
    id: "windows95",
    title: "Windows 95",
    description:
      "Paint, Solitaire and the excitement of exploring a computer for the first time felt magical.",
    icon: "💻",
    category: "Technology",
    from: 1995,
    to: 2003,
    exactYear: 1995,
    color: "blue",
    photo:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Old desktop computer",
  },
  {
    id: "pokemon",
    title: "Pokémon Mania",
    description:
      "Pikachu, Ash, cards, stickers and endless conversations about favourite Pokémon filled childhood afternoons.",
    icon: "⚡",
    category: "Cartoons",
    from: 2003,
    to: 2015,
    color: "yellow",
    photo:
      "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Colorful toy collection and cartoon vibe",
  },
  {
    id: "shaktimaan",
    title: "Shaktimaan",
    description:
      "India’s own superhero made television weekends feel larger than life.",
    icon: "🦸",
    category: "Cartoons",
    from: 1997,
    to: 2005,
    exactYear: 1997,
    color: "red",
    photo:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Retro television dramatic lighting",
  },
  {
    id: "walkman",
    title: "Walkman Days",
    description:
      "Wired earphones, cassettes and a private world of music wherever you went.",
    icon: "🎧",
    category: "Music",
    from: 1990,
    to: 2004,
    color: "purple",
    photo:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Headphones and retro music player",
  },
  {
    id: "cybercafe",
    title: "Cyber Café Adventures",
    description:
      "Paying by the hour for internet access felt exciting, important and slightly futuristic.",
    icon: "🌐",
    category: "Technology",
    from: 1998,
    to: 2012,
    color: "blue",
    photo:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Computer desk and browsing setup",
  },
  {
    id: "snake",
    title: "Snake on Nokia",
    description:
      "A tiny monochrome screen, physical buttons and an oddly addictive snake game defined mobile fun.",
    icon: "🐍",
    category: "Games",
    from: 1998,
    to: 2011,
    color: "green",
    photo:
      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Old keypad phone in hand",
  },
  {
    id: "harrypotter",
    title: "Harry Potter Fever",
    description:
      "Books, movies and the wish that a Hogwarts letter would arrive one day created a whole generation of dreamers.",
    icon: "🪄",
    category: "Lifestyle",
    from: 2001,
    to: 2015,
    exactYear: 2001,
    color: "purple",
    photo:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Books and magical reading atmosphere",
  },
  {
    id: "beyblade",
    title: "Beyblade Battles",
    description:
      "Three, two, one, let it rip! Every match felt like a championship final.",
    icon: "🌀",
    category: "Games",
    from: 2003,
    to: 2014,
    color: "blue",
    photo:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Toys and battle play atmosphere",
  },
  {
    id: "windowsxp",
    title: "Windows XP",
    description:
      "The green hill wallpaper, the startup sound and family desktop browsing made it iconic.",
    icon: "🖥️",
    category: "Technology",
    from: 2001,
    to: 2014,
    exactYear: 2001,
    color: "green",
    photo:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Desktop computer and keyboard",
  },
  {
    id: "cartoonnetwork",
    title: "Cartoon Network Afternoons",
    description:
      "Rushing home from school to catch cartoons before homework was a serious daily mission.",
    icon: "📺",
    category: "Cartoons",
    from: 1995,
    to: 2015,
    color: "pink",
    photo:
      "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Television and cozy living room vibe",
  },
  {
    id: "doraemon",
    title: "Doraemon's Gadgets",
    description:
      "The Anywhere Door and Take-copter made imagination feel limitless.",
    icon: "🚪",
    category: "Cartoons",
    from: 2005,
    to: 2020,
    color: "blue",
    photo:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Colorful childhood room and toy atmosphere",
  },
  {
    id: "road-rash",
    title: "Road Rash",
    description:
      "Motorbike racing on old PCs gave a wild adrenaline rush far beyond the graphics.",
    icon: "🏍️",
    category: "Games",
    from: 1996,
    to: 2010,
    color: "orange",
    photo:
      "https://images.unsplash.com/photo-1517846693594-1567da72af75?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Gaming setup mood",
  },
  {
    id: "orkut",
    title: "Orkut Scraps",
    description:
      "Testimonials, scraps, communities and profile visits made social networking feel exciting and personal.",
    icon: "💌",
    category: "Technology",
    from: 2004,
    to: 2014,
    exactYear: 2004,
    color: "pink",
    photo:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Friends gathered with laptops and internet vibe",
  },
  {
    id: "youtube",
    title: "YouTube Arrives",
    description:
      "Funny clips, music videos and endless discovery changed internet entertainment forever.",
    icon: "▶️",
    category: "Technology",
    from: 2005,
    to: 2020,
    exactYear: 2005,
    color: "red",
    photo:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Watching video on computer screen",
  },
  {
    id: "mp3",
    title: "MP3 Player Days",
    description:
      "Loaded with downloaded songs, a tiny MP3 player and wired earphones felt premium.",
    icon: "🎵",
    category: "Music",
    from: 2003,
    to: 2014,
    color: "purple",
    photo:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Headphones and portable music setup",
  },
  {
    id: "gtavc",
    title: "GTA Vice City",
    description:
      "Neon streets, radio stations and total freedom on a family computer made it unforgettable.",
    icon: "🌴",
    category: "Games",
    from: 2002,
    to: 2015,
    exactYear: 2002,
    color: "pink",
    photo:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Retro neon city gaming vibe",
  },
  {
    id: "facebook",
    title: "Facebook Era",
    description:
      "Friend requests, pokes, albums and status updates became part of everyday life.",
    icon: "👥",
    category: "Technology",
    from: 2008,
    to: 2020,
    color: "blue",
    photo:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    photoAlt: "People using laptops and social media vibe",
  },
  {
    id: "angrybirds",
    title: "Angry Birds",
    description:
      "Launch, crash, retry, repeat — simple mobile fun became a universal habit.",
    icon: "🐦",
    category: "Games",
    from: 2009,
    to: 2018,
    exactYear: 2009,
    color: "red",
    photo:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Toys and play items on a colorful surface",
  },
  {
    id: "templerun",
    title: "Temple Run",
    description:
      "Swipe, turn, jump and keep running — one more attempt always turned into ten more.",
    icon: "🏃",
    category: "Games",
    from: 2011,
    to: 2020,
    exactYear: 2011,
    color: "orange",
    photo:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Phone gaming in hand",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Groups",
    description:
      "Family groups, good morning images and those blue ticks changed communication forever.",
    icon: "💬",
    category: "Technology",
    from: 2012,
    to: 2020,
    color: "green",
    photo:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Messaging and smartphone communication",
  },
  {
    id: "flappybird",
    title: "Flappy Bird",
    description:
      "A tiny bird and impossible pipes somehow tested the patience of the whole world.",
    icon: "🐤",
    category: "Games",
    from: 2013,
    to: 2016,
    exactYear: 2013,
    color: "yellow",
    photo:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Casual gaming mood",
  },
  {
    id: "jio",
    title: "The Cheap Data Revolution",
    description:
      "Affordable 4G changed how India watched videos, chatted, streamed and lived online.",
    icon: "📶",
    category: "Technology",
    from: 2016,
    to: 2020,
    exactYear: 2016,
    color: "blue",
    photo:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Smartphone and mobile internet use",
  },
  {
    id: "pubg",
    title: "PUBG Mobile",
    description:
      "Squad calls, tactical drops and chasing that chicken dinner created a whole gaming culture.",
    icon: "🎮",
    category: "Games",
    from: 2018,
    to: 2020,
    exactYear: 2018,
    color: "orange",
    photo:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Modern gaming setup",
  },
  {
    id: "lockdown",
    title: "Staying Connected from Home",
    description:
      "Video calls, online classes and indoor routines became a part of life in a very unusual year.",
    icon: "🏠",
    category: "Lifestyle",
    from: 2020,
    to: 2020,
    exactYear: 2020,
    color: "purple",
    photo:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Home desk and online life setup",
  },
];

export const yearNotes: Record<number, string> = {
  1990: "The cassette and television era",
  1991: "A world of tapes and family television",
  1992: "Outdoor games and afternoon cartoons",
  1993: "The magic of old-school entertainment",
  1994: "Before everything went digital",
  1995: "The home computer dream",
  1996: "Consoles, cartoons and playgrounds",
  1997: "The superhero television era",
  1998: "The first taste of mobile gaming",
  1999: "Waiting for the new millennium",
  2000: "Hello, new millennium!",
  2001: "The Windows XP generation",
  2002: "Computer games and cyber cafés",
  2003: "After-school cartoons and games",
  2004: "The social internet begins",
  2005: "The online video revolution",
  2006: "MP3 songs and keypad phones",
  2007: "The mobile world starts changing",
  2008: "Social networking becomes everyday life",
  2009: "Casual mobile games take off",
  2010: "A new smartphone generation",
  2011: "The endless runner era",
  2012: "Mobile messaging becomes a habit",
  2013: "Simple games, endless frustration",
  2014: "A connected digital childhood",
  2015: "Streaming and smartphones everywhere",
  2016: "India's mobile data revolution",
  2017: "Video, memes and mobile-first fun",
  2018: "Squad gaming takes over",
  2019: "The last year before everything changed",
  2020: "The year we stayed home",
};

export const years = Array.from({ length: 31 }, (_, index) => 1990 + index);

export function getMemoriesForYear(year: number) {
  return memories
    .filter((memory) => year >= memory.from && year <= memory.to)
    .sort((a, b) => {
      if (a.exactYear === year && b.exactYear !== year) return -1;
      if (b.exactYear === year && a.exactYear !== year) return 1;
      return a.title.localeCompare(b.title);
    });
}