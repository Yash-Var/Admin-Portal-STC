import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Header from "./Header";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [companyQuestions, setCompanyQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };
  const handleAddCompanyClick = () => {
    navigate("/addQuestions");
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Header title="Interview Questions" subtitle="Questions" />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCompanyClick}
          style={{ backgroundColor: colors.greenAccent[500] }}
        >
          Add Questions
        </Button>
      </Box>
      {loading ? (
        <CircularProgress
          style={{
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.7)"
                : theme.palette.secondary.main,
          }}
        />
      ) : (
        Object.keys(companyQuestions).map((companyName) => (
          <Accordion key={companyName}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                {companyName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {companyQuestions[companyName].map((question) => (
                  <Box key={question.QuestionID} mb="20px">
                    <Typography variant="subtitle1">
                      {"Q : " + question.Question}
                    </Typography>
                    <Typography>
                      {question?.Options?.slice(1, question.Options.length - 1)
                        ?.split(",")
                        ?.map((op, index) => {
                          if (op) {
                            return (
                              <div
                                style={{ margin: "5px", marginLeft: "10px" }}
                                key={"op" + index}
                              >
                                <Typography>
                                  {index + 1 + " : " + op}
                                </Typography>
                              </div>
                            );
                          }
                        })}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default FAQ;
