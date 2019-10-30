import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

class Home extends React.Component {

    render() {

        return (

            <Paper
                style={{
                    margin: 20,
                    padding: 30,
                    // backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCLXJXmk3j4nt_JNvSRBylV7acxMIdppOdRMpL4w5LEG782o6l&s)",
                    // backgroundColor: "red",
                    // height: "80%",
                    // width: "100%",
                    // right: 0,
                    // position: "absolute",
                    // margin: 0,
                    // backgroundRepeat: "no-repeat", /* Do not repeat the image */
                    // backgroundSize: "cover", /* Resize the background image to cover the entire container */
                }}
            >
                <Container
                    style = {{
                        display: "flex",
                        flexDirection: "column",
                    }}                
                >

                    <Typography align="center" variant="h3" component="h3" gutterBottom>
                        Listas de chequeo
                    </Typography>

                    <Typography align="center" variant="body2" component="p" gutterBottom>
                        En esta plataforma podrás descargar todas las respuestas a las listas de chequeo que tienes registradas en el sistema.
                    </Typography>

                    <Link 
                        to="/choose_list_type"
                        style = {{
                            alignSelf: "center",
                            textDecoration: "none",
                        }}    
                    >
                        <Button align="center" variant="contained" color="primary">
                            Ver listas de chequeo
                        </Button>
                    </Link>
 
                </Container>
            </Paper>
        );

    }

}

export default Home;