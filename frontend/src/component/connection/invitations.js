import React from 'react';
import './connections.css';
import {Link} from 'react-router-dom';
 
let Invitations = props => {
    const url = props.imageURL;
    return (
        <div className="col-sm-12">
            <div className="col-sm-4">
            <img src={url!=='undefined'?url:null} alt={props.firstname} className="avatar img-circle img-thumbnail" style={{marginTop:"20px",marginLeft:'30px',width:'80px',height:'80px'}}/>
            </div>
            <div className="col-sm-8" style={{marginTop:"20px",paddingBottom:"30px",borderBottom:"1px solid grey"}}>
            <div className="header-item">
               <Link to={`/userprofile/${props.emailID}`} style={{fontSize:'16px'}}><strong>{`${props.firstname} ${props.lastname}`}</strong></Link> 
            </div>
            <span>{`${props.company}`}</span>
            <p>{props.location}</p>
            </div>
        </div>
    )
}

export default Invitations;

