'use client'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import indianState from '../../../../../lib/utils/indianState'
import { adminAddCityApi } from '../../../../../lib/api/allApi'
import { cityAlreadyExistError } from '../../../../../lib/notification-toastify/notification-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CityAdminComponent from '@/components/AdminComponents/CityAdminComponent/CityAdminComponent'

const AddCityPage = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(''); // Reset selected city when state changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Filter out duplicate states
  const states = [...new Set(indianState.map(city => city.state))].sort();

  const filteredCities = indianState.filter(city => city.state === selectedState).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            value={selectedState}
            onChange={handleStateChange}
            fullWidth
            variant='outlined'
            displayEmpty
          >
            <MenuItem value="">Select State</MenuItem>
            {/* Populate states */}
            {states.map(state => (
              <MenuItem key={state} value={state}>{state}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            fullWidth
            disabled={!selectedState}
            variant='outlined'
            displayEmpty
          >
            <MenuItem value="">Select City</MenuItem>
            {filteredCities.map(city => (
              <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="success" onClick={async () => {
            adminAddCityApi({ city_name: selectedCity.toUpperCase(), city_state: selectedState.toUpperCase() })
              .then((response) => {
                // if()
                console.log(response.data)
              })
              .catch((error) => {
                console.log('error wale me aaya hai')
                cityAlreadyExistError(error.response.data.city_name[0])
                console.log(error.response.data.city_name[0])
              })
          }}>Submit</Button>
        </Grid>
      </Grid>
      {/* <CityAdminComponent/> */}
      <ToastContainer />
    </>
  )
}

export default AddCityPage
