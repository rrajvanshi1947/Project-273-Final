import React, { Component } from "react";
import axios from "axios";

class FileUpload1 extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      switch: false
    };
  }

  submitFile = () => {
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios.post("/test-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(
          "pdf has been saved to bucket. URL = ",
          response.data.Location
        );
        console.log("in Cover")
        this.props.onCoverletterUpload(response.data.Location);

      })
      .catch(error => {
        console.log(error);
      });
  };

    handleFileUpload = event => {
    this.setState({ file: event.target.files },() => {
      this.submitFile(); 
    });
    
  };



  render() {
    
    return (
    // <input type="file" id="myFileInput" style={display ='none'}/>
    // <input type="button"
    //        onclick="document.getElementById('myFileInput').click()" 
    //        value="Select a File" />
      <form onSubmit={this.submitFile} >
        <label class="btn btn-primary" for="myFileInput1">Upload Cover Letter</label>
        <input
          label="upload file1"
          id="myFileInput1"
          type="file"
          style={{display: 'none'}}
          // ref={(ref) => this.upload = ref}
          onChange={this.handleFileUpload}
        />
        </form>
    );
  }
}

export default FileUpload1;