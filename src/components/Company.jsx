import React from "react";
import Header from "./Header";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
// import { } from "../constants";
import { useEffect, useState } from "react";
import CompanyModal from "./CompanyModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Company = () => {
  const Navigate=useNavigate();
  const handleaddCompany = () => {
    console.log("add company");
    Navigate("/addCompany");
    
  };

  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    fetchData();

    
  }
  , []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getCompanies",
        {
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNAc3RjYWRtaW4uY29tIiwiZGF0YSI6IlNodWJoZW5kcmEiLCJ1c2VyVHlwZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzA0MTIxMDE5LCJleHAiOjE3MzU2Nzg2MTl9.xw5bdNKGeRlknod92qN-f5mXBqnIdw6Xz0mvh_4FKJM",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data[0];
      
      // Sort the companyData array by companyName
      const sortedData = data.sort((a, b) => a.companyName.localeCompare(b.companyName));
      
      setCompanyData(sortedData);
      console.log(sortedData);
    } catch (error) {
      console.error(error);
    }
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [deleteRequest, setDeleteRequest] = useState(false);
  // const [deleteIndex,setDeleteIndex] = useState(null);
  const [index, setIndex] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const [pageSize, setPageSize] = React.useState(11);

  const columns = [
    { field: "sNo", headerName: "S.No"},
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
    {
      field: "companyWebsite",
      headerName: "Website",
      flex: 2,
      editable: true,
      renderCell: ({ row: { companyWebsite,companyName } }) => (
        <Typography>
      <a href={companyWebsite} target="_blank" rel="noopener noreferrer">
        LINK
      </a>
    </Typography>
      ),
    },
    {
      field: "companyAddDate",
      headerName: "Added Date",
      flex: 2,
      editable: true,
      renderCell: ({ row: { companyAddDate } }) => {
        const date = companyAddDate.split('T')[0];
        return (
          <Typography>
            {date}
          </Typography>
        );
      }
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
    setSelectedCompanyId(companyId); 
    setOpenModal(true); 
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
        <div style={{  display:"flex", justifyContent:"space-between" }}>
        <Header title="Companies" />
        <Button
          onClick={() => handleaddCompany()}
          type="submit"
          color="secondary"
          variant="contained"
          sx={{ height: "40px", width: "120px" }}
        >
          Add Company
        </Button>
        </div>
        <DataGrid
         rows={companyData.map((row, index) => ({ ...row, sNo: index + 1 }))}
         
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
