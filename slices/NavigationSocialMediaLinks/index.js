/**
 * @typedef {import("@prismicio/client").Content.NavigationSocialMediaLinksSlice} NavigationSocialMediaLinksSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NavigationSocialMediaLinksSlice>} NavigationSocialMediaLinksProps
 * @param {NavigationSocialMediaLinksProps}
 */
const NavigationSocialMediaLinks = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for navigation_social_media_links (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default NavigationSocialMediaLinks;
