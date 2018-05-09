var React = require('react');
var createReactClass = require('create-react-class');


module.exports = createReactClass({


      componentDidMount: function(){

      if(this.props.browserName == "ie"){

        $('#fromDate').datepicker({
          uiLibrary: 'bootstrap4',
          format: 'yyyy-mm-dd'
        });
        $('#toDate').datepicker({
          uiLibrary: 'bootstrap4',
          format: 'yyyy-mm-dd'
        });

        var firstCalBtn = document.getElementsByClassName('gj-icon')[0].innerHTML = "";
        var secCalBtn = document.getElementsByClassName('gj-icon')[1].innerHTML = "";


        document.getElementsByClassName("input-group-append")[0].setAttribute("data-toggle", "tooltip");
        document.getElementsByClassName("input-group-append")[0].setAttribute("title", "Click Me!");
        document.getElementsByClassName("input-group-append")[1].setAttribute("data-toggle", "tooltip");
        document.getElementsByClassName("input-group-append")[1].setAttribute("title", "Click Me!");

    }
  },

  handleChange: function(event){
    this.props.onChange(event.target.name,event.target.value);

    //Checks if "from" date is less than "to" date, if not submission not allowed
    var fromDate = document.getElementById('fromDate').value;
    var toDate = document.getElementById('toDate').value;

    if(fromDate > toDate && (fromDate != "" && toDate != "") && (fromDate != undefined && toDate != undefined)){
      document.getElementById("firstSubBtn").disabled = true;
      this.refs.invDates.style.display = "block";
    } else{
      document.getElementById("firstSubBtn").disabled = false;
      this.refs.invDates.style.display = "none";
    };
  },

  render: function(){

    return(
      <div className="form-group">
        <label className={(this.props.browserName == "ie" ? "offset-lg-2" : "offset-lg-2 offset-sm-1 col-8 col-sm-8 col-md-8 col-lg-5")}>
          <span className="redText">*</span>Date Range:
        </label>
          <div className={"row justify-content-center " + (this.props.browserName == "ie" ? '' : ' mr-3 ml-3')}>
            <div className={"takePadding col-10 col-sm-10 col-md-10 col-lg-3 "}>
              <input id="fromDate" name="fromDate" type={(this.props.browserName == "ie" ? "" : "date")}
                value ={this.props.fromDate} required className={"form-control "+ (this.props.windowWidth >= 993 ? '' : 'increaseDateFont')
                + (this.props.browserName == "ie" ? ' datepicker ieNoRightMargin' : '')} onChange={this.handleChange}/>
            </div>
            <div className="col-sm-5 col-lg-1 centerText">to</div>
            <div className={"takePadding col-10 col-sm-10 col-md-10 col-lg-3 "}>
              <input className={"form-control " + (this.props.windowWidth >= 993 ? '' : 'increaseDateFont') + (this.props.browserName == "ie" ? ' datepicker' : '')} name="toDate"
                 id="toDate" value={this.props.toDate} type={(this.props.browserName == "ie" ? "" : "date")} onChange={this.handleChange} required/>
            </div>
        </div>

        <div className="row">
          <div id="fieldMissing" ref="fieldMissing" className="offset-md-1 fontAlignCenter">
            Enter valid dates.
          </div>

          <div id="invDates" ref="invDates" className="offset-md-1 fontAlignCenter">
            "From" date must be less than "To" date.
          </div>
        </div>

      </div>
    )
  }
})
