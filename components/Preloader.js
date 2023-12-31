import { PrismicRichText, PrismicText } from "@prismicio/react";
import { gsap } from "gsap";
import React, { useState, useRef, useContext } from "react";
import { Power2 } from "gsap";
import Figure from "./Elements/Figure";
import FontFaceObserver from "fontfaceobserver";
import useIsomorphicLayoutEffect from "./Animations/useIsomorphicLayoutEffect";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import AnimationsContext from "@/context/AnimationsContext";

let loadingImages = require("imagesloaded");

export default function Preloader({ preloader }) {
  const [percentage, setPercentage] = useState(0);

  const [fontLoaded, setFontLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { scroll } = useLocomotiveScroll();
  const { toggleCompleted } = useContext(AnimationsContext);

  const preloaderEl = useRef(null);
  const counterBox = useRef(null);
  const counterInit = useRef(null);
  const bar = useRef(null);
  const exploreButton = useRef(null);
  const counterButton = useRef(null);
  const figure = useRef(null);

  const tl = useRef();

  const onClickHandler = () => {
    gsap.set("body", {
      overflow: "visible",
    });

    gsap.to(
      [".preloader_description", ".preloader_indicator", ".preloader_figure"],
      {
        autoAlpha: 0,
        ease: Power2.easeOut,
        duration: 0.4,
      }
    );

    gsap.to(preloaderEl.current, {
      yPercent: -100,
      ease: Power2.easeOut,
      duration: 0.4,
      delay: 0.5,
    });
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        ".hero_figure",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: 0.3,
          ease: Power2.easeOut,
          duration: 1.5,
          delay: 0.75,
        }
      );

      gsap.fromTo(
        ".line-child",
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          stagger: 0.01,
          ease: Power2.easeOut,
          duration: 0.75,
          delay: 1.5,
        }
      );

      gsap.fromTo(
        ".hero_button",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: Power2.easeOut,
          duration: 0.75,
          delay: 2.25,
        }
      );
    });
  };

  const timeline = useRef(
    gsap.timeline({
      defaults: {
        ease: "back.out",
      },
    })
  );

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = timeline.current;
      scroll?.stop();

      exploreButton.current.disabled = true;

      let font1 = new FontFaceObserver("Mango Grotesque", {
        weight: 500,
        weight: 300,
      });
      let font2 = new FontFaceObserver("Neue Haas Grotesk Text Pro", {
        weight: 400,
      });

      Promise.all([font1.load(), font2.load()]).then(function (e) {
        console.log(e, "Family A & B have loaded");
        setFontLoaded(true);
      });

      let imgLoad = loadingImages(document.querySelectorAll("img"));

      imgLoad.on("done", function (instance) {
        setImagesLoaded(true);
      });

      if (fontLoaded === true && imagesLoaded === true) {
        tl.to(".preloader_container", {
          autoAlpha: 1,
          delay: 0.5,
          ease: Power2.easeOut,
          duration: 0.75,
        });

        tl.set("body", {
          overflow: "hidden",
        })
          .set(exploreButton.current, {
            cursor: "default",
          })
          .fromTo(
            bar.current,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              duration: 2,
              delay: 1,
              ease: "expo.inOut",
              onComplete: () => {
                tl.to(counterBox.current, {
                  yPercent: -100,
                  delay: 0.5,
                });

                tl.to(counterButton.current, {
                  yPercent: -100,
                  ease: "expo.inOut",
                });

                /**
                 * Button settings
                 */
                exploreButton.current.disabled = false;
                tl.set(exploreButton.current, {
                  cursor: "pointer",
                });
                scroll?.start();
                scroll?.update();

                setTimeout(() => {
                  toggleCompleted(true);
                }, 500);
              },
            }
          );
      }

      return () => ctx.revert(); // cleanup
    }, preloaderEl);
  }, [fontLoaded, imagesLoaded]);

  return (
    <div className="preloader" ref={preloaderEl}>
      <div className="preloader_wrapper">
        <div className="preloader_container">
          <div className="preloader_description">
            <PrismicRichText field={preloader?.data.description} />
          </div>

          <Figure
            figureClassName="preloader_figure"
            imageClassName="preloader_image"
            image={preloader?.data.image}
          />

          <div className="preloader_indicator">
            <div className="preloader_counter_wrapper" ref={counterBox}>
              <div className="preloader_counter_init">
                <span>&#91;&nbsp;</span>
                <p className="preloader_counter_number" ref={counterInit}>
                  {percentage}
                </p>
              </div>
              <span className="preloader_counter_bar" ref={bar}></span>
              <p className="preloader_counter_end">
                100%<span>&#93;</span>
              </p>
            </div>
            <div className="preloader_button_wrapper" ref={counterButton}>
              <button
                className="preloader_button"
                onClick={onClickHandler}
                ref={exploreButton}
              >
                &#91;&nbsp;
                <PrismicText field={preloader?.data.button_label} />
                &nbsp;&#93;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
