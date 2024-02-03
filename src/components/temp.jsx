import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setAll,
  setApproved,
  setPending,
  setRejected,
} from "../utils/reportSlice";
import { useNavigate } from "react-router-dom";

const StatusItem = ({ title, selected, setSelected, func }) => {
  console.log(selected);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleChange = () => {
    setSelected(title);
    func();
  };
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        backgroundColor: selected === title ? colors.blueAccent[700] : "",
        border: selected === title ? "" : `1px solid ${colors.blueAccent[700]}`,
        borderRadius: "5px",
        margin: "0 10px",
      }}
      onClick={() => handleChange()}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const ReportStatus = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.report);
  const handleAll = () => {
    setCompanyData(data.All);
  };

  const handlepending = () => {
    setCompanyData(data.Pending);
  };

  const handleReject = () => {
    setCompanyData(data.Rejected);
  };
  const handleApprove = () => {
    setCompanyData(data.Approved);
  };
  const pendingStatus = useSelector((state) => state.report.PendingStatus);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [companyData, setCompanyData] = useState([]);
  const [pageSize, setPageSize] = useState(11);

  useEffect(() => {
    console.log(pendingStatus);
    if (pendingStatus == true) {
      setSelected("Pending Approval");
      fetchData();
      handlepending();
    }
  }, []);

  const [selected, setSelected] = useState("All");
  const handleViewMore = (dataId) => {
    console.log(dataId);
    Navigate(`/reportstatus/${dataId}`);
  };

  const columns = [
    { field: "sNo", headerName: "S.No" },
    {
      field: "companyName",
      headerName: "Company Name",
      renderCell: ({ row: { companyName } }) => {
        const name = companyName !== null ? companyName : "N/A";
        return <Typography>{name}</Typography>;
      },
      flex: 2,
    },
    {
      field: "companyAddDate",
      headerName: "Added Date",
      flex: 1,
      renderCell: ({ row: { companyAddDate } }) => {
        const date =
          companyAddDate !== null ? companyAddDate?.split("T")[0] : "N/A";
        return <Typography>{date}</Typography>;
      },
    },
    { field: "userName", headerName: "Added By", flex: 1 },
    {
      field: "companyReportApprovalStatus",
      headerName: "Status",
      sortable: false,
      width: 100,
      renderCell: ({ row }) => {
        let statusColor = "";
        let statusText = "";
        console.log(row.companyReportApprovalStatus);
        switch (row.companyReportApprovalStatus) {
          case "Approved":
            statusColor = "#4caf50";
            statusText = "Approved";

            break;
          case "Pending Approval":
            statusColor = "#ff9800";
            statusText = "Pending";

            break;
          case "Rejected":
            statusColor = "#f44336";
            statusText = "Rejected";

            break;
          default:
            statusColor = "#9e9e9e";
            statusText = "Not Defined";
            break;
        }

        return (
          <Button
            variant="outlined"
            style={{
              color: "#fff",
              borderColor: statusColor,
              backgroundColor: statusColor,
            }}
          >
            {statusText}
          </Button>
        );
      },
    },
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
          onClick={() => handleViewMore(row.dataID)}
        >
          View More
        </Button>
      ),
    },
  ];
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/getCompanyDataDivided`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data[0];
      const approved = handleAcceptedData(data);
      const pending = handlePendingData(data);
      const rejected = handleRejectedData(data);
      dispatch(setApproved(approved));
      dispatch(setPending(pending));
      dispatch(setRejected(rejected));
      dispatch(setAll(data));
      if (pendingStatus) {
        console.log("yash");
        setCompanyData(pending);
      } else setCompanyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptedData = (data) => {
    const fil = data.filter(
      (item) => item.companyReportApprovalStatus === "Approved"
    );
    return fil;
  };

  const handlePendingData = (data) => {
    const fil = data.filter(
      (item) => item.companyReportApprovalStatus === "Pending Approval"
    );
    return fil;
  };

  const handleRejectedData = (data) => {
    const fil = data.filter(
      (item) => item.companyReportApprovalStatus === "Rejected"
    );
    return fil;
  };

  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   console.log(selected);
  //   if (selected === "All") {
  //     if (data.All) {
  //       console.log("yash");
  //       setCompanyData(data.All);
  //     } else {
  //       console.log("yash");
  //       fetchData();
  //     }
  //   } else if (selected === "Approved") {
  //     if (data.Approved) setCompanyData(data.Approved);
  //     else {
  //       const fil = data.All.filter(
  //         (item) => item.companyReportApprovalStatus === "Approved"
  //       );
  //       dispatch(setApproved(fil));
  //       setCompanyData(fil);
  //     }
  //   } else if (selected === "Pending Approval") {
  //     if (data.Pending) setCompanyData(data.Pending);
  //     else {
  //       console.log("yash");
  //       const pfil = data.All.filter(
  //         (item) => item.companyReportApprovalStatus === "Pending Approval"
  //       );
  //       dispatch(setPending(pfil));
  //       setCompanyData(pfil);
  //     }
  //   } else if (selected === "Rejected") {
  //     if (data.Rejected) setCompanyData(data.Rejected);
  //     else {
  //       const rfil = data.All.filter(
  //         (item) => item.companyReportApprovalStatus === "Rejected"
  //       );
  //       dispatch(setRejected(rfil));
  //       setCompanyData(rfil);
  //     }
  //   }
  //   console.log(data);
  //   console.log("yash varshney");
  // }, [selected]);
  return (
    <Box m="20px">
      <Header title="Report Status" />
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
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginBottom="30px"
        >
          <StatusItem
            title="All"
            selected={selected}
            setSelected={setSelected}
            func={handleAll}
          />
          <StatusItem
            title="Approved"
            selected={selected}
            setSelected={setSelected}
            func={handleApprove}
          />
          <StatusItem
            title="Pending Approval"
            selected={selected}
            setSelected={setSelected}
            func={handlepending}
          />
          <StatusItem
            title="Rejected"
            selected={selected}
            setSelected={setSelected}
            func={handleReject}
          />
        </Box>
        <DataGrid
          rows={companyData.map((row, index) => ({ ...row, sNo: index + 1 }))}
          columns={columns}
          getRowId={(row) => row.dataID}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[11, 21, 51]}
        />
      </Box>
    </Box>
  );
};

export default ReportStatus;
