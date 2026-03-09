import { useState, type ReactNode, type FormEvent } from "react";
import { Logo } from "@/components/logo";

const STORAGE_KEY = "pl_auth";
const PASSWORD = "poliliquid2026";

function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function PasswordGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === "1"
  );
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthenticated(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  if (authenticated) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0c0a08]">
      {/* Subtle radial glow behind card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--pl-brand)] opacity-[0.04] blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center w-full max-w-[380px] px-4">
        {/* Logo & branding */}
        <div className="flex items-center gap-2 mb-2">
          <Logo size={32} className="text-[var(--pl-brand-bright)]" />
          <span
            className="text-[22px] font-semibold text-white tracking-[-0.02em]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            polyliquid
          </span>
        </div>

        <p className="text-[13px] text-white/40 mb-8">Private preview</p>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className={cn(
            "w-full flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm shadow-[0_0_80px_-20px_rgba(229,168,35,0.08)]",
            shake && "animate-shake"
          )}
        >
          <label className="text-[13px] font-medium text-white/70">
            Password
          </label>
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder="Enter access password"
            autoFocus
            className={cn(
              "w-full rounded-lg border bg-white/[0.04] px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/25 outline-none transition-colors",
              error
                ? "border-red-500/60"
                : "border-white/[0.08] focus:border-[var(--pl-brand-bright)]/50"
            )}
          />

          {error && (
            <p className="text-[13px] text-red-400/90">Incorrect password</p>
          )}

          <button
            type="submit"
            className="rounded-lg bg-[var(--pl-brand)] px-4 py-2.5 text-[13px] font-semibold text-[#0c0a08] transition-all hover:bg-[var(--pl-brand-bright)] shadow-[0_2px_12px_var(--pl-brand-glow)] hover:shadow-[0_4px_20px_var(--pl-brand-glow-hover)] cursor-pointer"
          >
            Unlock
          </button>
        </form>

        {/* Contact CTA */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-[12px] text-white/30">
            Don't have the password?
          </p>
          <a
            href="https://t.me/Sergey_InC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-white/60 transition-all hover:text-[#29b6f6] hover:border-[#29b6f6]/30 hover:bg-[#29b6f6]/[0.06]"
          >
            <TelegramIcon size={16} />
            Contact us on Telegram
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
