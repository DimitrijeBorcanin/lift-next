import styles from "./ErrorPage.module.scss"

const ErrorPage: React.FC<IErrorPageProps> = ({code = 404, description = "Not Found"}) => {
    return (
        <div className={styles.errorContainer}>
            <div>
                <h1 className={styles.errorCode}>{code}</h1>
                <h2>{description}</h2>
            </div>
        </div>
    )
}

interface IErrorPageProps {
    code?: number;
    description?: string;
}

export default ErrorPage