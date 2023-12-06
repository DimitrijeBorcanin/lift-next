import { api, getAllArticles } from "@/api/axios-config"
import Article from "@/components/articles/article/Article"
import { IArticle } from "@/interfaces/IArticle"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"

const fetchArticle = async (id: number) => {
    const articleDb = await api.get<IArticle>(`articles/${id}`)
    return articleDb.data
}

const ArticlePage: React.FC<IArticleProps> = ({article}) => {
    const title = `LIFT // ${article?.title}`
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={article?.text} />
                <meta name="keywords" content={`${article?.title},${article?.tags.map(x => x.title).join(",")}`} />
            </Head>
            <div className="articleContainer">
                {article ? <Article article={article} /> : null}
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps<IArticleProps, IArticleParams> = async (context) => {
    const { id } = context.params!
    const article: IArticle = await fetchArticle(parseInt(id as string))
    return {
        props: {
            article
        },
        revalidate: 60*60*24
    }
}

export const getStaticPaths: GetStaticPaths<IArticleParams> = async () => {
    const articlesDb = await getAllArticles()
    const paths = articlesDb.data.data.map((x: IArticle) => ({ params: { id: x.id.toString() }}))
    return {
        paths,
        fallback: false
    }
}

interface IArticleProps {
    article: IArticle
}

interface IArticleParams extends ParsedUrlQuery{
    id: string
}

export default ArticlePage