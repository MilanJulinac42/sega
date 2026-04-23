export type Category = "restoran" | "svirka" | "setnja" | "kafa" | "aktivnost";

export type Place = {
  id: string;
  name: string;
  category: Category;
  area: string;
  description: string;
  emoji: string;
  priceLevel: 1 | 2 | 3;
  votes: { me: 0 | 1 | -1; her: 0 | 1 | -1 };
  comments: { author: "me" | "her"; text: string; date: string }[];
  tags: string[];
  lat?: number | null;
  lng?: number | null;
};

export const categoryMeta: Record<
  Category,
  { label: string; emoji: string; color: string }
> = {
  restoran: { label: "Restorani", emoji: "🍝", color: "from-rose-400 to-rose-600" },
  svirka: { label: "Svirke & koncerti", emoji: "🎶", color: "from-fuchsia-400 to-rose-500" },
  setnja: { label: "Šetnje", emoji: "🌿", color: "from-emerald-400 to-teal-500" },
  kafa: { label: "Kafe & poslastice", emoji: "☕", color: "from-amber-400 to-rose-400" },
  aktivnost: { label: "Aktivnosti", emoji: "✨", color: "from-violet-400 to-fuchsia-500" },
};

export const places: Place[] = [
  {
    id: "1",
    name: "Project 72 Wine & Deli",
    category: "restoran",
    area: "Centar",
    description:
      "Intimni restoran sa degustacijom vina i sezonskim menijem. Savršeno za svečaniju večeru.",
    emoji: "🍷",
    priceLevel: 3,
    votes: { me: 1, her: 0 },
    comments: [
      { author: "me", text: "Čuo sam da imaju neverovatno crveno vino.", date: "pre 2 dana" },
    ],
    tags: ["romantično", "vino", "večera"],
  },
  {
    id: "2",
    name: "Fish i Zeleniš",
    category: "restoran",
    area: "Dunavski park",
    description: "Riba, plodovi mora i lagana atmosfera pored parka.",
    emoji: "🐟",
    priceLevel: 2,
    votes: { me: 0, her: 1 },
    comments: [],
    tags: ["riba", "lagano"],
  },
  {
    id: "3",
    name: "Fabrika",
    category: "svirka",
    area: "Centar",
    description: "Uvek dobra atmosfera, često sviraju domaći bendovi uživo.",
    emoji: "🎸",
    priceLevel: 1,
    votes: { me: 1, her: 1 },
    comments: [
      { author: "her", text: "Hoću ovde sledeći petak ako sviraju neki dobri 💃", date: "juče" },
    ],
    tags: ["živa muzika", "petak", "provod"],
  },
  {
    id: "4",
    name: "SKCNS Fabrika",
    category: "svirka",
    area: "Bulevar despota Stefana",
    description: "Alternativna scena, indie i rok koncerti.",
    emoji: "🥁",
    priceLevel: 1,
    votes: { me: 0, her: 0 },
    comments: [],
    tags: ["indie", "rok"],
  },
  {
    id: "5",
    name: "Šetnja po Petrovaradinu",
    category: "setnja",
    area: "Petrovaradinska tvrđava",
    description:
      "Zalazak sunca sa tvrđave, pogled na Dunav i grad. Klasika koja ne dosadi.",
    emoji: "🌅",
    priceLevel: 1,
    votes: { me: 1, her: 1 },
    comments: [
      { author: "me", text: "Ovo mi je omiljeno mesto u celom Novom Sadu.", date: "pre nedelju dana" },
    ],
    tags: ["zalazak", "pogled", "besplatno"],
  },
  {
    id: "6",
    name: "Kamenički park",
    category: "setnja",
    area: "Sremska Kamenica",
    description: "Miran park, savršen za dugu šetnju i razgovor.",
    emoji: "🌳",
    priceLevel: 1,
    votes: { me: 0, her: 0 },
    comments: [],
    tags: ["priroda", "mir"],
  },
  {
    id: "7",
    name: "Kafeterija",
    category: "kafa",
    area: "Zmaj Jovina",
    description: "Dobra kafa, kolači i prijatna atmosfera u samom centru.",
    emoji: "☕",
    priceLevel: 1,
    votes: { me: 1, her: 0 },
    comments: [],
    tags: ["popodne", "kolači"],
  },
  {
    id: "8",
    name: "Poslastičarnica Kuglof",
    category: "kafa",
    area: "Dunavska",
    description: "Najbolji kolači u gradu. Probaj njihov čizkejk.",
    emoji: "🍰",
    priceLevel: 1,
    votes: { me: 0, her: 1 },
    comments: [
      { author: "her", text: "Čizkejk je must!!", date: "pre 3 dana" },
    ],
    tags: ["slatko", "must"],
  },
  {
    id: "9",
    name: "Vožnja čamcem po Dunavu",
    category: "aktivnost",
    area: "Štrand",
    description: "Iznajmljivanje čamca ili brodica na zalazak. Ekstra iskustvo.",
    emoji: "⛵",
    priceLevel: 2,
    votes: { me: 1, her: 0 },
    comments: [],
    tags: ["avantura", "leto"],
  },
  {
    id: "10",
    name: "Escape room Novi Sad",
    category: "aktivnost",
    area: "Centar",
    description: "Rešavanje zagonetki u paru — test ekipe 😉",
    emoji: "🧩",
    priceLevel: 2,
    votes: { me: 0, her: 0 },
    comments: [],
    tags: ["zabava", "kiša-plan"],
  },
];
