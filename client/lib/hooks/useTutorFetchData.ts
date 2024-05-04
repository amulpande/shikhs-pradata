// const useFetchData = 
import { useState, useEffect, useCallback } from "react";
import { adminBlockedUnblockedTutor } from "../api/allApi";
import { TutorType } from "../types/types";

function useTutorFetchData(api: { (): Promise<any>; }) {
    const [tutors, setTutors] = useState<TutorType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('')

    // use callback will store tutor data in fetchTutors and will change if its get new value
    const fetchTutors = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api();
            setTutors(response.data);
        } catch (error) {
            // Handle error
            setError(error)
        } finally {
            setLoading(false);
        }
    }, [api]);

    useEffect(() => {
        fetchTutors();
    }, [fetchTutors]); 

    const blockTutor = async (tutorId: number) => {
        setLoading(true);
        try {
            await adminBlockedUnblockedTutor(tutorId, { 'user_blocked': true });
            // Fetching tutor data after 
            await fetchTutors();
        } catch (error) {
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
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    // will work on future for tutor accept reject method method
    const acceptTutor = () => {
        setLoading(true)
        try {
            // await adminApp
        } catch (error) {

        }
    }

    return { tutors, loading, error, blockTutor, acceptTutor, unBlockTutor };
}
export default useTutorFetchData