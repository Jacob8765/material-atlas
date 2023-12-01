import "@/styles/globals.css";
import ReactQueryContext from "./contexts/ReactQueryContext";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryContext>
      <html lang="en">
        <body className={`font-sans ${inter.variable} bg-white`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ReactQueryContext>
  );
}