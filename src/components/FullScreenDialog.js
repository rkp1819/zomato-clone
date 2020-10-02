import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Grid, Paper } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import GradeIcon from "@material-ui/icons/Grade";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
      backgroundColor: "#" + props.restaurant.user_rating.rating_color,
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      textAlign: "center",
    },
    container: {
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },
    item: {
      padding: theme.spacing(3),
      margin: theme.spacing(1),
    },
    iconText: {
      padding: theme.spacing(1),
      margin: theme.spacing(2),
      marginLeft: "0px",
    },
    highlightChild: {
      "&:nth-child(odd)": {
        backgroundColor: "lightgoldenrodyellow",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <GradeIcon />
            <Typography className={classes.iconText}>
              {props.restaurant.user_rating.aggregate_rating}
            </Typography>

            <ThumbUpIcon />
            <Typography className={classes.iconText}>
              {props.restaurant.user_rating.votes}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              {props.restaurant.name}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} md={4} sm={6}>
            <Paper elevation={3} className={classes.item}>
              <Typography variant="h4">Location</Typography>
              <Typography variant="body1">
                {props.restaurant.location.address}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} sm={6}>
            <Paper elevation={3} className={classes.item}>
              <Typography variant="h4">Cuisines</Typography>
              <Typography variant="body1">
                {props.restaurant.cuisines}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} sm={6}>
            <Paper elevation={3} className={classes.item}>
              <Typography variant="h4">Timings</Typography>
              <Typography variant="body1">
                {props.restaurant.timings}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} sm={6}>
            <Paper elevation={3} className={classes.item}>
              <Typography variant="h4">Contact</Typography>
              <Typography variant="body1">
                {props.restaurant.phone_numbers}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} sm={6}>
            <Paper elevation={3} className={classes.item}>
              <Typography variant="h4">Highlights</Typography>
              <Typography variant="body1">
                {props.restaurant.highlights.map((item, index) => {
                  return (
                    <Typography key={index} className={classes.highlightChild}>
                      {item}
                    </Typography>
                  );
                })}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
