import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Link from "next/link";

export default function RootLayout({ children }) {
    return (
      <div className="flex h-screen flex-col px-5">
        <Header/>
        <mian className="flex-1">{children}</mian>
        <Footer />
      </div>
    );
  }