import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { MessageBus } from "../Modules/MessageBus";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    width: "40%",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
};

const _Home = (props) => {
  const { classes, children, className, ...other } = props;
  const [eventInfo, setEventInfo] = useState([]);

  const updateStates = (event) => {
    setEventInfo((prevState) => [...prevState, event]);
  };

  useEffect(() => {
    MessageBus.on("BUTTON_CLICK_EVENT", updateStates);

    return () => {
      MessageBus.off("BUTTON_CLICK_EVENT");
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#cfe8fc",
        height: "97vh",
        paddingTop: "20px",
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Button
            className={clsx(classes.root, className)}
            {...other}
            onClick={() => MessageBus.trigger("BUTTON_CLICK_EVENT", "button1")}
          >
            Trigger event 1
          </Button>
          <br />
          <br />
          <Button
            className={clsx(classes.root, className)}
            {...other}
            onClick={() => MessageBus.trigger("BUTTON_CLICK_EVENT", "button2")}
          >
            Trigger event 2
          </Button>

          <Typography>
            Event triggered from {eventInfo[eventInfo.length - 1]}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {eventInfo.map((event) => {
            return <Typography>Event triggered by {event}</Typography>;
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export const Home = withStyles(styles)(_Home);
