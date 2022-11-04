import Image from "next/image";
import bg from "../public/logo.svg";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  return (
    <header className="container-out bg-black text-white">
      <div className="container-in">
        <div className="flex flex-col items-center">
          <Image src={bg} alt="Logo Masjid" width={48} height={48} />
          <h2 className="text-gold uppercase font-extralight">Masjid Akbar</h2>
          <h2 className="text-gold uppercase font-extralight">
            Mo'edhar Arifin
          </h2>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div>
            <Link
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              Beranda
            </Link>
            <Link
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              profile
            </Link>
            <Link
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              kajian kitab
            </Link>
            <Link
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              agenda
            </Link>
            <Link
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              podcast
            </Link>
            <Link
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              kontak
            </Link>
          </div>
          <div className="flex my-2">
            <FaYoutube className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
            <FaFacebook className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
            <FaInstagram className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
            <FaWhatsapp className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
            <FaTiktok className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
            <FaEnvelope className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
