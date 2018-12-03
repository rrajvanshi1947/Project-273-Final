import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer text-center col-sm-12">
                <form className="same-name-search form-inline">
                <h3 className="title" style={{color:'white'}}>Find a colleague</h3>
                <input type="text" name="first" placeholder="First name" aria-label="Enter colleague's first name"/>
                <input type="text" name="last" placeholder="Last name" aria-label="Enter colleague's last name" style={{marginLeft:'10px'}}/>
                <button  className="submit-btn" name="search" value="Search" disabled={true} style={{background:'transparent',marginLeft:'10px'}}>Search</button>
                </form>
            </div>
        )
    }
}
export default Footer;