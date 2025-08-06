import * as React from "react";
import {Box, TextField} from "@mui/material";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";

interface RowData {
    id: number;
    name: string;
    email: string;
    country: string;
    gender: string;
}

const initialRows: RowData[] = [
    {id: 1, name: "John Doe", email: "john@example.com", country: "USA", gender: "Male"},
    {id: 2, name: "Jane Smith", email: "jane@example.com", country: "UK", gender: "Female"},
    {id: 3, name: "Rahim Mia", email: "rahim@example.com", country: "Bangladesh", gender: "Male"}
];

export default function AdvancedTable() {
    const [rows, setRows] = React.useState(initialRows);
    const [searchText, setSearchText] = React.useState("");

    const columns: GridColDef[] = [
        {field: "name", headerName: "Name", flex: 1, sortable: true},
        {field: "email", headerName: "Email", flex: 1, sortable: true},
        {field: "country", headerName: "Country", flex: 1, sortable: true},
        {field: "gender", headerName: "Gender", flex: 1, sortable: true}
    ];

    // Filter rows based on search
    const filteredRows = rows.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <Box sx={{height: 500, width: "100%"}}>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                sx={{mb: 2}}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <DataGrid
                showToolbar
                rows={filteredRows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: {paginationModel: {pageSize: 5}}
                }}
                disableRowSelectionOnClick
            />
        </Box>
    );
}
