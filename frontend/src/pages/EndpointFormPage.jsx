import { useState } from "react";
import { Button, PageHeader } from "../components/UI";
import { Link } from "react-router-dom";
import axios from 'axios';
export default function EndpointFormPage({ edit }) {
  const [endpoint, setEndPoint] = useState({
    name: "",
    method: "",
    url: "",
    intervalSecond: "",
    isActive: "",
  });

  const handleChange = (e) => {
    setEndPoint({
      ...endpoint,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/endpoints", {
        name: endpoint.name,
        method: endpoint.method,
        url: endpoint.url,
        intervalSecond: endpoint.intervalSecond,
        isActive: endpoint.isActive,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form-page">
      <div className="crumb">
        <Link to="/endpoints">Endpoints</Link> /{" "}
        {edit ? "Edit endpoint" : "Add endpoint"}
      </div>
      <PageHeader
        title={edit ? "Edit Endpoint" : "Add Endpoint"}
        description={
          edit
            ? "Update the monitoring details for this endpoint."
            : "Add an API endpoint to begin monitoring its health."
        }
      />
      <form className="panel endpoint-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Endpoint name
            <input
              type="text"
              name="name"
              placeholder="e.g. Users API"
              value={endpoint.name}
              onChange={handleChange}
            />
          </label>
          <label>
            HTTP method
            <select
              name="method"
              value={endpoint.method}
              onChange={handleChange}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </label>
          <label className="wide">
            Endpoint URL
            <input
              type="text"
              name="url"
              placeholder="https://api.example.com/health"
              value={endpoint.url}
              onChange={handleChange}
            />
            <small className="error-text">Enter a valid endpoint URL</small>
          </label>
          <label>
            Check interval
            <select
              name="intervalSecond"
              value={endpoint.intervalSecond}
              onChange={handleChange}
            >
              <option>1 minute</option>
              <option>5 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
            </select>
          </label>
          <label className="toggle-row">
            <span>
              <b>Monitoring status</b>
              <small>Enable checks for this endpoint</small>
            </span>
            <input
              type="checkbox"
              name="isActive"
              checked={endpoint.isActive}
              onChange={handleChange}
            />
            <i />
          </label>
        </div>
        <div className="form-actions">
          <Button variant="secondary" to="/endpoints">
            Cancel
          </Button>
          <Button>{edit ? "Save Changes" : "Add Endpoint"}</Button>
        </div>
      </form>
    </div>
  );
}
