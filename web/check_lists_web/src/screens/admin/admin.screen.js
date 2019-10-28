import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// read excel file
import readXlsxFile from 'read-excel-file'
import { Button } from "@material-ui/core";

// import firebase
import { fs } from "../../libraries/firebase/firebase";

const user_data = [
    "RUT",
    "Nombre del trabajador",
];

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            get_list: false,
            list: null,
            type: "env",
        }
        this.handleChange = this.handleChange.bind(this);
        this.upload_list = this.upload_list.bind(this);
    }

    upload_list () {

        if (this.state.list != null){

            console.log("Upload list");
            // build list
            var list = this.state.list;
            // add type
            list["type"] = this.state.type;
            // add user data (array)
            list["user_data"] = user_data;
    
            console.log(list);
            // upload file
            fs.collection("lists").add(list)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    window.alert("La lista se ha subido correctamente");
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    window.alert("Hemos tenido un error, intentalo de nuevo por favor");
                });

        }
        else {
            window.alert("Al parecer no has subido correctamente el archivo, vuelve a intentarlo");
        }
    }

    handleChange(selectorFiles) {
        var list = {
            name: "",
            questions: []
        };
        // console.log(selectorFiles);
        // const input = document.getElementById('input');
        // console.log(input);
        // readXlsxFile(input.files[0]).then((rows) => {
        readXlsxFile(selectorFiles[0]).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.
            console.log(rows);
            // add name
            list.name = rows[0][0];
            for (var i = 1; i < rows.length; i++) {
                list.questions.push(rows[i][0]);
            }

            console.log(list);
            this.setState({
                get_list: true,
                list: list,
            })
        })

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

                    <Paper style = {{margin: 40, padding: 40}}>
                        <Typography align="center" variant="body2" component="p" gutterBottom>
                            Acá podrás subir una lista de chequeo. Para eso debes subir un archivo excel (.xlsx) en donde la primera celda debe ser el nombre de la lista, y luego, en cada una de las celdas de la misma columna, debe estar cada pregunta. Es decir que toda la información debe estar en una sola columna, en donde la primera fila tiene el nombre de la lista, y todas las demás filas corresponden a preguntas.
                        </Typography>
                    </Paper>

                    <Select
                        value={this.state.type}
                        onChange={(event) => this.setState({ type: event.target.value })}
                        // inputProps={{
                        //     name: 'age',
                        //     id: 'age-simple',
                        // }}
                    >
                        <MenuItem value="env">Ambiental</MenuItem>
                        <MenuItem value="sso">SSO</MenuItem>
                    </Select>

                    <input 
                        id = "input"
                        type="file" 
                        onChange={(e) => this.handleChange(e.target.files)} 
                    />

                    <Button align="center" variant="contained" color="primary" onClick={() => this.upload_list()}>
                        Subir lista de chequeos a plataforma
                    </Button>


                    {this.state.get_list

                        ?

                            <Container>

                                <Typography align="center" variant="h6" component="h6" gutterBottom>

                                    Nombre de lista:

                                </Typography>

                                <Typography align="center" variant="h4" component="h2" gutterBottom>

                                    {this.state.list.name}

                                </Typography>

                                <Typography align="center" variant="h6" component="h6" gutterBottom>

                                    Tipo:

                                </Typography>

                                <Typography align="center" variant="h4" component="h2" gutterBottom>

                                    {this.state.type}

                                </Typography>

                            </Container>
                        
                        :

                            null
                        
                    }
                    
                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>

                                    Número

								</TableCell>

                                <TableCell>

                                    Pregunta

								</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {this.state.get_list

                                ?

                                this.state.list.questions.map((question, idx) =>

                                    <TableRow key={idx}>

                                        <TableCell> {idx+1} </TableCell>

                                        <TableCell> {question} </TableCell>

                                    </TableRow>
                                )

                                :

                                // <CircularProgress style={{ margin: 50 }} color="secondary" />
                                null

                            }

                        </TableBody>

                    </Table>

                    {/* User data */}

                            {this.state.get_list

                                ?

                                    <Container>

                                        <Typography align="center" variant="h6" component="h6" gutterBottom>

                                            Datos a rellenar por usuario

                                        </Typography>


                                        <Table>

                                            <TableHead>

                                                <TableRow>

                                                    <TableCell>

                                                        Número

                                                    </TableCell>

                                                    <TableCell>

                                                        Dato

                                                    </TableCell>

                                                </TableRow>

                                            </TableHead>

                                            <TableBody>

                                                {user_data.map((question, idx) =>

                                                    <TableRow key={idx}>

                                                        <TableCell> {idx + 1} </TableCell>

                                                        <TableCell> {question} </TableCell>

                                                    </TableRow>
                                                )}

                                            </TableBody>

                                        </Table>
                                        
                                    </Container>

                                :

                                // <CircularProgress style={{ margin: 50 }} color="secondary" />
                                null

                            }

                </Container>
            </Paper>
            );
            
    }

}

export default Admin;