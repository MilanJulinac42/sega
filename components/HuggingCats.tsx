import Image from "next/image";

export default function HuggingCats() {
  return (
    <section className="relative flex flex-col items-center py-8">
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-x-10 inset-y-6 rounded-[50%] bg-rose-200/40 blur-3xl -z-10" />

        <span className="cat-heart absolute left-1/2 -translate-x-1/2 top-0 text-2xl z-10">
          💗
        </span>
        <span
          className="cat-heart absolute left-[35%] top-4 text-lg z-10"
          style={{ animationDelay: "0.9s" }}
        >
          💕
        </span>
        <span
          className="cat-heart absolute right-[32%] top-8 text-base z-10"
          style={{ animationDelay: "1.8s" }}
        >
          💖
        </span>

        <div className="relative w-full cats-breathe">
          <Image
            src="/cats.png"
            alt="Miki i Tea"
            width={1400}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <p className="mt-2 text-sm italic text-rose-700/70">nas dvoje 🐾</p>
    </section>
  );
}
