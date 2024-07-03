import Link from "next/link";

export default function RootLayout({ children }) {
    return (
      <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
        <mian className="flex-1">{children}</mian>
      </div>
    );
  }