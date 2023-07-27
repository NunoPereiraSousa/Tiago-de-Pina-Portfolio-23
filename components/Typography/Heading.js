"use client";

import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useRef, useLayoutEffect } from "react";

export default function Heading({ as: Comp = "h1", size = "xxl", children }) {
  const element = useRef(null);
  let parentSplit;
  let childSplit;
  gsap.registerPlugin(ScrollTrigger, SplitText);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (size !== "xl" && size !== "xxl") {
        childSplit = new SplitText(".heading", {
          type: "lines",
          linesClass: "line-child",
        });
        parentSplit = new SplitText(".heading", {
          type: "lines",
          linesClass: "line-parent",
        });
      } else {
        parentSplit = new SplitText(".heading", {
          type: "lines",
          linesClass: "line-parent",
        });
        childSplit = new SplitText(".heading", {
          type: "chars",
          charsClass: "line-child",
        });
      }

      gsap.fromTo(
        size !== "xl" && size !== "xxl" ? childSplit.lines : childSplit.chars,
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          stagger: 0.02,
          ease: "expo.out",
          scrollTrigger: {
            trigger: element.current,
          },
          duration: 1,
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
}
