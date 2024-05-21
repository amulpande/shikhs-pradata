import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import styles from './loading.module.css'
import AdminLoading from "@/components/LoadingComponent/AdminLoading";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
            <div className={styles.loadingOverlay}>
                <AdminLoading />
            </div>
        </>
    )
}
