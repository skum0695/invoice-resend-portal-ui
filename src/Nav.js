var React = require('react');
var createReactClass = require('create-react-class');


module.exports = createReactClass({

  render: function(){
    if(this.props.isAuth == "true"){
      return(
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              <img src="images/Sysco_Logo.png" width="60" height="32" className="d-inline-block align-top" alt=""/>
            </a>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      )}else {
        return(
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">
                <img src="images/Sysco_Logo.png" width="50" height="30" className="d-inline-block align-top" alt=""/>
              </a>
            </nav>
          </div>
        )
      }

  }
})
