import "../App.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";
import SalesAgentContext from "../contexts/SalesAgentContext";
import Sidebar from "../components/Sidebar";

const SalesAgent = () => {
  const { agentId } = useParams();

  const { leads } = useContext(LeadContext);
  const { loading, agents } = useContext(SalesAgentContext);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeSort, setTimeSort] = useState("");

  const handleStatus = (e) => setStatus(e.target.value);
  const handlePriority = (e) => setPriority(e.target.value);

  const toggleTimeSort = () => {
    setTimeSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const leadStatus = [...new Set(leads.map((l) => l.status))];

  const agent = agents.find((a) => a._id === agentId);

  const agentLeads = leads.filter(
    (lead) =>
      Array.isArray(lead.salesAgent) &&
      lead.salesAgent.some((agent) => agent._id === agentId)
  );

  const filteredLeads = agentLeads.filter((lead) => {
    const statusMatch = status ? lead.status === status : true;
    const priorityMatch = priority ? lead.priority === priority : true;
    return statusMatch && priorityMatch;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (timeSort === "asc") return a.timeToClose - b.timeToClose;
    if (timeSort === "desc") return b.timeToClose - a.timeToClose;
    return 0;
  });

  return (
    <div className="page-wrapper bg-salesAgentView">
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
                  <p className="eyebrow">Agents</p>
                  <h1>Leads by Sales Agent</h1>
                  <p className="page-subtitle">
                    View all leads assigned to this sales agent, then filter or sort them by status,
                    priority, and time to close.
                  </p>
                </div>

                <div className="section-card">
                  <div className="section-card-header">
                    <h3 className="panel-title">Lead List by Agent</h3>
                    <p className="panel-subtitle">
                      Sales Agent: <span className="agent-name">{agent?.name}</span>
                    </p>
                  </div>

                  {sortedLeads.length === 0 ? (
                    <p>No leads are there.</p>
                  ) : (
                    <div className="list-group">
                      {sortedLeads.map((lead) => (
                        <div className="lead-row" key={lead._id}>
                          <div className="lead-card lead-name">{lead.name}</div>
                          <div className="lead-card">{lead.status}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="section-card" style={{ marginTop: "20px" }}>
                  <div className="section-card-header">
                    <h3 className="panel-title">Filters and Sorting</h3>
                    <p className="panel-subtitle">
                      Narrow the list using the same controls already present in your page logic.
                    </p>
                  </div>

                  <div className="filters-grid">
                    <div className="filter-group">
                      <p>Filter by Status</p>
                      <select className="selectDiv" onChange={handleStatus} value={status}>
                        <option value="">All Status</option>
                        {leadStatus.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="filter-group">
                      <p>Filter by Priority</p>
                      <select className="selectDiv" onChange={handlePriority} value={priority}>
                        <option value="">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="filter-group">
                      <p>Sort by Time to Close</p>
                      <button className="submitButton" onClick={toggleTimeSort}>
                        Time to Close {timeSort === "asc" ? "⬆" : timeSort === "desc" ? "⬇" : ""}
                      </button>
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

export default SalesAgent;