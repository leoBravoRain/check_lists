import React, { Component } from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';

// firebase
import { auth } from "../../libraries/firebase/firebase";

class Login extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            email: "",
            password: "",
        }

        this.on_submit = this.on_submit.bind(this);

    }
    
    componentDidMount() {

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                console.log("user logged");

                this.props.history.push('/choose_list_type');

            }

            else {

                console.log("user no logged");

                // this.props.history.push('/login/');
            }

        });

    }

    // onsubmit form
    on_submit() {

        const email = this.state.email;
        const password = this.state.password;

        // console.log(this);
        auth.signInWithEmailAndPassword(email, password)

            .then(res => {

                console.log("user logged!");

                this.props.history.push('/choose_list_type');

            })

            .catch(function (error) {

                console.log(error.code);

                window.confirm('Ups, al parecer los datos no son correctos ¡Verificalos!');

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
                <Container>

                    Login
 
                    <FormControl>

                        <TextField
                            id="standard-uncontrolled"
                            label="Correo electrónico"
                            // defaultValue="Correo electrónico"
                            margin="normal"
                            onChange={(e) => this.setState({email: e.target.value})}
                            value={this.state.email}
                        />

                        <TextField
                            id="standard-uncontrolled"
                            label="Contraseña"
                            type = "password"
                            // defaultValue="Correo electrónico"
                            margin="normal"
                            onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password}
                        />

                        <Button align="center" variant="contained" color="primary" onClick = {this.on_submit}>
                            Ingresar
                        </Button>

                    </FormControl>

                </Container>
            </Paper>
        );

    }

}

export default Login;