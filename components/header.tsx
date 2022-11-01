import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

export default function Header() {
  return (
    <header className="container-out bg-black text-white">
      <div className="container-in">
        <div className="flex flex-col items-center">
          <img className="w-12 h-12" src="/logo.svg" />
          <h4 className="text-gold uppercase font-extralight">Masjid Akbar</h4>
          <h4 className="text-gold uppercase font-extralight">
            Mo'edhar Arifin
          </h4>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div>
            <a
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              Beranda
            </a>
            <a
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              profile
            </a>
            <a
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              kajian kitab
            </a>
            <a
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              agenda
            </a>
            <a
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              podcast
            </a>
            <a
              className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
              href="/"
            >
              kontak
            </a>
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
