'use client'
import { getSubjectsApi, postSubjectApi } from '@lib/api/allApi'
import { customErrorMessageErrorNotify } from '@lib/notification-toastify/notification-toastify';
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SubjectUpdateComponent from './SubjectUpdateComponent';



const AdminSubjectPage = () => {
  const [subjectName, setSubjectName] = useState('')
  const [subjectData, setSubjectData] = useState<any[]>([])
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSubject,setSelectedSubject] = useState({
    id:'',
    subject_name:''
  })
  const [updated,setUpdated] = useState<boolean>(false)
  
  useEffect(() => {
    const fetchSubjectData = async () => {
      
      try {
        const response = await getSubjectsApi()
        setSubjectData(response.data)
      } catch (error) {
        console.error('Error fetching subject')
      }finally{
        setUpdated(true)
      }
    }
    fetchSubjectData()
  }, [showUpdateModal])

  const handleOpenUpdateModal = (subject_name:any,id:any) => {
    setSelectedSubject({id:id,subject_name:subject_name})
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedSubject({id:'',subject_name:''});
  };

  return (
    <>
      <div className='card text-center'>
        <form onSubmit={async (e) => {
          e.preventDefault()
          setUpdated(false)
          try {
            const response = await postSubjectApi(subjectName.toUpperCase())
            if (response){
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
            </tr>
          </thead>
          <tbody className='text-center'>
            {subjectData?.map((subject, index) => (
              <tr key={index}>
                {/* <th scope="row">{index+1}</th> */}
                <td>{subject?.subject_name}</td>
                <td>
                  <button className='btn btn-warning' onClick={()=>handleOpenUpdateModal(subject?.subject_name,subject?.id)}>UPDATE</button>
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
