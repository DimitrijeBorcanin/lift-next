import styles from "./PulseText.module.scss"

const PulseText: React.FC<IPulseTextProps> = ({children}) => {
    return (
        <div className={styles.pulseTextContainer}>
            <span className={styles.pulseTextBack}>{children}</span>
            <span className={styles.pulseTextFront}>{children}</span>
            <span className={styles.pulseTextPlaceholder}>{children}</span>
        </div>
    )
}

interface IPulseTextProps {
    children: React.ReactNode;
}

export default PulseText;