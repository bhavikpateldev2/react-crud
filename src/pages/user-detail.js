import React, { useState, useEffect } from "react"
import API from "../utils/api"
import toastr from "toastr"

const UserDetail = (props) => {
  const [user, setUser] = useState({})

  /* = Date: 15-08-2021
     = get user detail
     ---------------------------------------------------- */
  useEffect(() => {
    API.request("get", "people/" + props.match.params.id)
      .then((response) => {
        if (response.data.result) {
          setUser(response.data.result)
        }
      })
      .catch(() => {
        toastr.error("error while fetching user detail")
      })
  }, [])

  return (
    <>
      <h4>{user && user.description ? user.description : ""}</h4>

      <div className="properties">
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">UID:</label>
          <div className="col-sm-10">{user.uid}</div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-10">
            {user.properties && user.properties.name ? user.properties.name : ""}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Birth Year:</label>
          <div className="col-sm-10">
            {user.properties && user.properties.birth_year
              ? user.properties.birth_year
              : ""}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Gender:</label>
          <div className="col-sm-10">
            {user.properties && user.properties.gender ? user.properties.gender : ""}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Eye Color:</label>
          <div className="col-sm-10">
            {user.properties && user.properties.eye_color
              ? user.properties.eye_color
              : ""}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Hair Color:</label>
          <div className="col-sm-10">
            {user.properties && user.properties.hair_color
              ? user.properties.hair_color
              : ""}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Skin Color:</label>
          <div className="col-sm-10">
            {user.properties && user.properties.skin_color
              ? user.properties.skin_color
              : ""}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Height:</label>
          <div className="col-sm-10">
            {user.properties && user.properties.height ? user.properties.height : ""}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetail
