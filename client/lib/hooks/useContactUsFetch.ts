//  created custom hook for user
import { useState, useEffect, useCallback } from "react";
import { deleteContactUsByAdminApi } from "../api/allApi";
import { ContactUsTypes } from "../types/types";

function useContactUsFecth(api: { ({ page}: { page: number}): Promise<any>; }, page: number) {
    const [data, setData] = useState<ContactUsTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('')
    const [totalCount, setTotalCount] = useState<number>(0)
    const [totalPages, setTotalPages] = useState(1)

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api({ page });
            setData(response.data.results);
            setTotalCount(response.count)
            const calculatedTotalPages = Math.ceil(response.data.count / 10);
            setTotalPages(calculatedTotalPages);
        } catch (error:any) {
            // Handle error
            setError(error)
        } finally {
            setLoading(false);
        }
    }, [api, page]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const deleteContact = async (contactId: number) => {
        setLoading(true);
        try {
            await deleteContactUsByAdminApi(contactId); 
            await fetchUsers();
        } catch (error:any) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };
    return { data, loading, error, totalCount,totalPages, deleteContact};
}
export default useContactUsFecth