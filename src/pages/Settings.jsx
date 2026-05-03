import "../App.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";
import SalesAgentContext from "../contexts/SalesAgentContext";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const { leads, setLeads, loading } = useContext(LeadContext);
  const { agents, setAgents } = useContext(SalesAgentContext);

  const handleDeleteLead = async (id) => {
    try {
      const res = await fetch(`https://major-project2-backend-xi.vercel.app/leads/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((lead) => lead._id !== id));
        toast.success("Lead Deleted successfully.");
      }
    } catch (error) {
      console.log("Failed to delete Lead", error);
      toast.error("Failed to delete Lead.");
    }
  };

  const handleDeleteAgent = async (id) => {
    try {
      const res = await fetch(`https://major-project2-backend-xi.vercel.app/agents/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAgents((prev) => prev.filter((agent) => agent._id !== id));
        toast.success("Agent Deleted successfully.");
      }
    } catch (error) {
      console.log("Failed to delete Agent", error);
      toast.error("Failed to delete Agent.");
    }
  };

  return (
    <div className="page-wrapper bg-SettingsPage">
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
                  <p className="eyebrow">Settings</p>
                  <h1>Delete Leads or Agents</h1>
                  <p className="page-subtitle">
                    Manage cleanup actions for leads and sales agents from one place.
                  </p>
                </div>

                <div className="flexTwoboxes">
                  <div className="section-card">
                    <div className="section-card-header">
                      <h3 className="panel-title">All Leads</h3>
                      <p className="panel-subtitle">
                        Remove leads that are no longer needed in the system.
                      </p>
                    </div>

                    <div className="list-group">
                      {leads.map((l) => (
                        <div className="settings-row" key={l._id}>
                          <span className="settings-row-name">{l.name}</span>
                          <button
                            className="deleteBtn"
                            onClick={() => handleDeleteLead(l._id)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="section-card">
                    <div className="section-card-header">
                      <h3 className="panel-title">All Agents</h3>
                      <p className="panel-subtitle">
                        Remove agent records from your CRM workspace.
                      </p>
                    </div>

                    <div className="list-group">
                      {agents.map((a) => (
                        <div
                          className="settings-row settings-row-agent"
                          key={a._id}
                        >
                          <span className="settings-row-name">{a.name}</span>
                          <button
                            className="deleteBtn"
                            onClick={() => handleDeleteAgent(a._id)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <Link to="/" className="removeLine">
                    <button className="smallButton">Back to Dashboard</button>
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

export default Settings;