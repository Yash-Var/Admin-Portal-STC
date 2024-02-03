import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import Header from "./Header";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [companyQuestions, setCompanyQuestions] = useState([]);
  useEffect(() => {
    fetchCompanyQuestionsData();
    }, []);
    const fetchCompanyQuestionsData = async () => {
        try {
          const token = localStorage.getItem("token");
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(
            "http://localhost:5000/api/admin/getQuestions",
            { headers }
          );
          setCompanyQuestions(response.data.CompanyData);
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <Box m="20px">
          <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
          {Object.keys(companyQuestions).map((companyName) => (
            <Accordion key={companyName}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                  {companyName}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {companyQuestions[companyName].map((question) => (
                    <Box key={question.QuestionID}>
                      <Typography variant="subtitle1">{question.Question}</Typography>
                      <Typography>{question.Options}</Typography>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      );
    };
    
    export default FAQ;
    