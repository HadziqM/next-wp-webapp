import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  animate: string;
  image: string;
}

export default function Box2({ children, animate, image }: Props) {
  const control = useAnimation();
  const control2 = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) control.start("visible");
    if (inView) control2.start("visible2");
  }, [control, control2, inView]);
  const boxVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
      x: 0,
    },
    right: { opacity: 0, scale: 0, x: 400 },
    left: { opacity: 0, scale: 0, x: -400 },
    right2: { opacity: 0, x: 200 },
    left2: { opacity: 0, x: -200 },
    visible2: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5 },
      x: 0,
    },
  };
  return (
    <section className="flex justify-center items-center w-screen h-[150vh] z-50">
      <motion.div
        ref={ref}
        className="flex justify-center items-center "
        animate={control}
        initial={animate}
        variants={boxVariant}
      >
        {animate == "left" ? (
          <>
            <div
              className={`bg-${image} h-[566px] w-[319px] bg-cover bg-center shadow-dark-blue shadow-2xl translate-x-4`}
            />
            <motion.div
              ref={ref}
              className="flex justify-center items-center flex-col w-[375px] h-[478px] bg-[rgba(255,255,255,0.3)] rounded-lg "
              animate={control2}
              initial={animate + "2"}
              variants={boxVariant}
            >
              {children}
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              ref={ref}
              className="flex justify-center items-center flex-col w-[375px] h-[478px] bg-[rgba(255,255,255,0.3)] rounded-lg"
              animate={control2}
              initial={animate + "2"}
              variants={boxVariant}
            >
              {children}
            </motion.div>
            <div
              className={`bg-${image} h-[566px] w-[319px] bg-cover bg-center shadow-dark-blue shadow-2xl -translate-x-4`}
            />
          </>
        )}
      </motion.div>
    </section>
  );
}
