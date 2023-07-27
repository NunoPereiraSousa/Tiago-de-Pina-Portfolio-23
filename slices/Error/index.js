import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import useIsomorphicLayoutEffect from "@/components/Animations/useIsomorphicLayoutEffect";
import gsap from "gsap";
import { useRef } from "react";

/**
 * @typedef {import("@prismicio/client").Content.ErrorSlice} ErrorSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ErrorSlice>} ErrorProps
 * @param {ErrorProps}
 */
const Error = ({ slice }) => {
  const element = useRef(null);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap
        .timeline({ repeat: -1 })
        .to(".error_headline .heading", {
          duration: 60,
          xPercent: -50,
          ease: "none",
        })
        .set(".error_headline .heading", { xPercent: 0 });

      return () => {};
    }, element);

    return () => ctx.revert(); // cleanup
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="error"
      data-scroll-section
      ref={element}
    >
      <div className="error_wrapper">
        <div className="error_headlines">
          <div className="error_headline">
            <PrismicRichText field={slice?.primary.headline} />
          </div>
          <div className="error_headline">
            <PrismicRichText field={slice?.primary.headline} />
          </div>
        </div>
        <div className="error_description">
          <PrismicRichText field={slice?.primary.description} />
        </div>
        <div className="error_button_wrapper">
          <PrismicLink
            className="error_button"
            href={slice?.primary.button_link}
          >
            &#91;&nbsp;
            <PrismicText field={slice?.primary.button_label} />
            &nbsp;&#93;
          </PrismicLink>
        </div>
      </div>
    </section>
  );
};

export default Error;
