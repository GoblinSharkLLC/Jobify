import React, { useState } from "react";
import axios from "axios";
import Job from "./Job";
import { Button } from "react-bootstrap";

const placeHolderJobs = [
  {
    title: "Lead Front End Developer",
    company: "FaceBook",
    url: "https://www.facebook.com/hire",
    city: "New York",
    state: "NY",
    status: "Open",
    posted: "May 5, 2020",
    description: "Be an Engineer at facebook!",
    contact: "Mr.",
    notes: "Whats up",
  },
  {
    title: "Mid-Level Software Engineer at Oracle",
    company: "Oracle Inc.",
    url: "Https://www.Oracle.com/this/is/a/cool/job",
    city: "Boston",
    state: "MA",
    status: "OPEN",
    posted: "May 1, 2020",
    description:
      "Come be an engineer at oracle and let Larry Ellison kick you in the nuts every 3 hours",
    contact: "Mr.",
    notes: "",
  },
];

export default function MainPage() {
  const [jobs, setJobs] = useState(placeHolderJobs);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const query = event.target.value;
    //how does this object look?????
    const result = await axios.get("/api/search/", {
      params: {
        description: query.query1,
        location: query.query2,
      },
    });
    setJobs(result);
    // get data from form
    // axios request to server with data
    // save returnValues to state
  };

  return (
    <div>
      <div id="search-container">
        <form id="job-search">
          <input type="text" name="query1" placeholder="Job Title..." />
          <input type="text" name="query2" placeholder="Location..." />
          <Button onClick={handleSubmit}>Search</Button>
        </form>
      </div>
      <p>Display Jobs</p>{" "}
      <div id="find-jobs-display">
        {jobs.map((job, idx) => {
          return <Job key={`job${idx}`} job={job} savedContainer={false} />;
        })}
      </div>
    </div>
  );
}
