import React, { useState } from 'react';
import axios from 'axios';
import Job from './Job';
const placeHolderJobs = [
  {
    title: 'Engineering',
    company: 'Tech Corp',
    url: 'url',
    city: 'city',
    state: 'state',
    status: 'status',
    posted: 'posted',
    description: 'description',
    contact: 'Mr.',
    notes: 'Whats up',
  },
  {
    title: 'Engineering',
    company: 'Tech Corp',
    url: 'url',
    city: 'city',
    state: 'state',
    status: 'status',
    posted: 'posted',
    description: 'description',
    contact: 'Mr.',
    notes: '',
  },
];

export default function MainPage() {
<<<<<<< HEAD
  const [jobs, setJobs] = useState(placeHolderJobs);
=======
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
      contact: { name: "name", email: "email", number: "phone" },
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
      contact: { name: "name", email: "email" },
      notes: "",
    },
  ]);
>>>>>>> 0e89c94112f9326c71a814187011f6dc6dda426b

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
        return <Job key={`job${idx}`} job={job} savedContainer={false} />;
      })}
    </div>
  );
}
