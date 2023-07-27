import { PrismicText, PrismicLink } from "@prismicio/react";
import PreloaderContext from "@/context/PreloaderContext";
import { useContext } from "react";

export default function Logo({ url, logo }) {
  const { toggleCompleted } = useContext(PreloaderContext);

  // const onClickHandler = () => {
  //   toggleCompleted(false);
  // };

  return (
    <PrismicLink href={url} className="navigation_logo">
      <PrismicText field={logo} />
    </PrismicLink>
  );
}
