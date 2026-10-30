import { Button, PageHeader, Panel } from "../components/UI";
export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure your workspace and notification preferences."
      />
      <div className="settings">
        <Panel title="Workspace" icon="▣">
          <div className="settings-fields">
            <label>
              Workspace name
              <input defaultValue="Acme Engineering" />
            </label>
            <label>
              Default environment
              <select>
                <option>Development</option>
                <option>Production</option>
              </select>
            </label>
          </div>
        </Panel>
        <Panel title="Notifications" icon="♧">
          <div className="settings-options">
            {[
              [
                "Endpoint failures",
                "Get notified whenever an endpoint goes down.",
              ],
              [
                "Recovery alerts",
                "Receive an alert when a failed endpoint recovers.",
              ],
              [
                "Weekly health report",
                "A weekly digest of your endpoint health.",
              ],
            ].map((x) => (
              <label className="toggle-row">
                <span>
                  <b>{x[0]}</b>
                  <small>{x[1]}</small>
                </span>
                <input type="checkbox" defaultChecked />
                <i />
              </label>
            ))}
          </div>
        </Panel>
        <Panel title="Danger zone" icon="!">
          <p className="danger-copy">
            Permanently delete all endpoint monitoring data from this workspace.
          </p>
          <Button variant="danger">Delete workspace</Button>
        </Panel>
      </div>
      <div className="settings-save">
        <Button variant="secondary">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </>
  );
}
