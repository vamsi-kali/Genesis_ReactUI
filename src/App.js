import logo from './logo.svg';
import './App.css';
import {GoogleLogin} from 'react-google-login'
import Top from "./TopRegion"
import Tab1 from "./Tabs"
import ReactDOM from 'react-dom'
import 'react-slideshow-image/dist/styles.css'
import Home from "./HomePage"
import homepic from './homepagecrop.jpg'
function responseGooogle(response){
    ReactDOM.render(
      <Top uname={"Vamsidhar"}/>,
      document.getElementById("root")
    )
    
    ReactDOM.render(
      <Tab1/>,
      document.getElementById('root1')
    )
}

function failresponse(response){
  alert("Invalid User")
}

function App() {
  return (
    <div>
      <div>
        <span><img src="https://www.genesis-fs.com/hs-fs/hubfs/change_site/images/logo.png?width=258&name=logo.png"/></span>
        <span style={{marginLeft:"73%"}}>
          <GoogleLogin
          clientId = "715305265100-666cjgcfi1l472gltpkmhccl8ttumtho.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGooogle}
          onFailure={failresponse}
          cookiePolicy={'single_host_origin'}
        /></span>
      </div>
      <div>
        <img src={homepic}/>
        <div style={{marginTop:"2%"}}><Home/></div>
        
      </div>

    </div>
  );
}

export default App;
