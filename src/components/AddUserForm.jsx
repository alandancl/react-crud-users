import axios from 'axios'
import React from 'react'

const AddUserForm = ({ URL, getAllUsers, register, handleSubmit, reset, setAddNewUser }) => {

    //POST call to API  
    const addNewUser = newUser => {
        axios.post(`${URL}/users/`, newUser)
            .then(res => {
                console.log(res.data)
                reset(formDefaultValues) //Once the POST call is successful, this function reset form input fields to an initial state
                getAllUsers() //Refresh all users  
            })
            .catch(err => console.log(err))
    }

    //submit() is a callback function passed to handledSubmit() when the asociatted-form button is clicked
    //Data is an object returned by the form, whose properties are each argument in ...register() functions
    const submit = data => {
        console.log(data)
        //data object is passed to addNewUser in order make a POST API call
        addNewUser(data)
    }

    //This object is used to reset input fields to be empty
    const formDefaultValues = {
        first_name: '',
        last_name: '',
        birthday: '',
        email: '',
        password: ''
    }

    //Handles switching between Add New User Button and AddUserForm  
    const cancelAddUser = event => {
        event.preventDefault()
        setAddNewUser(false)
    }

  return (
    <div className='card'>
        <h3>New User</h3>
        {/*  An input field must be created for each expected object property by API
             Arguments in ..register() must be spelled exactly as per API user's porperties 
        */}
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
            <div>
                <i class="fa-solid fa-key"></i>
                <input
                    type="password"
                    size="15"
                    required="required"
                    placeholder="Password..."
                    {...register("password")}
                />
            </div>
            <div className='btns'> 
                <button className='edit-btn'><i class="fa-solid fa-floppy-disk"></i></button>
                <button onClick={cancelAddUser} className='delete-btn'><i class="fa-solid fa-ban"></i></button>
            </div>
        </form>
    </div>
  )
}

export default AddUserForm