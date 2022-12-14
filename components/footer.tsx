import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
  FaLocationArrow,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-screen grid grid-cols-4 bg-black text-white p-4">
      <div className="container-col justify-start items-start">
        <h2 className="text-sm my-2">MASJID AKBAR MOED’HAR ARIFIN</h2>
        <p className="text-xs">
          Penamaan Masjid Akbar Moed’Har Arifin diambil dari nama dua bersaudara
          pendiri PT. Polowijo Gosari.
        </p>
      </div>
      <div className="container-col">
        <Link
          className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
          href="/post"
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
          href="/post/category"
        >
          post
        </Link>
      </div>
      <div className="container-col">
        <Link
          className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
          href="/infaq"
        >
          infaq
        </Link>
        <Link
          className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
          href="/author"
        >
          Author
        </Link>
        <Link
          className="uppercase ml-2 hover:bg-opacity-20 hover:bg-gold p-1 rounded-lg"
          href="/kontak"
        >
          Kontak
        </Link>
      </div>
      <div className="container-col items-start gap-2">
        <h2 className="text-sm my-2">KONTAK</h2>
        <div className="flex gap-2 justify-center items-center">
          <FaWhatsapp className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
          <p className="text-xs">081 23 2222 535</p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <FaEnvelope className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
          <p className="text-xs">masjidakbarmoedhararifin@gmail.com</p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <FaLocationArrow className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
          <p className="text-xs">
            Jl. Raya Deandles No.KM 32, Gedangan, Kec. Sidayu, Kabupaten Gresik,
            Jawa Timur 61153
          </p>
        </div>
        <div className="flex">
          <FaYoutube className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
          <FaFacebook className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
          <FaInstagram className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
          <FaTiktok className="text-white ml-1 hover:text-gold cursor-pointer w-4 h-4" />
        </div>
      </div>
    </footer>
  );
}
