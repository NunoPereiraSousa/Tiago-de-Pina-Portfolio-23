import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.ErrorSlice} ErrorSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ErrorSlice>} ErrorProps
 * @param {ErrorProps}
 */
const Error = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="error"
      data-scroll-section
    >
      <div className="error_wrapper">
        <div className="error_headline">
          <PrismicRichText field={slice?.primary.headline} />
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
