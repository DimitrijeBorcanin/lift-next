import styles from "./ArticlePlaceholder.module.scss"

const ArticlePlaceholder: React.FC = () => {
    return (
        <div className={styles.newsArticlePlaceholder}>
            <div className="flex justify-between items-strech">
                <div className="w-1/2">
                    <div className={styles.titlePlaceholder}></div>
                    <div className={styles.subtitlePlaceholder}></div>
                </div>
                <div className={styles.datePlaceholder}></div>
            </div>
            <div className={styles.imagePlaceholder}></div>
            <div className={styles.newsTextPlaceholder}></div>
        </div>
    )
}

export default ArticlePlaceholder