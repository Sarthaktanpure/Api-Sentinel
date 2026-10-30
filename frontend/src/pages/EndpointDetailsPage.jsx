import {
  Button,
  PageHeader,
  Panel,
  StatCard,
  StatusBadge,
  TrendChart,
} from "../components/UI";
import { Link } from "react-router-dom";
export default function EndpointDetailsPage() {
  return (
    <>
      <div className="crumb">
        <Link to="/endpoints">Endpoints</Link> / API Users
      </div>
      <PageHeader
        title="/api/users"
        description="https://api.acme.com/users"
        action={
          <div className="header-actions">
            <Button variant="secondary" to="/endpoints/users/edit">
              Edit
            </Button>
            <Button variant="secondary">▷ Run Check</Button>
            <Button variant="danger">Delete</Button>
          </div>
        }
      />
      <div className="detail-meta">
        <span className="method">GET</span>
        <StatusBadge status="Healthy" />
        <span>Last checked 2 minutes ago</span>
      </div>
      <div className="stats details-stats">
        <StatCard
          icon="◷"
          name="Avg Response Time"
          value="278ms"
          note="↓ 18ms from yesterday"
        />
        <StatCard
          icon="✓"
          tone="green"
          name="Uptime"
          value="99.8%"
          note="↑ 0.2% this month"
        />
        <StatCard
          icon="▣"
          name="Total Checks"
          value="12,486"
          note="Last 30 days"
        />
      </div>
      <Panel
        title="Response Time History"
        icon="▥"
        action={<button className="select-btn">Last 24 hours⌄</button>}
      >
        <TrendChart label="278ms" />
      </Panel>
      <div className="details-grid">
        <Panel title="Recent Health Checks" icon="✓">
          <div className="check-list">
            {[
              "2 minutes ago",
              "7 minutes ago",
              "12 minutes ago",
              "17 minutes ago",
              "22 minutes ago",
            ].map((x, i) => (
              <div>
                <span className="check-ok">✓</span>
                <b>200 OK</b>
                <span>{i ? `${234 - i * 7}ms` : "278ms"}</span>
                <small>{x}</small>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Endpoint Configuration" icon="⚙">
          <dl>
            <dt>Endpoint URL</dt>
            <dd>https://api.acme.com/users</dd>
            <dt>HTTP method</dt>
            <dd>
              <span className="method">GET</span>
            </dd>
            <dt>Check interval</dt>
            <dd>Every 5 minutes</dd>
            <dt>Monitoring status</dt>
            <dd>
              <StatusBadge status="Healthy" />
            </dd>
          </dl>
        </Panel>
      </div>
    </>
  );
}
