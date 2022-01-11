import React, { useState, useEffect } from "react";
import "../style/Page.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteMeetings,
  getSingleMeeting,
  updateMeeting,
} from "../redux/action/action";
import { useDispatch, useSelector } from "react-redux";

function UpdatePage() {
  //STATE
  const [state, setState] = useState({
    meetingTitle: "",
    meetingDate: "",
    meetingStatus: "",
  });
  const [error, setError] = useState("");
  const { meetingTitle, meetingDate, meetingStatus } = state;

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { id } = useParams();
  const { meeting } = useSelector((state) => state.data);

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
      dispatch(updateMeeting(state, id));
      navigate("/");
      setError("");
    }
  };

  const handleDelSubmit = (id) => {
    if (window.confirm("Are you sure you wanted to delete this meeting?")) {
      dispatch(deleteMeetings(id));
      navigate("/");
    }
  };

  //USE EFFECT
  useEffect(() => {
    dispatch(getSingleMeeting(id));
  }, []);

  useEffect(() => {
    if (meeting) {
      setState({ ...meeting });
    }
  }, [meeting]);
  return (
    <div className="pageBG">
      <div className="pageContainer">
        <div className="title-add">
          <button onClick={() => navigate("/")}>Back</button>
          <h1>Update / Delete</h1>
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
              id="meeting"
              name="meetingTitle"
              value={meetingTitle || ""}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <label>Meeting Date : </label>
            <input
              type="date"
              name="meetingDate"
              value={meetingDate || ""}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <label>Meeting Status : </label>
            <select
              name="meetingStatus"
              value={meetingStatus || ""}
              onChange={handleInputChange}
            >
              <option value="">---</option>
              <option value="PENDING">PENDING</option>
              <option value="ON-GOING">ON-GOING</option>
              <option value="DONE">DONE</option>
            </select>
          </form>
        </div>
        <div className="footer-update">
          <button onClick={() => handleDelSubmit(meeting.id)}>Delete</button>
          <button onClick={handleSubmit}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePage;
