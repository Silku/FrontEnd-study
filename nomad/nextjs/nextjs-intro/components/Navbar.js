import Link from "next/link"
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();

    return (
        <>
            <nav>
                <Link 
                    href="/"
                    legacyBehavior
                    >
                    <a className={router.pathname==="/" ? "active" : "" }>Home</a>
                </Link>
                <Link 
                    
                    href="/about"
                    legacyBehavior
                    >
                    <a className={router.pathname==="/about" ? "active" : "" }>About</a>
                </Link>
                <style jsx>{`
                nav{
                    /* background-color:red; */
                }
                a{
                    text-decoration: none;
                }
                .active{
                    color:blue;
                    font-size:16px;
                }
                `}</style>
            </nav>
        </>
    )
}

export default Navbar