import type { ReactNode } from "react";

/** A piece of text in both languages. Both are rendered; CSS shows the one matching
 *  <html data-lang> (set before paint in layout.tsx, switched by the MN/EN button). */
export type Text = { en: ReactNode; mn: ReactNode };

export default function L({ en, mn }: Text) {
  return (
    <>
      <span data-l="en" lang="en">{en}</span>
      <span data-l="mn" lang="mn">{mn}</span>
    </>
  );
}
