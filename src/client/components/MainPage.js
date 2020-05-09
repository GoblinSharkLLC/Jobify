import React, { useState } from "react";
import axios from "axios";
import Job from "./Job";

export default function MainPage() {
  const [jobs, setJobs] = useState([
    {
      title: "Engineering",
      company: "Tech Corp",
      url: "url",
      city: "city",
      state: "state",
      status: "status",
      posted: "posted",
      description: "description",
      contact: "Mr.",
      notes: "Whats up",
    },
    {
      title: "Engineering",
      company: "Tech Corp",
      url: "url",
      city: "city",
      state: "state",
      status: "status",
      posted: "posted",
      description: "description",
      contact: "Mr.",
      notes: "Whats up",
    },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const query = event.target.query.value;
    const result = await axios.get(`/api/jobs/?job=${query}`);
    setJobs(result);
    // get data from form
    // axios request to server with data
    // save returnValues to state
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Job title" />
        <input type="submit" value="Find Jobs" />
      </form>
      <p>Display Jobs</p>
      {jobs.map((job, idx) => {
        return <Job key={`job${idx}`} job={job} />;
      })}
    </div>
  );
}
