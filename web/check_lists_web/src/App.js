import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Choose_List_Type from './screens/choose_list_type/choose_list_type.screen';
import Lists_by_Category from './screens/lists_by_category/lists_by_category.screen';

// material ui
import theme from './libraries/material-ui/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as Link_ } from '@material-ui/core/Link';

// Component 
class App extends Component {

  // render method
  render() {

    return (

      <MuiThemeProvider theme={theme}>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

        <Router>

          <AppBar
            position="static"
          >

            <Toolbar>

              <Typography gutterBottom variant="h3" component="h3">

                Check lists

              </Typography>

              <Link to="/" className="nav-link">

                <Typography gutterBottom variant="h6" component="h6">

                  Inicio
  
							</Typography>

              </Link>

            </Toolbar>

          </AppBar>

          <Route path="/" exact component={Choose_List_Type} />

          <Route path="/lists_by_category/:category/" exact component={Lists_by_Category} />

        </Router>

      </MuiThemeProvider>

    );

  }

}

// exporting app
export default App;