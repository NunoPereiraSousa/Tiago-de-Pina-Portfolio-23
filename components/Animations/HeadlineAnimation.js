"use client";

import { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useRef, useContext } from "react";
import { PrismicRichText } from "@prismicio/react";
import AnimationsContext from "@/context/AnimationsContext";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
import { gsap } from "gsap";

export default function Headline({ text }) {
  const element = useRef(null);
  const { completed } = useContext(AnimationsContext);
  gsap.registerPlugin(ScrollTrigger, SplitText);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (completed) {
        let childSplit = SplitText.create(".paragraph p", {
          type: "lines",
          linesClass: "line-child",
        });
        let parentSplit = SplitText.create(".paragraph p", {
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
      }

      return () => {
        childSplit.revert();
        parentSplit.revert();
      }; // context cleanup
    }, element); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, [completed]);

  return (
    <div className="paragraph" ref={element}>
      <PrismicRichText field={text} />
    </div>
  );
}
