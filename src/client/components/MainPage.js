import React, { useState } from 'react';
import axios from 'axios';
import Job from './Job';

export default function MainPage() {
  const [jobs, setJobs] = useState(placeHolderJobs);
  const [title, setTitle] = useState('');
  const [loc, setLoc] = useState('');

  const saveJob = async (job) => {
    try {
      axios.post('/api/users/jobs', {
        accessToken: localStorage.getItem('jwt'),
        job,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJob = async (job) => {
    try {
      axios.delete('/api/users/jobs', {
        id: job.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
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
  const handleChange = (event) => {
    event.preventDefault();
    event.persist();
    if (event.target.name === 'query1') {
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

const placeHolderJobs = [
  {
    id: 1,
    title: 'Lead Front End Developer',
    company: 'FaceBook',
    image:
      'https://imagoearth.org/wp-content/uploads/2019/12/facebook-logo.png',
    url: 'https://www.facebook.com/hire',
    city: 'New York',
    state: 'NY',
    status: 'Open',
    posted: 'May 5, 2020',
    description: 'Be an Engineer at facebook!',
    contact: 'Mr.',
    notes: 'Whats up',
  },
  {
    id: 2,
    title: 'Mid-Level Software Engineer at Oracle',
    company: 'Oracle Inc.',
    image: '',
    url: 'Https://www.Oracle.com/this/is/a/cool/job',
    city: 'Boston',
    state: 'MA',
    status: 'OPEN',
    posted: 'May 1, 2020',
    description: 'Be the oracle',
    contact: 'Mr.',
    notes: '',
  },
];
