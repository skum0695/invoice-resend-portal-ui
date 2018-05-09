var React = require('react');
var createReactClass = require('create-react-class');


module.exports = createReactClass({
  handleChange: function(event){
    this.props.onChange(event.target.name,event.target.value)
  },

  render: function(){
    return(
      <div className="form-group ml-3 mr-3">
        <div className="form-group-prepend">
          <div className="form-group-text"><span className="redText">*</span>Reason: &nbsp;
            <a data-toggle="tooltip" className="customAlignRight" title="Enter why there is a need for retransmission.  This is for tracking purposes.">
              <i className="far fa-question-circle"></i>
            </a>
          </div>
        </div>
        <textarea className={"form-control " + (this.props.windowWidth >= 993 ? '' : 'increaseFont')} name="reasonForTransmit" aria-label="With textarea" value = {this.props.reasonForTransmit}
          onChange = {this.handleChange} placeholder="Please enter reason for transmission" required></textarea>
        <div className="invalid-feedback">
          A reason for re-transmitting invoice(s) is required.
        </div>

      </div>
    )}
})
