var React = require('react');
var createReactclass = require('create-react-class');
const { detect } = require('detect-browser');
const browser = detect();


var SubOptions = require('./SubOptions');
var CustomerNumber = require('./CustomerNumber');
var GroupID = require('./GroupID');
var InvoiceDate = require('./InvoiceDate');
var InvoiceNumber = require('./InvoiceNumber');
var Modal = require('./Modal');
var OpcoNumber = require('./OpcoNumber');
var LoginFields = require('./LoginFields');
var Nav = require('./Nav');
var SubmitReason = require('./SubmitReason');






//React class containing all input feilds in one module.  This includes those for invoice number, opco, groupID, customer number
// and date range, as well as the ability for bulk invoice upload.

module.exports = createReactclass({

  getInitialState: function() {
    return {
      value: '', modalMessage: "Are you sure you would like to submit?",
      userId:undefined,password:undefined, fileName: "Choose file", browserName: browser.name
    };
  },


  //The below will update the styling based on the screen size
    updateDimensions: function() {
      this.setState({windowWidth: window.innerWidth});
    },
    componentWillMount: function() {
      this.updateDimensions();
    },
    componentDidMount: function() {
      window.addEventListener("resize", this.updateDimensions);
    },
    componentWillUnmount: function() {
      window.removeEventListener("resize", this.updateDimensions);
    },


  //Changes modal message once submission is confirmed
  modalMessageChange: function(){
    if(this.state.modalMessage == "Are you sure you would like to submit?"){
      this.setState({modalMessage:"Transmission Complete!"})
    };
  },

  //Updates state based on changes made

  handleChange: function(name,passedVal) {

    this.setState({[name]:passedVal},() => {
      if(this.state.typeOfInput == "dateRange"){
        var fieldMissing = document.getElementById("fieldMissing");
        if(this.state.fromDate != "" && this.state.toDate != "" && this.state.fromDate != undefined && this.state.toDate != undefined){
          fieldMissing.style.display = "none";
        }
      }
    });

    if(name == "typeOfInput"){
      this.setState({reasonForTransmit: undefined, opco:undefined})
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.classList.remove('was-validated');
      });
    }

   },

  //Used to display the filename of the chosen file
  fileInputDisplay: function(e){
    this.setState({fileName: e.target.files[0].name});
  },

  //This will Submit the information.  Opens the modal to confirm submission then submitHandler will submit data.
  clickHandler: function(event) {

    if(this.state.typeOfInput == "dateRange"){
      var fromVal = document.getElementById('fromDate').value;
      var toVal = document.getElementById('toDate').value;

      this.setState({fromDate: fromVal, toDate: toVal});
    }

    //This is to trigger the validation
    // Loop over forms and prevent submission
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      }
      form.classList.add('was-validated');

      //if the form is valid, open the modal to continue submission
      if(form.checkValidity() === true){
        $('#confirmSubmission').modal('show');
      };
    }
  );

    //Checks for input of date range -- Displays invalid feedback if no dates entered
    if(this.state.typeOfInput == "dateRange"){
      var fieldMissing = document.getElementById("fieldMissing");
      if(this.state.fromDate == "" || this.state.toDate == "" || this.state.fromDate == undefined || this.state.toDate == undefined){
        fieldMissing.style.display = "block";
      };
    }

    //Ensures the correct modal message will be shown upon opening modal
    if(this.state.modalMessage == "Transmission Complete!"){
      this.setState({modalMessage:"Are you sure you would like to submit?"})
    }
  },

  submitHandler: function(){
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.classList.remove('was-validated');
    });

    //handle submission of form feilds here.  This is whree we will be using post with the information collected

  },

  //Resets what has been filled out when reset button pressed
  resetHandler: function(){
    this.setState({fromDate:undefined,toDate:undefined, reasonForTransmit:undefined,
      invoiceNum:undefined,group:undefined,opco:undefined, customer: undefined, fileName: "Choose file"});

      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.classList.remove('was-validated');
      });

      if(this.state.typeOfInput == "dateRange"){
        document.getElementById("firstSubBtn").disabled = false;
        var invDates = document.getElementById("invDates");
        invDates.style.display = "none";

        if(this.state.browserName =="ie"){
          document.getElementById("firstSubBtn").style.display = "block"
        }

        var fieldMissing = document.getElementById("fieldMissing");
        fieldMissing.style.display = "none";

      };

    },

    changeDates: function(){
      if(this.state.typeOfInput=="dateRange"){
        var invDates = document.getElementById("invDates");

        //Checks if "from" date is less than "to" date, if not submission not allowed
        var fromDate = document.getElementById('fromDate').value;
        var toDate = document.getElementById('toDate').value;

        if(fromDate != this.state.fromDate){
          this.setState({fromDate: fromDate})
        }

        if(toDate != this.state.toDate){
          this.setState({toDate: toDate})
        }

        if(fromDate > toDate && (fromDate != "" && toDate != "") && (fromDate != undefined && toDate != undefined)){
          document.getElementById("firstSubBtn").disabled = true;
          invDates.style.display = "block";
          if(this.state.browserName == "ie"){
            document.getElementById("firstSubBtn").style.display = "none"
          }
        } else{
          document.getElementById("firstSubBtn").disabled = false;
          invDates.style.display = "none";
          if(this.state.browserName == "ie"){
            document.getElementById("firstSubBtn").style.display = "block"
          }
        };
      }
    },


  //Used to handle the clicking of the login button.
  //Will be using the login functionality from RME project
  loginHandler: function(userId,pass){
    this.setState({userId:userId,password: pass})
  },

  render: function(){

      ///Find a way to update the state from here.  Maybe pass a function to Invoice date contianing the below, then find a way to trigger
      //that function on loading the component

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

    //This will be used to validate user ids, for now it just checks if fields are empty
    if (this.state.userId != undefined && this.state.userId != '' && this.state.password != undefined && this.state.password != ''){


      switch(this.state.typeOfInput){
        case "invoiceNumber":
        if(this.state.fromDate || this.state.toDate){
          this.setState({fromDate:undefined,toDate:undefined,reasonForTransmit:undefined});
        }
          return(
            <div className="mainContent">
              <Nav isAuth="true"/>

              <div className="row takeMargins">
                <div className="col-lg-4 pictureBack takePadding">
                    <SubOptions onChange={this.handleChange} windowWidth={this.state.windowWidth} typeOfInput={this.state.typeOfInput}/>
                </div>

                <div className={"container col-lg-8 addPaddingTop" + (this.state.browserName == "ie" ? ' ieNoSpaceLeft' : '')}>
                    <form className={"form-group needs-validation " + (this.state.windowWidth >= 993 ? '' : ' autoMargins increaseFont')} id="formFields" noValidate>
                      <div className="row justify-content-center">
                        <div className="col-8 col-sm-8 col-md-8 col-lg-3">
                          <OpcoNumber onChange={this.handleChange} windowWidth={this.state.windowWidth}/>
                        </div>
                        <div className="col-10 col-sm-10 col-md-10 col-lg-5">
                          <InvoiceNumber onChange={this.handleChange} windowWidth={this.state.windowWidth}/>
                        </div>
                      </div>

                      <div className="row">
                        <div className="offset-0 offset-lg-1 col-10 col-sm-10 col-md-10 col-lg-8 mb-3 mt-3 autoMargins">
                          <SubmitReason onChange={this.handleChange} windowWidth={this.state.windowWidth}/>
                        </div>
                      </div>

                      <div className="row centerText">
                        <div className="offset-0 col-10 col-sm-10 col-md-10 col-lg-8 mb-3 mt-3 autoMargins">
                          <span className="redText">*</span><span className="italicize">This field is required</span>
                        </div>
                      </div>

                      <div className="row justify-content-around offset-0 offset-lg-3 mb-3 mr-1 ml-1">
                          <button type="reset" onClick={() => {this.resetHandler()}} className={"btn btn-outline-danger " + (this.state.windowWidth >= 993 ? '' : 'increaseFont')}>Reset</button>
                          <button onClick={this.clickHandler} id="firstSubBtn" className={"btn btn-primary " + (this.state.windowWidth >= 993 ? '' : 'increaseFont')} type="button">Submit</button>
                      </div>
                    </form>
              </div>

            </div>

            <Modal modalMessage={this.state.modalMessage} onChange={this.modalMessageChange} onSubmit={this.submitHandler} stateValue={this.state}/>
            </div>
          );
          break;
        case "dateRange":
        if(this.state.invoiceNum){
          this.setState({invoiceNum:undefined});
        };

        return(

          //update dimensions is not needed here but an error is thrown if nothing placed.  Nested Switch Statement??
          <div className="mainContent" onMouseEnter={(this.state.browserName =="ie" ? this.changeDates : this.updateDimensions)}>
            <Nav isAuth="true"/>

            <div className="row takeMargins">
              <div className="col-lg-4 pictureBack takePadding">
                  <SubOptions onChange={this.handleChange} windowWidth={this.state.windowWidth} typeOfInput={this.state.typeOfInput}/>
              </div>


            <div className={"container col-lg-8 addPaddingTop" + (this.state.browserName == "ie" ? ' ieNoSpaceLeft' : '')}>
              <form className={"form-group needs-validation " + (this.state.windowWidth >= 993 ? '' : ' autoMargins increaseFont')} id="formFields" noValidate>
                <div className="row">
                  <div className={"col-10 col-sm-10 col-md-8 col-lg-3 offset-lg-2 " + (this.state.windowWidth >= 993 ? '' : 'autoMargins')}>
                    <OpcoNumber onChange={this.handleChange} windowWidth={this.state.windowWidth}/>
                  </div>
                  <div className={"col-10 col-sm-10 col-md-8 col-lg-3 offset-lg-2 " + (this.state.windowWidth >= 993 ? '' : 'autoMargins')}>
                    <GroupID onChange={this.handleChange} windowWidth={this.state.windowWidth}/>
                  </div>
                </div>

                <div className="row">
                  <div className="offset-lg-1 col-10 col-sm-10 col-md-10 col-lg-4 mb-3 autoMargins">
                    <CustomerNumber onChange={this.handleChange} windowWidth={this.state.windowWidth}/>
                  </div>
                </div>

                <div className={"row " + (this.state.browserName == "ie" ? "mr-3 ml-3" : '')}>
                  <div className="autoMargins col-lg-12">
                    <InvoiceDate browserName={this.state.browserName} onChange={this.handleChange} windowWidth={this.state.windowWidth} /><br/>
                  </div>
                </div>

                <div className="row">
                  <div className="offset-lg-1 col-10 col-sm-10 col-md-10 col-lg-8 mb-3 mt-3 autoMargins">
                    <SubmitReason onChange={this.handleChange} windowWidth={this.state.windowWidth}/>
                  </div>
                </div>

                <div className="row centerText">
                  <div className="offset-0 col-10 col-sm-10 col-md-10 col-lg-8 mb-3 mt-3 autoMargins">
                    <span className="redText">*</span><span className="italicize">This field is required</span>
                  </div>
                </div>

                <div className="row justify-content-around offset-0 offset-lg-3 ml-1 mr-1 mb-3">
                    <button type="reset" onClick={() => {this.resetHandler()}} className={"btn btn-outline-danger ml-2 " + (this.state.windowWidth >= 993 ? '' : 'increaseFont')}>Reset</button>
                    <button onClick={this.clickHandler} id="firstSubBtn" className={"btn btn-primary " + (this.state.windowWidth >= 993 ? '' : 'increaseFont')} type="button">Submit</button>
                </div>


              </form>
            </div>

          </div>

            <Modal modalMessage={this.state.modalMessage} onChange={this.modalMessageChange} onSubmit={this.submitHandler} stateValue={this.state}/>
          </div>);
          break;
        case "bulkInvoice":
        if(this.state.fromDate || this.state.fromTime || this.state.toDate || this.state.invoiceNum){
          this.setState({fromDate:undefined,fromTime:undefined,toDate:undefined, invoiceNum:undefined, reasonForTransmit:undefined});
        }
          return(
            <div className="mainContent">
              <Nav isAuth="true"/>

              <div className="row takeMargins">
                <div className="col-lg-4 pictureBack takePadding">
                    <SubOptions onChange={this.handleChange} windowWidth={this.state.windowWidth} typeOfInput={this.state.typeOfInput}/>
                </div>

                {/*  Input for uploading a document with multiple invoices right now just placeholder.  Will need
                  I/O functionality */}
                <div className={"container col-lg-8 addPaddingTop" + (this.state.browserName >= "ie" ? ' ieNoSpaceLeft' : '')}>
                  <form className={"form-group needs-validation " + (this.state.windowWidth >= 993 ? '' : ' autoMargins increaseFont')} id="formFields" noValidate>
                    <div className="row">
                      <div className="offset-0 offset-lg-1 col-10 col-sm-10 col-md-10 col-lg-6 mb-3 autoMargins"><span className="redText">*</span>
                        <a data-toggle="tooltip" className="customAlignRight" title="Excepted file formats include (TBD ex CSV, txt, xls, xlsx).
                          Ensure the file lists (TBD - Specify the information and order of the file)">
                          <i className="far fa-question-circle"></i>
                        </a>
                        <div className="custom-file mb-3">
                          <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.fileInputDisplay} required/>

                          <div className="invalid-feedback">
                            Please upload a file.
                          </div>
                          <label className={"custom-file-label " + (this.state.windowWidth >= 993 ? '' : 'increaseHeight')} htmlFor="inputGroupFile02">{this.state.fileName}</label>
                        </div><br/>
                      </div>
                    </div>

                    <div className="row">
                      <div className="offset-0 col-10 col-sm-10 col-md-10 col-lg-8 mb-3 mt-3 autoMargins">
                        <SubmitReason onChange={this.handleChange} windowWidth={this.state.windowWidth}/>
                      </div>
                    </div>

                    <div className="row centerText">
                      <div className="offset-0 col-10 col-sm-10 col-md-10 col-lg-8 mb-3 mt-3 autoMargins">
                        <span className="redText">*</span><span className="italicize">This field is required</span>
                      </div>
                    </div>

                    <div className="row justify-content-around offset-0 offset-lg-3 ml-1 mr-1 mb-3">
                        <button type="reset" onClick={() => {this.resetHandler()}} className={"btn btn-outline-danger " + (this.state.windowWidth >= 993 ? '' : 'increaseFont')}>Reset</button>
                        <button onClick={this.clickHandler} id="firstSubBtn" className={"btn btn-primary " + (this.state.windowWidth >= 993 ? '' : 'increaseFont')} type="button">Submit</button>
                    </div>

                  </form>
                </div>
              </div>

              <Modal modalMessage={this.state.modalMessage} onChange={this.modalMessageChange} onSubmit={this.submitHandler} stateValue={this.state}/>
            </div>
        );
          break;
        default:
          return(
              <div className="mainContent">
                <Nav isAuth="true"/>

                <div className="row align-items-center takeMargins">
                  <div className="col-lg-4 pictureBack takePadding">
                      <SubOptions onChange={this.handleChange} windowWidth={this.state.windowWidth} typeOfInput={this.state.typeOfInput}/>
                  </div>
                </div>
              </div>
          );
          break;
      }

      }else{
            return(
              <div>
                <Nav isAuth="false"/>
                <LoginFields onClick={this.loginHandler}/>
              </div>
            )
          }
      }
})
