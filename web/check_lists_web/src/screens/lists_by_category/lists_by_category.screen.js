import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import { Button } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from "@material-ui/core";

// make request to server
import { fs } from "../../libraries/firebase/firebase";

// for create .csv
import json2csv from "json2csv";

const { Parser } = require('json2csv');

// create .csv
// import { CSVLink, CSVDownload } from "react-csv";

class Lists_by_Category extends React.Component {

        // constructur of parent
    constructor(props) {

		super(props);

		// initial states
		this.state = {

			// flag of get data from server
            get_lists: false,
            lists: [],
			// markers (each place is a list of 2 elements)
			// marker: [latitude, longitude]
			// pieces_of_ground: this.props.pieces_of_ground,

        }
        
        this.download_responses = this.download_responses.bind(this);

    }
    
    componentDidMount () {

        // get request for get data
        // fs.collection(this.props.match.params.category).get()
        fs.collection(this.props.match.params.category).get()

            .then(snapshotquery => {
                
                // console.log(snapshotquery);
                // // get data from API
                var lists = [];
                let list;

                // iterate over each item
                snapshotquery.forEach(doc => {

                    list = doc.data();
                    list["id"] = doc.id;
                    // add loteo to list
                    lists.push(list);
                    // console.log(doc.data());

                });

                // update state
                this.setState({

                    // flag of getting data from API
                    get_lists: true,
                    // update lists
                    lists: lists,
                    // num_lists: lists.length,

                });

            })

            // if error
            .catch(function (error) {

                // dislpay error in console
                console.log(error);

            });
            
    }
    
    download_responses(id_list, list_name) {

        // get request for get data
        fs.collection(this.props.match.params.category + "_responses").where("id_list", "==", id_list).get()

            .then(snapshotquery => {

                // console.log(snapshotquery);
                // // get data from API
                
                // if query is not empty
                if (!snapshotquery.empty) {
                    
                    var lists = [];

                    // iterate over each item
                    snapshotquery.forEach(doc => {
                        
                        // add loteo to list
                        lists.push(doc.data().answers);
                        // console.log(doc.data().answers);
                        
                    });

                    // try to create csv file and download
                    try {
                        // parser data to csv format
                        const parser = new Parser();
                        const csv = parser.parse(lists);

                        // create csv file
                        let csvContent = "data:text/csv;charset=utf-8," + csv;
                        var encodedUri = encodeURI(csvContent);
                        // create hidden link
                        var link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", list_name + ".ods");
                        document.body.appendChild(link); // Required for FF
                        // This will download the data file named "my_data.csv".
                        link.click();

                    } 
                    // if there is some error
                    catch (err) {
                        window.alert("Hemos tenido un problema, inténtalo de nuevo por favor");
                    }
                }
                // if query is empty
                else {
                    window.alert("Aún no existen respuestas para esta lista");
                }
            })


            // if error
            .catch(function (error) {

                // dislpay error in console
                console.log(error);

            });


        // return csvData;

    }

    render() {

        return (

            <Paper
                style={{
                    margin: 20,
                    padding: 20,
                    alignContent: "center",
                    textAlign: "center",
                }}
            >

                <Container>

                    <Typography align="center" variant="h4" component="h2" gutterBottom>

                        Listas respondidas por usuarios

                    </Typography>

                    <Typography align="center" variant="body2" component="p" gutterBottom>

                        Acá se muestran solo las listas que han sido respondidas por los usuario

                    </Typography>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>

                                    #

								</TableCell>

                                <TableCell>

                                    Lista

								</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {this.state.get_lists

                                ?

                                this.state.lists.map((list, idx) =>

                                    <TableRow key={idx}>

                                        <TableCell> {idx} </TableCell>

                                        <TableCell> {list.name} </TableCell>

                                        <TableCell> 
                                            <Button align="center" variant="contained" color="primary" onClick = {() => this.download_responses(list.id, list.name)}>
                                                Descargar respuestas
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                )

                                :

                                <CircularProgress style={{margin: 50}} color="secondary" />

                                }
                      
                        </TableBody>

                    </Table>


                </Container>
            </Paper>
        );

    }

}

export default Lists_by_Category;