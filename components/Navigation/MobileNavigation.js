import { PrismicLink, PrismicText } from "@prismicio/react";
import { gsap } from "gsap";
import NavigationLink from "./NavigationLink";
import Links from "../Typography/Links";
import EmailLink from "../Elements/EmailLink";
import { useState } from "react";
import Logo from "../Elements/Logo";

export default function MobileNavigation({ navigation }) {
  const [navbarOpened, setNavbarOpened] = useState(false);

  const onClickHamburgerHandler = () => {
    console.log("====================================");
    console.log("Hamburger clicked!");
    console.log("====================================");

    navbarOpened === false ? setNavbarOpened(true) : setNavbarOpened(false);
  };

  return (
    <div className="navigation mobile-navigation">
      {navbarOpened === false ? (
        <div className="navigation_actions">
          <Logo
            url={navigation?.data?.logo_link.url}
            logo={navigation?.data.logo}
          />

          <div
            className="navigation_hamburger"
            onClick={onClickHamburgerHandler}
          >
            <span className="navigation_hamburger_lines"></span>
            <span className="navigation_hamburger_lines"></span>
          </div>
        </div>
      ) : (
        <>
          <div className="navigation_actions">
            <Logo
              url={navigation?.data?.logo_link.url}
              logo={navigation?.data.logo}
            />

            <div className="navigation_cross" onClick={onClickHamburgerHandler}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.5 15.5L15.5 1.5" stroke="white" stroke-width="2" />
                <path d="M1 1.5L16 15.5" stroke="white" stroke-width="2" />
              </svg>
            </div>
          </div>

          <div className="navigation_mobile_links">
            {navigation?.data?.slices.map((item, index) => (
              <>
                {item.slice_type === "navigation_item" && (
                  <div className="navigation_link_wrapper">
                    <span className="navigation_link_border"></span>
                    <NavigationLink
                      key={index}
                      link={item.primary.link}
                      name={item.primary.name}
                      isMobile={true}
                    />
                    <span className="navigation_link_border"></span>
                  </div>
                )}
              </>
            ))}
          </div>

          <div className="navigation_socials">
            {navigation?.data?.slices.map((item, index) => (
              <>
                {item.slice_type === "navigation_social_media_links" && (
                  <>
                    {item.items.map((s, i) => (
                      <>
                        {s.social_media.type === "contacts" ? (
                          <EmailLink
                            text={s.social_media.data.name[0].text}
                            showFullEmail={false}
                          />
                        ) : (
                          <Links
                            url={s.social_media.data.link.url}
                            text={s.social_media.data.name}
                            className="navigation_social_media_link"
                          />
                        )}
                      </>
                    ))}
                  </>
                )}
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
