import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import OrbitalTechStack from "./components/OrbitalTechStack";
import RotatingText from "./components/RotatingText";
import WorkSection from "./components/WorkSection";

/* ── data ──────────────────────────────────────────────────── */

const MARQUEE: { name: string; icon: React.ReactNode }[] = [
  { name: "TypeScript", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#3178c6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
  { name: "React", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#61dafb"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.594.064-.838.188-.91.477-1.26 1.616-.838 2.998.08.26.198.51.34.743C2.58 5.245 1.12 7.36.366 8.984c-.37.8.19 1.64 1.247 1.64.42 0 .84-.126 1.2-.385l.422-.305C4.04 12.81 5.67 13.87 7.5 13.87c.42 0 .84-.064 1.244-.188.384-.116.747-.29 1.084-.514a6.1 6.1 0 0 0 .375-.285c1.346.96 3.108 1.587 4.888 1.587 1.346 0 3.107-.627 4.888-1.587.128.105.26.21.394.316.464.35.967.534 1.506.534 1.057 0 1.617-.84 1.247-1.64-.754-1.624-2.214-3.743-4.335-5.19.142-.233.26-.483.34-.743.422-1.382.072-2.52-.838-2.998a1.16 1.16 0 0 0-.838-.188zM8.756 14.26c-.37 0-.74-.104-1.08-.31a2.3 2.3 0 0 1-.622-.494c-1.346-.96-2.214-2.35-2.214-3.81 0-1.282.68-2.592 1.858-3.69l.42-.307c.406-.304.87-.456 1.336-.456.37 0 .74.104 1.08.31.34.206.623.494.623.844 0 .35-.284.656-.623.862-.34.206-.71.31-1.08.31-.466 0-.93-.152-1.336-.456l-.42-.307c-.795-.583-1.255-1.295-1.463-1.962h.002c-.03-.104-.045-.21-.045-.318 0-1.46.868-2.85 2.214-3.81a2.3 2.3 0 0 1 .622-.494c.34-.206.71-.31 1.08-.31.466 0 .93.152 1.336.456l.42.307c1.18 1.098 1.858 2.408 1.858 3.69 0 1.46-.868 2.85-2.214 3.81a2.3 2.3 0 0 1-.622.494c-.34.206-.71.31-1.08.31zm5.146-.31c-.37 0-.74-.104-1.08-.31a2.3 2.3 0 0 1-.622-.494c-1.346-.96-2.214-2.35-2.214-3.81 0-1.282.68-2.592 1.858-3.69l.42-.307c.406-.304.87-.456 1.336-.456.37 0 .74.104 1.08.31.34.206.623.494.623.844 0 .35-.284.656-.623.862-.34.206-.71.31-1.08.31-.466 0-.93-.152-1.336-.456l-.42-.307c-1.18-1.098-1.858-2.408-1.858-3.69 0-1.46.868-2.85 2.214-3.81a2.3 2.3 0 0 1 .622-.494c.34-.206.71-.31 1.08-.31.466 0 .93.152 1.336.456l.42.307c1.18 1.098 1.858 2.408 1.858 3.69 0 1.46-.868 2.85-2.214 3.81a2.3 2.3 0 0 1-.622.494c-.34.206-.71.31-1.08.31z"/></svg> },
  { name: "Next.js", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.637.637 0 0 1 .174-.143c.096-.047.134-.051.543-.051.473 0 .59.011.672.062a457.684 457.684 0 0 1 1.964 2.93c1.45 2.163 3.394 5.08 4.34 6.474.732 1.073 1.08 1.634 1.37 2.11.225.364.393.736.544 1.164.11.31.187.652.204.895.019.263.023.454.023.874 0 .675-.023.876-.064 1.052-.13.573-.52 1.157-1.193 1.636-.468.328-1.008.548-1.652.673a11.15 11.15 0 0 1-1.903.158c-.517 0-1.037-.023-1.55-.068a13.09 13.09 0 0 1-1.686-.214c-.372-.072-.703-.165-.975-.284a3.674 3.674 0 0 1-.84-.436c-.093-.078-.159-.15-.182-.202l-.063.062-.347 2.228-.348 2.228-.048.072c-.193.286-.536.541-.893.662-.33.112-.702.173-1.112.185-.64.018-1.125-.114-1.498-.41a2.56 2.56 0 0 1-.696-.81 2.788 2.788 0 0 1-.344-.976c-.032-.264-.042-.438-.042-.862 0-.53.034-1.045.103-1.543.202-1.454.768-2.706 1.687-3.72.483-.53 1.082-.95 1.787-1.249.686-.291 1.455-.467 2.304-.527.378-.027 1.845-.04 2.224-.013z"/></svg> },
  { name: "Python", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#3776ab"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.68H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.83-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.89.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.83.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.36.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg> },
  { name: "Node.js", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#339933"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675A1.857 1.857 0 0 1 1.26 17.07V6.921c0-.681.363-1.317.953-1.66l8.795-5.082a1.927 1.927 0 0 1 1.823 0l8.794 5.081c.59.344.953.98.953 1.661v10.15a1.86 1.86 0 0 1-.92 1.607l-8.795 5.078c-.28.163-.602.247-.925.247z"/><path d="M13.079 7.38l-4.835 2.792c-.249.144-.46.43-.46.661v5.618c0 .447.478.679.848.506l4.165-1.979c.358-.17.579-.489.579-.843V8.174c0-.36-.22-.678-.477-.794zm-.539 5.876l-3.833 1.816v-4.43l3.833-2.212v4.826z"/></svg> },
  { name: "Docker", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#2496ed"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.186.186 0 0 0-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.184-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.687 11.687 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> },
  { name: "Linux", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#fcc624"><path d="M11.998 0C5.366 0 0 5.367 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12.002-12z"/></svg> },
  { name: "LangChain", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#1c3c3c"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.6"/><line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5"/><line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5"/><line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5"/></svg> },
  { name: "Django", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#092e20"><path d="M7.695 4.465c-.445.325-.757.874-.839 1.474-.016.116-.022.177-.022.327 0 .246.016.386.077.613.179.65.564 1.109 1.123 1.344.193.082.256.088.553.088.363 0 .557-.086.801-.368.183-.21.284-.531.284-.899 0-.171-.033-.327-.077-.37-.055-.055-.289-.233-.52-.405-.634-.476-1.195-1.13-1.245-1.453-.016-.099-.049-.463-.049-.672 0-.232.027-.431.066-.509.082-.154.243-.344.436-.516l.464-.363zM11.713 3c-.445.325-.757.874-.839 1.474-.016.116-.022.177-.022.327 0 .246.016.386.077.613.179.65.564 1.109 1.123 1.344.193.082.256.088.553.088.363 0 .557-.086.801-.368.183-.21.284-.531.284-.899 0-.171-.033-.327-.077-.37-.055-.055-.289-.233-.52-.405-.634-.476-1.195-1.13-1.245-1.453-.016-.099-.049-.463-.049-.672 0-.232.027-.431.066-.509.082-.154.243-.344.436-.516l.464-.363z"/></svg> },
  { name: "Tailwind CSS", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#06b6d4"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.13 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.47 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.47 12 7 12z"/></svg> },
  { name: "Git", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#f05032"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.72.719-1.886.719-2.604 0-.538-.536-.665-1.321-.404-1.978l-2.498-2.498v6.51c.175.085.337.194.48.335.72.72.72 1.884 0 2.604-.72.72-1.884.72-2.604 0-.72-.72-.72-1.884 0-2.604.182-.184.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.576 3.75.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg> },
  { name: "Vite", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#646cff"><path d="M21.805 2.18L12.042 21.96c-.182.374-.702.374-.884 0L.395 2.18c-.2-.413.26-.882.722-.764L12.042 9.36l10.926-7.944c.462-.118.922.351.722.764z"/></svg> },
  { name: "Automation", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { name: "Security", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
];

const FOCUS = [
  {
    icon: "🤖",
    cls: "ic-agentic",
    title: "Agentic Tools",
    desc: "Designing LLM-powered agents with LangChain — tool calling, context engineering and automation that actually ships.",
  },
  {
    icon: "⚡",
    cls: "ic-fullstack",
    title: "Full-Stack Dev",
    desc: "React, Next.js, TypeScript and Node on the front; Django and REST APIs on the back. Clean, typed, testable code.",
  },
  {
    icon: "🛡️",
    cls: "ic-security",
    title: "Cyber Security",
    desc: "Hands-on with HackTheBox — PEASS-ng, SecLists and custom payloads. Enumeration, privesc and responsible disclosure.",
  },
];

const FACTS = [
  { k: "now", v: <>Intern @ <span className="cyan">erxes Mongolia</span></> },
  { k: "edu", v: "3rd Yr IT, MUST-SICT" },
  { k: "major", v: "Information Technology" },
  { k: "focus", v: <>Agentic Tools · Context Eng. · <span className="cyan">Security</span></> },
  { k: "motto", v: <>"Code w/ purpose, automate."</> },
];

const STACK_GROUPS = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript"] },
  { group: "Backend", items: ["Node", "Django", "REST APIs"] },
  { group: "AI / ML", items: ["LangChain", "Agentic Tools"] },
  { group: "Tools", items: ["Git", "Docker", "VS Code", "Linux"] },
];



const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/NOMINJIN3",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nominjin",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nomin3_jin",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Live Terminal",
    href: "https://nominjin3.github.io",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
];



/* ── page ──────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <div className="bg-stage" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <Nav />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-sky" aria-hidden="true">
          <span className="petal p1" />
          <span className="petal p2" />
          <span className="petal p3" />
          <span className="petal p4" />
          <span className="petal p5" />
          <span className="petal p6" />
          <span className="petal p7" />
          <span className="petal p8" />
          <span className="petal p9" />
          <span className="petal p10" />
        </div>
        <div className="container hero-inner">
          <Reveal>
            <div className="hero-avatar-wrap">
              <img src="/Brain3d.png" alt="AI Brain" className="hero-avatar" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="hero-title">
              <RotatingText />
              <br />
              <span className="hero-title-main">Developer.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="hero-desc-center">
              Nominjin builds LLM-powered agents with LangChain, ships full-stack apps
              with React &amp; Next.js, and breaks things ethically on HackTheBox —{" "}
              <span className="motto">&quot;Code w/ purpose, automate.&quot;</span>
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="hero-cta-center">
              <a href="#contact" className="btn-hero-connect">
                Connect
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </a>
              <a href="#projects" className="btn-hero-work">
                See Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </Reveal>


        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i}>{item.icon}{item.name}</span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <Reveal>
            <span className="section-label">about</span>
            <h2 className="section-title">
              Automation is the art of doing <span className="gradient-text">more with less</span>.
            </h2>
          </Reveal>

          <div className="about-grid">
            <Reveal delay={100}>
              <div className="about-copy">
                <p>
                  Hi — I&apos;m <strong>Nominjin (NOMI)</strong>, an Information Technology student in my 3rd year at{" "}
                  <strong>MUST-SICT</strong> and an intern at <span className="highlight">erxes Mongolia</span>.
                  I live at the intersection of <span className="highlight">agentic tooling</span>,{" "}
                  <span className="highlight">full-stack engineering</span> and{" "}
                  <span className="highlight">cyber security</span>.
                </p>
                <p>
                  By day I build tools that make teams faster — typed React/Next.js frontends, Node &amp; Django APIs,
                  and LLM agents with LangChain. By night I&apos;m in the lab: HackTheBox machines, enumeration with
                  SecLists, privilege escalation with PEASS-ng, and the occasional custom payload.
                </p>
                <p className="mono" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                  <span style={{ color: "var(--green)" }}>➜</span> <span style={{ color: "var(--cyan)" }}>~/motto</span> — Code w/ purpose,
                  automate.
                </p>

                <div className="cards-2">
                  {FOCUS.map((f) => (
                    <div key={f.title} className="focus-card">
                      <div className={`icon ${f.cls}`}>{f.icon}</div>
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="facts">
                <div className="facts-head">
                  <span className="prompt">➜</span>
                  <span>nominjin — profile --json</span>
                </div>
                {FACTS.map((row) => (
                  <div className="facts-row" key={row.k}>
                    <span className="k">{row.k}</span>
                    <span className="v">{row.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="stack-section">
        <div className="container">
          <Reveal>
            <span className="section-label">stack</span>
            <h2 className="section-title">My arsenal</h2>
            <p className="section-sub">
              Hover the orbit — every node is a tool I use daily, from languages to platforms.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <OrbitalTechStack />
          </Reveal>

          <Reveal delay={200}>
            <div className="stack-chips">
              {STACK_GROUPS.map((g) => (
                <div className="stack-chip" key={g.group} title={g.items.join(", ")}>
                  <span className="chip-group">{g.group}</span>
                  <span>·</span>
                  <span>{g.items.join(" · ")}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <Reveal>
            <h2 className="work-title">Find My Work</h2>
          </Reveal>
          <Reveal delay={80}>
            <WorkSection />
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <Reveal>
            <div className="contact-wrap">
              <h2>
                Let&apos;s build something<span className="gradient-text">.</span>
              </h2>
              <p>
                I&apos;m open to internships, security research collaborations, and agentic-tool experiments.
                My inbox is always accepting packets.
              </p>
              <div className="social-row">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    className="social-pill"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
              <div className="contact-mail">
                <span className="cyan">➜</span> ping me on{" "}
                <a href="https://github.com/NOMINJIN3" target="_blank" rel="noreferrer" className="cyan">
                  github.com/NOMINJIN3
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>
            © 2026 Nominjin · built with <span className="heart">♥</span> &amp; Next.js
          </span>
          <span className="mono">
            <span className="cyan">➜</span> Code w/ purpose, automate.
          </span>
          <div className="footer-links">
            <a href="#home">top</a>
            <a href="#projects">work</a>
            <a href="#contact">contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
