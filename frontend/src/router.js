import React,{Component} from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Loginpage from './component/login/loginpage';
import Userprofile from './component/userprofile/userprofile';
import Feed from './component/homepage/feed';
import Message from './component/messaging/message';
import Dashboard from './component/dashboard/dashboard';
import Logout from './component/login/logout';
import Jobsearch from './component/jobsearch/jobsearch';
import Jobform from './component/jobform/jobform';
import FileUpload from './component/resume/resume';
import Usersearch from './component/homepage/usersearch';
import PostJob from './component/postjob/postjob';
import MyPostedJob from './component/MyJob/mypostedjob';
import EditJob from './component/editjob/editjob';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
   		    <Switch>
                <Route exact path="/" component={Loginpage} />
                <Route exact path="/userprofile/:emailID" component={Userprofile} /> 
                <Route exact path="/feed" component={Feed} />
                <Route exact path="/messages" component={Message} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/Jobsearch" component={Jobsearch} /> 
                <Route exact path="/Jobform/:jobid/:emailID" component={Jobform} /> 
                <Route exact path="/FileUpload" component={FileUpload} />  
                <Route path="/usersearch" component={Usersearch} />
                <Route exact path="/postjob" component={PostJob} />
                <Route exact path="/myjob" component={MyPostedJob} />
                <Route exact path="/postjob/:jobid" component={EditJob} />
            </Switch>
            </BrowserRouter>
        )
    }
}
export default Router;
