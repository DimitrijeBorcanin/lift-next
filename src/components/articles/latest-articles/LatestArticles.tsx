import Loading from "@/components/common/loading/Loading"
import { IArticle } from "@/interfaces/IArticle"
import ArticleThumbnail from "../article-thumbnail/ArticleThumbnail"
import styles from "./LatestArticles.module.scss"

const LatestArticles: React.FC<ILatestArticlesProps> = ({articles}) => {
    return (
        <>
            <section id="latestNews" className={`${styles.latestArticles}`}>
                {articles.length === 0 ? (
                    <article className="col-span-3 flex items-center justify-center">
                        <Loading />
                    </article>
                ) : null}
                {articles.map((article: IArticle) => (
                    <ArticleThumbnail article={article} key={article.id} />
                ))}
            </section>
            <section className={`${styles.latestArticlesSm}`}>
                {articles.length === 0 ? (
                    <article className="w-full">
                        <Loading />
                    </article>
                ) : null}
                {articles.map((article: IArticle) => (
                    <ArticleThumbnail article={article} key={article.id} />
                ))}
            </section>
        </>
    )
}

interface ILatestArticlesProps {
    articles: IArticle[]
}

export default LatestArticles