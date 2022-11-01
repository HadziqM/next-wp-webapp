import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Box({ children }: Props) {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const boxVariant = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };
  return (
    <section className="flex justify-center items-center w-screen min-h-screen">
      <motion.div
        className="flex justify-center items-center h-fit w-fit"
        animate="visible"
        initial="hidden"
        variants={boxVariant}
      >
        {children}
      </motion.div>
    </section>
  );
}
