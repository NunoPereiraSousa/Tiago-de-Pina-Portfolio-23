import { PrismicLink, PrismicText } from "@prismicio/react";
import DoubleText from "../Animations/DoubleText";
import { useRouter } from "next/router";

export default function NavigationLink({ link, name, isMobile }) {
  const router = useRouter();

  return (
    <DoubleText isMobile={isMobile}>
      <PrismicLink
        href={link.url}
        className={
          router.asPath === link.url
            ? "navigation_link active"
            : "navigation_link"
        }
      >
        <PrismicText field={name} />
      </PrismicLink>
    </DoubleText>
  );
}
