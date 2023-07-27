"use client";

import Links from "../Typography/Links";
import EmailLink from "../Elements/EmailLink";
import { useState, useRef, useLayoutEffect } from "react";
import Logo from "../Elements/Logo";
import { SplitText } from "gsap/dist/SplitText";
import MobileNavigationLink from "./MobileNavigtionLink";
import { gsap } from "gsap";

export default function MobileNavigation({ navigation }) {
  const [navbarOpened, setNavbarOpened] = useState(false);
  gsap.registerPlugin(SplitText);

  const navbar = useRef(null);
  const link = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".navigation_background", {
        scaleY: 0,
        transformOrigin: "0 0",
      });
      // let parentSplit = new SplitText(link.current, {
      //   type: "chars",
      //   charsClass: "line-parent",
      // });
      // let childSplit = new SplitText(link.current, {
      //   type: "chars",
      //   charsClass: "line-child",
      // });
      // console.log("====================================");
      // console.log(childSplit);
      // console.log("====================================");
    }, navbar); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, []);

  const onClickHamburgerHandler = () => {
    let openTl = gsap.timeline({
      ease: "expo.out",
    });

    let closeTl = gsap.timeline({
      ease: "expo.out",
    });

    if (navbarOpened === false) {
      openTl.to(".navigation_background", {
        scaleY: 1,
        duration: 0.6,
      });
      // openTl.fromTo(
      //   childSplit.chars,
      //   {
      //     yPercent: -100,
      //   },
      //   {
      //     yPercent: 0,
      //     stagger: 0.015,
      //     ease: Power2.easeOut,
      //     duration: 0.75,
      //     delay: 0.5,
      //   }
      // );

      setNavbarOpened(true);
    } else {
      closeTl.to(".navigation_background", {
        scaleY: 0,
        duration: 0.6,
      });
      setNavbarOpened(false);
    }

    // navbarOpened === false ? setNavbarOpened(true) : setNavbarOpened(false);
  };

  return (
    <div className="navigation mobile-navigation" ref={navbar}>
      <div className="navigation_background"></div>
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
                <path d="M1.5 15.5L15.5 1.5" stroke="#ffffff" strokeWidth="2" />
                <path d="M1 1.5L16 15.5" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="navigation_mobile_links">
            {navigation?.data?.slices.map((item, index) => (
              <>
                {item.slice_type === "navigation_item" && (
                  <div className="navigation_link_wrapper" key={index}>
                    <MobileNavigationLink
                      ref={link}
                      link={item.primary.link}
                      name={item.primary.name}
                      isMobile={true}
                    />
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
                            key={index}
                            text={s.social_media.data.name[0].text}
                            showFullEmail={false}
                          />
                        ) : (
                          <Links
                            key={index}
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
