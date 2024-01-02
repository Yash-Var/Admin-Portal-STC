import React from "react";
import Header from "./Header";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { companyMockData } from "../constants";
import { useEffect, useState } from "react";
import CompanyModal from "./CompanyModal";
const Company = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [deleteRequest, setDeleteRequest] = useState(false);
  // const [deleteIndex,setDeleteIndex] = useState(null);
  const [index, setIndex] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const [pageSize, setPageSize] = React.useState(11);

  const columns = [
    { field: "companyID", headerName: "Company ID", editable: true },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 2,
      editable: true,
    },
    {
      field: "companyDescription",
      headerName: "Company Description",
      flex: 2,
      editable: true,
    },
    {
      field: "companyEstablishment",
      headerName: "Establishment Year",
      flex: 1,
      editable: true,
    },
    { field: "companyWebsite", headerName: "Website", flex: 2, editable: true },
    {
      field: "companyAddDate",
      headerName: "Added Date",
      flex: 2,
      editable: true,
    },
    { field: "className", headerName: "Company Type", flex: 2, editable: true },
    { field: "userName", headerName: "Added By", flex: 2, editable: true },
    {
      field: "userType",
      headerName: "User Type",
      flex: 2,
      editable: true,
      renderCell: ({ row: { userType } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              userType === "Super Admin"
                ? colors.greenAccent[600]
                : userType === "Admin"
                ? colors.greenAccent[700]
                : null
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {userType}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 100,
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          style={{ color: "#fff", borderColor: "#2196f3" }}
          onClick={() => handleEdit(row.companyID)}
        >
          Edit
        </Button>
      ),
    },
  ];

  // useEffect(() => {
  //   if(deleteRequest&&deleteIndex){
  //     console.log(deleteIndex);
  //     setDeleteRequest(false);
  //     setDeleteIndex(null);
  //   }
  // }, [deleteRequest]);
  const handleEdit = (companyId) => {
    setSelectedCompanyId(companyId); // Set the selected company ID
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <Box m="20px">
      <Box
        m="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Header title="Companies" />
        <DataGrid
          rows={companyMockData}
          columns={columns}
          getRowId={(row) => row.companyID}
          onSelectionModelChange={(itm) => setIndex(itm)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[11, 21, 51]}
        />
        {/* <button
          onClick={() => {
            setDeleteRequest(true);
          }}
        >
          Delete
        </button> */}
        <CompanyModal
          open={openModal}
          handleClose={handleCloseModal}
          companyId={selectedCompanyId}
        />
      </Box>
    </Box>
  );
};

export default Company;
