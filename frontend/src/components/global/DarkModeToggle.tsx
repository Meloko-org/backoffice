import React, { useEffect, useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Vérifie le mode actuel dans le stockage local ou utilise le mode système
    return localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative inline-flex items-center py-1.5 px-2 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer
        ${ isDarkMode ? 'bg-neutral-900 text-slate-400 focus-visible:ring-slate-500' : 'bg-gray-200 text-gray-700 focus-visible:ring-gray-300'
      }`}
      role="switch"
      aria-checked={isDarkMode}
    >
      <span className="sr-only">Activer le mode sombre</span>
      {/* icone mode light */}
      <svg
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
        className="text-slate-600"
      >
        <path
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* icone mode dark */}
      <svg
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
        className="ml-3.5 text-slate-400"
      >
        <path
          d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`absolute top-0.5 left-0.5 bg-white w-8 h-8 rounded-full flex items-center justify-center transition duration-500 transform ${
          isDarkMode ? 'translate-x-10.5' : 'translate-x-0'
        }`}
      >
        
          <svg
            width="24"
            height="24"
            fill="none"
            aria-hidden="true"
            className={`text-gray-800 absolute transition-all duration-300 ${
              isDarkMode
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0"
            }`}
          >
            <path
              d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        
          <svg
            width="24"
            height="24"
            fill="none"
            aria-hidden="true"
            className={`text-yellow-400 absolute transition-all duration-300 ${
              isDarkMode
                ? "opacity-0 scale-0"
                : "opacity-100 scale-100"
            }`}
          >
            <path
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        
      </span>
    </button>
  );
};

export default DarkModeToggle;

