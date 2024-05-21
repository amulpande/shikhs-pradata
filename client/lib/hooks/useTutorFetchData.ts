// const useFetchData = 
import { useState, useEffect, useCallback } from "react";
import { adminApprovBlockTutorRequestApi, adminBlockedUnblockedTutor } from "../api/allApi";
import { TutorType } from "../types/types";

function useTutorFetchData(api: { ({ page, search }: { page: number, search: string }): Promise<any>; }, page: number, search: string) {
    const [tutors, setTutors] = useState<TutorType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('')
    const [totalCount, setTotalCount] = useState<number>(0)
    const [totalPages, setTotalPages] = useState(1)

    // use callback will store tutor data in fetchTutors and will change if its get new value
    const fetchTutors = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api({ page, search });
            setTutors(response.data.results);
            setTotalCount(response.count)
            const calculatedTotalPages = Math.ceil(response.data.count / 6); // Assuming 6 items per page
            setTotalPages(calculatedTotalPages);
        } catch (error:any) {
            // Handle error
            setError(error)
        } finally {
            setLoading(false);
        }
    }, [api, page, search]);

    useEffect(() => {
        fetchTutors();
    }, [fetchTutors]);

    const blockTutor = async (tutorId: number) => {
        setLoading(true);
        try {
            await adminBlockedUnblockedTutor(tutorId, { 'user_blocked': true });
            // Fetching tutor data after 
            await fetchTutors();
        } catch (error:any) {
            // Handle error
            setError(error)
        } finally {
            setLoading(false);
        }
    };

    const unBlockTutor = async (tutorId: number) => {
        setLoading(true);
        try {
            await adminBlockedUnblockedTutor(tutorId, { 'user_blocked': false })
            await fetchTutors()
        } catch (error:any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    // will work on future for tutor accept reject method method
    const acceptTutor = async (tutorId:number) => {
        setLoading(true)
        try {
            // await adminApp
            await adminApprovBlockTutorRequestApi(tutorId, { 'tutor_approve': true })
            await fetchTutors()
        } catch (error:any) {
            setError(error)
        } finally{
            setLoading(false)
        }
    }

    return { tutors, loading, error, totalCount,totalPages, blockTutor, acceptTutor, unBlockTutor };
}
export default useTutorFetchData