import React from "react";
import Header from "./Header";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import CompanyModal from "./CompanyModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Company = () => {
  const Navigate = useNavigate();
  const handleaddCompany = () => {
    console.log("add company");
    Navigate("/addCompany");
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [companyData, setCompanyData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.React_App_BASE_URL}/api/admin/getCompanies`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data[0];
      const sortedData = data.sort((a, b) => {
        const companyNameA = a.companyName || ""; // Use empty string if null or undefined
        const companyNameB = b.companyName || "";
        return companyNameA.localeCompare(companyNameB);
      });

      setCompanyData(sortedData);
    } catch (error) {
      console.error(error);
    }
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [index, setIndex] = useState([]);

  const [pageSize, setPageSize] = React.useState(11);
  const handleViewMore = (companyId) => {
    console.log(companyId);
    Navigate(`/company/${companyId}`);
  };

  const handleDelete = async (companyId) => {
    try {
      console.log(companyId);
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this company?"
      );
      if (confirmDelete) {
        await axios.get(
          `http://localhost:5000/api/admin/deleteCompany/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        fetchData();
      } else {
        console.error("Deletion cancelled by user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "sNo", headerName: "S.No" },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 2,
    },
    {
      field: "companyDescription",
      headerName: "Company Description",
      flex: 2,
    },
    {
      field: "companyEstablishment",
      headerName: "Establishment Year",
      flex: 1,
    },
    {
      field: "companyWebsite",
      headerName: "Website",
      flex: 1,

      renderCell: ({ row: { companyWebsite, companyName } }) => (
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
      flex: 1,

      renderCell: ({ row: { companyAddDate } }) => {
        const date = companyAddDate.split("T")[0];
        return <Typography>{date}</Typography>;
      },
    },

    { field: "className", headerName: "Company Type", flex: 1 },
    { field: "userName", headerName: "Added By", flex: 1 },
    {
      field: "View",
      headerName: "View",
      sortable: false,
      width: 100,
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          style={{
            color: "#fff",
            borderColor: "#2196f3",
            backgroundColor: "#2196f3",
          }}
          onClick={() => handleViewMore(row.companyID)}
        >
          View More
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 100,
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          style={{
            color: "#fff",
            borderColor: "green",
            backgroundColor: "green",
          }}
          onClick={() => handleEdit(row.companyID)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          style={{ color: "#fff", borderColor: "red", backgroundColor: "red" }}
          onClick={() => handleDelete(row.companyID)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleEdit = (companyId) => {
    setSelectedCompanyId(companyId);

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    fetchData();
    setOpenModal(false);
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
