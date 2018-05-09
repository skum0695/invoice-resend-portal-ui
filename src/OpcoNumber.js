var React = require('react');
var createReactClass = require('create-react-class');


module.exports = createReactClass({
  handleChange: function(event){
    this.props.onChange(event.target.name,event.target.value)
  },

  render: function(){
    return(
      <div className="form-group">
          <label><span className="redText">*</span>Opco: </label>
          <input className={"form-control " + (this.props.windowWidth >= 993 ? '' : 'increaseFont')} name="opco" type = "number" value = {this.props.opco}
            onChange = {this.handleChange} placeholder="001" max={999} min={0} required/>
          <div className="invalid-feedback">
            A valid opco number is required.
          </div>
      </div>
    )}
})
