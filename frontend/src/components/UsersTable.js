import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function DenseTable() {
    const classes = useStyles();
    const [data, setData] = useState({ users: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:4000/api/nrelic/users'
            );
            console.log('Data fetched......');
            setData(result.data);
        };

        fetchData();
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell component="th">User</TableCell>
                        <TableCell component="th" align="left">
                            Company
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.users.map((user) => (
                        <TableRow key={user.first_name}>
                            <TableCell component="th" scope="row">
                                {user.first_name}, {user.last_name}
                            </TableCell>
                            <TableCell align="left">
                                {user.company_name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
