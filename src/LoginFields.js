var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({

  handleClick: function(event){
    var thisUser = document.getElementById("userId").value;
    var thisPass = document.getElementById("password").value;
    this.props.onClick(thisUser,thisPass);

    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  });
  },


  render: function(){
    return(
      <div>
        <form className="needs-validation" noValidate>


          <div className="form-group col-10 col-sm-8 col-md-4 mb-3 ml-3 mr-3">
            <div className="row mb-3">
              <label htmlFor="userId">User Id: </label>
              <input id="userId" className="form-control" name="userId" type = "text" value = {this.props.userId}
                placeholder="abcd0123" required/>
              <div className="invalid-feedback">
                Please enter your user ID.
              </div><br/>
            </div>

            <div className="row mb-3">
              <label htmlFor="password">Password: </label>
              <input name="password" className="form-control" id="password" type = "password" value = {this.props.password}
                placeholder="Password" required/>
              <div className="invalid-feedback">
                Please enter your password.
              </div><br/>
            </div>

            <button onClick={this.handleClick} type="button" className="btn btn-outline-primary">Login</button>
          </div>
        </form>
      </div>
    )}
})
