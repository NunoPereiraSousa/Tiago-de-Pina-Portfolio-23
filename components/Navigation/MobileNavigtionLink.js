import { PrismicLink, PrismicText } from "@prismicio/react";
import { useRouter } from "next/router";
import { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function MobileNavigationLink({ link, name, isMobile }) {
  const router = useRouter();
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const element = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let parentSplit = new SplitText(".navigation_link", {
        type: "chars",
        charsClass: "line-parent",
      });
      let childSplit = new SplitText(".navigation_link", {
        type: "chars",
        charsClass: "line-child",
      });

      let tl = gsap.timeline({
        ease: Power2.easeOut,
      });

      tl.fromTo(
        ".navigation_link_border",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          transformOrigin: "0 0",
          duration: 0.4,
          delay: 0.5,
        }
      );

      tl.fromTo(
        childSplit.chars,
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          stagger: 0.03,
          duration: 0.5,
        },
        "-=0.1"
      );
    }, element);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div ref={element}>
      <span className="navigation_link_border"></span>
      <PrismicLink
        href={link.url}
        className={
          router.asPath === link.url
            ? "navigation_link active"
            : "navigation_link"
        }
      >
        <PrismicText field={name} />
      </PrismicLink>
      <span className="navigation_link_border"></span>
    </div>
  );
}
