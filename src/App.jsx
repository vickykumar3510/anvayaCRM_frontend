import "./App.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LeadContext from "./contexts/LeadContext";
import Sidebar from "./components/Sidebar";

function App() {
  const { leads, loading } = useContext(LeadContext);

  const newLeads = leads.filter((d) => d.status === "New");
  const contactedLeads = leads.filter((d) => d.status === "Contacted");
  const qualifiedLeads = leads.filter((d) => d.status === "Qualified");
  const proposalSentLeads = leads.filter((d) => d.status === "Proposal Sent");
  const closedLeads = leads.filter((d) => d.status === "Closed");

  const latestFiveLeads = [...leads].slice(-5).reverse();

  return (
    <div className="page-wrapper bg-dashboard">
      <main>
        <div className="pageCenter">
          {loading && (
            <div className="loading-state" role="status" aria-live="polite">
              <p>Loading...</p>
            </div>
          )}

          <div className="container">
            <div className="app-shell">
              <Sidebar />

              <section className="app-content">
                <div className="page-header-card">
                  <p className="eyebrow">Dashboard</p>
                  <h1>Anvaya CRM Dashboard</h1>
                  <p className="page-subtitle">
                    Track leads, review status buckets, and new lead.
                  </p>
                </div>

                <div className="dashboard-grid">
                  <div className="section-card">
                    <div className="section-card-header">
                      <h3 className="panel-title">Latest 5 Leads</h3>
                    </div>

                    <div className="lead-list-stack">
                      {latestFiveLeads.map((d) => (
                        <p className="lead-card lead-name" key={d._id}>
                          {d.name}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="section-card dashboard-actions-card">
                    <div className="section-card-header">
                      <h3 className="panel-title">Quick Filters</h3>
                      <p className="panel-subtitle">
                        Open filtered lead views in one click.
                      </p>
                    </div>

                    <ul className="ulFormatting quick-filter-list">
                      <li>
                        <Link
                          to="/leadstatusview/New"
                          className="removeLine quick-filter"
                        >
                          New ({newLeads.length})
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/leadstatusview/Contacted"
                          className="removeLine quick-filter"
                        >
                          Contacted ({contactedLeads.length})
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/leadstatusview/Qualified"
                          className="removeLine quick-filter"
                        >
                          Qualified ({qualifiedLeads.length})
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/leadstatusview/Proposal Sent"
                          className="removeLine quick-filter"
                        >
                          Proposal Sent ({proposalSentLeads.length})
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/leadstatusview/Closed"
                          className="removeLine quick-filter"
                        >
                          Closed ({closedLeads.length})
                        </Link>
                      </li>
                    </ul>

                    <Link to="/addnewleadscreen">
                      <button className="addButton">Add New Lead</button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;