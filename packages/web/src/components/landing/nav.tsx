import { NavLink } from "react-router";

export function Nav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[13px] font-medium px-3.5 py-1.5 rounded-md transition-colors ${
      isActive ? "text-white bg-surface" : "text-dim hover:text-text-1"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-13 bg-[var(--navy)]/85 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-2.5">
        <NavLink to="/" className="font-mono text-[13px] font-bold text-white no-underline">polyliquid</NavLink>
        <span className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded bg-brand/12 text-brand-bright uppercase tracking-wide">
          v1.0
        </span>
      </div>

      <div className="flex gap-0.5">
        <NavLink to="/" className={linkClass} end>Home</NavLink>
        <NavLink to="/vaults" className={linkClass}>Vaults</NavLink>
        <NavLink to="/activity" className={linkClass}>Activity</NavLink>
      </div>

      <div />
    </nav>
  );
}
