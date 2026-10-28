import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import ZoomHero from "./components/ZoomHero";
import WorkSection from "./components/WorkSection";
import ParallaxProvider from "./components/ParallaxProvider";
import AboutSection from "./components/AboutSection";

/* ── data ──────────────────────────────────────────────────── */

const MARQUEE: { name: string; icon: React.ReactNode }[] = [
  { name: "TypeScript", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#3178c6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
  { name: "React", icon: <img src="/logos/react-original.svg" alt="" width="20" height="20" loading="lazy" /> },
  { name: "Next.js", icon: <img src="/logos/nextjs-original.svg" alt="" width="20" height="20" loading="lazy" className="icon-invert-dark" /> },
  { name: "Python", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#3776ab"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.68H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.83-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.89.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.83.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.36.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg> },
  { name: "Node.js", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#339933"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675A1.857 1.857 0 0 1 1.26 17.07V6.921c0-.681.363-1.317.953-1.66l8.795-5.082a1.927 1.927 0 0 1 1.823 0l8.794 5.081c.59.344.953.98.953 1.661v10.15a1.86 1.86 0 0 1-.92 1.607l-8.795 5.078c-.28.163-.602.247-.925.247z"/><path d="M13.079 7.38l-4.835 2.792c-.249.144-.46.43-.46.661v5.618c0 .447.478.679.848.506l4.165-1.979c.358-.17.579-.489.579-.843V8.174c0-.36-.22-.678-.477-.794zm-.539 5.876l-3.833 1.816v-4.43l3.833-2.212v4.826z"/></svg> },
  { name: "Docker", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#2496ed"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.186.186 0 0 0-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.184-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.687 11.687 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> },
  { name: "Linux", icon: <img src="/logos/linux-plain.svg" alt="" width="20" height="20" loading="lazy" className="icon-invert-dark" /> },
  { name: "LangChain", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#1c3c3c"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.6"/><line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5"/><line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5"/><line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5"/></svg> },
  { name: "Django", icon: <img src="/logos/django-plain.svg" alt="" width="20" height="20" loading="lazy" className="icon-invert-dark" /> },
  { name: "Tailwind CSS", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#06b6d4"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.13 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.47 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.47 12 7 12z"/></svg> },
  { name: "Git", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#f05032"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.72.719-1.886.719-2.604 0-.538-.536-.665-1.321-.404-1.978l-2.498-2.498v6.51c.175.085.337.194.48.335.72.72.72 1.884 0 2.604-.72.72-1.884.72-2.604 0-.72-.72-.72-1.884 0-2.604.182-.184.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.576 3.75.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg> },
  { name: "Vite", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#646cff"><path d="M21.805 2.18L12.042 21.96c-.182.374-.702.374-.884 0L.395 2.18c-.2-.413.26-.882.722-.764L12.042 9.36l10.926-7.944c.462-.118.922.351.722.764z"/></svg> },
  { name: "Automation", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { name: "Security", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
];

/* ── page ──────────────────────────────────────────────────── */

/* Live public repo count, refreshed daily at build/revalidate time.
   Falls back to a sane number if the GitHub API is rate-limited or down. */
async function getRepoCount(): Promise<number> {
  try {
    const res = await fetch("https://api.github.com/users/NOMINJIN3", {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return 10;
    const data = (await res.json()) as { public_repos?: number };
    return typeof data.public_repos === "number" && data.public_repos > 0 ? data.public_repos : 10;
  } catch {
    return 10;
  }
}

const FOOTER_COLS = [
  {
    title: "Navigate",
    links: [
      { label: "Skills", href: "#skills" },
      { label: "Work", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/NOMINJIN3" },
      { label: "LinkedIn", href: "https://linkedin.com/in/nominjin" },
      { label: "X", href: "https://x.com/nomin1433" },
      { label: "Instagram", href: "https://www.instagram.com/nomin3_jin" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Live terminal", href: "https://nominjin3.github.io" },
      { label: "nomi.txt", href: "/nomi.txt" },
    ],
  },
];

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nominjin Tsogtbayar",
  alternateName: "NOMI",
  url: "https://www.nominjin.io",
  image: "https://www.nominjin.io/nomi-photo.jpg",
  jobTitle: "Software Engineering Intern",
  worksFor: { "@type": "Organization", name: "erxes Mongolia", url: "https://erxes.io" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Mongolian University of Science and Technology" },
  address: { "@type": "PostalAddress", addressLocality: "Ulaanbaatar", addressCountry: "MN" },
  sameAs: ["https://github.com/NOMINJIN3", "https://linkedin.com/in/nominjin", "https://x.com/nomin1433"],
  knowsAbout: ["LLM agents", "LangChain", "Next.js", "React", "TypeScript", "Python", "Cyber security"],
};

export default async function Home() {
  const repoCount = await getRepoCount();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
      />
      <div className="bg-stage" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <Nav />
      <ParallaxProvider>

      {/* HERO — photo shrinks into a card on scroll, skills fly out around it */}
      <ZoomHero />

      {/* PROJECTS — no 3D tilt here: Chrome drew hairline tile seams across the
          terminal when this section was transformed in 3D */}
      <div>
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
      </div>

      {/* MARQUEE */}
      <div className="container">
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} title={item.name}>{item.icon}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <AboutSection repoCount={repoCount} />

      {/* FOOTER — also the #contact target (hero "Connect", nav "Contact.") */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-top">
            <div className="footer-cta">
              <p className="footer-eyebrow">Have an idea? Let&apos;s talk.</p>
              <a href="mailto:ts.nominjin2006@gmail.com" className="footer-mail">
                ts.nominjin2006@gmail.com
                <span aria-hidden="true">↗</span>
              </a>
              <a href="tel:+97680734073" className="footer-phone">
                +976 80734073
              </a>
            </div>

            <nav className="footer-cols" aria-label="Footer">
              {FOOTER_COLS.map((col) => (
                <div key={col.title} className="footer-col">
                  <h3>{col.title}</h3>
                  <ul>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="footer-bottom">
            <span className="footer-legal">
              <span>© {new Date().getFullYear()} Nominjin Tsogtbayar</span>
              <span>
                Built in Ulaanbaatar <span className="heart" aria-hidden="true">♥</span>
              </span>
            </span>
            <a href="#home" className="footer-top-link">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>

          <p className="footer-wordmark" aria-hidden="true">Nominjin.</p>
        </div>
      </footer>
      </ParallaxProvider>
    </>
  );
}
