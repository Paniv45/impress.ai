import React from "react";
import { connect } from "react-redux";
import "../node_modules/antd/dist/antd.css";
import MainComponent from "./components/mainComponent";
import { addUser, getUsers, editUser, deleteUser } from "./actions/userActions";

function App(props) {
  return (
    <div>
      <MainComponent
        {...props}
        editUser={props.editUser}
        deleteUser={props.deleteUser}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userState: state.userState
});

const mapDispatchToProps = {
  getUsers,
  addUser,
  deleteUser,
  editUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
