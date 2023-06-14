import Figure from "@/components/Elements/Figure";
import Links from "@/components/Typography/Links";
import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.HeroHomepageSlice} HeroHomepageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroHomepageSlice>} HeroHomepageProps
 * @param {HeroHomepageProps}
 */
const HeroHomepage = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero"
      data-scroll-section
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

            <Links
              className="hero_button"
              isEmail={true}
              text={slice?.primary.button_label}
            />
          </div>
          <div className="hero_line">
            <div className="hero_headline">
              <PrismicRichText field={slice?.primary.headline_4} />
            </div>
            <div className="hero_description">
              <PrismicRichText field={slice?.primary.description} />
            </div>
            <div className="hero_headline">
              <PrismicRichText field={slice?.primary.headline_5} />
            </div>
            <div className="hero_description">
              <PrismicRichText field={slice?.primary.description_2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;
