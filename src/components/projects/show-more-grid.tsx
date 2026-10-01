"use client";

import { Children, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { arrowNudge } from "@/lib/hover";

type ShowMoreGridProps = {
  children: ReactNode;
  pageSize?: number;
  className?: string;
};

/**
 * Shows `pageSize` items, revealing the next batch on "Show More". Every item
 * is already in the server HTML (only visually hidden), so all projects stay
 * crawlable — the legacy page only rendered the first six.
 */
export function ShowMoreGrid({ children, pageSize = 6, className }: ShowMoreGridProps) {
  const items = Children.toArray(children);
  const [visible, setVisible] = useState(pageSize);

  if (!items.length) {
    return <p className="py-4 text-center">No projects match this filter yet.</p>;
  }

  return (
    <>
      <div className={className}>
        {items.map((item, i) => (
          // `grid` lets the card stretch to the row height.
          <div key={i} hidden={i >= visible} className="grid">
            {item}
          </div>
        ))}
      </div>
      {visible < items.length && (
        <div className="mt-8 flex justify-center">
          <Button onClick={() => setVisible((v) => v + pageSize)}>
            Show More <ArrowRightIcon size={14} strokeWidth={2.5} className={arrowNudge} />
          </Button>
        </div>
      )}
    </>
  );
}
