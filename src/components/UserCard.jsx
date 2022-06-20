import axios from 'axios'
import React from 'react'

const UserCard = ({ user, URL, getAllUsers, setCurrentUserEdit, currentUserEdit, setAddNewUser }) => {

    //DELETE call to API
    const deleteUser = userId => {
        axios.delete(`${URL}/users/${userId}/`)
            .then(res => {
                console.log(res.data)
                setAddNewUser(false)
                getAllUsers()
            })
            .catch(err => console.log(err))
    }

    //Sets current user data that's being edited
    const handleEdit = event => {
        event.preventDefault()
        setCurrentUserEdit(user)
        setAddNewUser(false)
        console.log(currentUserEdit)

    }

  return (
    <article className='card'>
        
        <h3 className='card-name'><i class="fa-solid fa-user"></i>{`${user.first_name} ${user.last_name}`}</h3>
        <p className='card-birthday'><i class="fa-solid fa-cake-candles"></i>{user.birthday}</p>
        <p className='card-email'><i class="fa-solid fa-envelope"></i>{user.email}</p>
        <div className='btns'>
            <button onClick={handleEdit} className='edit-btn'><i class="fa-solid fa-pen-to-square"></i></button>
            <button onClick={() => deleteUser(user.id)} className='delete-btn'><i class="fa-solid fa-trash-can"></i></button>
        </div>
    </article>
  )
}

export default UserCard