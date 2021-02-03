import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Home from './Home';


  const Layout = (props) => {return (<>
    <Switch name='con o sin sesion'>
      <Route path='/signup' exact component={SignUp} />
      <Route path='/login' exact component={LogIn} />
      <Route path='/' exact component={Home} />
    </Switch>
  </>
  )};

  export default Layout;