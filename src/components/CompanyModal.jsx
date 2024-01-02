// CompanyModal.jsx

import React from "react";
import { Modal, Typography } from "@mui/material";

const CompanyModal = ({
  open,
  handleClose,
  companyId,
  /* other necessary props */
}) => {
  // Logic to fetch company details based on companyId and display them in the modal

  return (
    <Modal open={open} onClose={handleClose}>
      {/* Modal content with company details */}
      <h1>{companyId}</h1>
      {/* Use the fetched company details based on the companyId */}
    </Modal>
  );
};

export default CompanyModal;
