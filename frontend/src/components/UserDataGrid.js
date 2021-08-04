import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function UserDataGrid(props) {
    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                pageSize={props.pageSize}
                page={props.onPageChangepage}
                onPageSizeChange={(newPageSize) =>
                    props.handlePageSizeChange(newPageSize)
                }
                onPageChange={(newPage) => props.handlePageChange(newPage)}
                rowsPerPageOptions={[5, 10, 20, 50, 100, 1000]}
                paginationMode="server"
                rowCount={props.data.totalCount}
                pagination
                rows={props.data.users}
                columns={props.data.headers}
            />
        </div>
    );
}
