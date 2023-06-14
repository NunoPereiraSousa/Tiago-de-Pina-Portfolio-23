"use client";

import clsx from "clsx";
import gsap from "gsap-trial";
import { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap-trial/dist/SplitText";
import { useRef, useEffect, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Heading = ({ as: Comp = "h1", size = "xxl", children }) => {
  const element = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Our animations can use selector text like ".box"
      // this will only select '.box' elements that are children of the component
      let parentSplit = new SplitText(".heading", {
        type:
          size === "sm" || size === "md" || size === "lg" ? "lines" : "chars",
        charsClass: "line-parent",
        linesClass: "line-parent",
      });
      let childSplit = new SplitText(".heading", {
        type:
          size === "sm" || size === "md" || size === "lg" ? "lines" : "chars",
        charsClass: "line-child",
        linesClass: "line-child",
      });

      gsap.fromTo(
        size === "sm" || size === "md" || size === "lg"
          ? parentSplit.lines
          : childSplit.chars,
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          stagger: 0.015,
          ease: Power2.easeOut,
          scrollTrigger: {
            trigger: element.current,
            // markers: true,
            // start: "top bottom",
          },
          duration: 0.75,
          delay: 0.5,
        }
      );
    }, element); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div ref={element}>
      <Comp
        className={clsx(
          "heading",
          size === "xxl" && "xxl",
          size === "xl" && "xl",
          size === "lg" && "lg",
          size === "md" && "md",
          size === "sm" && "sm",
          size === "xsm" && "xsm"
        )}
      >
        {children}
      </Comp>
    </div>
  );
};
