import "../App.css";
import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";
import Sidebar from "../components/Sidebar";

const LeadStatusView = () => {
  const { status } = useParams();
  const { leads, loading } = useContext(LeadContext);

  const leadAgent = [
    ...new Set(
      leads.map((l) => {
        if (Array.isArray(l.salesAgent)) {
          return l.salesAgent[0]?.name || "Unassigned";
        }
        return l.salesAgent?.name || "Unassigned";
      })
    ),
  ];

  const [agent, setAgent] = useState("");
  const [priority, setPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handlerAgent = (e) => setAgent(e.target.value);
  const handlePriority = (e) => setPriority(e.target.value);
  const handleSort = (e) => setSortOrder(e.target.value);

  const filteredLeads = leads.filter((lead) => {
    const statusMatch = lead.status === status;

    const leadAgentName = Array.isArray(lead.salesAgent)
      ? lead.salesAgent[0]?.name
      : lead.salesAgent?.name;

    const agentMatch = agent ? leadAgentName === agent : true;
    const priorityMatch = priority ? lead.priority === priority : true;

    return statusMatch && agentMatch && priorityMatch;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.timeToClose - b.timeToClose;
    }
    if (sortOrder === "desc") {
      return b.timeToClose - a.timeToClose;
    }
    return 0;
  });

  return (
    <div className="page-wrapper bg-leadByStatus">
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

              <div className="app-content">
                <div className="page-header-card">
                  <p className="eyebrow">Leads</p>
                  <h1>Leads by Status</h1>
                  <p className="page-subtitle">
                    Review all leads for the selected status and narrow them by agent, priority, or time to close.
                  </p>
                </div>

                <div className="section-card">
                  <div className="section-card-header">
                    <h3 className="panel-title">Lead List by Status</h3>
                    <div className="status-inline">
                      <span className="status-label">Status:</span>
                      <span className="status-pill">{status}</span>
                    </div>
                  </div>

                  {sortedLeads.length === 0 ? (
                    <p>No leads match the selected filters.</p>
                  ) : (
                    <div className="list-group">
                      {sortedLeads.map((l) => (
                        <div className="lead-card" key={l._id}>
                          <p>
                            <span className="lead-name">{l.name}</span> -{" "}
                            <span style={{ color: "gray" }}>Sales Agent:</span>{" "}
                            {Array.isArray(l.salesAgent)
                              ? l.salesAgent[0]?.name
                              : l.salesAgent?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="section-card" style={{ marginTop: "20px" }}>
                  <div className="section-card-header">
                    <h3 className="panel-title">Filters and Sorting</h3>
                    <p className="panel-subtitle">
                      Use the controls below to filter by agent or priority and change the sorting order.
                    </p>
                  </div>

                  <div className="filters-grid">
                    <div className="filter-group">
                      <p>Filter by Agent</p>
                      <select className="input-wide" value={agent} onChange={handlerAgent}>
                        <option value="">All Agents</option>
                        {leadAgent.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="filter-group">
                      <p>Filter by Priority</p>
                      <select className="input-wide" value={priority} onChange={handlePriority}>
                        <option value="">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="filter-group">
                      <p>Sort by Time to Close</p>
                      <select className="input-wide selectDiv" value={sortOrder} onChange={handleSort}>
                        <option value="">Default</option>
                        <option value="asc">Time to Close (Low → High)</option>
                        <option value="desc">Time to Close (High → Low)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeadStatusView;