import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className="my-4 jumbotron">
      <h1 className="display-3 mb-4">GitHub Jobs</h1>
      <hr className="my-4" />
      <SearchForm params={params} onParamChange={handleParamChange} />
      {loading && (
        <h3>
          <span role="img" aria-label="ninja-cat">
            loading... 🐱‍👤🐱‍👤🐱‍👤
          </span>
        </h3>
      )}
      {!loading && !error && (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
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
      {!loading && !error && (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      )}
    </Container>
  );
}

export default App;

// https://jobs.github.com/api
