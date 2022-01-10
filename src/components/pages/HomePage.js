import React, { useEffect } from "react";
import "../style/Page.css";
import { useSelector, useDispatch } from "react-redux";
import { loadMeetings } from "../redux/action/action";
import { useNavigate, Link } from "react-router-dom";

function HomePage() {
  const { meetings } = useSelector((state) => ({ ...state.data }));
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(loadMeetings());
  }, [meetings]);
  return (
    <div className="pageBG">
      <div className="pageContainer">
        <div className="title">
          <h1>Calendar App</h1>
          <button>Filter</button>
        </div>
        <div className="body">
          <ul className="ul-list">
            {meetings &&
              meetings.map((meeting) => {
                return (
                  <li
                    key={meeting.id}
                    onClick={() => navigate(`/update/${meeting.id}`)}
                  >
                    {meeting.meetingTitle}
                    <br />
                    {meeting.meetingDate}
                    <br />
                    {meeting.meetingStatus}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="footer">
          <Link to="/add">
            <button>Add</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
