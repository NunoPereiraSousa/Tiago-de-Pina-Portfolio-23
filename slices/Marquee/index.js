import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.MarqueeSlice} MarqueeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MarqueeSlice>} MarqueeProps
 * @param {MarqueeProps}
 */
const Marquee = ({ slice }) => {
  return (
    // <section
    //   data-slice-type={slice.slice_type}
    //   data-slice-variation={slice.variation}
    //   className="marquee"
    // >
    //   <div className="marquee_wrapper">
    //     {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
    //       <div className="marquee_label_wrapper" key={index}>
    //         <div className="marquee_label">
    //           <PrismicRichText field={slice?.primary.label} />
    //         </div>
    //         <p className="marquee_label">◆</p>
    //       </div>
    //     ))}
    //   </div>
    // </section>
    <></>
  );
};

export default Marquee;
