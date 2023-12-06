import { api } from "@/api/axios-config"
import { IArticle, IArticleFilter } from "@/interfaces/IArticle"
import { IPagedResponse } from "@/interfaces/IResponse"
import { useEffect, useState } from "react"
import styles from "@/styles/Articles.module.scss"
import InfiniteScroll from "@/components/common/infinite-scroll/InfiniteScroll"
import Loading from "@/components/common/loading/Loading"
import ArticlePlaceholder from "@/components/articles/article-placeholder/ArticlePlaceholder"
import ArticleFilters from "@/components/articles/article-filters/ArticleFilters"
import Head from "next/head"
import { ArticleContext } from "@/context/ArticleContext"
import { AnimatePresence, motion } from 'framer-motion'
import Article from "@/components/articles/article/Article"

const makeUrl = (base: string, filters: IArticleFilter, page?: number) => {
    let url = base + '?'
    url += 'search=' + filters.search
    if(page) url += '&page=' + page
    if(filters.tags.length > 0) url += '&' + filters.tags.map(x => 'tags[]=' + x).join('&')
    return url
}

const fetchArticles = async (filters: IArticleFilter, page: number = 1): Promise<IPagedResponse<IArticle[]>> => {
    const articlesDb = await api.get<IPagedResponse<IArticle[]>>(makeUrl('articles', filters, page))
    return articlesDb.data
}

const Articles: React.FC<IArticlesProps> = ({articlesDb}) => {

    const [articles, setArticles] = useState<IArticle[]>(articlesDb)
    const [articlesCount, setArticlesCount] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(1)
    const [filters, setFilters] = useState<IArticleFilter>({search: '', tags: []})

    const fetch = async (page: number = 1) => {
        const articlesDb = await fetchArticles(filters, page)
        setLastPage(articlesDb.total === 0 ? 0 : articlesDb.last_page)
        if(page === 1){
            setArticles([...articlesDb.data])
        } else {
            setArticles([...articles, ...articlesDb.data])
        }
    }

    const filterChange = (newFilters: IArticleFilter): void => {
        setFilters(newFilters)
    }

    useEffect(() => {
        setArticles([])
        setLastPage(1)
    }, [filters])

    return (
        <>
            <Head>
                <title>LIFT // Vesti</title>
                <meta name="description" content="Najnovije vesti benda LIFT" />
                <meta name="keywords" content="LIFT,bend,band,rock,pop" />
            </Head>
            <div className={`container ${styles.allNews}`} id="allNews">
                <h1>LIFT // Vesti</h1>
                <hr />
                <ArticleContext.Provider value={{filters, setFilters}}>
                    <div className={styles.allNewsContainer}>
                        <div className={styles.allNewsList + " relative"}>
                            <InfiniteScroll
                                lastPage={lastPage}
                                fetchFn={(page) => fetch(page)}
                                count={articles.length}
                                loading={(
                                    <div className="w-full" key={0}>
                                        <Loading>
                                            <ArticlePlaceholder />
                                        </Loading>
                                    </div>
                                )}
                            >
                                {articles.map((article: IArticle) => (
                                    
                                    <Article
                                        key={article.id}
                                        article={article}
                                        preview={true}
                                    />
                                ))}
                            </InfiniteScroll>
                        </div>
                        <div className={styles.newsFiltersContainer}>
                            <ArticleFilters />
                        </div>
                    </div>
                </ArticleContext.Provider>
            </div>
        </>
    )
}

export async function getStaticProps(){
    const articlesDb = await fetchArticles({search: '', tags: []}, 1)
  
    return {
      props: {
        articlesDb: articlesDb.data
      },
      revalidate: 60*60*24
    }
}

interface IArticlesProps {
    articlesDb: IArticle[]
  }

export default Articles