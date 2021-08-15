import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Modal from "../components/modal"
import API from "../utils/api"
import toastr from "toastr"

const UserList = () => {
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  /* = Date: 15-08-2021
     = get user list
     ---------------------------------------------------- */
  useEffect(() => {
    API.request("get", "people")
      .then((response) => {
        if (response.data.results && response.data.results.length) {
          setUserData(response.data.results)
        }
      })
      .catch(() => {
        toastr.error("error while fetching user list")
      })
  }, [])

  /* = Date: 15-08-2021
     = toggle modal box
     ---------------------------------------------------- */
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  /* = Date: 15-08-2021
     = Add new user
     ---------------------------------------------------- */
  const addUser = (user) => {
    // Could not found swapi post api to add new user
    // API.request('post', 'people', user).then((response)=> {
    //   console.log("response", response)
    // }).catch(err => {
    //   console.log("err", err)
    // })

    // handle edit user
    if (currentUser) {
      let objIndex = userData.findIndex((obj) => obj.uid == user.uid)
      userData[objIndex].name = user.name
      setCurrentUser(null)
      return
    }
    user.uid = userData.length + 1
    setUserData([...userData, user])
  }

  /* = Date: 15-08-2021
     = handle add new button click - reset current user object
     ---------------------------------------------------- */
  const addToggleModal = () => {
    setCurrentUser(null)
    toggleModal()
  }

  /* = Date: 15-08-2021
     = handle edit button click - set current user object
     ---------------------------------------------------- */
  const editUserHandler = (user) => {
    setCurrentUser(user)
    toggleModal()
  }

  /* = Date: 15-08-2021
     = handle delete user - ask before remove
     ---------------------------------------------------- */
  const deleteUser = (user) => {
    // swapi delete API is not working - thus, below code is commented
    // API.request('delete', 'people/' + user.uid ).then((response)=> {
    //   console.log("response", response)
    // }).catch(err => {
    //   console.log("err", err)
    // })
    let responseConfirm = confirm("Are you sure you want to remove this user?")
    if (responseConfirm) {
      setUserData(userData.filter((item) => item.name !== user.name))
    }
  }
  return (
    <>
      <h1>
        <span data-test-id="personlist">Person List</span>
        <button
          data-test-id="addnewuser"
          className="btn btn-primary ml-10"
          onClick={() => addToggleModal()}
        >
          Add New
        </button>
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map((user, index) => (
              <tr scope="row" key={user.name}>
                <td>{user.uid}</td>
                <td>
                  <Link
                    className="no-underline userlink"
                    data-test-id={"user" + index}
                    to={"user/" + user.uid}
                  >
                    {user.name}
                  </Link>
                </td>
                <td>
                  <button
                    className="btn cursor-pointer"
                    onClick={() => editUserHandler(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn cursor-pointer"
                    onClick={() => deleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        onCancel={toggleModal}
        onSubmit={addUser}
        show={showModal}
        editUser={currentUser}
      />
    </>
  )
}

export default UserList
