"use client";

import { PrismicLink, PrismicText } from "@prismicio/react";
import gsap from "gsap-trial";
import { Power2 } from "gsap";
import { SplitText } from "gsap-trial/dist/SplitText";
import { useRef, useLayoutEffect } from "react";

export default function EmailLink({ text, showFullEmail = true }) {
  const element = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let childSplit = new SplitText(element.current, {
        type: "lines",
        linesClass: "line-child",
      });
      let parentSplit = new SplitText(element.current, {
        type: "lines",
        linesClass: "line-parent",
      });

      gsap.fromTo(
        childSplit.lines,
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          stagger: 0.04,
          ease: Power2.easeOut,
          duration: 0.75,
          delay: 0.5,
        }
      );
    }, element); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <PrismicLink
      className="navigation_social_media_link"
      ref={element}
      href={`mailto:${text}`}
    >
      {showFullEmail ? <PrismicText field={text} /> : "Email"}
    </PrismicLink>
  );
}
