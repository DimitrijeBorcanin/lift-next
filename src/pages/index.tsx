import { IArticle } from "@/interfaces/IArticle"
import { useEffect, useRef, useState } from "react"
import styles from "@/styles/Home.module.scss"
import { IPagedResponse } from "@/interfaces/IResponse"
import LatestArticles from "@/components/articles/latest-articles/LatestArticles"
import { api } from "@/api/axios-config"
import { useRouter } from "next/router"
import Links from "@/components/links/Links"
import { useSpring, animated } from "@react-spring/web"
import { ILink } from "@/interfaces/ILink"
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { imageSlides } from "@/helpers/consts/ImageSlides"
import PulseText from "@/components/common/pulse-text/PulseText"

const fetchLatestArticles = async (): Promise<IPagedResponse<IArticle[]>> => {
  const articlesDb = await api.get<IPagedResponse<IArticle[]>>('articles', {
    params: {
      page: 1
    }
  })
  return articlesDb.data
}

const fetchLinks = async (): Promise<ILink[]> => {
  const linksDb = await api.get<ILink[]>('links');
  return linksDb.data;
}

const Home: React.FC<IHomeProps> = ({linksDb, articleDb}) => {
  const router: any = useRouter();

  const linksOpen = router.query.hasOwnProperty("links")
  const [links, setLiks] = useState<ILink[]>(linksDb);
  const [article, setArticle] = useState<IArticle>(articleDb)

  const linksRef = useRef<any>(null)
  const articleRef = useRef<any>(null)

  const springsLinks = useSpring({
    opacity: !linksOpen ? 0 : 1,
    backdropFilter: !linksOpen ? "blur(0px) brightness(100%)" : "blur(20px) brightness(70%)",
    config: {
      duration: 150
    },
    onStart: () => !linksOpen ? linksRef.current.children[0].style.bottom = "-9999px" : linksRef.current.children[0].style.bottom = "",
    onResolve: () => !linksOpen ? linksRef.current.children[0].style.bottom = "-9999px" : linksRef.current.children[0].style.bottom = ""
  })

  const springsArticle = useSpring({
    opacity: linksOpen ? 0 : 1,
    config: {
      duration: 150
    },
    onStart: () => linksOpen ? articleRef.current.children[0].style.bottom = "-9999px" : articleRef.current.children[0].style.bottom = "",
    onResolve: () => linksOpen ? articleRef.current.children[0].style.bottom = "-9999px" : articleRef.current.children[0].style.bottom = ""
  })

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const articlesDb = await fetchLatestArticles()
      setArticle(articlesDb.data[0])
      const linksDb = await fetchLinks()
      setLiks(linksDb)
    }
    fetch()
  }, [])

  return (
    <div className={styles.mainPageContainer}>
      <div id="mainImg" className={styles.mainImg}>
        <img src="/assets/img/Gorimo bez vidiq.jpg" alt="Gorimo" />
      </div>

      <div className={styles.imageSlides}>
        <Fade arrows={false}>
          {imageSlides.map((item, index) => (
            <div key={index}>
              <div>
                  <img src={`/assets/img/${item.src}`} alt={item.alt} />
              </div>
            </div>
          ))}
        </Fade>
      </div>

      <animated.div style={springsLinks} ref={linksRef}>
        <Links links={links} />
      </animated.div>

      <animated.ul style={springsArticle} ref={articleRef}>
        <div className={styles.mainTitle}>
          <PulseText>
            <a href={`/vesti/${article.id}`}>
              <h1>{article.title}</h1>
              <h2>{article.subtitle}</h2>
            </a> 
          </PulseText>
        </div>
      </animated.ul>
    </div>
  )
}

export async function getStaticProps(){
  const linksDb = await fetchLinks()
  const articlesDb = await fetchLatestArticles()

  return {
    props: {
      linksDb: linksDb,
      articleDb: articlesDb.data[0]
    },
    revalidate: 60*60*24
  }
}

interface IHomeProps {
  articleDb: IArticle
  linksDb: ILink[]
}

export default Home