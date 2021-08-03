import { useState } from 'react';
import './App.css';
import { Button, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import UsersTable from './components/UsersTable';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function App() {
    const classes = useStyles();
    const [company, setCompany] = useState('');
    const [sort, setSort] = useState('');
    const handleChange = (event) => {
        setCompany(event.target.value);
    };
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };
    return (
        <Grid
            container
            spacing={4}
            alignContent="center"
            style={{ margin: '50px' }}
        >
            <Grid item>
                <TextField
                    id="standard-search"
                    label="Search users"
                    type="search"
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Company
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={company}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Filter by company</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Sort By
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={sort}
                        onChange={handleSortChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Sort By</FormHelperText>
                </FormControl>
                <UsersTable />
            </Grid>
            <Grid item></Grid>
        </Grid>
    );
}

export default App;
