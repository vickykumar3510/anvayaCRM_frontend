import "../App.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import SalesAgentContext from "../contexts/SalesAgentContext";
import Sidebar from "../components/Sidebar";

const SalesAgentManagementScreen = () => {
  const { loading, agents } = useContext(SalesAgentContext);

  return (
    <div className="page-wrapper bg-salesAgentManagement">
      {loading && (
        <div className="loading-state" role="status" aria-live="polite">
          <p>Loading...</p>
        </div>
      )}

      <main>
        <div className="pageCenter">
          <div className="container">
            <div className="app-shell">
              <Sidebar />

              <div className="app-content">
                <div className="page-header-card">
                  <p className="eyebrow">Agents</p>
                  <h1>Sales Agent Management</h1>
                  <p className="page-subtitle">
                    Manage your sales agents: add new, review existing, and open each profile for more details.
                  </p>
                </div>

                <div className="section-card">
                  <div className="section-card-header">
                    <h3 className="panel-title">Sales Agent List</h3>
                    <p className="panel-subtitle">
                      Manage the active agents available in your CRM workspace.
                    </p>
                  </div>

                  <div className="list-group">
                    {agents.map((d) => (
                      <div className="agent-row" key={d._id}>
                        <div className="agent-card">
                          <Link
                            className="removeLine agent-name"
                            to={`/salesagentview/${d._id}`}
                          >
                            {d.name}
                          </Link>
                        </div>

                        <div className="agent-card">{d.email}</div>
                      </div>
                    ))}
                  </div>

                  <Link to="/addnewsalesagent">
                    <button className="addButton">Add new Agent</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesAgentManagementScreen;