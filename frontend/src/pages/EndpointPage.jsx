import {
  Button,
  EmptyState,
  EndpointTable,
  PageHeader,
} from "../components/UI";
export default function EndpointPage() {
  return (
    <>
      <PageHeader
        title="Endpoints"
        description="Manage and monitor all your API endpoints."
        action={<Button to="/endpoints/new">＋ Add Endpoint</Button>}
      />
      <section className="panel endpoints-panel">
        <div className="filter-row">
          <label className="input-icon">
            ⌕ <input placeholder="Search endpoints..." />
          </label>
          <button className="select-btn">All methods⌄</button>
          <button className="select-btn">All statuses⌄</button>
        </div>
        <div className="status-tabs">
          <button className="active">
            All <b>5</b>
          </button>
          <button>
            Healthy <b>4</b>
          </button>
          <button>
            Down <b>1</b>
          </button>
          <button>
            Paused <b>0</b>
          </button>
        </div>
        <EndpointTable />
        <div className="pagination">
          <span>Showing 1 to 5 of 5 endpoints</span>
          <div>
            <button disabled>← Previous</button>
            <button className="current">1</button>
            <button disabled>Next →</button>
          </div>
        </div>
      </section>
      <div className="screen-states">
        <details>
          <summary>Empty-state preview</summary>
          <EmptyState
            title="No matching endpoints"
            text="Try adjusting your search or filters."
          />
        </details>
      </div>
    </>
  );
}
