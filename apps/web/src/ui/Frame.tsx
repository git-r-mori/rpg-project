import type { ReactNode } from 'react';

/** Props for {@link Frame}. */
type FrameProps = {
  /** Small heading shown centered above the content. Omit to render no heading. */
  title?: string;
  /** Content placed inside the frame. */
  children: ReactNode;
};

/**
 * Full-width panel with a gold double border, styled like an RPG message window.
 */
export function Frame({ title, children }: FrameProps) {
  return (
    <section className="border-gold bg-ink/80 shadow-gold/20 relative w-full rounded-lg border-4 border-double p-6 shadow-lg sm:p-10">
      {title && (
        <h2 className="font-display text-gold mb-4 text-center text-sm tracking-[0.3em]">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
