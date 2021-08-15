import { useState, useEffect } from "react"

const Modal = ({ show, onSubmit, onCancel, editUser }) => {
  const [formData, setFormData] = useState({ name: "" })

  useEffect(() => {
    if (editUser) setFormData(editUser)
  }, [editUser])

  /* = Date: 15-08-2021
     = handle input change event
     ---------------------------------------------------- */
  const onInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  /* = Date: 15-08-2021
     = handle form submit
     ---------------------------------------------------- */
  const submitData = (event) => {
    event.preventDefault()
    onSubmit(formData)
    onCancel()
  }

  return show ? (
    <div className="modal user-popup" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={submitData}>
            <div className="modal-header">
              <h5 className="modal-title">{editUser ? "Edit User" : "New User"}</h5>
              <button
                type="button"
                className="close btn"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onCancel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="Name"
                  value={formData.name}
                  onChange={onInputChange}
                  autoFocus
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onCancel}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {editUser ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null
}

export default Modal
