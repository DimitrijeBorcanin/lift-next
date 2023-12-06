import { ILink, ILinkIcon } from "@/interfaces/ILink";

export const menuLinks: ILink[] = [
    {
        title: 'Početna',
        link: '/'
    },
    {
        title: 'Vesti',
        link: '/vesti'
    },
    {
        title: 'Linkovi',
        link: '/?links'
    }
]

export const socialLinks: ILinkIcon[] = [
    {
        icon: 'fa-brands fa-instagram',
        link: 'https://www.instagram.com/liftband/face'
    },
    {
        icon: 'fa-brands fa-youtube',
        link: 'https://www.youtube.com/@LiftLiftOfficial'
    },
    {
        icon: 'fa-brands fa-tiktok',
        link: 'https://www.tiktok.com/@liftbnd'
    },
    // {
    //     icon: 'fa-brands fa-spotify',
    //     link: 'https://www.youtube.com'
    // },
    {
        icon: 'fa-brands fa-facebook',
        link: 'https://www.facebook.com/LIFTbend'
    }
]