import { PrismicRichText, PrismicText, PrismicLink } from "@prismicio/react";
import React from "react";
import NavigationLink from "./Navigation/NavigationLink";

const Header = ({ navigation }) => {
  return (
    <nav className="navigation">
      <div className="navigation_wrapper">
        <div className="navigation_logo">
          <PrismicLink
            href={navigation?.data?.logo_link.url}
            className="navigation_link"
          >
            <PrismicText field={navigation?.data?.logo} />
          </PrismicLink>
        </div>

        <div className="navigation_links">
          {navigation?.data?.slices.map((item, index) => (
            <NavigationLink
              key={index}
              link={item.primary.link}
              name={item.primary.name}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
