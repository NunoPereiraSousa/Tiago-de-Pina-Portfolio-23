"use client";

import { PrismicLink, PrismicText } from "@prismicio/react";
import { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function EmailLink({ text, showFullEmail = true }) {
  const element = useRef(null);
  gsap.registerPlugin(ScrollTrigger, SplitText);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let childSplit = SplitText.create(element.current, {
        type: "lines",
        linesClass: "line-child",
      });
      let parentSplit = SplitText.create(element.current, {
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
          scrollTrigger: {
            trigger: element.current,
          },
          ease: Power2.easeOut,
          duration: 0.75,
          delay: 0.5,
        }
      );

      return () => {
        childSplit.revert();
        parentSplit.revert();
      }; // context cleanup
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
