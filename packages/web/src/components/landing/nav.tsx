import { NavLink } from "react-router";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";

export function Nav() {
  const { mode, toggle } = useTheme();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[13px] font-medium px-3.5 py-1.5 rounded-md transition-colors ${
      isActive ? "text-text-1 bg-surface" : "text-dim hover:text-text-1"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-13 bg-[var(--navy)]/85 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-2.5">
        <NavLink to="/" className="font-mono text-[13px] font-bold text-text-1 no-underline">polyliquid</NavLink>
        <span className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded bg-brand/12 text-brand-bright uppercase tracking-wide">
          v1.0
        </span>
      </div>

      <div className="flex gap-0.5">
        <NavLink to="/" className={linkClass} end>Home</NavLink>
        <NavLink to="/vaults" className={linkClass}>Vaults</NavLink>
        <NavLink to="/activity" className={linkClass}>Activity</NavLink>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="flex items-center justify-center w-8 h-8 rounded-md border border-border text-text-2 hover:text-text-1 hover:border-border-bright transition-colors cursor-pointer"
          aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <Button className="bg-brand hover:bg-brand/90 text-primary-foreground text-[12px] font-semibold h-8 px-4 shadow-[0_2px_8px_var(--pl-brand-glow-sm)] transition-all cursor-pointer">
          Connect Wallet
        </Button>
      </div>
    </nav>
  );
}
