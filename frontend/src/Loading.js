import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Fade, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  progressStyle: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

const Loading = ({ message }) => {
  const { progressStyle } = useStyles();
  return (
    <Fade in>
      <div style={{ textAlign: "center" }}>
        <CircularProgress className={progressStyle}/>
        <Typography variant="subtitle2" color={"textSecondary"}>
          {message ? message : "Loading Components..."}
        </Typography>
      </div>
    </Fade>
  );
};

export default Loading;
