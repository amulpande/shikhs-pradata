'use client'
import { disableSubjectByAdminApi, enableSubjectByAdminApi, getAdminSubjectsApi, getSubjectsApi, postSubjectApi } from '@lib/api/allApi'
import { customErrorMessageErrorNotify, customSuccessMessageErrorNotify } from '@lib/notification-toastify/notification-toastify';
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SubjectUpdateComponent from './SubjectUpdateComponent';
import { SubjectTypes } from '@lib/types/types';
import { Switch } from '@mui/material';



const AdminSubjectPage = () => {
  const [subjectName, setSubjectName] = useState('')
  const [subjectData, setSubjectData] = useState<SubjectTypes[]>([])
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState({
    id: '',
    subject_name: ''
  })
  const [updated, setUpdated] = useState<boolean>(false)

  useEffect(() => {
    const fetchSubjectData = async () => {

      try {
        const response = await getAdminSubjectsApi()
        setSubjectData(response.data)
      } catch (error) {
        console.error('Error fetching subject')
      } finally {
        // setUpdated(true)
      }
    }
    fetchSubjectData()
  }, [showUpdateModal, updated])

  const handleOpenUpdateModal = (subject_name: any, id: any) => {
    setSelectedSubject({ id: id, subject_name: subject_name })
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedSubject({ id: '', subject_name: '' });
  };

  const handleDisable = async (id: number) => {
    setUpdated(false)
    try {
      const response = await disableSubjectByAdminApi(id)
      if (response) {
        customSuccessMessageErrorNotify('Disabled Subject')
      }
    } catch (error: any) {
      // console.error('Error disabling subject', error)
      if (error?.response?.data?.error) {
        customErrorMessageErrorNotify(error?.response?.data?.error)
      }
    } finally {
      setUpdated(true)
    }
  }

  const handleEnable = async (id: number) => {
    setUpdated(false)
    try {
      const response = await enableSubjectByAdminApi(id)
      if (response) {
        customSuccessMessageErrorNotify('Enabled Subject')
      }
    } catch (error) {
      console.error('Error enabling subject')
    } finally {
      setUpdated(true)
    }
  }
  return (
    <>
      <div className='card text-center'>
        <form onSubmit={async (e) => {
          e.preventDefault()
          setUpdated(false)
          try {
            const response = await postSubjectApi(subjectName.toUpperCase())
            if (response) {
              setUpdated(true)
            }

          } catch (error: any) {
            if (error.response && error.response.data) {
              const errorMessage = error.response.data.subject_name[0];
              customErrorMessageErrorNotify(errorMessage)
            }
          }
        }}>
          <div className="form-group mx-sm-3 mb-2 mt-5">
            <input name='subjectName' type="text" className="form-control" placeholder="Subject Name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-success mb-2">
            Submit
          </button>
        </form>

      </div>
      <div className='card mt-5'>
        <div className='card-header text-center'>
          <h3>SUBJECT</h3>
        </div>
        <table className="table">
          <thead className="thead-dark text-center">
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">SUBJECT</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {subjectData?.map((subject, index) => (
              <tr key={index}>
                {/* <th scope="row">{index+1}</th> */}
                <td>{subject?.subject_name}</td>
                <td>
                  <button className='btn btn-warning' onClick={() => handleOpenUpdateModal(subject?.subject_name, subject?.id)}><i className="fas fa-edit"></i></button>
                </td>
                {/* <td>
                  {subject?.isDisabled ? (
                    <button className='btn btn-warning' onClick={() => handleEnable(subject?.id)}>Enable</button>
                  ) :
                    (
                      <button className='btn btn-warning' onClick={() => handleDisable(subject?.id)}>Disable</button>
                    )}

                </td> */}
                <td>
                  <Switch
                    checked={!subject?.isDisabled}
                    onChange={() => subject?.isDisabled ? handleEnable(subject?.id) : handleDisable(subject?.id)}
                    color="primary"
                    inputProps={{ 'aria-label': 'toggle subject' }}
                  />
                  
                </td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
      <SubjectUpdateComponent
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        subject={selectedSubject}
      />
      <ToastContainer />
    </>
  )
}

export default AdminSubjectPage
