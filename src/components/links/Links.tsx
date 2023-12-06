import { ILink, ILinkIcon } from "@/interfaces/ILink";
import styles from "./Links.module.scss"
import { socialLinks } from "@/helpers/consts/MenuConsts";

const Links: React.FC<ILinksProps> = ({links}) => {
    const socialItems: ILinkIcon[] = socialLinks

    return (
        <section className={styles.allLinks}>
            <h1>LIFT</h1>
            <h2>Band | Belgrade, SRB</h2>
            <div className={styles.allLinksSocials}>
            {socialItems.map((item: ILinkIcon, index: number) => (
                <a href={item.link} key={index} target="_blank"><i className={item.icon}></i></a>
            ))}
            </div>
            <div className={styles.allLinksList}>
            {links.map((item: ILink) => (
                <a href={item.link} key={item.id}>
                    <article>
                        <p>{item.title}</p>
                    </article>
                </a>
            ))}
            </div>
        </section>
    )
}

interface ILinksProps {
    links: ILink[]
  }

export default Links;