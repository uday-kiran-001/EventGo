import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { cookies } from "next/headers";
import { decrypt } from "@/app/auth/stateless-session";

const Header = async () => {

    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
    
    let userId = "";
    if (session?.userId) {
        userId = session.userId;
    }
    console.log("userId: ", userId, userId.length, !userId);
    return (
        <header className="w-full border-b">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" >
                    <div className="flex flex-row">
                        <Image 
                            src="/assets/images/logo192.png" width={50} height={50}
                            alt="EventGo logo"
                        />
                    </div>
                </Link>
                
                <nav className="md:flex-between hidden w-full max-w-sm pr-5">
                    <NavItems />
                </nav>

                {!userId && <div className="hidden md:flex lg:flex gap-3">
                        <Button className="rounded-full" size="lg">
                            <Link href="/login">
                                Login
                            </Link>
                        </Button>
                        <Button className="rounded-full" size="lg">
                            <Link href="/signup">
                                Signup
                            </Link>
                        </Button>
                    </div>}

                <div className="md:hidden flex w-32 justify-end gap-3">
                    <MobileNav userId={userId} />
                </div>
            </div>
        </header>
    );
}
export default Header;