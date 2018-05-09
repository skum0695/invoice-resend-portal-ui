var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
  handleChange: function(event){
    this.props.onChange(event.target.name,event.target.value)
  },

  clickHandler: function(){
    var x = document.getElementById("submitBtn");
    if(x.style.display = "block"){
        x.style.display = "none";
      }
    this.props.onChange();
    this.props.onSubmit();
    //Need code to transmit data here
  },

  render: function(){
    //Handles closing the Modal.  Will make submit button appear again if it is not visible
    $('#confirmSubmission').on('hidden.bs.modal', function () {
      setTimeout(function() { document.getElementById("submitBtn").style.display="block"; }, 700);
    });


    //This is to assure the proper message is displayed upon opening the modal

    return(
      <div className="modal fade" id="confirmSubmission" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{this.props.modalMessage}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeHandler}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {this.props.stateValue.typeOfInput == "invoiceNumber" &&
              <div className="modal-body">
                Opco Number: {this.props.stateValue.opco} <br/>
                Invoice Number: {this.props.stateValue.invoiceNum}
              </div>}

            {this.props.stateValue.typeOfInput == "dateRange" && (this.props.stateValue.customer != undefined && this.props.stateValue.customer != '') &&
              <div className="modal-body">
                Opco Number: {this.props.stateValue.opco} &nbsp; TPID: {this.props.stateValue.group} <br/>
                Customer Number: {this.props.stateValue.customer} <br/>
                Date Range: {this.props.stateValue.fromDate} to {this.props.stateValue.toDate}
              </div>}

            {this.props.stateValue.typeOfInput == "dateRange" && (this.props.stateValue.customer == undefined || this.props.stateValue.customer == '') &&
              <div className="modal-body">
                Opco Number: {this.props.stateValue.opco} &nbsp; TPID: {this.props.stateValue.group} <br/>
                Date Range: {this.props.stateValue.fromDate} to {this.props.stateValue.toDate}
              </div>}

            {this.props.stateValue.typeOfInput == "bulkInvoice" &&
              <div className="modal-body">
                File Name: {this.props.stateValue.fileName}
              </div>}

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" id="submitBtn" className="btn btn-primary" onClick={this.clickHandler}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
