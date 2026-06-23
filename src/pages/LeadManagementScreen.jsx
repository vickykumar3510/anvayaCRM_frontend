import "../App.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";
import SalesAgentContext from "../contexts/SalesAgentContext";
import CommentContext from "../contexts/CommentsContext";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const TAG_OPTIONS = [
  "High Value",
  "Follow-up",
  "Potential Deal",
  "Proposal Sent",
  "Negotiation",
  "Closed Won",
];

const getSalesAgentIds = (salesAgent) => {
  if (Array.isArray(salesAgent)) {
    return salesAgent.map((a) => (typeof a === "object" ? a._id : a)).filter(Boolean);
  }
  if (salesAgent?._id) return [salesAgent._id];
  if (typeof salesAgent === "string") return [salesAgent];
  return [];
};

const getSalesAgentNames = (salesAgent) => {
  if (Array.isArray(salesAgent)) {
    const names = salesAgent.map((a) => (typeof a === "object" ? a.name : null)).filter(Boolean);
    return names.length ? names.join(", ") : "Unassigned";
  }
  return salesAgent?.name || "Unassigned";
};

const LeadManagementScreen = () => {
  const { leadId } = useParams();
  const { leads, loading, updateLead } = useContext(LeadContext);
  const { agents } = useContext(SalesAgentContext);
  const {
    comments,
    addComment,
    loading: commentsLoading,
  } = useContext(CommentContext);

  const lead = leads.find((l) => l._id === leadId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [filterAgent, setFilterAgent] = useState("");

  if (loading || !leads.length)
    return (
      <div className="loading-state" role="status" aria-live="polite">
        <p>Loading...</p>
      </div>
    );
  if (!lead) return <p>Lead not found</p>;

  const handleEditClick = () => {
    setFormData({
      name: lead.name,
      source: lead.source,
      status: lead.status,
      priority: lead.priority,
      tags: lead.tags || [],
      timeToClose: lead.timeToClose,
      salesAgent: getSalesAgentIds(lead.salesAgent),
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayValue = (field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const handleUpdate = async () => {
    try {
      if (
        !formData.name ||
        !formData.source ||
        formData.salesAgent.length === 0 ||
        !formData.status ||
        !formData.priority ||
        !formData.tags.length ||
        !formData.timeToClose ||
        Number(formData.timeToClose) < 1
      ) {
        toast.error("Please fill all required fields");
        return;
      }
      const updatedData = { ...formData, timeToClose: Number(formData.timeToClose) };
      await updateLead(leadId, updatedData);
      setIsEditing(false);
      toast.success("Lead updated successfully");
    } catch (error) {
      toast.error("Failed to update lead");
    }
  };

  const handleAddComment = () => {
    if (!newComment || !commentAuthor) {
      toast.error("Please enter comment and select author");
      return;
    }
    addComment(newComment, commentAuthor);
    setNewComment("");
  };

  const displayedComments = filterAgent
    ? comments.filter((c) => c.author === agents.find((a) => a._id === filterAgent)?.name)
    : comments;

  return (
    <div className="page-wrapper bg-leadManagement">
      <main>
        <div className="pageCenter">
          <div className="container">
            <div className="app-shell">
              <Sidebar />

              <div className="app-content">
                <div className="page-header-card">
                  <p className="eyebrow">CRM</p>
                  <h1>Lead Management: <span className="lead-name-color">{lead.name}</span></h1>
                </div>

                <div className="section-card">
                  <div className="section-card-header">
                    <h3 className="panel-title">Lead Details</h3>
                  </div>

                  {!isEditing ? (
                    <div className="list-group">
                      <p><strong>Lead Name:</strong> {lead.name}</p>
                      <p><strong>Sales Agent:</strong> {getSalesAgentNames(lead.salesAgent)}</p>
                      <p><strong>Lead Source:</strong> {lead.source}</p>
                      <p><strong>Lead Status:</strong> {lead.status}</p>
                      <p><strong>Priority:</strong> {lead.priority}</p>
                      <p><strong>Time to Close(days):</strong> {lead.timeToClose}</p>
                      <p><strong>Tags:</strong> {lead.tags?.join(", ")}</p>
                      <button className="smallButton input-wide" onClick={handleEditClick}>Edit Lead</button>
                    </div>
                  ) : (
                    <div className="filters-grid">
                      <label><strong>Lead Name:</strong></label>
                      <input name="name" value={formData.name} onChange={handleChange} />
                      <label><strong>Sales Agent:</strong></label>
                      <div className="multi-select-field input-wide">
                        <p className="multi-select-hint">
                          {formData.salesAgent.length > 0
                            ? `${formData.salesAgent.length} agent${formData.salesAgent.length > 1 ? "s" : ""} selected`
                            : "Click to select one or more agents"}
                        </p>
                        <div className="chip-group">
                          {agents.length === 0 && (
                            <span className="chip-empty">No agents available</span>
                          )}
                          {agents.map((a) => (
                            <button
                              key={a._id}
                              type="button"
                              className={`chip-option${formData.salesAgent.includes(a._id) ? " chip-option--selected" : ""}`}
                              onClick={() => toggleArrayValue("salesAgent", a._id)}
                            >
                              {a.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      <label><strong>Lead Source:</strong></label>
                      <select name="source" value={formData.source} onChange={handleChange}>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Cold Call">Cold Call</option>
                        <option value="Advertisement">Advertisement</option>
                      </select>
                      <label><strong>Lead Status:</strong></label>
                      <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Closed">Closed</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                      </select>
                      <label><strong>Priority:</strong></label>
                      <select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <label><strong>Tags:</strong></label>
                      <div className="multi-select-field input-wide">
                        <p className="multi-select-hint">
                          {formData.tags.length > 0
                            ? `${formData.tags.length} tag${formData.tags.length > 1 ? "s" : ""} selected`
                            : "Click to select one or more tags"}
                        </p>
                        <div className="chip-group">
                          {TAG_OPTIONS.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              className={`chip-option${formData.tags.includes(tag) ? " chip-option--selected" : ""}`}
                              onClick={() => toggleArrayValue("tags", tag)}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                      <label><strong>Time to Close(days):</strong></label>
                      <input type="number" name="timeToClose" min="1" value={formData.timeToClose} onChange={handleChange} />
                      <div className="action-row">
                        <button className="smallButton" onClick={handleUpdate}>Save</button>
                        <button className="deleteBtn" onClick={() => setIsEditing(false)}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="section-card" style={{ marginTop: "20px" }}>
                  <h3 className="panel-title">Comments</h3>
                  <div className="filters-grid">
                    <div className="filter-group">
                      <p>Filter by Agent:</p>
                      <select
                        className="selectDiv input-wide"
                        value={filterAgent}
                        onChange={(e) => setFilterAgent(e.target.value)}
                      >
                        <option value="">All Authors</option>
                        {agents.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
                      </select>
                    </div>

                    <div className="filter-group">
                      <p>Add New Comment:</p>
                      <select
                        className="selectDiv input-wide"
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                      >
                        <option value="">Select Author</option>
                        {agents.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
                      </select>

                      <input
                        className="selectDiv input-wide"
                        type="text"
                        placeholder="Add comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />{" "}

                      <button className="submitButton" onClick={handleAddComment}>Submit</button>
                    </div>
                  </div>

                  <div className="list-group" style={{ marginTop: "10px", gap: "8px" }}>
                    {commentsLoading && <p>Loading comments...</p>}
                    {!commentsLoading && displayedComments.length === 0 && <p>No comments yet</p>}

                    {displayedComments.map((c) => (
                      <div
                        key={c.id}
                        className="agent-card"
                        style={{ padding: "10px 14px", marginBottom: "8px" }}
                      >
                        <p style={{ margin: 0 }}>
                          {c.commentText} — <strong>{c.author}</strong>{" "}
                          <span style={{ color: "gray", fontSize: "0.9em" }}>
                            (
                            {new Date(c.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                            )
                          </span>
                        </p>
                      </div>
                    ))}
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

export default LeadManagementScreen;