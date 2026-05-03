import { Pie, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import Sidebar from "../components/Sidebar";

const ReportScreen = () => {
  const [pipelineCount, setPipelineCount] = useState(null);
  const [closedCount, setClosedCount] = useState(null);
  const [agentLabels, setAgentLabels] = useState([]);
  const [agentClosedCounts, setAgentClosedCounts] = useState([]);
  const [statusLabels, setStatusLabels] = useState([]);
  const [statusCounts, setStatusCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const overallRes = await fetch("https://major-project2-backend-xi.vercel.app/report/pipeline");
        if (!overallRes.ok) throw new Error("Failed to fetch pipeline report");
        const overallData = await overallRes.json();
        setPipelineCount(overallData.totalLeadsInPipeline ?? 0);
        setClosedCount(overallData.totalLeadsClosed ?? 0);

        const agentRes = await fetch(
          "https://major-project2-backend-xi.vercel.app/report/agent-closures"
        );
        if (!agentRes.ok) throw new Error("Failed to fetch agent report");
        const agentData = await agentRes.json();
        setAgentLabels(agentData.labels ?? []);
        setAgentClosedCounts(agentData.counts ?? []);

        const statusRes = await fetch(
          "https://major-project2-backend-xi.vercel.app/report/status-distribution"
        );
        if (!statusRes.ok) {
          throw new Error("Failed to fetch status distribution");
        }
        const statusData = await statusRes.json();
        setStatusLabels(statusData.labels ?? []);
        setStatusCounts(statusData.counts ?? []);
      } catch (err) {
        console.error(err);
        setError("Error loading reports");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const baseFont = { size: 14, weight: "bold" };

  const closedVsPipelineData = {
    labels: [`Pipeline - ${pipelineCount}`, `Closed - ${closedCount}`],
    datasets: [
      {
        data: [pipelineCount ?? 0, closedCount ?? 0],
        backgroundColor: ["#0d6efd", "#198754"],
      },
    ],
  };

  const leadsByAgentData = {
    labels: agentLabels.map((name, i) => `${name} - ${agentClosedCounts[i] ?? 0}`),
    datasets: [
      {
        label: "Leads Closed",
        data: agentClosedCounts,
        backgroundColor: "#198754",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: "#000", font: baseFont } },
      y: { beginAtZero: true, ticks: { color: "#000", font: baseFont } },
    },
    plugins: {
      legend: { labels: { color: "#000", font: baseFont } },
      tooltip: { bodyFont: baseFont, titleFont: baseFont },
    },
  };

  const statusDistributionData = {
    labels: statusLabels.map((status, i) => `${status} - ${statusCounts[i] ?? 0}`),
    datasets: [
      {
        data: statusCounts,
        backgroundColor: ["#0d6efd", "#FFA500", "#198754", "#dc3545", "#0dcaf0"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { color: "#000", font: baseFont } },
      tooltip: { bodyFont: baseFont, titleFont: baseFont },
    },
  };

  return (
    <div className="page-wrapper bg-reportScreen">
      <main>
        <div className="pageCenter">
          <div className="container">
            <div className="app-shell">
              <Sidebar />

              <div className="app-content">
                <div className="page-header-card">
                  <p className="eyebrow">Reports</p>
                  <h1>Anvaya CRM Reports</h1>
                  <p className="page-subtitle">
                    Visualize lead pipeline health, agent performance, and status distribution.
                  </p>
                </div>

                <div className="section-card">
                  <div className="section-card-header">
                    <h3 className="panel-title">Report Overview</h3>
                  </div>

                  {loading && (
                    <div className="loading-state" role="status" aria-live="polite">
                      <p>Loading...</p>
                    </div>
                  )}
                  {error && <p>{error}</p>}

                  {!loading && !error && (
                    <div className="list-group">
                      <p className="chart-label"><strong>Total Leads closed and in Pipeline:</strong></p>
                      <div className="chart-container pie-chart-container">
                        <Pie data={closedVsPipelineData} options={pieOptions} />
                      </div>

                      <p className="chart-label"><strong>Leads Closed by Sales Agent:</strong></p>
                      <div className="chart-container bar-chart-container">
                        <Bar data={leadsByAgentData} options={barOptions} />
                      </div>

                      <p className="chart-label"><strong>Lead Status Distribution:</strong></p>
                      <div className="chart-container pie-chart-container">
                        <Pie data={statusDistributionData} options={pieOptions} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportScreen;