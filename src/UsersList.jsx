import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddUserCard from './components/AddUserCard'
import AddUserForm from './components/AddUserForm'
import EditUserForm from './components/EditUserForm'
import UserCard from './components/UserCard'
import './UsersList.css'

const UsersList = () => {

  const URL = 'https://users-crud1.herokuapp.com' //API's base URL

  const [users, setUsers] = useState() //Stores user's data returned by API

    //GET call to API
  const getAllUsers = () => {
    axios.get(`${URL}/users/`) 
      .then(res => setUsers(res.data)) //Set user's data
      .catch(err => console.log(err))
  }

    //First render
  useEffect(() => {
    getAllUsers()
    }, [])
    
  //console.log(users)
  const [currentUserEdit, setCurrentUserEdit] = useState({})
  console.log(`Current Edit User ${currentUserEdit}`)
  
  //Form Hook
  const { register, handleSubmit, reset, setValue } = useForm(); 

  const [addNewUser, setAddNewUser] = useState(false)

  return (
    <Fragment>
      <h1>CRUD HTTP Users</h1>
      <section className='cards-container'>
        {
          addNewUser ?
            <AddUserForm
              URL={URL}
              getAllUsers={getAllUsers}
              register={register}
              handleSubmit={handleSubmit}
              reset={reset}
              setAddNewUser={setAddNewUser}
            />
          :
          <AddUserCard 
          addNewUser={addNewUser}
          setAddNewUser={setAddNewUser}
          reset={reset}
          setCurrentUserEdit={setCurrentUserEdit}
          />
        }
        {
          users?.map(user => (
            (currentUserEdit.id === user.id) ?
              <EditUserForm
                key={user.id}
                URL={URL}
                getAllUsers={getAllUsers}
                register={register}
                handleSubmit={handleSubmit}
                reset={reset}
                setValue={setValue}
                setCurrentUserEdit={setCurrentUserEdit}
                currentUserEdit={currentUserEdit}
                setAddNewUser={setAddNewUser}
              />
            :
              <UserCard
                key={user.id}
                user={user}
                URL={URL}
                getAllUsers={getAllUsers}
                setCurrentUserEdit={setCurrentUserEdit}
                currentUserEdit={currentUserEdit}
                setAddNewUser={setAddNewUser}
              />
          ))
        }
      </section>
    </Fragment>
  )
}

export default UsersList

//https://www.behance.net/gallery/99745279/MobiCash-mobile-app-redesign-concept