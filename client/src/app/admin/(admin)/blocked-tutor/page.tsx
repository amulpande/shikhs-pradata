'use client'
import TableComponent from '@/components/AdminComponents/TableComponent/TableComponent'
import { Box, Button, Modal, Typography } from '@mui/material'
import { getAdminAllBlockedTutorApi } from '../../../../../lib/api/allApi'
import useTutorFetchData from '../../../../../lib/hooks/useTutorFetchData'
import { useState } from 'react'
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const BlockedTutoAdminPage = () => {
    const { tutors, loading, error, unBlockTutor } = useTutorFetchData(getAdminAllBlockedTutorApi)
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log('tutors data -> ', tutors)
    const renderSomething = (tutorId: number) => {
        return (
            <>
                <Button variant="contained" color="inherit" onClick={() => unBlockTutor(tutorId)}>UNBLOCK</Button>
                {/* <Button variant="contained" color="inherit" onClick={() => unBlockTutor(tutorId)}>UNBLOCK</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </>
        )
    }
    return (
        <div>
            <TableComponent data={tutors} loading={loading} customActionButtons={renderSomething} />
        </div>
    )
}

export default BlockedTutoAdminPage
