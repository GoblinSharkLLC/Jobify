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

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.persist();
    }
    const saveInput = [title, loc];
    setTitle('');
    setLoc('');
    console.log(saveInput);
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
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus pellentesque varius. Donec sagittis id ante pretium mollis. Proin auctor neque orci, at malesuada dolor venenatis sed. Phasellus scelerisque vitae justo vel iaculis. Ut faucibus, mi id porttitor egestas, sapien lorem sodales nibh, ut dictum purus mi nec elit. Nullam tincidunt est eu dolor aliquet, at mollis arcu ornare. Donec nunc ipsum, efficitur sed diam non, tincidunt vulputate tortor. Aenean id laoreet felis. Pellentesque in aliquam turpis, vitae consectetur turpis. Donec aliquet eget dolor quis sagittis.

    Nullam at nisi ac metus molestie elementum. Praesent non metus ac nunc convallis rutrum. Praesent malesuada mauris eget sem tempus, sodales cursus orci auctor. Ut ultricies viverra nisi nec mollis. In ornare posuere gravida. Aenean luctus pellentesque eros eu dignissim. Phasellus eget mauris facilisis, elementum est ut, posuere nisi. Sed ut lobortis nisi, et vestibulum ligula. Integer at quam vel nibh posuere malesuada nec sed lectus. Donec accumsan suscipit augue, quis rhoncus nunc facilisis quis. Vestibulum non aliquet tortor. Sed condimentum ex vitae commodo facilisis. Integer tincidunt, mi non dictum varius, augue nisl maximus velit, non venenatis erat risus ac urna. Sed consequat interdum orci, a accumsan nisl pellentesque quis. Ut ut egestas lacus, ut volutpat urna.
    
    Integer in ipsum malesuada, rutrum ante vitae, mollis tortor. Vivamus lacinia, quam nec luctus bibendum, arcu enim interdum sapien, in luctus dui nisl et justo. Proin facilisis nisl eu nibh dignissim, a scelerisque nunc iaculis. Suspendisse imperdiet urna et faucibus tincidunt. Mauris ac tempor eros, eu aliquam leo. Sed laoreet tellus id interdum fermentum. Curabitur iaculis a ipsum sed dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat aliquet mattis. Proin malesuada tellus ut hendrerit dictum. Nunc sollicitudin ligula in nisi lobortis auctor. Donec ornare sollicitudin magna eu lobortis. Sed eget laoreet mi. Aliquam gravida est quam, at mattis dolor tincidunt eu.`,
    contact: 'Mr.',
    notes: 'Whats up',
  },
  {
    id: 2,
    title: 'Mid-Level Software Engineer at Oracle',
    company: 'Oracle Inc.',
    image: '',
    url: 'Https://www.oracle.com/this/is/a/cool/job',
    city: 'Boston',
    state: 'MA',
    status: 'OPEN',
    posted: 'May 1, 2020',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus pellentesque varius. Donec sagittis id ante pretium mollis. Proin auctor neque orci, at malesuada dolor venenatis sed. Phasellus scelerisque vitae justo vel iaculis. Ut faucibus, mi id porttitor egestas, sapien lorem sodales nibh, ut dictum purus mi nec elit. Nullam tincidunt est eu dolor aliquet, at mollis arcu ornare. Donec nunc ipsum, efficitur sed diam non, tincidunt vulputate tortor. Aenean id laoreet felis. Pellentesque in aliquam turpis, vitae consectetur turpis. Donec aliquet eget dolor quis sagittis.

    Nullam at nisi ac metus molestie elementum. Praesent non metus ac nunc convallis rutrum. Praesent malesuada mauris eget sem tempus, sodales cursus orci auctor. Ut ultricies viverra nisi nec mollis. In ornare posuere gravida. Aenean luctus pellentesque eros eu dignissim. Phasellus eget mauris facilisis, elementum est ut, posuere nisi. Sed ut lobortis nisi, et vestibulum ligula. Integer at quam vel nibh posuere malesuada nec sed lectus. Donec accumsan suscipit augue, quis rhoncus nunc facilisis quis. Vestibulum non aliquet tortor. Sed condimentum ex vitae commodo facilisis. Integer tincidunt, mi non dictum varius, augue nisl maximus velit, non venenatis erat risus ac urna. Sed consequat interdum orci, a accumsan nisl pellentesque quis. Ut ut egestas lacus, ut volutpat urna.
    
    Integer in ipsum malesuada, rutrum ante vitae, mollis tortor. Vivamus lacinia, quam nec luctus bibendum, arcu enim interdum sapien, in luctus dui nisl et justo. Proin facilisis nisl eu nibh dignissim, a scelerisque nunc iaculis. Suspendisse imperdiet urna et faucibus tincidunt. Mauris ac tempor eros, eu aliquam leo. Sed laoreet tellus id interdum fermentum. Curabitur iaculis a ipsum sed dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat aliquet mattis. Proin malesuada tellus ut hendrerit dictum. Nunc sollicitudin ligula in nisi lobortis auctor. Donec ornare sollicitudin magna eu lobortis. Sed eget laoreet mi. Aliquam gravida est quam, at mattis dolor tincidunt eu.`,
    contact: 'Mr.',
    notes: '',
  },
];
