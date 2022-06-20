import axios from 'axios'
import React, { useEffect } from 'react'

const EditUserForm = ({ URL, getAllUsers, register, handleSubmit, reset, setValue, setCurrentUserEdit, currentUserEdit, setAddNewUser }) => {

    //Set current user's data input values
    const setEditValues = user => {
        setValue("first_name", user?.first_name)
        setValue("last_name", user?.last_name)
        setValue("birthday", user?.birthday)
        setValue("email", user?.email)
    }

    //Renders input values everytime userIdEdit changes
    useEffect(() => {
        setEditValues(currentUserEdit)
    }, [currentUserEdit])

    //When cancel button is clicked, setUserIdEdit is reset to {} meaning that no user is being edited 
    const cancelEdit = event => {
        event.preventDefault()
        setCurrentUserEdit({})
        setAddNewUser(false)
    }

    //submit() is a callback function passed to handledSubmit() when the asociatted-form button is clicked
    //Data is an object returned by the form, whose properties are each argument in ...register() functions
    const submit = data => {
        console.log(data)
        //data object is passed to addNewUser in order make a POST API call
        updateUser(data)
    }

    //PUT call to API  
    const updateUser = userData => {
        //Since ID and Password are not changed, we get them from the user that's being edited
        userData.id = currentUserEdit.id
        userData.password = currentUserEdit.password 
        axios.put(`${URL}/users/${userData.id}/`, userData)
            .then(res => {
                console.log(res.data)
                setCurrentUserEdit({}) //Once the PUT call is successful, this function resets currentUserEdit to an initial state
                setAddNewUser(false)
                getAllUsers() //Refresh all users  
            })
            .catch(err => console.log(err))
    }
  return (
    <article className='card'>
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <i class="fa-solid fa-user"></i>
                <input
                    type="text"
                    size="15"
                    required="required"
                    placeholder="First name..."
                    {...register("first_name")}
                />
            </div>
            <div>
                <i class="fa-solid fa-user"></i>
                <input
                    type="text"
                    size="15"
                    required="required"
                    placeholder="Last name..."
                    {...register("last_name")}
                />
            </div>
            <div>
                <i class="fa-solid fa-cake-candles"></i>
                <input
                    type="date"
                    required="required"
                    placeholder="Birthday..."
                    {...register("birthday")}
                />
            </div>
            <div>
                <i class="fa-solid fa-envelope"></i>
                <input
                    type="email"
                    size="15"
                    required="required"
                    placeholder="Email..."
                    {...register("email")}
                />
            </div>
            <div className='btns'>
                <button className='edit-btn'><i class="fa-solid fa-floppy-disk"></i></button>
                <button onClick={cancelEdit} className='delete-btn'><i class="fa-solid fa-ban"></i></button>
            </div>
        </form>    
    </article>
  )
}

export default EditUserForm