export function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center gap-3 pt-8 border-t border-sand/15 text-center">
      <div className="flex items-center gap-2 font-mono text-xs text-tide">
        <span>🌊 #FrameInGoa</span>
        <span>•</span>
        <span>Anjuna Beach, Goa</span>
      </div>
      <p className="font-body text-xs text-sand/50 max-w-sm">
        Crafted for builders at HH Goa 2026. Zero server storage unless shared, instant client compositing.
      </p>
    </footer>
  );
}
