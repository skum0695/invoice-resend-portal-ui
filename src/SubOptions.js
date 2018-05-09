var React = require('react');
var createReactClass = require('create-react-class');


module.exports = createReactClass({
  handleChange: function(event){
    this.props.onChange(event.target.name,event.target.value);
  },

  render: function(){
    return(
      <div className={"form-group col-10 col-sm-8 col-md-8 mb-3 col-lg-12 " + (this.props.typeOfInput == undefined ? 'arrow_background ' : (this.props.typeOfInput == "" ? 'arrow_background ' : (this.props.windowWidth >= 993 ? 'dropdownOptions_large arrow_box_large takeMargins' : 'arrow_box_small dropdownOptions_small')))}>
          <select className="form-control typeOfInput " name="typeOfInput" id="typeOfInput" value={this.props.typeOfInput} onChange = {this.handleChange}>
            <option default value="">Select Method: </option>
            <option value="invoiceNumber">Invoice Number</option>
            <option value="dateRange">Date Range</option>
            <option value="bulkInvoice">Bulk Invoice Upload</option>
          </select>
          <br/>
      </div>
    )}
})
