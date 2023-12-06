import { IArticleFilter } from "@/interfaces/IArticle";
import { createContext } from "react";

export const ArticleContext = createContext<IArticleContext>({
    filters: {search: '', tags: []},
    setFilters: () => {}
})

interface IArticleContext {
    filters: IArticleFilter;
    setFilters: (filters: IArticleFilter) => void
}