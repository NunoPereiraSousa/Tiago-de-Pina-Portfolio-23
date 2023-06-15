import "../styles/index.scss";
import "locomotive-scroll/dist/locomotive-scroll.css";

import Link from "next/link";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName, linkResolver } from "../prismicio";
import { Paragraph } from "../components/Typography/Paragraph";
import { Heading } from "../components/Typography/Heading";
import { useRef } from "react";
import {
  LocomotiveScrollProvider,
  useLocomotiveScroll,
} from "react-locomotive-scroll";
import { useRouter } from "next/router";
import Grain from "@/components/Grain";
import ScrollTriggerProxy from "@/components/ScrollTriggerProxy";
import { SwitchTransition, Transition } from "react-transition-group";
import gsap from "gsap";

const richTextComponents = {
  paragraph: ({ children }) => <Paragraph size="sm">{children}</Paragraph>,
  heading1: ({ children }) => (
    <Heading as="h1" size="xxl">
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="xl">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="lg">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="md">
      {children}
    </Heading>
  ),
  heading5: ({ children }) => (
    <Heading as="h5" size="sm">
      {children}
    </Heading>
  ),
  heading6: ({ children }) => (
    <Heading as="h6" size="xsm">
      {children}
    </Heading>
  ),
  oList: ({ children }) => <ol className="">{children}</ol>,
  oListItem: ({ children }) => <li className="">{children}</li>,
  list: ({ children }) => <ul className="">{children}</ul>,
  listItem: ({ children }) => <li className="">{children}</li>,
  preformatted: ({ children }) => (
    <pre className="">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicLink field={node.data} className="">
      {children}
    </PrismicLink>
  ),
};

const NextLinkShim = ({ href, children, locale, ...props }) => {
  return (
    <Link href={href} locale={locale} legacyBehavior>
      <a {...props}>{children}</a>
    </Link>
  );
};

export default function App({ Component, pageProps }) {
  const element = useRef(null);
  const containerRef = useRef(null);
  const { scroll } = useLocomotiveScroll();
  const { asPath } = useRouter(); // With next/router

  //   useEffect(() => {
  //     gsap.to(element.current, {
  //       opacity: 1,
  //       ease: "expo.out",
  //       duration: 2,
  //       delay: 0.35,
  //     });
  //   }, []);
  const router = useRouter();

  const onPageEnter = (node) => {
    gsap.fromTo(
      "#sticky",
      {
        y: 100,
        autoAlpha: 0,
        ease: "expo.out",
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
      }
    );
  };

  const onPageExit = (node) => {
    gsap.fromTo(
      "#sticky",
      {
        y: 0,
        autoAlpha: 1,
        ease: "expo.out",
      },
      {
        y: -100,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.inOut",
      }
    );
  };

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        // lerp: 0.2,
        // multiplier: 1,
        // ... all available Locomotive Scroll instance options
      }}
      watch={
        [
          //..all the dependencies you want to watch to update the scroll.
          //  Basicaly, you would want to watch page/location changes
          //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
        ]
      }
      location={asPath}
      containerRef={containerRef}
      onLocationChange={(scroll) =>
        scroll.scrollTo(0, { duration: 0, disableLerp: true })
      } // If you want to reset the scroll position to 0 for example
      onUpdate={() => console.log("Updated, but not on location change!")} // Will trigger on
    >
      <ScrollTriggerProxy />
      <main data-scroll-container ref={containerRef} id="sticky">
        <Grain />
        <PrismicProvider
          linkResolver={linkResolver}
          internalLinkComponent={NextLinkShim}
          richTextComponents={richTextComponents}
        >
          <PrismicPreview repositoryName={repositoryName}>
            <SwitchTransition>
              <Transition
                key={router.asPath} // our route as a key
                timeout={500}
                in={true}
                onEnter={onPageEnter} // our enter animation
                onExit={onPageExit} // our exit animation
                // mountOnEnter={true}
                // unmountOnExit={true}
              >
                <Component {...pageProps} />
              </Transition>
            </SwitchTransition>
          </PrismicPreview>
        </PrismicProvider>
      </main>
    </LocomotiveScrollProvider>
  );
}
