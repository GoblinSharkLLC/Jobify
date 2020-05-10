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
  const [title, setTitle] = useState("");
  const [loc, setLoc] = useState("");

  const handleSubmit = async (event) => {
    const saveInput = [title, loc];
    setTitle("");
    setLoc("");
    console.log(saveInput);
    const result = await axios.get("/api/search", {
      params: {
        description: saveInput[0],
        location: saveInput[1],
      },
    });
    setJobs(result);
    // get data from form
    // axios request to server with data
    // save returnValues to state
  };
  const handleChange = (event) => {
    event.preventDefault();
    event.persist();
    if (event.target.name === "query1") {
      setTitle(event.target.value);
    } else {
      setLoc(event.target.value);
    }
  };

  return (
    <div>
      <div id="search-container">
        <form id="job-search">
          <input
            type="text"
            name="query1"
            placeholder="Job Title..."
            value={title}
            onInput={handleChange}
          />
          <input
            type="text"
            name="query2"
            placeholder="Location..."
            value={loc}
            onInput={handleChange}
          />
          <Button onClick={handleSubmit}>Search</Button>
        </form>
      </div>
      <div id="find-jobs-display">
        {jobs.map((job, idx) => {
          return <Job key={`job${idx}`} job={job} savedContainer={false} />;
        })}
      </div>
    </div>
  );
}
