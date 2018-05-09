var React = require('react');
var createReactClass = require('create-react-class');


module.exports = createReactClass({

  handleChange: function(event){
    this.props.onChange(event.target.name,event.target.value);
  },

  render: function(){
    return(
      <div className="form-group">
          <label><span className="redText">*</span>TPID: </label>
          <input name="group" id="group" type = "text" className={"form-control " + (this.props.windowWidth >= 993 ? '' : 'increaseFont')} value = {this.props.groupId} onChange = {this.handleChange}
            placeholder="AAA" maxLength="8" ref="group" required/>
          <div className="invalid-feedback">
            A TPID is required.
          </div>
      </div>
    )}
})
