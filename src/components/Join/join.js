import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";

const styles = {
  body: {
    backgroundColor: "white"
  },
  paper: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: "1",
    backgroundColor: "#ff3d00"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "8px"
  },
  submit: {
    margin: "3px 0 2px"
  }
};

const Join = props => {
  const { classes } = props;
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = event => {
    if (!name || !group) {
      event.preventDefault();
      alert("Name and Group must be submited.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Join Group
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="group"
            label="Group"
            value={group}
            onChange={event => {
              setGroup(event.target.value);
            }}
            type="text"
            id="group"
          />
          <Link
            onClick={handleSubmit}
            to={`/messanger?name=${name}&group=${group}`}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Join
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default withStyles(styles)(Join);
