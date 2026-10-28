import Reveal from "./Reveal";
import L, { type Text } from "./L";

/* ── Data ───────────────────────────────────────────────── */
const FACTS: { k: Text; v: Text; live?: boolean }[] = [
  { k: { en: "Based in", mn: "Байршил" }, v: { en: "Ulaanbaatar, Mongolia", mn: "Улаанбаатар, Монгол" } },
  { k: { en: "Focus", mn: "Чиглэл" }, v: { en: "Agentic tools · Security", mn: "Агент хэрэгсэл · Аюулгүй байдал" } },
  { k: { en: "Status", mn: "Төлөв" }, v: { en: "Available for work", mn: "Ажилд бэлэн" }, live: true },
];

const ROWS: { k: Text; title: Text; sub: Text; body: Text }[] = [
  {
    k: { en: "Intern", mn: "Дадлага" },
    title: { en: "Software Engineering Intern", mn: "Програм хангамжийн инженер дадлагажигч" },
    sub: { en: "erxes Mongolia", mn: "erxes Mongolia" },
    body: {
      en: "Full-stack and automation work on a source-available Experience OS: shipping features, fixing bugs and automating workflows.",
      mn: "Эх код нь нээлттэй Experience OS дээр full-stack болон автоматжуулалтын ажил: шинэ боломж нэмж, алдаа засаж, ажлын урсгалыг автоматжуулдаг.",
    },
  },
  {
    k: { en: "Study", mn: "Суралцах" },
    title: { en: "BSc Information Technology", mn: "Мэдээллийн технологийн бакалавр" },
    sub: { en: "MUST · SICT · 3rd year", mn: "ШУТИС · МХТС · 3-р курс" },
    body: {
      en: "Third-year IT studies at the Mongolian University of Science and Technology, in its SICT school of information and communication technology.",
      mn: "Шинжлэх Ухаан Технологийн Их Сургуулийн Мэдээлэл, Холбооны Технологийн Сургуульд мэдээллийн технологийн чиглэлээр 3-р курст суралцаж байна.",
    },
  },
  {
    k: { en: "Day", mn: "Өдөр" },
    title: { en: "Offensive security", mn: "Довтолгооны аюулгүй байдал" },
    sub: { en: "HackTheBox", mn: "HackTheBox" },
    body: {
      en: "Enumeration, privilege escalation and custom payloads, from first scan to root.",
      mn: "Мэдээлэл цуглуулах, эрх нэмэгдүүлэх, өөрийн payload бичих: эхний скан-аас root эрх хүртэл.",
    },
  },
  {
    k: { en: "Building", mn: "Бүтээж буй" },
    title: { en: "LLM agents", mn: "LLM агентууд" },
    sub: { en: "LangChain · MCP", mn: "LangChain · MCP" },
    body: {
      en: "Tool-calling agents, context engineering and agentic developer loops.",
      mn: "Хэрэгсэл дууддаг агентууд, контекст инженерчлэл болон агентад суурилсан хөгжүүлэлтийн урсгал.",
    },
  },
];

/* ── Component ──────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <section id="about" className="abt">
      <div className="container">
        <Reveal>
          <span className="abt-eyebrow">
            <L en="About · Who is Nominjin?" mn="Тухай · Номинжин гэж хэн бэ?" />
          </span>
          <div className="abt-intro">
            <h2 className="abt-title">
              <L
                en={<>Code with <em>purpose</em>.<br />Automate the rest.</>}
                mn={<><em>Зорилготой</em> код бич.<br />Үлдсэнийг автоматжуул.</>}
              />
            </h2>
            <p className="abt-lede">
              <L
                en="Hi, I’m a 3rd-year IT student at MUST-SICT and an intern at erxes Mongolia. I build LLM-powered agents, ship full-stack apps, and break things ethically on HackTheBox. I started writing code before the current AI era, and I use AI to sharpen the fundamentals, not to replace them."
                mn="Сайн байна уу, би ШУТИС-МХТС-ийн мэдээллийн технологийн 3-р курсын оюутан, erxes Mongolia-д дадлагажигч. LLM-д суурилсан агент бүтээж, full-stack апп хөгжүүлж, HackTheBox дээр ёс зүйтэйгээр систем эвддэг. Одоогийн AI-ын эрин эхлэхээс өмнө код бичиж эхэлсэн бөгөөд AI-г үндсэн мэдлэгээ орлуулах биш, харин хурцлахад ашигладаг."
              />
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <dl className="abt-facts">
            {FACTS.map((f, i) => (
              <div key={i}>
                <dt><L {...f.k} /></dt>
                <dd>
                  {f.live && <i aria-hidden="true" />}
                  <L {...f.v} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="abt-rows">
          {ROWS.map((r, i) => (
            <Reveal key={i} delay={120 + i * 60}>
              <article>
                <span className="abt-key">
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <L {...r.k} />
                </span>
                <h3><L {...r.title} /></h3>
                <span className="abt-sub"><L {...r.sub} /></span>
                <p><L {...r.body} /></p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
