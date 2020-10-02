import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FullScreenDialog from "./FullScreenDialog";

export default function RecipeReviewCard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
      minWidth: "100%",
      height: "100%",
      backgroundColor: "#" + props.restaurant.user_rating.rating_color,
      "&:hover": {
        transform: "scale(1.05)",
        transition: "all 0.5s ease 0s",
      },
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      cursor: "pointer",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
      transition: "all 1.0s ease 0s",
    },
    highlights: {
      padding: "2%",
      margin: "3%",
    },
    highlightsHeader: {
      padding: "2%",
      margin: "4%",
      fontSize: "1.5rem",
      backgroundColor: "gold",
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openFullScreen, setOpenFullScreen] = React.useState(false);

  const handleClickOpen = () => {
    setOpenFullScreen(true);
  };

  const handleClose = () => {
    setOpenFullScreen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <FullScreenDialog
        handleClose={handleClose}
        open={openFullScreen}
        restaurant={props.restaurant}
      />
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.restaurant.name}
          subheader={
            "average cost for two : " +
            props.restaurant.currency +
            props.restaurant.average_cost_for_two
          }
        />
        <CardMedia
          onClick={handleClickOpen}
          className={classes.media}
          image={
            props.restaurant.featured_image
              ? props.restaurant.featured_image
              : `https://source.unsplash.com/300x200/?cooked,food&sig=${
                  Math.random() * 10000
                }`
          }
          title={props.restaurant.timings}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Paper className={classes.highlightsHeader} elevation={5}>
              Highlights
            </Paper>

            {props.restaurant.highlights.map((item, index) => {
              return (
                <Paper key={index} className={classes.highlights} elevation={3}>
                  {item}
                </Paper>
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
