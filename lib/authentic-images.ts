
export type AuthenticImage = {
  src: string;
  alt: string;
  credit: string;
  source: string;
};

export const authenticImages: Record<string, AuthenticImage> = {
"snake": {
src: "/images/nokia-3310.jpg",
alt: "Original Nokia 3310 mobile phone",
credit: "Santeri Viinamäki · CC BY-SA 4.0",
source:
"https://commons.wikimedia.org/wiki/File:Nokia_3310_phone.jpg",
},

"cassette": {
src: "/images/audio-cassette.jpg",
alt: "Original compact audio cassette",
credit: "Thegreenj · CC BY-SA 2.5",
source:
"https://commons.wikimedia.org/wiki/File:Compactcassette.jpg",
},

"video-cassette": {
src: "/images/vhs-cassette.jpg",
alt: "Original VHS video cassette",
credit: "Wikimedia Commons · Public domain",
source:
"https://commons.wikimedia.org/wiki/File:VHS_-_Kassette.jpg",
},

"mario": {
src: "/images/nes-console.jpg",
alt: "Nintendo Entertainment System gaming console",
credit: "Evan-Amos · Wikimedia Commons",
source:
"https://commons.wikimedia.org/wiki/File:Nintendo-Entertainment-System-NES-Console-FL.jpg",
},
};

export function getAuthenticImage(id: string): AuthenticImage | null {
  return authenticImages[id] ?? null;
}
