# TrackFlow

A full-stack CRM application where admins can sign up, log in securely, manage sales leads through the pipeline, assign sales agents, add comments, view analytics reports, and clean up records from settings. Built with a React (Vite) frontend, Express/Node backend, and MongoDB.

## Demo Link

[Live Demo](https://trackflow-tool.vercel.app/)

## Quick Start

```
git clone https://github.com/vickykumar3510/TrackFlowCRM_frontend.git
cd <TrackFlowCRM_frontend>
npm install
npm run dev
```
## Technologies

- React JS
- React Router
- Node JS
- Express
- MongoDB
- JWT
- bcryptjs

## Demo Video

Watch a walkthrough of all the major features of this app: [Google Drive Link]()

## Features

**Login**
- Admin login form with email and password fields
- Invalid credentials shown via toast notifications
- Successful login stores JWT in localStorage and redirects to dashboard
- Redirects to dashboard if already logged in

**Sign Up**
- Admin account creation form with name, email, and password
- Success toast shown on account creation
- Navigation link back to Sign In page
- Duplicate user error handling

**Dashboard**
- Displays latest 5 leads
- Quick filters by status: New, Contacted, Qualified, Proposal Sent, Closed (with counts)
- Shortcut to Add New Lead
- Protected route — requires authentication

**Lead List**
- View all leads in a filterable table
- Filter by status, agent, tags, and source
- Sort by priority or time to close (asc/desc)
- Navigate to individual lead detail pages

**Add New Lead**
- Create leads with name, source, status, priority, tags, time to close, and assigned agents
- Multi-select tags and sales agents
- Form validation with toast feedback

**Lead Management (Detail)**
- View full lead information
- Edit lead fields inline (status, priority, tags, agents, etc.)
- Add and view comments on a lead
- Filter comments by agent

**Leads by Status**
- View leads filtered by pipeline status (from dashboard quick filters)
- Filter by agent and priority
- Sort by time to close

**Sales Agent Management**
- List all sales agents with name and email
- Navigate to individual agent profiles
- Add new agents

**Sales Agent View**
- View leads assigned to a specific agent
- Filter by status and priority
- Sort by time to close

**Reports**
- Pipeline vs closed leads (pie chart)
- Agent closure performance (bar chart)
- Lead status distribution (bar chart)

**Settings**
- Delete leads from the system
- Delete sales agents from the system
- Toast confirmations on successful deletion

**Sidebar / Navigation**
- Dashboard, Leads, Agents, Reports, Settings
- Mobile-responsive menu
- Logout clears token and returns to login

## API Reference
---

**POST /auth/signup**<br>
Register new admin user<br>

Sample Response:
```
{ message }
```

**POST /auth/login**<br>
Login admin user<br>

Sample Response:
```
{ token }
```

**GET /leads**<br>
List all leads<br>

Sample Response:
```
[{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt, __v }]
```

**POST /leads**<br>
Create a new lead<br>

Sample Response:
```
[{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt, __v }]
```

**PUT /leads/:leadId**<br>
Update a lead<br>

Sample Response:
```
[{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt, __v }]
```

**DELETE /leads/:id**<br>
Delete a lead<br>

Sample Response:
```
{ message }
```

**GET /leads/:leadId/comments**<br>
Get comments for a lead<br>

Sample Response:
```
[{ _id, text, author, createdAt, ... }]
```

**POST /leads/:leadId/comments**<br>
Add a comment to a lead<br>

Sample Response:
```
{ _id, text, author, createdAt, ... }
```

**GET /agents**<br>
List all sales agents<br>

Sample Response:
```
[{ _id, name, email, ... }]
```

**POST /agents**<br>
Create a new sales agent<br>

Sample Response:
```
{ agent: { _id, name, email, ... } }
```

**DELETE /agents/:id**<br>
Delete a sales agent<br>

Sample Response:
```
{ message }
```

**GET /report/pipeline**<br>
Overall pipeline vs closed counts<br>

Sample Response:
```
{ totalLeadsInPipeline, totalLeadsClosed }
```

**GET /report/agent-closures**<br>
Closed leads per agent<br>

Sample Response:
```
{ labels: [], counts: [] }
```

**GET /report/status-distribution**<br>
Lead count by status<br>

Sample Response:
```
{ labels: [], counts: [] }
```

## Contact

For bugs or feature requests, please reach out to vicky.kumar3510@gmail.com
