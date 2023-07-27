"use client";

import { Power2 } from "gsap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useRef } from "react";
import useIsomorphicLayoutEffect from "../Animations/useIsomorphicLayoutEffect";

export default function Paragraph({ children }) {
  const element = useRef(null);
  gsap.registerPlugin(ScrollTrigger, SplitText);

  useIsomorphicLayoutEffect(() => {
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
          },
          ease: Power2.easeOut,
          duration: 0.75,
          delay: 0.5,
        }
      );

      return () => {
        childSplit.revert();
        // parentSplit.revert();
      }; // context cleanup
    }, element); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <p className="paragraph" ref={element}>
      {children}
    </p>
  );
}
