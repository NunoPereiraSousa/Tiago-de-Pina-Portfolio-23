import "../styles/index.scss";
import "locomotive-scroll/dist/locomotive-scroll.css";

import Link from "next/link";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName, linkResolver } from "../prismicio";
import Heading from "@/components/Typography/Heading";
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
import Paragraph from "@/components/Typography/Paragraph";
import TransitionComponent from "../components/Animations/Transition";
import { TransitionProvider } from "../context/TransitionContext";
import { AnimationsProvider } from "@/context/AnimationsContext";

const richTextComponents = {
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
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
  oListItem: ({ children }) => (
    <li>
      <Paragraph>{children}</Paragraph>
    </li>
  ),
  list: ({ children }) => <ul>{children}</ul>,
  listItem: ({ children }) => (
    <li>
      <Paragraph>{children}</Paragraph>
    </li>
  ),
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

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        tablet: {
          smooth: true,
        },
        smartphone: {
          smooth: true,
        },
        lerp: 0.2,
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
        setTimeout(() => {
          scroll.scrollTo(0, { duration: 0, disableLerp: true });
        }, 500)
      }
    >
      <ScrollTriggerProxy />
      <AnimationsProvider>
        <main data-scroll-container ref={containerRef} id="sticky">
          <Grain />
          <PrismicProvider
            linkResolver={linkResolver}
            internalLinkComponent={NextLinkShim}
            richTextComponents={richTextComponents}
          >
            <PrismicPreview repositoryName={repositoryName}>
              <TransitionProvider>
                <div className="content-container">
                  <TransitionComponent>
                    <Component {...pageProps} />
                  </TransitionComponent>
                </div>
              </TransitionProvider>
            </PrismicPreview>
          </PrismicProvider>
        </main>
      </AnimationsProvider>
    </LocomotiveScrollProvider>
  );
}
