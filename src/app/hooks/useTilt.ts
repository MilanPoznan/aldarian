import { useEffect, RefObject } from "react";
import { vec2, rafManager } from "../utils/utils";
interface TiltOptions {
  target?: HTMLElement[];
}

export const useTilt = (ref: RefObject<HTMLElement>, options?: TiltOptions): void => {
  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;
    const target = options?.target || [node];
    let lerpAmount = 0.06;
    const rotDeg = { current: vec2(), target: vec2() };
    const bgPos = { current: vec2(), target: vec2() };

    const onMouseMove = ({ offsetX, offsetY }: MouseEvent) => {
      lerpAmount = 0.1;

      target.forEach((el) => {
        const ox = (offsetX - el.clientWidth * 0.5) / (Math.PI * 3);
        const oy = -(offsetY - el.clientHeight * 0.5) / (Math.PI * 4);

        rotDeg.target.set(ox, oy);
        bgPos.target.set(-ox * 0.3, oy * 0.3);
      });
    };

    const onMouseLeave = () => {
      lerpAmount = 0.06;
      rotDeg.target.set(0, 0);
      bgPos.target.set(0, 0);
    };

    const ticker = () => {
      rotDeg.current.lerp(rotDeg.target, lerpAmount);
      bgPos.current.lerp(bgPos.target, lerpAmount);

      target.forEach((el) => {
        el.style.setProperty("--rotX", `${rotDeg.current.y.toFixed(2)}deg`);
        el.style.setProperty("--rotY", `${rotDeg.current.x.toFixed(2)}deg`);
        el.style.setProperty("--bgPosX", `${bgPos.current.x.toFixed(2)}%`);
        el.style.setProperty("--bgPosY", `${bgPos.current.y.toFixed(2)}%`);
      });
    };

    rafManager.add(ticker);

    node.addEventListener("mousemove", onMouseMove);
    node.addEventListener("mouseleave", onMouseLeave);

    return () => {
      rafManager.remove(ticker);
      node.removeEventListener("mousemove", onMouseMove);
      node.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [ref, options]);
};
