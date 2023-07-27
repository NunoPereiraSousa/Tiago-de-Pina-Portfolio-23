"use client";

import { gsap } from "gsap";
import { Power2 } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Figure({ figureClassName, imageClassName, image }) {
  const figureEl = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // const tl = timeline.current;

      gsap.fromTo(
        figureEl.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: figureEl.current,
            // markers: true,
          },
          duration: 1.5,
          delay: 0.5,
        }
      );

      return () => ctx.revert(); // cleanup
    }, figureEl);
  }, []);

  return (
    <figure className={figureClassName + " figure"} ref={figureEl}>
      <img src={image.url} alt={image.alt} className={imageClassName} />
    </figure>
  );
}
