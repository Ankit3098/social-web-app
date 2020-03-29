import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";
import PropTypes from "prop-types";
//components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
// MUI stuff
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  progress: {
    position: "absolute"
  }
};

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    const { classes } = this.props;
    let recentScreamMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <CircularProgress size={30} className={classes.progress} />
    );
    return (
      <Grid container spacing={2} className={classes.mainContainer}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(
  withStyles(styles)(home)
);
