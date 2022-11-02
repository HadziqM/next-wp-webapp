import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  animate: string;
}

export default function Box({ children, animate }: Props) {
  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) control.start("visible");
  }, [control, inView]);
  const boxVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
      x: 0,
    },
    right: { opacity: 0, scale: 0, x: 400 },
    left: { opacity: 0, scale: 0, x: -400 },
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
        {children}
      </motion.div>
    </section>
  );
}
