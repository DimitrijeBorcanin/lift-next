export interface IArticle {
    id: number;
    title: string;
    subtitle: string;
    text: string;
    image: string;
    created_at: string;
    tags: ITag[]
}

export interface IArticleFilter {
    search: string;
    tags: string[];
}

export interface ITag {
    id: number;
    title: string;
}

export interface ITagCounted {
    title: string;
    count: number;
}