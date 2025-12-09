"use client";

export default function FooterSection() {
  return (
    <footer className="px-6 py-14 md:py-20 bg-[#050509] border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Brand - Styled EXACTLY like Creati Studio */}
        <div className="text-sm font-semibold tracking-[0.25em] text-white/80 uppercase">
          CREATI STUDIO
        </div>

        {/* Tagline */}
        <p className="text-sm text-white/50 max-w-md leading-relaxed">
          Building creative experiences for modern digital brands.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-2">
          {/* Twitter */}
          <a
            href="#"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
          >
            <svg
              className="w-4 h-4 text-white/60 hover:text-white transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="#"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
          >
            <svg
              className="w-4 h-4 text-white/60 hover:text-white transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.063 2.063 0 1.139-.925 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
          >
            <svg
              className="w-4 h-4 text-white/60 hover:text-white transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/40 mt-4">
          © {new Date().getFullYear()} Creati Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
