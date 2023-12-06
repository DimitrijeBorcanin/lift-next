import { IArticle } from "@/interfaces/IArticle";
import { IPagedResponse } from "@/interfaces/IResponse";
import axios from "axios";

const urls = {
    dev: 'http://localhost:8000/api/',
    prod: 'https://lift.rs/api/'
}

export const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? urls.prod : urls.dev
})

export const getAllArticles = () => api.get<IPagedResponse<IArticle[]>>("articles")