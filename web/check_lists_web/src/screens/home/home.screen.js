import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Button } from "@material-ui/core";

class Home extends React.Component {

    render() {

        return (

            <Paper
                style={{
                    margin: 20,
                    padding: 20,
                }}
            >
                <Container>

                    <Link to="/choose_list_type">
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