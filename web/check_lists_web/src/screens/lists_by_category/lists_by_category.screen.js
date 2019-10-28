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
import { fs, auth } from "../../libraries/firebase/firebase";

// for create .csv
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (!user) {

                console.log("user not logged");

                this.props.history.push('/login');

            }

            else {

                console.log("user logged");

                // this.props.history.push('/login/');
            }

        });

        // get request for get data
        // fs.collection(this.props.match.params.category).get()
        // fs.collection(this.props.match.params.category).get()
        fs.collection("lists").where("type", "==", this.props.match.params.category).get()

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
        // at first get questions of list
        fs.collection("lists").doc(id_list).get()
        
            .then(doc => {

                if (doc.exists) {

                    // console.log("Document data:", doc.data());
                    const questions_text = doc.data().user_data;
                    // console.log(doc.data().user_data);
                    // console.log(questions_text);
                    console.log(questions_text);
                    const questions = doc.data().questions;
                    for (var i = 0; i < questions.length; ++i) {
                        questions_text.push(questions[i]);
                    }
                    // questions_text.concat(doc.data().questions);
                    console.log(questions_text);
                    // get answers of list
                    fs.collection("answers").where("id_list", "==", id_list).get()
            
                        .then(snapshotquery => {
            
                            console.log(snapshotquery);
                            // // get data from API
                            
                            // if query is not empty
                            if (!snapshotquery.empty) {
                                
                                var answers = [];
                                // add questions as header
                                answers.push(questions_text);
                                
                                // iterate over each item
                                snapshotquery.forEach(doc => {
                                    
                                    // add loteo to list
                                    answers.push(doc.data().user_data.concat(doc.data().answers));
                                    // answers.push(doc.data().answers);
                                    // console.log(doc.data().answers);
                                    
                                });
            
                                // console.log(answers);
            
                                // try to create csv file and download
                                try {
            
                                    console.log("starting try");
            
                                    // empty workbook object
                                    var wb = XLSX.utils.book_new();
            
                                    console.log(wb);
            
                                    wb.Props = {
                                        Title: list_name,
                                        // Subject: "Test",
                                        // Author: "Red Stapler",
                                        // CreatedDate: new Date(2017, 12, 19)
                                    };
            
                                    // add sheet
                                    wb.SheetNames.push("Respuestas");
            
                                    // add content to sheet
                                    // var ws_data = [['quiero', 'un', 'dron']];  //a row with 2 columns
                                    var ws_data = answers;
            
                                    console.log("ws data: ", ws_data);
            
                                    // create the sheet from this array
                                    var ws = XLSX.utils.aoa_to_sheet(ws_data);
            
                                    console.log("ws: ", ws);
            
                                    // assign sheet to workbook
                                    wb.Sheets["Respuestas"] = ws;
            
                                    console.log("befatore wbout");
            
                                    // export workbook as xlsx binary
                                    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
            
                                    console.log("wbout: ", wbout);
            
                                    function s2ab(s) {
                                        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
                                        var view = new Uint8Array(buf);  //create uint8array as viewer
                                        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
                                        return buf;
                                    }
            
                                    // $("#button-a").click(function () {
                                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), list_name + '.xlsx');
            
                                    // console.log(wb);
            
                                    // this work for .csv and it can open with libreoffice but not with excel
                                    // // parser data to csv format
                                    // const parser = new Parser();
                                    // const csv = parser.parse(answers);
            
                                    // // create csv file
                                    // let csvContent = "data:text/csv;charset=utf-8," + csv;
                                    // var encodedUri = encodeURI(csvContent);
                                    // // create hidden link
                                    // var link = document.createElement("a");
                                    // link.setAttribute("href", encodedUri);
                                    // link.setAttribute("download", list_name + ".csv");
                                    // document.body.appendChild(link); // Required for FF
                                    // // This will download the data file named "my_data.csv".
                                    // link.click();
            
                                } 
                                // if there is some error
                                catch (err) {
                                    window.alert("Hemos tenido un problema al crear y descargar el archivo con las respuestas, inténtalo de nuevo por favor");
                                }
                            }
                            // if query is empty
                            else {
                                window.alert("Aún no existen respuestas para esta lista");
                            }
                        })
            
            
                        // if error
                        .catch(function (error) {
            
                            console.log("error!");
                            // dislpay error in console
                            console.log(error);
            
                        });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch(function (error) {

                console.log("error: " + error);
                // dislpay error in console
                // console.log(error);

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