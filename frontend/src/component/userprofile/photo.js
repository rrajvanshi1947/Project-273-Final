import React, { Component } from 'react';
import axios from 'axios';
//import {nodeURL} from '../../config';

class PhotoUpload extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            output: null
        };
    }

    submitFile = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file[0]);
        axios.post(`/fileupload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                console.log(
                    "Image has been saved to bucket. URL = ",
                    response.data.Location
                );
                this.setState({
                    output: response.data.Location
                });
                
            })
            .catch(error => {
                console.log(error);
            });
    };

    submitImage = event => {
        console.log("Submit image", this.props.children[0]);
        axios.defaults.withCredentials = true;
        const data = {
            imageURL: this.state.output,
            emailID: this.props.children
        }
        console.log("Data: ", data);
        axios.post(`/saveimage`, data)
            .then(response => {
                console.log("Status: ", response.status)
            })
    }
    
    handleFileUpload = event => {
        this.setState({ file: event.target.files });
    };

    render() {
        {/*const url = "../Images/Image1.JPG";*/}
        console.log("Output file: ", this.state.output);
        const url = this.state.output
        if (this.props.children[1] === "true") {
            var hideDetails = (
                <button type="button" class="btn" data-toggle="modal" data-target="#vpModal2" style={{ float: "right", marginRight: "20px" }} >
                    <span class="glyphicon glyphicon-pencil" style={{ fontSize: "20px", color: "#0073b1" }}></span>
                </button>
            ) 
        }
        return (

            <div style={{ height: "150px", border: "1px solid lightgrey", marginTop: "10px" }}>
                <h4 style={{marginLeft: "40px"}}> Add a profile photo to help others recognize you</h4>

                {hideDetails}

                <div class="modal fade vpmodal2" id="vpModal2" tabindex="-1" role="dialog" aria-labelledby="vpModalLabel2" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="vpModalLabel2">Add Photo</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body4">
                                <h3 style={{marginLeft: "40px"}}> How’d you like to add your photo? </h3>
                                <form onSubmit={this.submitFile}>
                                    <input
                                        label="upload file"
                                        type="file"
                                        onChange={this.handleFileUpload}
                                    />
                                    <img height="200px" width="200px" src={url} style={{marginTop: "50px", marginLeft: "100px", border: "1px solid grey", borderRadius: "100%"}}></img>
                                        
                                    <button type="submit" className="btn btn-primary" style ={{float: "right", marginTop: "220px"}} >Upload</button>                   
                                </form>
                                <div class="modal-footer" style={{marginTop: "30px"}}>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" onClick={this.submitImage}>Save Image</button>
                                    </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default PhotoUpload;