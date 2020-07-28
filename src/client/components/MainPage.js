import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Job from './Job';

export default function MainPage() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [loc, setLoc] = useState('');
  useEffect((e) => {
    handleSubmit(e);
  }, []);

  const saveJob = async (job) => {
    console.log('saved job');
    try {
      axios.post('/api/users/jobs', {
        accessToken: localStorage.getItem('jwt'),
        job,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJob = () => {
    console.log('deleteJob is running');
    // try {
    //   console.log(job.id);
    //   axios.delete('/api/users/jobs', {
    //     id: job.id,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.persist();
    }
    const saveInput = [title, loc];
    setTitle('');
    setLoc('');
    const result = await axios.get('/api/search', {
      params: {
        description: saveInput[0],
        location: saveInput[1],
      },
    });
    setJobs(result.data);
    // get data from form
    // axios request to server with data
    // save returnValues to state
  };

  return (
    <div id="jobs-container">
      <div id="savedOrAllToggle">
        <Link to="/">
          <button className="nav-button">All Jobs</button>
        </Link>
        <Link to="/jobs">
          <button className="nav-button">Saved Jobs</button>
        </Link>
      </div>
      <div id="search-container">
        <form id="job-search">
          <input
            type="text"
            name="query1"
            placeholder="Job Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="query2"
            placeholder="Location..."
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
          />
          <button className="nav-button" onClick={handleSubmit}>
            Search
          </button>
        </form>
      </div>
      <div id="find-jobs-display">
        {jobs.map((job, idx) => {
          return (
            <Job
              key={`job${idx}`}
              job={job}
              savedContainer={false}
              saveJob={() => saveJob(job)}
              deleteJob={() => deleteJob(job)}
            />
          );
        })}
      </div>
    </div>
  );
}
