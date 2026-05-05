# Anvaya

A full‑stack CRM application that helps users track and manage leads effortlessly. Leads can be assigned to agents, monitored by status, and organized with tags and priorities — all in one place. The system generates clear reports to provide insights into lead progress and overall business performance.

## Demo Link

[Live Demo](https://anvaya-app.vercel.app/) 

## Quick Start

```
git clone https://github.com/vickykumar3510/anvayaCRM_frontend.git
cd <anvayaCRM_frontend>
npm install
npm run dev
```
## Technologies
- React JS
- React Router
- Node JS
- Express
- MongoDB

## Demo Video
Watch a walkthrough of all the major features of this app: [Google Drive Link](https://drive.google.com/drive/folders/1zyp1T-NHZIX2T3y74WWfJKo9ZL7bEU4t?usp=sharing)

## Features
**Dashboard**
- Displays latest 5 leads for quick visibility
- Quick filters to view leads by status
- Shows count of leads in each status bucket
- Option to add a new lead directly from dashboard
- Sidebar navigation included on all the pages

**Leads**
- Displays all leads with quick access to details
- Filters by status, sales agent, tags, and source
- Sorting options by priority or time to close
- Shows lead name, status, and assigned agent in list view
- Direct link to open individual lead management screen
- Option to add a new lead entry

**Add New Lead**
- Form to create a new lead with required fields
- Multi‑select for assigning multiple sales agents and tagging leads with categories
- Validates required fields before submission
- Success and error notifications via toast messages
- Resets form after successful lead creation

**Lead by Status**
- Displays all leads filtered by a selected status
- Shows lead name and assigned sales agent in list view
- Filters by agent and priority for refined results
- Sorting options by time to close (ascending or descending)
- Clear status indicator displayed at the top of the page

**Sales Agent Management**
- Displays all active sales agents with name and emai
- Direct link to open individual agent profile view
- Option to add a new sales agent

**Add New Sales Agent**
- Form to create a new sales agent profile 
- Validates required fields before submission
- Success and error notifications via toast messages
- Resets form after successful agent creation

**Reports**
- Visualizes overall pipeline health (open vs. closed leads) with pie chart
- Displays leads closed by each sales agent using bar chart
- Shows lead status distribution across categories with pie chart
- Fetches live report data from backend APIs (/report/pipeline, /report/agent-closures, /report/status-distribution)
- Error handling with clear messages if data fails to load

**Lead Management**
- Displays full lead details
- Edit mode to update lead information with validation
- Add new comments with author selection and text input
- Filter comments by agent for focused review
- Shows comment history with author name and timestamp
- Success and error notifications via toast messages

**Leads by Sales Agent**
- Displays all leads assigned to a specific sales agent
- Shows lead name and current status in list view
- Filters by lead status and priority for refined results
- Sorting option by time to close (ascending/descending)
- Clear agent name displayed at the top of the page

**Settings**
- Manage cleanup actions for leads and agents from one place
- Displays all leads and agents with option to delete individually
- Success and error notifications via toast messages
- Quick navigation back to dashboard via button

##API Reference
--
**GET/api/leads**<br>
List of all leads<br>

Sample Response:
```
[{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt, __v }]
```

**GET/api/agents**<br>
List of all Sales Agents<br>

Sample Response:

```
[{ _id, name, email, createdAt, __v }]
```

**GET/api/leads/:id/comments**<br>
List of all comments on a lead<br>

Sample Response:

```
[{ id, commentText, author, createdAt }]
```

**GET/api/report/pipeline**<br>
Number of total leads in pipeline and total closed leads<br>

Sample Response:

```
[{ totalLeadsInPipeline, totalLeadsClosed }]
```

**GET/api/report/agent-closures**<br>
Number of leads closed by sales agents<br>

Sample Response:

```
[{ labels, counts }]
```

**GET/api/report/status-distribution**<br>
Report of lead status distribution<br>

Sample Response:

```
[{ labels, counts }]
```

**PUT/api/leads/:id**<br>
Update a lead<br>

Sample Response:

```
[{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt, __v }]
```

**DELETE/api/leads/:id**<br>
Delete a lead<br>

Sample Response:

```
[{ message }]
```

**DELETE/api/agents/:id**<br>
Delete an agent<br>

Sample Response:

```
[{ message }]
```

**POST/api/agents**<br>
For add a Sales Agent<br>
```
[{ _id, name, email, createdAt, __v }]
```

**POST/api/leads**<br>
For create a Lead<br>
```
[{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt, __v }]
```

**POST/api/leads/:id/comments**<br>
For add a comment on a lead<br>
```
[{ id, commentText, author, createdAt }]
```

##Contact 
--
For bugs or feature requests, please reach out to vicky.kumar3510@gmail.com