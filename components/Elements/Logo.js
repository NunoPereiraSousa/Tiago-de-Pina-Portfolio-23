import { PrismicText, PrismicLink } from "@prismicio/react";

export default function Logo({ url, logo }) {
  return (
    <PrismicLink href={url} className="navigation_logo">
      <PrismicText field={logo} />
    </PrismicLink>
  );
}
