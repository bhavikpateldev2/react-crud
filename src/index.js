import { React } from "react"
import { render } from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import "toastr/build/toastr.min.css"
import "./style.css"

import Header from "./components/header"
import UserList from "./pages/user-list"
import UserDetail from "./pages/user-detail"

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Header />

        <Route exact path="/" component={UserList} />
        <Route exact path="/user/:id" component={UserDetail} />
      </div>
    </Router>
  )
}

render(<App />, document.getElementById("root"))
