import React from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export function Login() 
{     
        const history = useHistory();
        function LoginClick() {
            
            console.log("Try to login:");
            history.push("/map")
      
          }

        return (
          <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>AMBROZIA</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Register</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </nav>
            <form>
                <h3>Sign In</h3>
               
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                

                <button type="submit" className="btn btn-primary btn-block" onClick={() => LoginClick()}>Submit</button>
               
            </form></div>
        );
    
}
export default Login;