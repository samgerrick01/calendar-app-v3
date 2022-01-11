import React, { useState } from "react";
import "../style/Page.css";
import { useNavigate } from "react-router-dom";
import { addMeeting } from "../redux/action/action";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { FaRegCalendarCheck } from "react-icons/fa";

function CreatePage() {
  //STATE
  const [state, setState] = useState({
    id: nanoid(),
    meetingTitle: "",
    meetingDate: "",
    meetingStatus: "PENDING",
  });
  const [error, setError] = useState("");
  const { meetingTitle, meetingDate } = state;
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //EVENTS
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!meetingTitle || !meetingDate) {
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
          <form>
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
              type="datetime-local"
              name="meetingDate"
              value={meetingDate}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <label>Meeting Status : </label>
            <label>"PENDING"</label>
          </form>
        </div>
        <div className="footer-add">
          <button onClick={handleSubmit}>
            <FaRegCalendarCheck />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
