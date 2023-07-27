import { PrismicLink, PrismicText } from "@prismicio/react";
import DoubleText from "../Animations/DoubleText";
import { useRouter } from "next/router";
import { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useRef } from "react";
import useIsomorphicLayoutEffect from "../Animations/useIsomorphicLayoutEffect";
import { gsap } from "gsap";

export default function NavigationLink({ link, name, isMobile }) {
  const router = useRouter();
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const element = useRef(null);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(max-width: 1024px)", () => {
        let childSplit = new SplitText(".navigation_link", {
          type: "chars",
          charsClass: "line-child",
        });
        let parentSplit = new SplitText(".navigation_link", {
          type: "chars",
          charsClass: "line-parent",
        });

        gsap.fromTo(
          childSplit.chars,
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
          }
        );

        return () => {};
      });

      mm.add("(min-width: 1024px)", () => {
        let childSplit = new SplitText(".navigation_link", {
          type: "lines",
          linesClass: "line-child",
        });
        let parentSplit = new SplitText(".navigation_link", {
          type: "lines",
          linesClass: "line-parent",
        });

        console.log("here");

        gsap.fromTo(
          parentSplit.lines,
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

        return () => {};
      });
    }, element);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div ref={element}>
      <DoubleText isMobile={isMobile}>
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
      </DoubleText>
    </div>
  );
}
