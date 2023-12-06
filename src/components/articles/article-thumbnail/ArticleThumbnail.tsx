import { IArticle } from "@/interfaces/IArticle"
import { useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import { useRouter } from "next/router"
import styles from "./ArticleThumbnail.module.scss"
import Image from "next/image"

const ArticleThumbnail: React.FC<IArticleThumbnailProps> = ({article}) => {
    const [isOpen, setOpen] = useState<boolean>(false)
    const springs = useSpring({
        opacity: !isOpen ? 0 : 1,
        y: !isOpen ? 500 : 0
    })
    const router = useRouter()

    return (
        <article
            className={styles.newsThumbnail}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={() => router.push(`/vesti/${article.id}`)}
        >
            <animated.div style={springs} className={styles.thumbnailText}>
                <h1>{article.title}</h1>
                <p>{article.subtitle}</p>
            </animated.div>
            <Image src={article.image} alt={article.title} fill />
        </article>
    )
}

interface IArticleThumbnailProps {
    article: IArticle
}

export default ArticleThumbnail