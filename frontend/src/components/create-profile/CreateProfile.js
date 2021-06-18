import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { createProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    const usertype = this.props.auth.user.usertype;
    if (usertype === "applicant") {
      this.state = {
        errors: {},
      };
    } else {
      this.state = {
        contactno: "",
        errors: {},
      };
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const usertype = this.props.auth.user.usertype;
    if (usertype === "applicant") {
      const profileData = {};
      this.props.createProfile(profileData, this.props.history, usertype);
    } else {
      const profileData = {
        contactno: this.state.contactno,
      };
      this.props.createProfile(profileData, this.props.history, usertype);
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    let pageContent;
    const usertype = this.props.auth.user.usertype;
    if (usertype === "buyer") {
    } else {
      pageContent = (
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.contactno,
              })}
              placeholder="Contact Number"
              name="contactno"
              value={this.state.contactno}
              onChange={this.onChange}
            />
            {errors.contactno && (
              <div className="invalid-feedback">{errors.contactno}</div>
            )}
            <small className="form-text text-muted"></small>
          </div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-info btn-block mt-4"
          />
        </form>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information</p>
              <small className="d-block pb-3">* = required fields</small>
              {pageContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
