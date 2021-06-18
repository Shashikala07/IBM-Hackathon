import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { updateProfile } from "../../actions/profileActions";
import { withRouter } from "react-router";
import { updateUser } from "../../actions/authActions";
class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    const usertype = this.props.auth.user.usertype;
    if (usertype === "buyer") {
      this.state = {
        name: this.props.profile.profile.user.name,
        email: this.props.profile.profile.user.email,
        errors: {},
        showMes: false,
      };
    } else {
      this.state = {
        name: this.props.profile.profile.user.name,
        email: this.props.profile.profile.user.email,
        contactno: this.props.profile.profile.contactno,
        errors: {},
        showMes: false,
      };
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const usertype = this.props.auth.user.usertype;
    let e1, e2, e3;
    e1 = this.state.errors.name !== undefined ? this.state.errors.name : "";
    e2 = this.state.errors.email !== undefined ? this.state.errors.email : "";
    if (usertype === "buyer") {
    } else {
      e3 =
        this.state.errors.contactno !== undefined
          ? this.state.errors.contactno
          : "";
    }
    if (usertype === "buyer") {
      if (nextProps.errors.name) {
        this.setState({
          errors: {
            name: nextProps.errors.name,
            email: e2,
          },
        });
        e1 = nextProps.errors.name;
      }
      if (nextProps.errors.email) {
        this.setState({
          errors: {
            name: e1,
            email: nextProps.errors.email,
          },
        });
      }
    } else {
      if (nextProps.errors.name) {
        this.setState({
          errors: {
            name: nextProps.errors.name,
            email: e2,
            contactno: e3,
          },
        });
        e1 = nextProps.errors.name;
      }
      if (nextProps.errors.email) {
        this.setState({
          errors: {
            name: e1,
            email: nextProps.errors.email,
            contactno: e3,
          },
        });
      }
      if (nextProps.errors.contactno) {
        this.setState({
          errors: {
            name: e1,
            email: e2,
            contactno: nextProps.errors.contactno,
          },
        });
        e3 = nextProps.errors.contactno;
      }
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    const usertype = this.props.auth.user.usertype;
    const userData = {
      name: this.state.name,
      email: this.state.email,
    };
    const fer = await this.props.updateUser(userData);
    if (usertype === "buyer") {
      const profileData = {};
      const dodo = await this.props.updateProfile(profileData, usertype);
      if (dodo && fer) {
        this.setState({ showMes: true });
      } else {
        this.setState({ showMes: false });
      }
    } else {
      const profileData = {
        contactno: this.state.contactno,
      };
      const dodo = await this.props.updateProfile(profileData, usertype);
      if (dodo && fer) {
        this.setState({ showMes: true });
      } else {
        this.setState({ showMes: false });
      }
    }
    // this.componentWillUnmount();
  }
  render() {
    const { errors } = this.state;
    let pageContent;
    const usertype = this.props.auth.user.usertype;
    if (usertype === "buyer") {
      pageContent = (
        <form onSubmit={this.onSubmit}>
          <h4>Change Name</h4>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.name,
              })}
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
            <small className="form-text text-muted"></small>
          </div>
          <div className="form-group">
            <h4>Change Email</h4>
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email,
              })}
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
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
    } else {
      pageContent = (
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <h4>Change Name</h4>
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.name,
              })}
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
            <small className="form-text text-muted"></small>
          </div>
          <div className="form-group">
            <h4>Change Email</h4>
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email,
              })}
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <small className="form-text text-muted"></small>
          </div>
          <div className="form-group">
            <h4>Change Contact Number</h4>
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
    const successMessage = <h4>Successfully Submitted</h4>;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">{pageContent}</div>
        </Modal.Body>
        <Modal.Footer>
          {this.state.showMes ? successMessage : ""}
          <Button
            variant="danger"
            onClick={() => {
              this.props.onHide();
              this.setState({ showMes: false, errors: {} });
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ChangeProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateProfile, updateUser })(
  withRouter(ChangeProfile)
);
