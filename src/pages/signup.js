import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userAction";
const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    fontWeigth: "100",
    margin: "0px auto 20px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    fontSize: "0.8rem",
    color: "red",
    marginTop: "10px"
  },
  progress: {
    position: "absolute"
  },
  title: {
    fontSize: "4rem",
    margin: "20px auto 20px auto",
    color: "#bcd400 "
  }
};
class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
      errors: {}
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };
  handlChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h3" className={classes.title} fontWeigth="">
            E-Office
          </Typography>
          <Typography
            variant="h3"
            color="primary"
            className={classes.pageTitle}
          >
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              type="email"
              name="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.value}
              onChange={this.handlChange}
              fullWidth
              autoComplete="true"
            />
            <TextField
              id="password"
              type="password"
              name="password"
              label="Password"
              className={classes.textField}
              value={this.state.value}
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handlChange}
              fullWidth
              autoComplete="true"
            />
            <TextField
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.value}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={this.handlChange}
              fullWidth
              autoComplete="true"
            />
            <TextField
              id="handle"
              type="text"
              name="handle"
              label="Handle"
              className={classes.textField}
              value={this.state.value}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              onChange={this.handlChange}
              fullWidth
              autoComplete="true"
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              className={classes.button}
              type="submit"
              color="primary"
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account? <Link to="/login">Login Here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
