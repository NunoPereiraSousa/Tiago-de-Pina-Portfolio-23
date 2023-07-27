import { useContext } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useRouter } from "next/router";
import gsap from "gsap";

import TransitionContext from "../../context/TransitionContext";
import Greetings from "../Greetings";

const TransitionComponent = ({ children }) => {
  const router = useRouter();
  const { toggleCompleted } = useContext(TransitionContext);
  return (
    <SwitchTransition>
      <Transition
        key={router.asPath}
        timeout={500}
        onEnter={(node) => {
          <Greetings />;
          toggleCompleted(false);
          gsap.set(node, { autoAlpha: 0 });
          gsap
            .timeline({
              paused: true,
              onComplete: () => toggleCompleted(true),
            })
            .to(node, { autoAlpha: 1, duration: 0.3 })
            .play();
        }}
        onExit={(node) => {
          gsap
            .timeline({ paused: true })
            .to(node, { autoAlpha: 0, duration: 0.3 })
            .play();
        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
