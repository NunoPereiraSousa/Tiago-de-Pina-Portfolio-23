"use client";

import { PrismicLink, PrismicText } from "@prismicio/react";
import { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function Links({ className, url, text }) {
  const element = useRef(null);
  gsap.registerPlugin(ScrollTrigger, SplitText);

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
          scrollTrigger: {
            trigger: element.current,
          },
          duration: 0.75,
          delay: 0.5,
        }
      );
    }, element); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <PrismicLink className={className} ref={element} href={url}>
      <PrismicText field={text} />
    </PrismicLink>
  );
}
