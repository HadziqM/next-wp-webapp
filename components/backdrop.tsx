import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function Backdrop({ children, onClick }: Props) {
  return (
    <motion.div
      onClick={onClick}
      className="top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center fixed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
