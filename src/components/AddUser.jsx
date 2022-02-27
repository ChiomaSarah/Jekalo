import React, { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { toast } from "react-toastify";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddUser(props) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [username, setUsername] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  let [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const body = {
        first_name,
        last_name,
        username,
        date_of_birth,
      };

      const response = await fetch(
        "https://jekalo-server.herokuapp.com/api/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw Error(result.error);
      }

      if (response.ok) {
        toast.success("User created!");
        window.location.reload();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  if (setError.message) {
    error = <div>{setError.message}</div>;
  }

  return (
    <div className="container" style={{ width: "50%", marginBottom: "3em" }}>
      {error && (
        <Alert severity="error" onClick={() => setError(null)}>
          {props.error || error}
        </Alert>
      )}
      <h3 className="text-center my-5">Create User</h3>
      <form onSubmit={handleSubmit}>
        <MDBInput
          id="form3Example1"
          label="Firstname"
          type="text"
          className="form-control form-control-mb mb-5"
          required
          onChange={(e) => setFirst_name(e.target.value)}
        />

        <MDBInput
          id="form3Example2"
          label="Lastname"
          type="text"
          className="form-control form-control-mb mb-5"
          required
          onChange={(e) => setLast_name(e.target.value)}
        />

        <MDBInput
          type="text"
          id="form3Example3"
          label="Username"
          className="form-control form-control-mb mb-5"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <MDBInput
          id="form3Example4"
          label="Date of Birth"
          type="text"
          placeholder="dd-mm-yyyy"
          className="form-control form-control-mb mb-5"
          required
          onChange={(e) => setDate_of_birth(e.target.value)}
        />

        <MDBBtn className="btn btn-lg btn-primary mb-5" block>
          SUBMIT
        </MDBBtn>
      </form>
    </div>
  );
}
export default AddUser;
