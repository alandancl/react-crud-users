import React from 'react'

const AddUserCard = ({ addNewUser, setAddNewUser, reset, setCurrentUserEdit }) => {

    //Handles switching between Add New User Button and AddUserForm  
    const handleAddUser = event => {
        event.preventDefault()
        reset(formDefaultValues)
        setCurrentUserEdit({})
        setAddNewUser(true)
    }

     //This object is used to reset input fields to be empty
    const formDefaultValues = {
        first_name: '',
        last_name: '',
        birthday: '',
        email: '',
        password: ''
    }

  return (
    <article className='card add-user'>
        <button onClick={handleAddUser} className='edit-btn add-user-btn'><i class="fa-solid fa-user-plus fa-4x"></i></button>
    </article>
  )
}

export default AddUserCard