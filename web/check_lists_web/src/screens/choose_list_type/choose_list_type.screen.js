import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

import {auth} from "../../libraries/firebase/firebase";

class Choose_List_Type extends React.Component {

    componentDidMount() {

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (!user) {

                console.log("user not logged");

                this.props.history.push('/login/');

                console.log("aosjid");

            }

            else {

                console.log("user logged");

                // this.props.history.push('/login/');
            }

        });

    }
    
    render() {

        return (

            <Paper
                style={{
                    margin: 20,
                    padding: 20,
                }}
            >
                <Container
                    style = {{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >

                    <Typography align="center" variant="h4" component="h4" gutterBottom>
                        Escoger tipo de lista
                    </Typography>

                    <Typography align="center" variant="body2" component="p" gutterBottom>
                        Debes escoger algún tipo de lista que tienes registrado en el sistema
                    </Typography>
                    
                    <Container
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            // backgroundColor: "red",
                            // alignContent: "center",
                            justifyContent: "center"
                        }}
                    >

                        <Link to="/lists_by_category/env" style = {{textDecoration: "none"}}>
                            <Button align="center" variant="contained" color="primary">
                                Listas de Medio Ambiente
                            </Button>
                        </Link>

                        <Link to="/lists_by_category/sso" style={{ textDecoration: "none"}}>
                            <Button align="center" variant="contained" color="primary">
                                Listas de SSO
                            </Button>
                        </Link>

                    </Container>

                </Container>
            </Paper>
        );

    }

}

export default Choose_List_Type;