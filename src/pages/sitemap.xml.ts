import { getAllArticles } from "@/api/axios-config";
import { IArticle } from "@/interfaces/IArticle";
import { create } from "domain";
import moment from "moment";
import { GetServerSideProps } from "next";

const generateSiteMap = (articles: IArticle[]) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://liftbnd.rs</loc>
            <lastmod>${moment(articles[0].created_at).format("YYYY-MM-DD")}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1</priority>
        </url>
        <url>
            <loc>https://liftbnd.rs/vesti</loc>
            <lastmod>${moment(articles[0].created_at).format("YYYY-MM-DD")}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
        ${articles.map(({ id, created_at }) => {
            const today = moment()
            const createdAtDate = moment(created_at)
            const dateDiff = today.diff(createdAtDate)

            console.log(today, created_at, dateDiff);
            
            let priority = 0
            if(dateDiff < 7){
                priority = 8
            } else if(dateDiff < 14) {
                priority = 7
            } else if(dateDiff < 30){
                priority = 6
            } else if(dateDiff < 60){
                priority = 5
            } else if(dateDiff < 90){
                priority = 4
            } else if(dateDiff < 180){
                priority = 3
            } else if(dateDiff < 365){
                priority = 2
            } else if(dateDiff < 730){
                priority = 1
            } else {
                priority = 0
            }
            return `<url>
                <loc>${`https://liftbnd.rs/vesti/${id}`}</loc>
                <lastmod>${moment(created_at).format("YYYY-MM-DD")}</lastmod>
                <changefreq>never</changefreq>
                <priority>${priority}</priority>
            </url>`
        }).join('')}
    </urlset>
    `
}

const SiteMap = () => {}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    const articlesDb = await getAllArticles()
    const sitemap = generateSiteMap(articlesDb.data.data)
    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()
    return {
        props: {}
    }
}

export default SiteMap