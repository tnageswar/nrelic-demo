import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';

export default function UserDataGrid() {
    const [data, setData] = useState({
        totalCount: 100,
        headers: [],
        users: [],
    });
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const offset = page * pageSize;
            const result = await axios(
                `http://localhost:4000/api/nrelic/users?offset=${offset}&limit=${pageSize}`
            );
            console.log('Data fetched......');
            setData(
                result?.data ?? {
                    totalCount: 100,
                    headers: [],
                    users: [],
                }
            );
        };

        fetchData();
    }, [page, pageSize]);
    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                pageSize={pageSize}
                page={page}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onPageChange={(newPage) => setPage(newPage)}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                paginationMode="server"
                rowCount={data.totalCount}
                pagination
                rows={data.users}
                columns={data.headers}
            />
        </div>
    );
}
