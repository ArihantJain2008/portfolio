import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSectionReveal(
  element: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!element.current) return;

    const el = element.current;

    gsap.set(el, {
      opacity: 0,
      y: 40,
    });

    const animation = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",

      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions:
          "play reverse play reverse",
      },
    });

    return () => {
      animation.kill();
    };
  }, [element]);
}