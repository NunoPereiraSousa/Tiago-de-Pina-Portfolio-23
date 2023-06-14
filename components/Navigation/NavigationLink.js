import { PrismicLink, PrismicText } from "@prismicio/react";

export default function NavigationLink({ link, name }) {
  return (
    <PrismicLink href={link.url} className="navigation_link">
      <PrismicText field={name} />
    </PrismicLink>
  );
}
