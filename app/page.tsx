import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import ZoomHero from "./components/ZoomHero";
import { ICONS } from "./data/icons";
import { techTools } from "./data/tech";
import WorkSection from "./components/WorkSection";
import ParallaxProvider from "./components/ParallaxProvider";
import AboutSection from "./components/AboutSection";

/* ── data ──────────────────────────────────────────────────── */

/* Logo strip: the same skill icons as the hero (app/data/icons.tsx) */
const MARQUEE = techTools.filter((t) => ICONS[t.name]);

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
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((tool, i) => {
            const icon = ICONS[tool.name];
            const dark =
              tool.name === "Linux" ? "icon-outline-dark" :
              ["Next.js", "GitHub"].includes(tool.name) ? "icon-invert-dark" : undefined;
            return (
              <span key={i} className={dark}>
                {icon.icon ?? <img src={icon.src} alt="" width={20} height={20} loading="lazy" draggable={false} />}
                {tool.name.replace(" Language", "")}
              </span>
            );
          })}
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
