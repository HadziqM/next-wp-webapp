import { motion } from "framer-motion";
import Backdrop from "./backdrop";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface Props {
  text?: string;
  handleClose: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

export default function Modal({ handleClose }: Props) {
  const dropIn = {
    hiden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.2,
        damping: 25,
        type: "spring",
        stiffness: 500,
      },
    },
    exit: { y: "100vh", opacity: 0 },
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation}
        className="w-[clamp(50%,700px,90%)] h-[min(50%,300px)] m-auto p-8 rounded-md flex flex-col items-center bg-black text-white"
        variants={dropIn}
        initial="hiden"
        exit="exit"
        animate="visible"
      >
        <h1 className="font-bold mb-auto text-2xl">Welcome Back.</h1>
        <button
          onClick={(e) => {
            e.preventDefault;
            signIn("google");
          }}
          className="px-4 py-1 rounded-full bg-gray-800 my-1 flex items-center gap-1"
        >
          <FaGoogle />
          Login With Google
        </button>
        <button
          onClick={(e) => {
            e.preventDefault;
            signIn("github");
          }}
          className="px-4 py-1 rounded-full bg-gray-800 my-1 flex items-center gap-1"
        >
          <FaGithub />
          Login With Github
        </button>
        <button
          onClick={(e) => {
            e.preventDefault;
            signIn("discord");
          }}
          className="px-4 py-1 rounded-full bg-gray-800 my-1 flex items-center gap-1"
        >
          <FaDiscord />
          Login With Discord
        </button>
        <button
          onClick={handleClose}
          className="px-2 py-[0.1rem] rounded-full bg-red-700 hover:bg-red-600 my-1 text-white"
        >
          Close
        </button>
      </motion.div>
    </Backdrop>
  );
}
