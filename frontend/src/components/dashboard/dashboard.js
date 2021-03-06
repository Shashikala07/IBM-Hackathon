import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
class Dashboard extends Component {
  componentDidMount() {
    const usertype = this.props.auth.user.usertype;
    console.log(usertype);
    this.props.getCurrentProfile(usertype);
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        const usertype = user.usertype;
        if (usertype === "buyer") {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {profile.user.name}</p>
              <p className="lead text-muted">
                Your Email : {profile.user.email}
              </p>
            </div>
          );
        } else {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {profile.user.name}</p>
              <p className="lead text-muted">
                Your Email : {profile.user.email}
              </p>
              <p className="lead text-muted">Contact : {profile.contactno}</p>
            </div>
          );
        }
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStatetoProps, { getCurrentProfile })(Dashboard);
