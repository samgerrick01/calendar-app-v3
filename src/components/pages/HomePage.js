import React, { useEffect, useState } from "react";
import "../style/Page.css";
import { useSelector, useDispatch } from "react-redux";
import { loadMeetings } from "../redux/action/action";
import { useNavigate, Link } from "react-router-dom";
import { FaRegCalendarPlus } from "react-icons/fa";

function HomePage() {
  const { meetings } = useSelector((state) => ({ ...state.data }));
  const [filter, setFilter] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(loadMeetings(0, 4, 0));
  }, []);

  return (
    <div className="pageBG">
      <div className="pageContainer">
        <div className="title">
          <h1>Calendar App</h1>
          <select onClick={(e) => setFilter(e.target.value)}>
            <option value="">ALL</option>
            <option value="PENDING">PENDING</option>
            <option value="ON-GOING">ON-GOING</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <div className="body">
          <ul className="ul-list">
            {meetings &&
              meetings
                .filter(
                  (meeting) =>
                    !filter ||
                    meeting.meetingStatus
                      ?.toLowerCase()
                      ?.indexOf(filter?.toLowerCase()) >= 0
                )
                .map((meeting) => {
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
            <button>
              <FaRegCalendarPlus />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
