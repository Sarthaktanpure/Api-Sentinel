import {
  Button,
  EndpointTable,
  PageHeader,
  Panel,
  StatCard,
  TrendChart,
} from "../components/UI";
export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Monitor your APIs and keep track of their health in real-time."
        action={<Button to="/endpoints/new">＋ Add Endpoint</Button>}
      />
      <div className="stats">
        <StatCard
          icon="▣"
          name="Total Endpoints"
          value="5"
          note="↑ +1 from last week"
        />
        <StatCard
          icon="✓"
          tone="green"
          name="Healthy Endpoints"
          value="4"
          note="↑ 80% healthy"
        />
        <StatCard
          icon="!"
          tone="red"
          name="Down Endpoints"
          value="1"
          note="↓ -1 from last week"
        />
        <StatCard
          icon="◷"
          tone="purple"
          name="Avg Response Time"
          value="245ms"
          note="↓ -12ms improvement"
        />
      </div>
      <div className="overview-grid">
        <Panel
          title="Endpoint Health Overview"
          icon="〽"
          action={<button className="select-btn">Last 24 hours⌄</button>}
        >
          <div className="health">
            <div className="donut">
              <div>
                <b>80%</b>
                <span>Healthy</span>
              </div>
            </div>
            <div className="legend">
              <p>
                <i className="dot healthy-dot" />
                Healthy <b>4</b>
              </p>
              <p>
                <i className="dot down-dot" />
                Down <b>1</b>
              </p>
              <p>
                <i className="dot total-dot" />
                Total <b>5</b>
              </p>
            </div>
          </div>
        </Panel>
        <Panel
          title="Response Time Trend"
          icon="▥"
          action={<button className="select-btn">Last 24 hours⌄</button>}
        >
          <TrendChart />
        </Panel>
      </div>
      <div className="overview-grid bottom">
        <Panel title="Recent Activity" icon="ϟ" action={<a>View All →</a>}>
          <div className="activity">
            {[
              ["/api/users", "Healthy · 278ms", "2m ago", "good"],
              ["/api/payment", "Down · Timeout", "5m ago", "bad"],
              ["/api/products", "Healthy · 189ms", "8m ago", "good"],
              ["/api/auth", "Healthy · 201ms", "12m ago", "good"],
            ].map((x) => (
              <div>
                <i className={x[3]} />
                <b>{x[0]}</b>
                <span className={x[3]}>{x[1]}</span>
                <small>{x[2]}</small>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Your Endpoints" icon="▱" action={<a>View All →</a>}>
          <EndpointTable compact />
        </Panel>
      </div>
    </>
  );
}
