import React,{Component} from 'react';

class Logout extends Component {
    componentWillMount() {

        this.props.history.push('/');
      }
    
    render(){
        return (
            <div>
                Logout
            </div>
        )
    }
}
export default Logout;