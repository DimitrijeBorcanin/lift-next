import Header from "./header/Header"
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Layout: React.FC<ILayoutProps> = ({children}) => {
    const router = useRouter()
    return (
        <>
            <Header />
            <motion.div
                key={router.route}
                initial="initialState"
                animate="animateState"
                exit="exitState"
                variants={{
                initialState: {
                    opacity: 0,
                    x: '-5%'
                },
                animateState: {
                    opacity: 1,
                    x: 0
                },
                exitState: {
                }
                }}
                transition={{
                ease: "easeInOut",
                duration: "0.5"
                }}
            >
                <main>{children}</main>
            </motion.div>
        </>
    )
}

interface ILayoutProps {
    children: React.ReactNode
}

export default Layout