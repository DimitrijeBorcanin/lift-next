import { api } from "@/api/axios-config";
import { IArticleFilter, ITag, ITagCounted } from "@/interfaces/IArticle"
import { useContext, useEffect, useState } from "react";
import styles from "./ArticleFilters.module.scss"
import stylesTag from "@/styles/Articles.module.scss"
import { ArticleContext } from "@/context/ArticleContext";

const ArticleFilters: React.FC = () => {

    const [allTags, setAllTags] = useState<ITagCounted[]>([])
    const [debouncedSearch, setDebouncedSearch] = useState<string>('')
    const [search, setSearch] = useState<string>('')

    const {filters, setFilters} = useContext(ArticleContext)

    useEffect(() => {
        api.get('tags')
            .then(response => {
                setAllTags(response.data)
            })
    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(debouncedSearch)
        }, 500)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [debouncedSearch])

    useEffect(() => {
        // onChange({
        //     ...filters,
        //     search
        // })
        setFilters({
            ...filters,
            search
        })
    }, [search])

    const tagToggle = (title: string): void => {
        const newTags: string[] = filters.tags
        if(newTags.indexOf(title) === -1){
            newTags.push(title)
        } else {
            newTags.splice(newTags.indexOf(title), 1)
        }
        // onChange({
        //     ...filters,
        //     tags: newTags
        // })
        setFilters({
            ...filters,
            tags: newTags
        })
    }

    return(
        <div className={styles.allNewsFilters}>
            <div className="formGroup field">
                <input type="text" className="formField" placeholder="" name="search" id="search" value={debouncedSearch} onChange={(e) => setDebouncedSearch(e.target.value)} />
                <label htmlFor="search" className="formLabel"><i className="fa-solid fa-magnifying-glass"></i> Pretraga</label>
            </div>
            <div className={stylesTag.newsTags}>
                {allTags.map((tag: ITagCounted) => {
                    if(filters.tags.includes(tag.title)){
                        return <div className={`${stylesTag.tagChip} ${stylesTag.selected}`} key={tag.title} onClick={() => tagToggle(tag.title)}>{tag.title}</div>
                    }
                    return <div className={stylesTag.tagChip} key={tag.title} onClick={() => tagToggle(tag.title)}>{tag.title}</div>
                })}
            </div>
        </div>
    )
}

export default ArticleFilters