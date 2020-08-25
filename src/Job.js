import React, { useState } from "react";
import { Card, Badge, Button, Collapse } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export default function Job({ job }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Card className="bg-dark text-white mb-3 border-dark">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title>
                {job.title} -
                <hr className="my-1" />
                <span className="text-muted font-weight-light">
                  {job.company}
                </span>
              </Card.Title>
              <hr className="border-white" />
              <Card.Subtitle className="text-muted mb-2">
                {new Date(job.created_at).toLocaleDateString()}
              </Card.Subtitle>
              <Badge pill variant="light" className="mr-2">
                {job.type}
              </Badge>
              <Badge pill variant="light">
                {job.location}
              </Badge>
              <div style={{ wordBreak: "break-all" }}>
                <ReactMarkdown source={job.how_to_apply} />
              </div>
            </div>
            <img
              className="d-none d-md-block"
              height="50"
              src={job.company_logo}
              alt={job.company}
            />
          </div>
          <Card.Text>
            <Button
              className="btn btn-primary"
              onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
              {open ? "Hide Details" : "View Details"}
            </Button>
          </Card.Text>
          <Collapse in={open}>
            <div className="mt-4">
              <ReactMarkdown source={job.description} />
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
}
