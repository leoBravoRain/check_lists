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

// make request to server
import { fs } from "../../libraries/firebase/firebase";

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

    }
    
    componentDidMount () {

        console.log(this.props.match.params.category);

        // get request for get data
        // fs.collection(this.props.match.params.category).get()
        fs.collection(this.props.match.params.category).get()

            .then(snapshotquery => {
                
                // console.log(snapshotquery);
                // // get data from API
                var lists = [];

                // iterate over each item
                snapshotquery.forEach(doc => {

                    // add loteo to list
                    lists.push(doc.data());
                    console.log(doc.data());

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
    
    render() {

        console.log(this.state.lists);


        return (

            <Paper
                style={{
                    margin: 20,
                    padding: 20,
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

                                        <TableCell> {list.name_list} </TableCell>

                                    </TableRow>
                                )

                                :
                                <Container> Loading </Container>
                            }

                        </TableBody>

                    </Table>


                </Container>
            </Paper>
        );

    }

}

export default Lists_by_Category;