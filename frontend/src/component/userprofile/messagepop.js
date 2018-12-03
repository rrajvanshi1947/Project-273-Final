import React from 'react';
import { Field, reduxForm,reset } from 'redux-form';
import moment from 'moment';

const afterSubmit = (result, dispatch) =>
  dispatch(reset('message'));

let Message = props => {
    const { handleSubmit,reset } = props;
    console.log(props.userToMsg)
    console.log(props.messages)
    let oldMessages = typeof props.messages!=="undefined"? (props.messages.map(msg=>
        (  <div>
            <div className= 'col-sm-4' style={{float:'left',marginTop:"30px"}}>
                <img className="avatar img-circle img-thumbnail" style={{width:'40px',height:'40px'}}/>
                
            </div>
            <div className = 'col-sm-8' style={{marginTop:"20px"}}>
                <span style={{float:'right'}}>{moment(msg.createdAt).format("DD MMM HH:MM")}</span>
                    <h5>{msg.author}:</h5>
                    <p>{msg.body}</p>
             </div>
         </div>
            )
            )):null;
    return (
        <div className="modal fade vpmessage1" id="vpMessage1" tabindex="-1" role="dialog" aria-labelledby="vpModalLabel6" aria-hidden="true">
                    <div className="modal-dialog1" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="vpModalLabel6" >Message</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                                <div className="modal-body6">
                                    <div className="row col-sm-12">

                                        <div className="col-sm-12" style={{borderBottom:'1px solid grey'}}>
                                            <h5 style={{paddingLeft:"20px"}}>{typeof props.userToMsg!=="undefined"?`${props.userToMsg.firstname} ${props.userToMsg.lastname}`:null}</h5>
                                        </div>
                                        
                                        <div className="converse1 col-sm-12">
                                            {oldMessages}
                                        </div>
                                        </div>
                                        <form onSubmit={handleSubmit} style={{ fontSize: '14px' }}>
                                        <div style={{position:'fixed',left: '350px',marginLeft: '40px',bottom: '140px',width: '300px'}}>
                                        <div className = "col-sm-12" style={{borderTop:"1px solid grey",borderBottom:"1px solid grey"}}>
                                            <Field className="form-control" component="textarea" name ="messageTextBox" rows="3" placeholder="Write a message" style={{border:'none'}}/>
                                        </div>
                                        <div className="col-sm-12" style={{marginTop:"20px"}}>
                                            <span className="glyphicon glyphicon-picture" style={{fontSize:'24px',color:"grey"}}></span>
                                            <span className="glyphicon glyphicon-paperclip" style={{fontSize:'24px',color:"grey",paddingLeft:"20px"}}></span>
                                            <span><i className='far fa-grin-alt' style={{fontSize:'24px',paddingLeft:"20px"}}></i></span>
                                            <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" style={{float:'right',marginLeft:'10px'}}>Close</button>
                                            <button type="submit" className="btn btn-primary btn-sm" style={{float:"right",marginLeft:'10px'}}>Send</button>
                                        </div>
                                        </div>
                                        </form>    
                                </div>
                        </div>
                    </div>
                </div>
    )
    }

    Message = reduxForm({
        // a unique name for the form
        form: 'message',
        onSubmitSuccess: afterSubmit,
        // initialValues: data,     
    })(Message)
    
    export default Message;