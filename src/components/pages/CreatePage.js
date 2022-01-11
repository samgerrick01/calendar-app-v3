import React, { useState } from "react";
import "../style/Page.css";
import { useNavigate } from "react-router-dom";
import { addMeeting } from "../redux/action/action";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

function CreatePage() {
  //STATE
  const [state, setState] = useState({
    id: nanoid(),
    meetingTitle: "",
    meetingDate: "",
    meetingStatus: "",
  });
  const [error, setError] = useState("");
  const { meetingTitle, meetingDate, meetingStatus } = state;
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //EVENTS
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!meetingTitle || !meetingDate || !meetingStatus) {
      setError("Please Input the Empty Field!");
    } else {
      dispatch(addMeeting(state));
      navigate("/");
      setError("");
    }
  };
  return (
    <div className="pageBG">
      <div className="pageContainer">
        <div className="title-add">
          <button onClick={() => navigate("/")}>Back</button>
          <h1>Create</h1>
        </div>
        {error && (
          <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>
        )}
        <div className="body-create">
          <form className="meeting-input">
            <label>Meeting Title : </label>
            <input
              type="text"
              autoFocus
              placeholder="Enter Meeting Title"
              name="meetingTitle"
              value={meetingTitle}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <label>Meeting Date : </label>
            <input
              type="date"
              name="meetingDate"
              value={meetingDate}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <label>Meeting Status : </label>
            <select
              name="meetingStatus"
              value={meetingStatus}
              onChange={handleInputChange}
            >
              <option value="">---</option>
              <option value="PENDING">PENDING</option>
              <option disabled value="ON-GOING">
                ON-GOING
              </option>
              <option disabled value="DONE">
                DONE
              </option>
            </select>
          </form>
        </div>
        <div className="footer">
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
