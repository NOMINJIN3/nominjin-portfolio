/* Official skill logos: devicon SVGs served from /public/logos, plus a few inline SVGs */
export const ICONS: Record<string, { src?: string; icon?: React.ReactNode }> = {
  JavaScript: {
    /* shield-style JS logo */
    icon: (
      <svg viewBox="0 0 100 100" width="58" height="58" aria-hidden="true">
        <path fill="#d4b830" d="M16.4 11.7h67.2L77.9 80 50 87.9 22.1 80z" />
        <path fill="#f9db23" d="M50 17.9h27.6l-4.7 59.2L50 82.9z" />
        <path fill="#eef1f2" d="M41.1 26.4h6.5v45L27.9 66.4v-8.1l13.2 2.8z" />
        <path fill="#eef1f2" d="M53.1 26.4h21.2l-.4 7.9H59.6l-.3 12.1 13.6-1.4-1.9 21.4-18.1 5v-7.8l13.1-2.9v-7.1l-12.9 2.1z" />
      </svg>
    ),
  },
  TypeScript: {
    /* rounded-square TS logo */
    icon: (
      <svg viewBox="0 0 100 100" width="46" height="46" aria-hidden="true">
        <rect x="0" y="0" width="100" height="100" rx="7" fill="#3178c6" />
        <path fill="#ffffff" d="M16 42.5h40.5v10.4H41.6V93H30.9V52.9H16z" />
        <path
          fill="none"
          stroke="#ffffff"
          strokeWidth="10.5"
          d="M86.5 52.5C83.5 48.8 79.3 47.6 75.2 47.6 68.8 47.6 64.1 50.6 64.1 55.8 64.1 61.2 69.4 62.8 75.1 64.6 81.7 66.7 87.2 69.2 87.2 76.1 87.2 83.1 81.3 86.8 74.6 86.8 69.6 86.8 64.9 85 61.6 81.2"
        />
      </svg>
    ),
  },
  Python: {
    src: "/logos/python-original.svg",
  },
  Java: {
    src: "/logos/java-original.svg",
  },
  "C Language": {
    /* Official C logo (ISO-style hexagon, Wikimedia Commons) */
    icon: (
      <svg viewBox="0 0 38 42" width="48" height="48" aria-hidden="true">
        <path
          fill="#004482"
          fillRule="evenodd"
          clipRule="evenodd"
          d="m 17.903,0.28628166 c 0.679,-0.381 1.515,-0.381 2.193,0 C 23.451,2.1692817 33.547,7.8372817 36.903,9.7202817 37.582,10.100282 38,10.804282 38,11.566282 c 0,3.766 0,15.101 0,18.867 0,0.762 -0.418,1.466 -1.097,1.847 -3.355,1.883 -13.451,7.551 -16.807,9.434 -0.679,0.381 -1.515,0.381 -2.193,0 -3.355,-1.883 -13.451,-7.551 -16.807,-9.434 -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 0,-3.766 0,-15.101 0,-18.867 0,-0.762 0.418,-1.466 1.097,-1.8470003 3.354,-1.883 13.452,-7.551 16.806,-9.43400004 z"
        />
        <path
          fill="#659ad2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="m 0.304,31.404282 c -0.266,-0.356 -0.304,-0.694 -0.304,-1.149 0,-3.744 0,-15.014 0,-18.759 0,-0.758 0.417,-1.458 1.094,-1.8360003 3.343,-1.872 13.405,-7.507 16.748,-9.38000004 0.677,-0.379 1.594,-0.371 2.271,0.008 3.343,1.87200004 13.371,7.45900004 16.714,9.33100004 0.27,0.152 0.476,0.335 0.66,0.5760003 z"
        />
        <path
          fill="#ffffff"
          fillRule="evenodd"
          clipRule="evenodd"
          d="m 19,7.0002817 c 7.727,0 14,6.2730003 14,14.0000003 0,7.727 -6.273,14 -14,14 -7.727,0 -14,-6.273 -14,-14 0,-7.727 6.273,-14.0000003 14,-14.0000003 z m 0,7.0000003 c 3.863,0 7,3.136 7,7 0,3.863 -3.137,7 -7,7 -3.863,0 -7,-3.137 -7,-7 0,-3.864 3.136,-7 7,-7 z"
        />
        <path
          fill="#00599c"
          fillRule="evenodd"
          clipRule="evenodd"
          d="m 37.485,10.205282 c 0.516,0.483 0.506,1.211 0.506,1.784 0,3.795 -0.032,14.589 0.009,18.384 0.004,0.396 -0.127,0.813 -0.323,1.127 l -19.084,-10.5 z"
        />
      </svg>
    ),
  },
  "C++": {
    src: "/logos/cplusplus-original.svg",
  },
  "Next.js": {
    src: "/logos/nextjs-original.svg",
  },
  "React.js": {
    src: "/logos/react-original.svg",
  },
  "Tailwind CSS": {
    src: "/logos/tailwindcss-original.svg",
  },
  Docker: {
    src: "/logos/docker-original.svg",
  },
  Git: {
    src: "/logos/git-original.svg",
  },
  GitHub: {
    src: "/logos/github-original.svg",
  },
  "Node.js": {
    src: "/logos/nodejs-original.svg",
  },
  VSCode: {
    src: "/logos/vscode-original.svg",
  },
  Linux: {
    src: "/logos/linux-original.svg",
  },
  HTML: {
    src: "/logos/html5-original.svg",
  },
};
