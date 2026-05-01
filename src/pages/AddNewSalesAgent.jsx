import "../App.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SalesAgentContext from "../contexts/SalesAgentContext";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const AddNewSalesAgent = () => {
  const { addAgent } = useContext(SalesAgentContext);

  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newAgent.name || !newAgent.email) {
      toast.error("Please fill in both name and email.");
      return;
    }

    try {
      await addAgent(newAgent);

      toast.success("New Agent added.");

      setNewAgent({
        name: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating new agent.");
    }
  };

  return (
    <div className="page-wrapper bg-addPage">
      <main>
        <div className="pageCenter">
          <div className="container">
            <div className="app-shell">
              <Sidebar />

              <div className="app-content">
                <div className="page-header-card">
                  <p className="eyebrow">Agents</p>
                  <h1>Add New Sales Agent</h1>
                  <p className="page-subtitle">
                    Create a new sales agent profile for your CRM workspace.
                  </p>
                </div>

                <div className="section-card">
                  <div className="section-card-header">
                    <h3 className="panel-title">Agent Information</h3>
                    <p className="panel-subtitle">
                      Enter the required details below to add a new sales agent.
                    </p>
                  </div>

                  <form className="form-grid" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <label htmlFor="name">Agent Name:</label>
                      <input
                        type="text"
                        className="input-wide"
                        name="name"
                        value={newAgent.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <label htmlFor="email">Email address:</label>
                      <input
                        type="email"
                        className="input-wide"
                        name="email"
                        value={newAgent.email}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="addButton">
                      Create Agent
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

export default AddNewSalesAgent;