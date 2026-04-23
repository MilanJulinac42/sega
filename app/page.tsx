import Header from "@/components/Header";
import PlacesSection from "@/components/PlacesSection";
import ProposeDate from "@/components/ProposeDate";
import FloatingDecor from "@/components/FloatingDecor";
import HuggingCats from "@/components/HuggingCats";
import { IdentityProvider } from "@/components/IdentityProvider";
import IdentityGate from "@/components/IdentityGate";
import IdentityBadge from "@/components/IdentityBadge";

export default function Home() {
  return (
    <IdentityProvider>
      <IdentityGate>
        <main className="min-h-screen relative">
          <FloatingDecor />
          <IdentityBadge />
          <Header />

          <div className="mx-auto max-w-6xl px-6 pb-24 space-y-16">
            <HuggingCats />
            <PlacesSection />
            <ProposeDate />

            <footer className="text-center text-sm text-rose-700/60 pt-8 border-t border-rose-100">
              <div className="text-2xl mb-2 space-x-2">
                <span className="butterfly inline-block">🦋</span>
                <span className="flower-spin">🌸</span>
                <span>🐱</span>
                <span className="flower-spin">🌷</span>
                <span className="butterfly inline-block">🦋</span>
              </div>
              Napravljeno sa 💗 u Novom Sadu · Miki & Tea
              <br />
              <a
                href="https://instagram.com/karfioluzemljihumusa"
                target="_blank"
                rel="noreferrer"
                className="text-rose-500/80 hover:text-rose-600 transition"
              >
                @karfioluzemljihumusa
              </a>
            </footer>
          </div>
        </main>
      </IdentityGate>
    </IdentityProvider>
  );
}
