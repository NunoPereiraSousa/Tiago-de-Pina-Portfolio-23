import { PrismicRichText } from "@prismicio/react";
import Figure from "@/components/Elements/Figure";

/**
 * @typedef {import("@prismicio/client").Content.HeroWorksSlice} HeroWorksSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroWorksSlice>} HeroWorksProps
 * @param {HeroWorksProps}
 */
const HeroWorks = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero_works"
      data-scroll-section
    >
      <div className="hero_works_wrapper">
        <div className="hero_works_content">
          <div className="hero_works_headline">
            <PrismicRichText field={slice?.primary.headline} />
          </div>

          <div className="hero_works_description">
            <PrismicRichText field={slice?.primary.description} />
          </div>

          <div className="hero_works_arrows">
            {[0, 1, 2].map((item) => (
              <div className="hero_works_arrow_wrapper" key={item}>
                <svg
                  className="hero_works_arrow"
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 17.0769L16 30L29 17.0769M16 28.2051L16 2"
                    stroke="#DC6FD1"
                    strokeWidth="4"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <Figure
          figureClassName="hero_works_figure"
          imageClassName="hero_works_image"
          image={slice?.primary.image}
        />
      </div>
    </section>
  );
};

export default HeroWorks;
