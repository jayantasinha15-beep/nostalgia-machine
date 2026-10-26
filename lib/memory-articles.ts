import { memoryArticlesV53 } from "./memory-articles-v53";
export type MemorySection = {
  heading: string;
  paragraphs: string[];
};

export type MemoryArticle = {
  slug: string;
  title: string;
  category: string;
  emoji: string;
  description: string;
  intro: string;
  keywords: string[];
  sections: MemorySection[];
};

export const memoryArticles: MemoryArticle[] = [
  {
    slug: "shaktimaan",
    title: "Shaktimaan: The Superhero of Indian Childhood",
    category: "90s Indian Television",
    emoji: "🦸",
    description:
      "Remember Shaktimaan, the legendary Indian television superhero, and the childhood excitement surrounding his adventures.",
    intro:
      "For many Indian children growing up in the 1990s and early 2000s, Shaktimaan was more than a television superhero. He was part of weekend routines, playground conversations and countless childhood memories.",
    keywords: [
      "Shaktimaan nostalgia",
      "Shaktimaan old TV show",
      "90s Indian superhero",
      "Indian childhood memories",
    ],
    sections: [
      {
        heading: "A Superhero Who Felt Close to Home",
        paragraphs: [
          "Long before streaming services became part of everyday entertainment, families often gathered around a television at a scheduled time to watch their favourite programmes.",
          "Shaktimaan stood out because he was an Indian superhero with stories, characters and messages that felt familiar to his audience.",
          "For young viewers, the excitement was not only about superpowers. It was also about waiting for the next adventure and discussing it with friends afterwards.",
        ],
      },
      {
        heading: "The Magic of Television in the 90s",
        paragraphs: [
          "Watching television used to be a shared activity. Missing an episode could mean waiting for a repeat or hearing the story from friends at school.",
          "Many children remember sitting close to the television, rushing through homework and making sure they were ready before a favourite programme began.",
          "The anticipation made each episode feel like an event.",
        ],
      },
      {
        heading: "The Messages Behind the Adventures",
        paragraphs: [
          "Alongside its action and fantasy, Shaktimaan became associated with lessons about honesty, responsibility and doing the right thing.",
          "Those messages helped make the programme memorable for audiences who watched it during their childhood.",
        ],
      },
      {
        heading: "Why We Still Remember Shaktimaan",
        paragraphs: [
          "Sometimes all it takes is a familiar character, a theme tune or an old television clip to bring back an entire afternoon from childhood.",
          "For many people, remembering Shaktimaan also means remembering the room they watched it in, the friends they discussed it with and a time when entertainment felt wonderfully simple.",
        ],
      },
    ],
  },
  {
    slug: "son-pari",
    title: "Son Pari: A Magical Memory from Childhood",
    category: "2000s Indian Television",
    emoji: "🧚",
    description:
      "Revisit the magical world of Son Pari, a beloved Indian children's fantasy television series.",
    intro:
      "Son Pari brought fantasy, friendship and imagination into the homes of many Indian children. Its magical world remains a familiar part of early-2000s television nostalgia.",
    keywords: [
      "Son Pari nostalgia",
      "Son Pari TV show",
      "2000s Indian cartoons and shows",
      "childhood fantasy television",
    ],
    sections: [
      {
        heading: "When Television Felt Magical",
        paragraphs: [
          "Children's television once offered imaginative worlds that could turn an ordinary afternoon into an adventure.",
          "Son Pari captured that feeling through its fantasy setting, memorable characters and stories about friendship and kindness.",
          "For viewers who grew up watching it, the programme often brings back memories of school holidays and family television time.",
        ],
      },
      {
        heading: "A World of Imagination",
        paragraphs: [
          "The appeal of a fantasy series is that everyday problems can suddenly become part of something extraordinary.",
          "Son Pari encouraged viewers to imagine a world where magic and friendship existed alongside ordinary childhood experiences.",
        ],
      },
      {
        heading: "The Childhood TV Routine",
        paragraphs: [
          "Before on-demand streaming, children usually watched whatever was scheduled on television.",
          "Finishing schoolwork, waiting for a favourite show and talking about its characters the next morning were all part of the experience.",
        ],
      },
      {
        heading: "Why Son Pari Still Feels Special",
        paragraphs: [
          "Nostalgia is not always about remembering an entire story. Sometimes it is about a character, a moment or the feeling of being young enough to believe in magic.",
          "That is why Son Pari remains a meaningful childhood memory for many viewers.",
        ],
      },
    ],
  },
  {
    slug: "cyber-cafe-2005",
    title: "Cyber Café 2005: India's Early Internet Memories",
    category: "Retro Technology",
    emoji: "💻",
    description:
      "Remember Indian cyber cafés, slow internet connections, Yahoo Messenger, Orkut and the excitement of using the early web.",
    intro:
      "Before smartphones made the internet available almost everywhere, a visit to the neighbourhood cyber café could be an exciting adventure. For many Indian teenagers, it was their first experience of the online world.",
    keywords: [
      "Indian cyber cafe nostalgia",
      "cyber cafe 2005",
      "Orkut memories",
      "Yahoo Messenger India",
      "old internet memories",
    ],
    sections: [
      {
        heading: "The Cyber Café Experience",
        paragraphs: [
          "Rows of desktop computers, bulky monitors, keyboards and the sound of clicking mice created a distinctive atmosphere.",
          "Visitors often paid for a limited session. Every minute mattered when browsing, chatting or checking an email account.",
          "For students without a computer or an internet connection at home, the cyber café was a doorway into a completely new world.",
        ],
      },
      {
        heading: "Yahoo Messenger and Online Friends",
        paragraphs: [
          "Instant messaging introduced a different kind of conversation: colourful usernames, status messages, emoticons and the excitement of seeing a friend online.",
          "Waiting for someone to appear on a contact list could feel as exciting as receiving a letter.",
        ],
      },
      {
        heading: "The Orkut Era",
        paragraphs: [
          "Orkut became a memorable social-networking experience for many young internet users in India.",
          "Scrapbooks, communities, profiles and testimonials made the online world feel personal and social.",
          "Long before today's social media feeds, visiting someone's profile or receiving a new scrapbook message was a small event worth celebrating.",
        ],
      },
      {
        heading: "Slow Connections, Big Excitement",
        paragraphs: [
          "Internet access was often slower and less predictable than it is today.",
          "Pages could take time to load, large downloads required patience, and a limited browsing session encouraged visitors to choose carefully what they wanted to do.",
          "Yet the novelty of the experience made even simple online activities memorable.",
        ],
      },
      {
        heading: "Remembering the Early Internet",
        paragraphs: [
          "Modern internet access is faster and more convenient, but the early cyber café era had its own atmosphere.",
          "For many people, those first online conversations and discoveries remain tied to unforgettable childhood and teenage memories.",
        ],
      },
    ],
  },
  {
    slug: "bengali-childhood",
    title: "Bengali Childhood Memories: School, Para and Pujo",
    category: "Bengali Nostalgia",
    emoji: "🏏",
    description:
      "A nostalgic journey through Bengali childhood memories: para cricket, school tiffin, Durga Puja, television and neighbourhood friendships.",
    intro:
      "Growing up in Bengal came with a collection of everyday experiences: playing in the para, sharing tiffin at school, counting the days until Pujo and spending evenings with neighbourhood friends.",
    keywords: [
      "Bengali childhood nostalgia",
      "90s Bengali childhood",
      "para cricket",
      "Durga Puja childhood memories",
      "school tiffin nostalgia",
    ],
    sections: [
      {
        heading: "Para Cricket and Evening Games",
        paragraphs: [
          "For many children, the neighbourhood lane or an open field doubled as a playground.",
          "A bat, a ball and a few friends were enough to start an exciting match. Rules changed depending on the space, and arguments about whether someone was out were part of the fun.",
          "Outdoor games created friendships that often lasted far beyond the final over.",
        ],
      },
      {
        heading: "School Days and Tiffin Breaks",
        paragraphs: [
          "School memories are filled with crowded classrooms, notebooks, pencil boxes and the anticipation of the tiffin bell.",
          "Sharing food with classmates, preparing for annual functions and looking forward to the last period of the day made ordinary school routines memorable.",
        ],
      },
      {
        heading: "The Excitement of Durga Puja",
        paragraphs: [
          "For many Bengali families, Durga Puja was one of the most eagerly awaited times of the year.",
          "New clothes, pandal visits, festive lights, food and meeting friends created an atmosphere that was difficult to match.",
          "Part of the magic was the excitement building long before the celebrations actually began.",
        ],
      },
      {
        heading: "Television, Comics and Rainy Afternoons",
        paragraphs: [
          "Childhood entertainment could mean reading comics, watching a favourite television programme or inventing indoor games during a rainy afternoon.",
          "Power cuts, family gatherings and simple household routines have also become distinctive nostalgia for many people.",
        ],
      },
      {
        heading: "The Memories That Stay With Us",
        paragraphs: [
          "What makes childhood special is often not an expensive toy or a grand occasion, but the ordinary moments shared with people around us.",
          "A familiar street, a school bell or a festive evening can bring back memories of an entire chapter of life.",
        ],
      },
    ],
  },
    ...memoryArticlesV53,
];

export function getMemoryArticle(slug: string) {
  return memoryArticles.find(
    (article) => article.slug === slug
  );
}
