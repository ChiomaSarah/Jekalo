import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { toast } from "react-toastify";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Users(props) {
  const [users, setUsers] = useState([]);
  let [error, setError] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          "https://jekalo-server.herokuapp.com/api/users"
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setUsers(jsonData.data);
      } catch (err) {
        setError(err.message);
      }
    }
    getUsers();
  }, []);

  // delete a user
  async function deleteUser(id, props) {
    try {
      await fetch(`https://jekalo-server.herokuapp.com/api/user/${id}`, {
        method: "DELETE",
      });

      setUsers(users.filter((user) => user.user_id !== id));
      toast.success("Book deleted!");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  }

  if (setError.message) {
    error = <div>{setError.message}</div>;
  }

  return (
    <div>
      <div className="container text-center mt-5">
        {error && (
          <Alert severity="error" onClick={() => setError(null)}>
            {props.error || error}
          </Alert>
        )}
        <h5>
          <b>Users</b>
        </h5>{" "}
        <table className="table table-bordered mt-3 ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Username</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ color: "#000" }}>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.username}</td>
                <td>{user.date_of_birth}</td>
                <td>
                  <div className="btn">
                    <button
                      className="btn btn-sm btn-danger ml-3"
                      onClick={() => {
                        const confirm = window.confirm(
                          "Are you sure you want to delete this record?"
                        );
                        if (confirm === true) {
                          deleteUser(user.user_id);
                        }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Users;
