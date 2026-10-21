"use client";

import { useEffect } from "react";

/**
 * A single, shared observer drives every scroll reveal on the page.
 *
 * Content is only hidden once JavaScript is confirmed to be running
 * (`html.js`), so a failed script or a no-JavaScript visitor still sees the
 * full page. Elements opt in with `data-reveal`.
 */
export function RevealObserver() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target;
          target.setAttribute("data-reveal", "true");
          revealed.add(target);
          observer.unobserve(target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    const scan = () => {
      const nodes = document.querySelectorAll("[data-reveal]");
      nodes.forEach((node) => {
        if (revealed.has(node)) return;
        if (node.getAttribute("data-reveal") === "true") return;
        if (reducedMotion) {
          node.setAttribute("data-reveal", "true");
          revealed.add(node);
          return;
        }
        observer.observe(node);
      });
    };

    scan();

    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
