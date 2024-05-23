import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import styles from './loading.module.css'
import TutorLoading from "@/components/LoadingComponent/TutorLoading";


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
            <div className={styles.loadingOverlay}>
                <TutorLoading/>
            </div>
        </>
    )
}
