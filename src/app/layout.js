import { Geist, Geist_Mono, Poppins, Roboto} from "next/font/google";
import "./globals.css";
import Navbar from "@/component/navbar";
import PopUp from "@/component/popup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({ weight: ["700"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export const metadata = {
  title: "Short Docs",
  description: "Short documentations in one place",
  icons:
  {
    icon: "/shortdocs.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${poppins.className} antialiased`}>
          <Navbar />
          <main className="">
            {children}
          </main>
          <PopUp />
      </body>
    </html>
  );
}
