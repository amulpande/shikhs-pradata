//  created custom hook for user
import { useState, useEffect, useCallback } from "react";
import { adminDeleteUserApi } from "../api/allApi";
import { UserDataTypes } from "../types/types";

function useUserFetch(api: { ({ page, search }: { page: number, search: string }): Promise<any>; }, page: number, search: string) {
    const [data, setData] = useState<UserDataTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('')
    const [totalCount, setTotalCount] = useState<number>(0)
    const [totalPages, setTotalPages] = useState(1)

    // use callback will store tutor data in fetchTutors and will change if its get new value
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api({ page, search });
            setData(response.data.results);
            setTotalCount(response.count)
            const calculatedTotalPages = Math.ceil(response.data.count / 10); // Assuming 6 items per page
            setTotalPages(calculatedTotalPages);
        } catch (error:any) {
            // Handle error
            setError(error)
        } finally {
            setLoading(false);
        }
    }, [api, page, search]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const deleteUser = async (tutorId: number) => {
        setLoading(true);
        try {
            await adminDeleteUserApi(tutorId, { isDeleted: true });
            // Fetching tutor data after 
            await fetchUsers();
        } catch (error:any) {
            // Handle error
            setError(error)
        } finally {
            setLoading(false);
        }
    };
    return { data, loading, error, totalCount,totalPages, deleteUser};
}
export default useUserFetch