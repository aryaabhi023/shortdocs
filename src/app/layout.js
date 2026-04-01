import "./globals.css";
import Navbar from "@/component/navbar";
import PopUp from "@/component/popup";

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
      <body>
          <Navbar />
          <main>
            {children}
          </main>
          <PopUp />
      </body>
    </html>
  );
}
