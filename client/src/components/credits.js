import React from "react";
import { connect } from "react-redux";

const Credits = ({ user }) => <input type="text" value={`Credits: ${user.credits >= 0 ? user.credits : "..."}`} className="form-control" style={{ width: "155px" }} readOnly />;

export default connect(({ user }) => ({ user }))(Credits);
