import React, { useState } from 'react'

const AddUserForm = (props) => {

    const initialFormState = { id: null, name: '', username: '', spiritAnimal: '' }
    const [user, setUser] = useState(initialFormState)
    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUser( { ...user, [name]: value } )
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!user.name || !user.username || !user.spiritAnimal) return
        props.addUser(user)
        setUser(initialFormState)
    }
    
    return (
        <form onSubmit = {handleSubmit} >
            <label>Name</label>
            <input 
                type='text'
                name='name'
                value={user.name}
                onChange={handleInputChange}
            />
            <label>Username</label>
            <input 
                type='text'
                name='username'
                value={user.username}
                onChange={handleInputChange}
            />
            <label>Age</label>
            <input 
                type='text'
                name='age'
                value={user.age}
                onChange={handleInputChange}
            />
            <button>Add new user</button>
        </form>
    )
}

export default AddUserForm