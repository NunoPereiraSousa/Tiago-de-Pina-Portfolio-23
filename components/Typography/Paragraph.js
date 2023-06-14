"use client";

import gsap from "gsap-trial";
import { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap-trial/dist/SplitText";
import { useRef, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Paragraph = ({ children }) => {
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
          scrollTrigger: {
            trigger: element.current,
            // markers: true,
            // start: "top bottom",
          },
          ease: Power2.easeOut,
          duration: 0.75,
          delay: 0.5,
        }
      );
    }, element); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <p ref={element} className="paragraph">
      {children}
    </p>
  );
};
