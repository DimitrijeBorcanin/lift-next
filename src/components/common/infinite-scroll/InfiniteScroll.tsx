import { useEffect, useState } from "react";

const InfiniteScroll: React.FC<IInifniteScrollProps> = ({children, loading = null, startPage = 1, lastPage, fetchFn, count, noDataMsg = null}) => {

    const [page, setPage] = useState<number>(startPage)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [oldCount, setOldCount] = useState<number>(0)
    const [oldLastPage, setOldLastPage] = useState<number>(1)

    useEffect(() => {
        fetch(page)
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [count])

    useEffect(() => {
        if(oldCount >= count){
            setPage(1)
            fetch(1)
        }
        if(count > oldCount){
            setIsLoading(false)
        }
        if(count === 0){
            setIsLoading(false)
        }
        setOldCount(count)
    }, [count])

    useEffect(() => {
        if(oldLastPage === 0){
            setPage(1)
            fetch(1)
        }
        setOldLastPage(lastPage)
    }, [lastPage])

    const fetch = (nextPage: number) => {
        if(nextPage <= lastPage){
            setIsLoading(true)
            fetchFn(nextPage)
            setPage(nextPage + 1)
        }
    }

    const handleScroll = (event: any) => {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5){
            fetch(page)
        }
    }

    return (
        <section>
            {children}
            {loading && isLoading && lastPage > 0 ? loading : null}
            {lastPage === 0 ? (noDataMsg ? noDataMsg : (<div className="w-full flex justify-center items-center">Nema rezultata</div>)) : null}
        </section>
    )
}

interface IInifniteScrollProps {
    children: React.ReactNode;
    loading?: React.ReactNode;
    startPage?: number;
    lastPage: number;
    fetchFn: (page?: number, filters?: any) => {};
    count: number;
    noDataMsg?: React.ReactNode;
}

export default InfiniteScroll