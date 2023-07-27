import useIsomorphicLayoutEffect from "./Animations/useIsomorphicLayoutEffect";
import { gsap } from "gsap";
import { useRef } from "react";

export default function Greetings() {
  const element = useRef(null);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap
        .timeline()
        .fromTo(
          element.current,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            ease: "expo.out",
          }
        )
        .fromTo(
          ".greetings_description",
          {
            autoAlpha: 0,
          },
          { autoAlpha: 1, delay: 1 }
        )
        .to(".greetings_description", { autoAlpha: 0, delay: 1 })
        .to(element.current, { scaleY: 0, delay: 1 });

      return () => {};
    }, element);

    return () => ctx.revert(); // cleanup
  });

  return (
    <div className="greetings" ref={element}>
      <div className="greetings_wrapper">
        <p className="greetings_description">
          Oh forgot to say, but thank you for waiting those 2 seconds at the
          beginning!
        </p>
      </div>
    </div>
  );
}
