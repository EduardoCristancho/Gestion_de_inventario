"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  text: string;
  lines?: number;
  className?: string;
};

export default function OverflowText({ text, lines = 1, className = "" }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (expanded) {
      setTruncated(false);
      return;
    }
    const check = () => {
      const isTruncated = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
      setTruncated(isTruncated);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, expanded, lines]);

  const clampClass = useMemo(() => {
    const n = Math.max(1, Math.min(6, lines));
    return `line-clamp-${n}`;
  }, [lines]);

  return (
    <div className={`relative group ${className}`}
         onClick={() => setExpanded((v) => !v)}
    >
      <div
        ref={ref}
        className={`min-w-0 ${expanded ? "" : `${clampClass} text-ellipsis overflow-hidden`}`}
        title={text}
      >
        {text}
      </div>
      {truncated && !expanded && (
        <div className="hidden  absolute left-0 top-full mt-1 max-w-xs whitespace-normal rounded-md border border-neutral-700 bg-tertiary px-2 py-1 text-xs text-globalone shadow-lg z-20 group-hover:block">
          {text}
        </div>
      )}
    </div>
  );
}
