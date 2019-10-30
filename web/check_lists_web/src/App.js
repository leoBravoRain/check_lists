import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Choose_List_Type from './screens/choose_list_type/choose_list_type.screen';
import Lists_by_Category from './screens/lists_by_category/lists_by_category.screen';
import Login from "./screens/login/login.screen";
import Home from "./screens/home/home.screen";
import Admin from "./screens/admin/admin.screen";

// material ui
import theme from './libraries/material-ui/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// firebase
import { auth } from "./libraries/firebase/firebase";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


// Component 
class App extends Component {
  
  
  // constructor
  constructor(props) {
    
    // constructur of parent
    super(props);
    
    this.on_logout = this.on_logout.bind(this);
    
  };
  
  on_logout() {
    
    // logout
    auth.signOut().then(res => {
      
      // console.log("loogut");
      // console.log(this);
      
      // window.redirect(window.location.host)
      // window.location = "/";
      // this.props.history.push('');
      
    }).catch(error => {
      
      console.log(error);
      
    });
    
  }
  
  // render method
  render() {
    
    return (
      
      <MuiThemeProvider theme={theme}>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

        <Router>

          <AppBar
            position="static"
          >

            <Toolbar 
              style = {{
                display: "flex",
                justifyContent: "space-between",

          }}
        >

              <Typography gutterBottom variant="h3" component="h3">

                Listas de chequeo

              </Typography>

              <Link to="/" style={{ textDecoration: "none", marginLeft: 2}}>

                <Typography gutterBottom variant="h6" component="h6">

                  Inicio

							</Typography>

              </Link>

              <Link to="/choose_list_type" className="nav-link" style={{ textDecoration: "none" }}>

                <Typography gutterBottom variant="h6" component="h6">

                  Listas de chequeo

							</Typography>

              </Link>

              {/* Link without "to" because text has the functino to close session */}
              <Link className="nav-link" style={{ textDecoration: "none" }}>

                <Typography gutterBottom variant="h6" component="h6" onClick={this.on_logout}>

                  Cerrar sesión

							</Typography>

              </Link>

            </Toolbar>

          </AppBar>

          <Route path = "/" exact component = {Home} />
          
          <Route path = "/login" exact component = {Login} />

          <Route path = "/choose_list_type" exact component={Choose_List_Type} />

          <Route path = "/lists_by_category/:category/" exact component={Lists_by_Category} />

          {/* special route. It only can be accessed by pointin to its url (not redirecting) */}
          <Route path="/admin/" exact component={Admin}/>

        </Router>

      </MuiThemeProvider>

    );

  }

}

// exporting app
export default App;