import DoubleText from "@/components/Animations/DoubleText";
import Figure from "@/components/Elements/Figure";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { gsap } from "gsap";
import { useRef } from "react";
import useIsomorphicLayoutEffect from "@/components/Animations/useIsomorphicLayoutEffect";

/**
 * @typedef {import("@prismicio/client").Content.HeroHomepageSlice} HeroHomepageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroHomepageSlice>} HeroHomepageProps
 * @param {HeroHomepageProps}
 */
const HeroHomepage = ({ slice }) => {
  const element = useRef(null);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero_button",
        {
          autoAlpha: 0,
          animationPlayState: "paused",
        },
        {
          autoAlpha: 1,
          delay: 1,
          duration: 1,
          animationPlayState: "running",
          ease: "expo.out",
        }
      );

      return () => {};
    }, element);

    return () => ctx.revert(); // cleanup
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero"
      data-scroll-section
      ref={element}
    >
      <div className="hero_wrapper">
        <div className="hero_grid">
          <div className="hero_line">
            <div className="hero_headline">
              <PrismicRichText field={slice?.primary.headline_1} />
            </div>
            <Figure
              figureClassName="hero_figure"
              imageClassName="hero_image"
              image={slice?.primary.image}
            />

            <div className="hero_headline">
              <PrismicRichText field={slice?.primary.headline_2} />
            </div>
            <Figure
              figureClassName="hero_figure"
              imageClassName="hero_image"
              image={slice?.primary.image_2}
            />
          </div>
          <div className="hero_line">
            <Figure
              figureClassName="hero_figure"
              imageClassName="hero_image"
              image={slice?.primary.image_3}
            />

            <div className="hero_headline">
              <PrismicRichText field={slice?.primary.headline_3} />
            </div>

            <div className="hero_button">
              <DoubleText>
                <PrismicLink
                  className="navigation_social_media_link"
                  href={`mailto:tiagopina20014@gmail.com`}
                >
                  Open to work
                </PrismicLink>
              </DoubleText>
            </div>
          </div>
          <div className="hero_line">
            <div className="hero_headline">
              <PrismicRichText field={slice?.primary.headline_4} />
            </div>
            <div className="hero_description">
              <PrismicRichText field={slice?.primary.description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;
