import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="flex-center wrapper flex flex-col gap-4 text-center">
                <Link href="/">
                 <Image src="/assets/images/logo192.png"
                    alt="EventGO Logo" width={60} height={60} 
                 />
                </Link>
                <p>2024 EventGo. All Rights reserved.</p>
            </div>
        </footer>
    );
}
export default Footer;