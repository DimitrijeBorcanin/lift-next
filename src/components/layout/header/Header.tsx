import { ILink, ILinkIcon } from "@/interfaces/ILink"
import { menuLinks, socialLinks } from "@/helpers/consts/MenuConsts"
import { useRef, useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import Link from "next/link"
import Image from "next/image"
import styles from "./Header.module.scss"
import Hamburger from "hamburger-react"
import { useRouter } from "next/router"

const Header: React.FC = () => {
    const menuItems: ILink[] = menuLinks
    const socialItems: ILinkIcon[] = socialLinks
    const router: any = useRouter();

    const [isOpen, setOpen] = useState<boolean>(false)
    const springsMenu = useSpring({
        x: !isOpen ? 500 : 0,
        opacity: !isOpen ? 0 : 1
    })
    const springsHeader = useSpring({
        maxHeight: !isOpen ? 60 : 1000,
        opacity: 1,
        delay: !isOpen ? 30 : 0
    })

    const handleOnLinkClick = () => {
        const windowWidth = window.innerWidth;
        if(windowWidth <= 700){
            setOpen(false);
        }
    }

    const handleHamburgerClick = () => {
        const windowWidth = window.innerWidth;
        if(!isOpen && windowWidth <= 700 && router.query.hasOwnProperty("links")){
            router.push('/')
        }
    }

    return (
        <animated.header style={springsHeader} className={`${styles.header} ${router.pathname != '/' ? styles.headerFill : ''}`}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image id="logo" src="/assets/img/Lift-Logo-2022.svg" alt="Lift logo" width={100} height={100} className={styles.logo} />
                </Link>
            </div>
            <nav className={styles.nav}>
                <div className={`${styles.menu}`}>
                    <animated.ul style={springsMenu} onClick={handleOnLinkClick}>
                        <li className={styles.pageMenu}>
                            {menuItems.map((item: ILink, index: number) => (
                                <div key={index}><Link href={item.link}>{item.title}</Link></div>
                            ))}
                        </li>
                        <li className={styles.socialMenu}>
                                {socialItems.map((item: ILinkIcon, index: number) => (
                                    <div key={index} className={styles.socialIcon}><a href={item.link} target="_blank"><i className={item.icon}></i></a></div>
                                ))}
                        </li>
                    </animated.ul>
                </div>
                <Hamburger toggled={isOpen} toggle={setOpen} size={20} onToggle={handleHamburgerClick} />
            </nav>
        </animated.header>
    )
}

export default Header