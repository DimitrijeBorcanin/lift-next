import { ArticleContext } from "@/context/ArticleContext"
import { IArticle, IArticleFilter, ITag } from "@/interfaces/IArticle"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import styles from "./Article.module.scss"

const Article: React.FC<IArticleProps> = ({article, preview = false}) => {

    const { id, title, subtitle, text, image, created_at, tags } = article
    const {filters, setFilters} = useContext(ArticleContext)

    const tagToggle = (title: string): void => {
        if(filters) {
            const newTags: string[] = filters.tags
            if(newTags.indexOf(title) === -1){
                newTags.push(title)
            } else {
                newTags.splice(newTags.indexOf(title), 1)
            }
            setFilters({
                ...filters,
                tags: newTags
            })
        }
    }

    return (
        <article className={styles.newsArticle}>
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h2>{preview ? <Link href={"/vesti/" + id}>{title}</Link> : title}</h2>
                    <h3>{subtitle}</h3>
                    { !preview ? <small>{moment(created_at).format("DD.M.YYYY.")}</small> : null }
                </div>
                {preview ? 
                <div>
                    <small className="italic">Objavljeno:</small>
                    <p className="text-md">{moment(created_at).format("DD.M.YYYY.")}</p>
                </div> : 
                <Link href="/vesti"><i className="fa-solid fa-xmark text-3xl text-white"></i></Link> }
            </div>
            <Image src={image} alt={title} width={960} height={540} />
            <div className={styles.newsText}>
                <span dangerouslySetInnerHTML={{__html: preview && text.length > 300 ? text.substring(0, 300) + '...' : text}}></span>
                { preview ? <Link href={"/vesti/" + id}>Pročitajte još <i className="fa-solid fa-caret-right"></i></Link> : null }
                { preview ? <div className={styles.newsTags}>
                    {tags.map((tag: ITag) => (
                        <div className={styles.tagChip} key={tag.title} onClick={() => tagToggle(tag.title)}>{tag.title}</div>
                    ))}
                </div> : null }
            </div>
        </article>
    )
}

interface IArticleProps {
    article: IArticle;
    preview?: boolean;
}

export default Article