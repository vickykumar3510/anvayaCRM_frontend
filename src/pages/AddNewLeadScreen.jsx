import "../App.css";
import { useContext, useState } from "react";
import SalesAgentContext from "../contexts/SalesAgentContext";
import LeadContext from "../contexts/LeadContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const AddNewLeadScreen = () => {
  const { agents, loading } = useContext(SalesAgentContext);
  const { addLead } = useContext(LeadContext);

  const [newLead, setNewLead] = useState({
    name: "",
    source: "",
    salesAgent: [],
    status: "",
    priority: "",
    timeToClose: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions, (opt) => opt.value);
    setNewLead((prev) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !newLead.name ||
      !newLead.source ||
      newLead.salesAgent.length === 0 ||
      !newLead.status ||
      !newLead.priority ||
      !newLead.tags.length ||
      !newLead.timeToClose
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await addLead({
        ...newLead,
        timeToClose: Number(newLead.timeToClose),
      });

      toast.success("Lead created successfully");

      setNewLead({
        name: "",
        source: "",
        salesAgent: [],
        status: "",
        priority: "",
        timeToClose: "",
        tags: [],
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating lead");
    }
  };

  return (
    <div className="page-wrapper bg-addPage">
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
                  <h1>Add New Lead</h1>
                  <p className="page-subtitle">
                    Create a new lead and assign the correct source, agents, priority, status, and tags.
                  </p>
                </div>

                <div className="section-card">
                  <div className="section-card-header">
                    <h3 className="panel-title">Lead Information</h3>
                    <p className="panel-subtitle">
                      Fill in the required fields below to create a new lead record.
                    </p>
                  </div>

                  <form className="form-grid" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <label>Lead Name:</label>
                      <input
                        type="text"
                        className="input-wide"
                        name="name"
                        value={newLead.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <label>Lead Source:</label>
                      <select
                        name="source"
                        className="input-wide"
                        value={newLead.source}
                        onChange={handleChange}
                      >
                        <option value="">Select Source</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Cold Call">Cold Call</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Email">Email</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label>Sales Agent:</label>
                      <select
                        name="salesAgent"
                        className="input-wide"
                        multiple
                        value={newLead.salesAgent}
                        onChange={handleMultiSelect}
                      >
                        {!loading &&
                          agents.map((a) => (
                            <option key={a._id} value={a._id}>
                              {a.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-row">
                      <label>Lead Status:</label>
                      <select
                        name="status"
                        className="input-wide"
                        value={newLead.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label>Priority:</label>
                      <select
                        name="priority"
                        className="input-wide"
                        value={newLead.priority}
                        onChange={handleChange}
                      >
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label>Time to Close (days):</label>
                      <input
                        type="number"
                        className="input-wide"
                        name="timeToClose"
                        value={newLead.timeToClose}
                        onChange={handleChange}
                        placeholder="number of days"
                      />
                    </div>

                    <div className="form-row">
                      <label>Tags:</label>
                      <select
                        name="tags"
                        className="input-wide"
                        multiple
                        value={newLead.tags}
                        onChange={handleMultiSelect}
                      >
                        <option value="High Value">High Value</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Potential Deal">Potential Deal</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Closed Won">Closed Won</option>
                      </select>
                    </div>

                    <button type="submit" className="addButton">
                      Create Lead
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddNewLeadScreen;