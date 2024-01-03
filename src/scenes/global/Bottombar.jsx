import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";

const Bottombar = () => {
  const [value, setValue] = useState(0);
  const isSuper = localStorage.getItem("user");

  return (
    <div style={{ position: "fixed", bottom: "1px", width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <BottomNavigationAction
            label="Dashboard"
            icon={<HomeOutlinedIcon />}
          />
        </Link>

        <Link
          to="/companies"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <BottomNavigationAction
            label="Recents"
            icon={<BusinessOutlinedIcon />}
          />
        </Link>

        <Link
          to="/reports"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <BottomNavigationAction
            label="Favorites"
            icon={<ArticleOutlinedIcon />}
          />
        </Link>

        <Link
          to="/questions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <BottomNavigationAction
            label="Nearby"
            icon={<QuestionAnswerOutlinedIcon />}
          />
        </Link>

        {isSuper === "Super Admin" && (
          <Link to="/form" style={{ textDecoration: "none", color: "inherit" }}>
            <BottomNavigationAction
              label="Nearby"
              icon={<PeopleOutlinedIcon />}
            />
          </Link>
        )}
      </BottomNavigation>
    </div>
  );
};

export default Bottombar;
