import "../App.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";
import Sidebar from "../components/Sidebar";

const LeadListScreen = () => {
  const { leads, loading } = useContext(LeadContext);

  const leadStatus = [...new Set(leads.map((l) => l.status))];
  const leadAgent = [
    ...new Set(
      leads.map((d) => {
        if (Array.isArray(d.salesAgent))
          return d.salesAgent[0]?.name || "Unassigned";
        return d.salesAgent?.name || "Unassigned";
      })
    ),
  ];
  const leadTags = [
    ...new Set(
      leads
        .flatMap((l) => l.tags || [])
        .map((tag) => tag.trim())
        .filter(Boolean)
    ),
  ];
  const leadSource = [...new Set(leads.map((le) => le.source))];

  const [status, setStatus] = useState("");
  const [agent, setAgent] = useState("");
  const [tags, setTags] = useState("");
  const [source, setSource] = useState("");

  const [prioritySort, setPrioritySort] = useState("");
  const [timeSort, setTimeSort] = useState("");

  const handlerStatus = (e) => setStatus(e.target.value);
  const handlerAgent = (e) => setAgent(e.target.value);
  const handlerTags = (e) => setTags(e.target.value);
  const handlerSource = (e) => setSource(e.target.value);

  const togglePrioritySort = () => {
    setPrioritySort((prev) => (prev === "asc" ? "desc" : "asc"));
    setTimeSort("");
  };

  const toggleTimeSort = () => {
    setTimeSort((prev) => (prev === "asc" ? "desc" : "asc"));
    setPrioritySort("");
  };

  const filteredLeads = leads.filter((lead) => {
    const agentName = Array.isArray(lead.salesAgent)
      ? lead.salesAgent[0]?.name
      : lead.salesAgent?.name;

    return (
      (!status || lead.status === status) &&
      (!agent || agentName === agent) &&
      (!tags || lead.tags?.includes(tags)) &&
      (!source || lead.source === source)
    );
  });

  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (prioritySort) {
      return prioritySort === "asc"
        ? priorityOrder[b.priority] - priorityOrder[a.priority]
        : priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (timeSort) {
      return timeSort === "asc"
        ? a.timeToClose - b.timeToClose
        : b.timeToClose - a.timeToClose;
    }

    return 0;
  });

  return (
    <div className="page-wrapper bg-leadList">
      <main>
        <div className="pageCenter">
          {loading && <p>Loading...</p>}

          <div className="container">
            <div className="app-shell">
              <Sidebar />

              <section className="app-content">
                <div className="page-header-card">
                  <p className="eyebrow">Leads</p>
                  <h1>Lead List</h1>
                  <p className="page-subtitle">
                    Review all leads, apply filters, and sort records for faster
                    CRM management.
                  </p>
                </div>

                <div className="dashboard-grid lead-list-grid">
                  <div className="section-card lead-list-main-card">
                    <div className="section-card-header">
                      <h3 className="panel-title">Lead Overview</h3>
                      <p className="panel-subtitle">
                        Browse the current leads and open any record for details.
                      </p>
                    </div>

                    <div className="list-group">
                      {sortedLeads.map((d) => {
                        const agentName = Array.isArray(d.salesAgent)
                          ? d.salesAgent[0]?.name || "Unassigned"
                          : d.salesAgent?.name || "Unassigned";

                        return (
                          <div className="lead-row" key={d._id}>
                            <div className="lead-card">
                              <Link
                                className="removeLine lead-name-listScreen"
                                to={`/leadmanagementscreen/${d._id}`}
                              >
                                {d.name}
                              </Link>
                            </div>

                            <div
                              className="lead-card status-pill status-pill-danger"
                              style={{ color: "red" }}
                            >
                              {d.status}
                            </div>

                            <div
                              className="lead-card status-pill status-pill-success"
                              style={{ color: "green" }}
                            >
                              {agentName}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="section-card filter-card">
                    <div className="section-card-header">
                      <h3 className="panel-title">Filters</h3>
                      <p className="panel-subtitle">
                        Narrow the list by status, agent, tags, and source.
                      </p>
                    </div>

                    <div className="filters-grid">
                      <div className="filter-group">
                        <p>Status:</p>
                        <select
                          className="selectDiv"
                          value={status}
                          onChange={handlerStatus}
                        >
                          <option value="">All</option>
                          {leadStatus.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="filter-group">
                        <p>Sales Agent:</p>
                        <select
                          className="selectDiv"
                          value={agent}
                          onChange={handlerAgent}
                        >
                          <option value="">All</option>
                          {leadAgent.map((de) => (
                            <option key={de} value={de}>
                              {de}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="filter-group">
                        <p>Tags:</p>
                        <select
                          className="selectDiv"
                          value={tags}
                          onChange={handlerTags}
                        >
                          <option value="">All</option>
                          {leadTags.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="filter-group">
                        <p>Lead Source:</p>
                        <select
                          className="selectDiv"
                          value={source}
                          onChange={handlerSource}
                        >
                          <option value="">All</option>
                          {leadSource.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="section-card dashboard-actions-card">
                    <div className="section-card-header">
                      <h3 className="panel-title">Sort and Actions</h3>
                      <p className="panel-subtitle">
                        Reorder the list or create a new lead entry.
                      </p>
                    </div>

                    <div className="action-row">
                      <button className="smallButton" onClick={togglePrioritySort}>
                        Priority{" "}
                        {prioritySort === "asc"
                          ? "⬆"
                          : prioritySort === "desc"
                          ? "⬇"
                          : ""}
                      </button>

                      <button className="smallButton" onClick={toggleTimeSort}>
                        Time to Close{" "}
                        {timeSort === "asc"
                          ? "⬆"
                          : timeSort === "desc"
                          ? "⬇"
                          : ""}
                      </button>

                      <Link to="/addnewleadscreen">
                        <button className="addButton">Add New Lead</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeadListScreen;