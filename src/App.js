import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <Container className="my-4 jumbotron">
      <h1 className="display-3 mb-4">GitHub Jobs</h1>
      <hr className="my-4" />
      {loading && (
        <h3>
          <span role="img" aria-label="ninja-cat">
            loading... 🐱‍👤🐱‍👤🐱‍👤
          </span>
        </h3>
      )}
      {error && (
        <h3>
          <span role="img" aria-label="ninja-cat">
            error, try refreshing...😓😓😓
          </span>
        </h3>
      )}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Container>
  );
}

export default App;

// https://jobs.github.com/api
