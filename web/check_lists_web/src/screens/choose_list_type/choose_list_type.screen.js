import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Button } from "@material-ui/core";

class Choose_List_Type extends React.Component {

    render() {

        return (

            <Paper
                style={{
                    margin: 20,
                    padding: 20,
                }}
            >
                <Container>

                    <Link to="/lists_by_category/env_lists">
                        <Button align="center" variant="contained" color="primary">
                            Listas de Medio Ambiente
                        </Button>
                    </Link>

                    <Link to="/lists_by_category/sso_lists">
                        <Button align="center" variant="contained" color="primary">
                            Listas de SSO
                        </Button>
                    </Link>

                </Container>
            </Paper>
        );

    }

}

export default Choose_List_Type;