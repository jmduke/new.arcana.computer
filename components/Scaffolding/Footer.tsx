const FOOTER_STRINGS = [
  "𝑺𝑬𝑬 𝒀𝑶𝑼 𝑺𝑷𝑨𝑪𝑬 𝑪𝑶𝑾𝑩𝑶𝒀...",
  "Thank you and be well.",
  "𝑫𝑶 𝒀𝑶𝑼 𝑯𝑨𝑽𝑬 𝑨 𝑪𝑶𝑴𝑹𝑨𝑫𝑬?",
  "𝒀𝑶𝑼'𝑹𝑬 𝑮𝑶𝑵𝑵𝑨 𝑪𝑨𝑹𝑹𝒀 𝑻𝑯𝑨𝑻 𝑾𝑬𝑰𝑮𝑯𝑻",
  "I hope you're wearing your favorite sweater.",
  "You deserve a high five.",
];

const sample = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

const Footer = () => (
  <div className="max-w-prose mx-auto text-center text-gray-700 py-10">
    © 2022 Justin Duke • {sample(FOOTER_STRINGS)}
  </div>
);

export default Footer;