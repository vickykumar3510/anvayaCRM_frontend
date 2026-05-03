# Anvaya

A full-stack CRM application designed to track leads, manage them by assigned agents and status, and generate reports that provide clear insights into lead progress and overall business performance.

Built with a React frontend, Express/Node backend, MongoDB databases.

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
**Home**
- Display latest lead names
- Buttons and links to view Leads by Status
- "Add New Lead" button available
- Sidebar navigation to all pages

**Leads**
- Displays all Leads with Status and Sales Agent names
- Filters available: Status, Sales Agent, Tags, Lead Source
- "Sort by Priority" and "Sort by Time to Close" options provided
- "Add New Lead" button available

**Add New Lead**
- A form is provided to add a new Lead

**Lead by Status**
- Displays all Leads grouped by Status with Sales Agent names
- Agents and Priority filters available
- "Sort by Time to Close" dropdown provided

**Sales Agent Management**
- Displays all Sales Agents with their email IDs
- "Add New Sales Agent" button available

**Add New Sales Agent**
- A form is provided to create a new Sales Agent

**Reports**
- Overview provided with pie charts and bar diagrams
- Includes: Total Leads Closed and in Pipeline, Leads Closed by Sales Agent, Lead Status Distribution

**Lead Management**
- Detailed information about a specific Lead displayed
- "Edit Lead" button available
- Comments feature allows Sales Agents to update status via text
- Filter Comments by Sales Agent dropdown provided

**Edit Lead Page**
- A form is provided to update Lead details with the latest status

**Leads by Sales Agent**
- Displays all Leads assigned to a Sales Agent with their Status
- Filters available: Status and Priority
- "Sort by Time to Close" option provided

**Settings**
- Displays all Leads and Sales Agents with delete options

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