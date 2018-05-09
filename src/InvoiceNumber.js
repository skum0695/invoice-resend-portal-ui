var React = require('react');
var createReactClass = require('create-react-class');


module.exports = createReactClass({

  handleChange: function(event){
    this.props.onChange(event.target.name,event.target.value)
  },

  render: function(){
    return(
      <div className="form-group mr-3 ml-3">
          <label><span className="redText">*</span>Invoice Number: </label>
          <input name="invoiceNum" className={"form-control " + (this.props.windowWidth >= 993 ? '' : 'increaseFont')} type = "text" value={this.props.invoiceNum}
             onChange = {this.handleChange} placeholder="123456789" required/>
          <div className="invalid-feedback">
            At least one invoice number is required.
          </div>
      </div>
    )}
})
