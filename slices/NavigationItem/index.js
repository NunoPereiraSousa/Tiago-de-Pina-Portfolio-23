import { PrismicLink, PrismicText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.NavigationItemSlice} NavigationItemSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NavigationItemSlice>} NavigationItemProps
 * @param {NavigationItemProps}
 */
const NavigationItem = ({ slice }) => {
  return (
    <PrismicLink href={slice?.primary.link} className="navigation_link">
      <PrismicText field={slice?.primary.name} />
    </PrismicLink>
  );
};

export default NavigationItem;
