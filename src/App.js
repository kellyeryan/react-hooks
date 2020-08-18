import React, { useState, useEffect } from 'react'
import UserTable from './tables/UserTable'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import useAsyncRequest from './hooks/useAsyncRequest'

const App = () => {

  const [data, loading] = useAsyncRequest(5);
  const [users, setUsers] = useState(null)

  useEffect(() => {
    if (data) {
      const formattedUsers = data.map((obj) => {
        return {
          name: obj.name.first,
          username: obj.login.username,
          age: obj.registered.age,
        };
      });
      setUsers(formattedUsers);
    }
  }, [data]);

  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users, user])
  }
  const deleteUser = (id) => {
    setEditing(false)
    setUsers(users.filter((user) => user.id !== id ))
  }
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', username: '', age: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const editRow = (user) => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username, age: user.age })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }

  const deleteUsers = () => {
    setUsers(users.length = 0)
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add user</h2>
          {editing ? (
            <div> 
              <h2>Edit User</h2>
              <EditUserForm 
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
              </div>
          ) : (
          <div>
            <AddUserForm addUser={addUser} />
          </div>
          )}
        </div>
        {loading || !users ? (
          <p>Loading...</p>
        ) : (
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser}/>
        </div>
      )}
      </div>
      <button
        className="button muted-button"
        onClick={deleteUsers}>
          {'Delete All Users'}
      </button>
    </div>
  )
}

export default App