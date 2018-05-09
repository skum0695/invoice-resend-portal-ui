var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
  handleChange: function(event){
    this.props.onChange(event.target.name,event.target.value)
  },

  render: function(){
    return(
      <div className="form-group mr-3 ml-3">
          <label>Customer Number: </label>
          <a data-toggle="tooltip" className="customAlignRight" title="Customer number is not required.">
            <i className="far fa-question-circle"></i>
          </a>
          <input name="customer" id="customer" type = "number" className={"form-control " + (this.props.windowWidth >= 993 ? '' : 'increaseFont')} value = {this.props.customer}
            onChange = {this.handleChange} placeholder="123456" min={0} ref="customer"/>
      </div>
    )}
})
