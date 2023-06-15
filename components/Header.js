import React from "react";
import NavigationLink from "./Navigation/NavigationLink";
import DoubleText from "./Animations/DoubleText";
import Logo from "./Elements/Logo";

const Header = ({ navigation }) => {
  return (
    <nav className="navigation desktop-navigation">
      <div className="navigation_wrapper">
        <div className="navigation_logo">
          <div className="text-reveal-navigation">
            <DoubleText>
              <Logo
                url={navigation?.data?.logo_link.url}
                logo={navigation?.data?.logo}
              />
            </DoubleText>
          </div>
        </div>

        <div className="navigation_links">
          {navigation?.data?.slices.map((item, index) => (
            <>
              {item.slice_type === "navigation_item" && (
                <div className="text-reveal-navigation">
                  <NavigationLink
                    key={index}
                    link={item.primary.link}
                    name={item.primary.name}
                  />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
