import React from "react";

interface MarkdownViewProps {
  content: string;
}

/**
 * Renders the Markdown subset deliverables use: headings, lists, bold,
 * italic, inline code and paragraphs. It builds React elements directly, so
 * model output is never injected as HTML.
 */
export function MarkdownView({ content }: MarkdownViewProps) {
  const blocks: React.ReactNode[] = [];
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let list: { ordered: boolean; items: string[] } | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push(
      <p key={`p-${blocks.length}`} className="leading-relaxed text-paper/85">
        {inline(paragraph.join(" "))}
      </p>
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;
    const ListTag = list.ordered ? "ol" : "ul";
    blocks.push(
      <ListTag
        key={`l-${blocks.length}`}
        className={
          list.ordered
            ? "list-decimal space-y-1.5 pl-5 text-paper/85 marker:text-mute"
            : "list-disc space-y-1.5 pl-5 text-paper/85 marker:text-mute"
        }
      >
        {list.items.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {inline(item)}
          </li>
        ))}
      </ListTag>
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    const bullet = line.match(/^\s*[-*+]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);

    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const text = inline(heading[2]);
      const key = `h-${blocks.length}`;
      if (level === 1) {
        blocks.push(
          <h1 key={key} className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
            {text}
          </h1>
        );
      } else if (level === 2) {
        blocks.push(
          <h2 key={key} className="hairline-t pt-6 text-lg font-semibold tracking-tight text-paper">
            {text}
          </h2>
        );
      } else {
        blocks.push(
          <h3 key={key} className="text-base font-semibold text-paper/90">
            {text}
          </h3>
        );
      }
    } else if (bullet || numbered) {
      flushParagraph();
      const ordered = Boolean(numbered && !bullet);
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
    } else if (line.trim() === "") {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }

  flushParagraph();
  flushList();

  return <div className="space-y-4 text-sm">{blocks}</div>;
}

/** Bold, italic and inline code. */
function inline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={index} className="font-semibold text-paper">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={index} className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
