import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {
    Grid,
    TextField,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserDataGrid from './components/UserDataGrid';
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
    const [search, setSearch] = useState('');
    const [searchUser, setSearchUser] = useState('');

    //////////////////////////
    const [data, setData] = useState({
        totalCount: 100,
        headers: [],
        users: [],
        companies: [],
    });
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
    };

    useEffect(() => {
        const fetchData = async () => {
            const offset = page * pageSize;
            const result = await axios(
                `http://localhost:4000/api/nrelic/users?offset=${offset}&limit=${pageSize}&search=${searchUser}&filterbycompany=${company}`
            );
            console.log('Data fetched......');
            setData(
                result?.data ?? {
                    totalCount: 100,
                    headers: [],
                    users: [],
                    companies: [],
                }
            );
        };
        fetchData();
    }, [page, pageSize, searchUser, company]);

    //////////////////////////

    const handleChange = (event) => {
        setCompany(event.target.value);
    };
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            setSearchUser(search);
        }, 500);
        return () => {
            clearTimeout(timerId);
        };
    }, [search]);
    return (
        <Grid
            container
            spacing={4}
            alignContent="center"
            style={{ margin: '50px' }}
        >
            <Grid item style={{ width: '80%' }}>
                <TextField
                    id="standard-search"
                    value={search}
                    label="Search users"
                    type="search"
                    onChange={(evt) => setSearch(evt.target.value)}
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
                        {data.companies.map((company) => (
                            <MenuItem value={company}>{company}</MenuItem>
                        ))}
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
                <UserDataGrid
                    pageSize={pageSize}
                    page={page}
                    data={data}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                />
            </Grid>
        </Grid>
    );
}

export default App;
