import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-6 relative bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Navbar */}
      <nav className="flex w-full max-w-7xl items-center mb-10">
        <h2 className="text-2xl mr-auto gap-3 flex items-center font-extrabold tracking-tight">
          {/* Faux Icon Button (Terminal) */}
          <button
            aria-label="Terminal"
            className="inline-flex items-center justify-center size-10 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* Terminal SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-5"
            >
              <path
                d="M4 17l5-5-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 19h8" strokeLinecap="round" />
            </svg>
          </button>
          <span>SARVASVA</span>
        </h2>

        {/* GitHub Link Button */}
        <Link
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open GitHub repository"
          className="inline-flex items-center justify-center size-10 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow active:scale-95 transition dark:border-neutral-800 dark:bg-neutral-900"
        >
          {/* GitHub Mark SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.5 2.87 8.31 6.85 9.66.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.72-2.79.62-3.38-1.37-3.38-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.37 1.13 2.95.86.09-.67.35-1.13.63-1.39-2.23-.26-4.58-1.14-4.58-5.05 0-1.12.39-2.04 1.04-2.76-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.78 1.05.81-.23 1.68-.35 2.54-.35s1.73.12 2.54.35c1.93-1.33 2.78-1.05 2.78-1.05.55 1.4.2 2.44.1 2.7.65.72 1.04 1.64 1.04 2.76 0 3.92-2.35 4.78-4.59 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .26.18.58.69.48A10.02 10.02 0 0022 12.24C22 6.58 17.52 2 12 2z" />
          </svg>
        </Link>
      </nav>

      {/* Terminal Card */}
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2 border-b border-gray-200 p-4 dark:border-neutral-800">
          <span className="bg-red-500 w-3 h-3 rounded-full" />
          <span className="bg-yellow-500 w-3 h-3 rounded-full" />
          <span className="bg-green-500 w-3 h-3 rounded-full" />
          <span className="ml-2 font-medium text-sm text-gray-500 dark:text-neutral-400">
            Terminal
          </span>
        </div>

        <div className="p-6 space-y-3">
          {[
            "npx create-next-app",
            "npm install @clerk/nextjs",
            "npm install --save-dev prisma",
          ].map((cmd, i) => (
            <div key={i} className="flex gap-3 items-center">
              <span className="text-lg font-mono select-none">$</span>
              <p className="line-through text-gray-400 font-mono">{cmd}</p>
            </div>
          ))}

          <div className="flex gap-3 items-center text-red-500 font-semibold">
            <span className="text-lg font-mono select-none">#</span>
            <p>Just one command</p>
          </div>

          <div className="flex gap-3 items-center">
            <span className="text-lg font-mono select-none">$</span>
            <p className="font-mono text-emerald-600 dark:text-emerald-400">
              npx @sarvasva-app
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 text-center text-gray-600 max-w-xl text-sm leading-relaxed dark:text-neutral-400">
        🚀 Help us make <span className="font-bold">SARVASVA CLI</span> even
        better. Share ideas, request features, or contribute code to expand and
        improve the developer experience.
      </p>

      {/* Floating Button */}
      <button
        aria-label="Open for Work"
        className="fixed bottom-6 right-6 rounded-full px-5 py-3 text-sm font-medium shadow-lg border border-gray-200 bg-white hover:shadow-xl active:scale-95 transition dark:border-neutral-800 dark:bg-neutral-900"
      >
        Open for Work
      </button>
    </div>
  );
}
