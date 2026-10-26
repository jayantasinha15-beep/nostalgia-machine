
export type VaultCategory =
  | "TV & Cartoons"
  | "Snacks & Toys"
  | "Gully Games"
  | "Technology"
  | "Music & Movies"
  | "School Days"
  | "Festivals"
  | "Bengali Memories";

export type IndiaMemory = {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: VaultCategory;
  from: number;
  to: number;
  region: "India" | "West Bengal";
  tag: string;
};

type Entry = [
  string, string, string, string,
  VaultCategory, number, number,
  "India" | "West Bengal", string
];

const entries: Entry[] = [
  ["shaktimaan", "Shaktimaan", "🦸", "Sunday television, Gangadhar and the spinning superhero who inspired a generation.", "TV & Cartoons", 1997, 2005, "India", "DD National"],
  ["captain-vyom", "Captain Vyom", "🚀", "A futuristic Indian space adventure that made television feel magical.", "TV & Cartoons", 1998, 2003, "India", "Indian Sci-Fi"],
  ["son-pari", "Son Pari", "🧚", "Fruity and her magical fairy friend made childhood afternoons unforgettable.", "TV & Cartoons", 2000, 2006, "India", "Star Plus"],
  ["shaka-laka-boom-boom", "Shaka Laka Boom Boom", "✏️", "Who did not dream of owning Sanju's magical pencil?", "TV & Cartoons", 2000, 2006, "India", "Magic Pencil"],
  ["hatim", "Hatim", "⚔️", "Fantasy adventures, magical lands and weekend excitement.", "TV & Cartoons", 2003, 2005, "India", "Fantasy TV"],
  ["mowgli", "The Jungle Book — Mowgli", "🐺", "Jungle Jungle Baat Chali Hai became an unforgettable childhood melody.", "TV & Cartoons", 1990, 2005, "India", "Hindi Dub"],
  ["duck-tales", "DuckTales Hindi", "🦆", "Scrooge McDuck and the adventures many Indian kids watched after school.", "TV & Cartoons", 1990, 2005, "India", "Disney"],
  ["dragon-ball", "Dragon Ball Z Hindi", "🔥", "Waiting for Goku to transform and discussing every battle with school friends.", "TV & Cartoons", 2001, 2012, "India", "Anime"],
  ["takeshis-castle", "Takeshi's Castle", "🏯", "The hilarious Hindi commentary made every challenge even funnier.", "TV & Cartoons", 2005, 2015, "India", "Pogo"],
  ["boogie-woogie", "Boogie Woogie", "💃", "Families gathered to watch dancers and energetic performances.", "TV & Cartoons", 1996, 2014, "India", "Dance Show"],
  ["vikram-betaal", "Vikram Aur Betaal", "👑", "The king, the ghost and a mysterious riddle at the end.", "TV & Cartoons", 1990, 2002, "India", "Classic TV"],
  ["malgudi", "Malgudi Days", "🏡", "Swami's world and the charm of stories from small-town India.", "TV & Cartoons", 1990, 2005, "India", "Classic Stories"],

  ["phantom", "Phantom Sweet Cigarettes", "🍬", "Those white sugar sticks in a cigarette-style box from the neighbourhood shop.", "Snacks & Toys", 1990, 2010, "India", "Sweet Memory"],
  ["parle-g", "Parle-G with Chai", "🍪", "Dipping biscuits into tea until one broke and fell into the cup.", "Snacks & Toys", 1990, 2020, "India", "Classic Biscuit"],
  ["poppins", "Poppins", "🌈", "Colourful candies that everyone wanted to share with friends.", "Snacks & Toys", 1990, 2015, "India", "Candy"],
  ["kismi", "Kismi Toffee", "🍮", "That unmistakable elaichi-flavoured toffee.", "Snacks & Toys", 1990, 2015, "India", "Toffee"],
  ["mango-bite", "Mango Bite", "🥭", "One more mango candy from the corner shop!", "Snacks & Toys", 1995, 2015, "India", "Candy"],
  ["rasna", "Rasna", "🥤", "Summer holidays, chilled orange drinks and the familiar Rasna advertisements.", "Snacks & Toys", 1990, 2015, "India", "Summer"],
  ["big-babol", "Big Babol", "🫧", "Competing to blow the biggest bubblegum bubble.", "Snacks & Toys", 1995, 2012, "India", "Bubblegum"],
  ["tazos", "Tazos Collection", "💿", "Collecting tiny discs, trading duplicates and showing off rare ones.", "Snacks & Toys", 1995, 2010, "India", "Collectibles"],
  ["trump-cards", "Cricket Trump Cards", "🃏", "Comparing runs, wickets and player statistics on collectible cards.", "Snacks & Toys", 1990, 2012, "India", "Cards"],

  ["gully-cricket", "Gully Cricket", "🏏", "A brick wicket, tennis ball, one-tip-one-hand and arguments over every run.", "Gully Games", 1990, 2020, "India", "Street Cricket"],
  ["kanche", "Kanche / Goli", "🔵", "Colourful glass marbles and carefully aimed shots in the dirt.", "Gully Games", 1990, 2010, "India", "Marbles"],
  ["lattu", "Lattu", "🌀", "Wrapping a string around the top and watching it spin.", "Gully Games", 1990, 2010, "India", "Spinning Top"],
  ["pitthu", "Pitthu / Seven Stones", "🪨", "Knock down the stones and build them back before getting hit.", "Gully Games", 1990, 2020, "India", "Outdoor"],
  ["chhupan", "Chhupan Chhupai", "🙈", "Hide-and-seek in lanes, terraces and neighbours' courtyards.", "Gully Games", 1990, 2020, "India", "Hide & Seek"],
  ["chor-police", "Chor Police", "👮", "An entire neighbourhood turned into a chase game.", "Gully Games", 1990, 2015, "India", "Outdoor"],
  ["kite-flying", "Kite Fighting", "🪁", "Terrace battles, tangled strings and the shout of victory.", "Gully Games", 1990, 2020, "India", "Kites"],
  ["carrom", "Carrom Board", "🎯", "Family tournaments, striker powder and the perfect queen shot.", "Gully Games", 1990, 2020, "India", "Indoor"],

  ["std-booth", "STD / ISD Booth", "☎️", "Yellow signboards, coin boxes and counting the seconds of a phone call.", "Technology", 1990, 2010, "India", "Telephone"],
  ["bsnl-landline", "Landline Telephone", "📞", "Waiting beside the phone for an important call.", "Technology", 1990, 2012, "India", "Home Phone"],
  ["cyber-cafe", "Cyber Café", "🖥️", "Paying by the hour to check emails, browse Orkut or play PC games.", "Technology", 1998, 2015, "India", "Internet"],
  ["floppy", "Floppy Disk", "💾", "Saving a tiny document on a disk that felt like the future.", "Technology", 1990, 2006, "India", "Computers"],
  ["nokia", "Nokia Keypad Phones", "📱", "Snake, custom ringtones and a battery that seemed to last forever.", "Technology", 1999, 2014, "India", "Mobile"],
  ["orkut", "Orkut Scraps", "💌", "Scrapbooks, testimonials and communities before social media changed.", "Technology", 2004, 2014, "India", "Social Web"],
  ["road-rash", "Road Rash on PC", "🏍️", "Racing bikes at the computer shop or home PC.", "Technology", 1996, 2010, "India", "PC Gaming"],
  ["jio-4g", "Affordable 4G Era", "📶", "The explosion of mobile video watching and affordable internet.", "Technology", 2016, 2020, "India", "Mobile Internet"],

  ["kumar-sanu", "Kumar Sanu & Alka Yagnik", "🎤", "Romantic Hindi film songs playing from audio cassette players.", "Music & Movies", 1990, 2005, "India", "Bollywood"],
  ["udit", "Udit Narayan", "🎵", "The familiar voice behind so many beloved film songs.", "Music & Movies", 1990, 2010, "India", "Playback"],
  ["lucky-ali", "Lucky Ali", "🎸", "Indi-pop music and the memories of O Sanam.", "Music & Movies", 1996, 2012, "India", "Indi-Pop"],
  ["kk", "KK's Music", "🎧", "Songs that followed us from school to college.", "Music & Movies", 1999, 2020, "India", "Music"],
  ["chitrahaar", "Chitrahaar", "📺", "Waiting for film songs on Doordarshan.", "Music & Movies", 1990, 2010, "India", "DD Music"],
  ["rangoli", "Rangoli", "🌼", "Sunday morning film songs and family television time.", "Music & Movies", 1990, 2020, "India", "Sunday TV"],
  ["cassette", "Bollywood Cassette Mixtape", "📼", "Recording favourite tracks and rewinding with a pencil.", "Music & Movies", 1990, 2007, "India", "Cassette"],

  ["natraj", "Natraj Pencil & Eraser", "✏️", "Sharpening pencils until they were too short to hold.", "School Days", 1990, 2020, "India", "Stationery"],
  ["geometry", "Geometry Box", "📐", "The compass, divider and mysterious instruments we rarely used.", "School Days", 1990, 2020, "India", "Stationery"],
  ["brown-cover", "Brown Paper Book Covers", "📚", "Covering new textbooks and writing names on white labels.", "School Days", 1990, 2020, "India", "School Ritual"],
  ["tiffin", "Sharing Tiffin", "🍱", "Aloo paratha, luchi, sandwiches and food exchanges at lunch break.", "School Days", 1990, 2020, "India", "Lunch Break"],
  ["school-bell", "Last School Bell", "🔔", "Running out of the classroom to meet friends after school.", "School Days", 1990, 2020, "India", "School Life"],
  ["slam-book", "Slam Book", "📖", "Favourite colour, best friend, secret crush and memorable messages.", "School Days", 1995, 2015, "India", "Friendship"],

  ["diwali", "Diwali Holidays", "🪔", "Lights, sweets, family gatherings and festive evenings.", "Festivals", 1990, 2020, "India", "Festival"],
  ["holi", "Holi with Friends", "🎨", "Colours, water balloons and playing all afternoon.", "Festivals", 1990, 2020, "India", "Festival"],
  ["rakhi", "Raksha Bandhan", "🎀", "Rakhi, sweets, family photographs and gifts.", "Festivals", 1990, 2020, "India", "Festival"],
  ["independence", "Independence Day at School", "🇮🇳", "Flag hoisting, patriotic songs and little paper flags.", "Festivals", 1990, 2020, "India", "School Celebration"],

  ["gopal-bhar", "Gopal Bhar", "👑", "The clever court jester whose humorous stories delighted Bengali families.", "Bengali Memories", 1990, 2020, "West Bengal", "Bengali Stories"],
  ["nonte-fonte", "Nonte Fonte", "📚", "Narayan Debnath's unforgettable hostel adventures and comic mischief.", "Bengali Memories", 1990, 2020, "West Bengal", "Bengali Comics"],
  ["batul", "Bantul the Great", "💪", "The super-strong Bengali comic hero with a big heart.", "Bengali Memories", 1990, 2020, "West Bengal", "Bengali Comics"],
  ["handa-bhonda", "Handa Bhonda", "😄", "Classic comic-book pranks and humour.", "Bengali Memories", 1990, 2020, "West Bengal", "Bengali Comics"],
  ["anandamela", "Anandamela & Shuktara", "📖", "Reading stories and comics during holidays and long afternoons.", "Bengali Memories", 1990, 2020, "West Bengal", "Magazines"],
  ["durga-puja", "Durga Puja Pandal Hopping", "🏮", "New clothes, crowded pandals, lights, dhaak and late-night outings.", "Bengali Memories", 1990, 2020, "West Bengal", "Pujo"],
  ["ghugni", "Ghugni at School", "🥣", "A plate of spicy ghugni after school or during a local fair.", "Bengali Memories", 1990, 2020, "West Bengal", "Street Food"],
  ["saraswati", "Saraswati Puja", "🌼", "Yellow clothes, school decorations and meeting friends.", "Bengali Memories", 1990, 2020, "West Bengal", "Festival"],
  ["poila", "Poila Boishakh", "🎊", "New calendars, sweets and the Bengali New Year atmosphere.", "Bengali Memories", 1990, 2020, "West Bengal", "New Year"],
];

export const indianMemories: IndiaMemory[] = entries.map(
  ([id, title, icon, description, category, from, to, region, tag]) => ({
    id, title, icon, description, category, from, to, region, tag,
  })
);

export function getIndianMemories(
  year: number,
  category?: VaultCategory
): IndiaMemory[] {
  return indianMemories.filter(
    (item) =>
      year >= item.from &&
      year <= item.to &&
      (!category || item.category === category)
  );
}
