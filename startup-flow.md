# **FULLSTACK PROJECT STARTUP FLOW**

---

# **FRONTEND STARTUP**

> npm create vite@latest client -- --template react

> cd client

> npm install

> npm install react-router-dom

```bash
> (IF DESIRED) npm install axios

> (IF DESIRED) npm install react-icons
```

> npm run dev

---

# **BACKEND STARTUP**

> cd countries-app/version-3/server

> npm install

---

## **START EXPRESS SERVER**

### Option 1 — Using package.json script

> npm run dev

### Option 2 — Direct Node Watch Mode

> node --watch index.js

---

---

<br><br>

# **BACKEND TESTING WITH POSTMAN**

After starting Express:

> Server is listening on port 3000

Open Postman:

> Create a new request

Select HTTP Method:

> GET

> POST

> PUT

> DELETE

Enter backend endpoint URL:

> http://localhost:3000/endpoint

Example:

> GET http://localhost:3000/get-all-countries

Example POST:

> POST http://localhost:3000/save-one-country

For POST requests:

> Select Body

> Select raw

> Select JSON

Example JSON body:

{
"country_name": "Japan"
}

Click:

> Send

Confirm:

> Status code is successful

> Response returns expected JSON

---

# **DATABASE CONNECTION CHECK**

Before testing API routes:

> Confirm PostgreSQL database is running

> Confirm database connection is working

> Confirm db.query() executes successfully

---

# **DAILY DEVELOPMENT TERMINALS**

## Terminal 1 — FRONTEND

> cd client

> npm run dev

---

## Terminal 2 — BACKEND

> cd countries-app/version-3/server

> node --watch index.js

---

## Terminal 3 — POSTMAN

> Test API endpoints

> Verify JSON responses

> Confirm frontend/backend communication works

---

# **VITE PROXY DATA FLOW**

React Frontend

      |
      ↓

fetch("/api/endpoint")

      |
      ↓

Vite Proxy

      |
      ↓

Express Backend (localhost:3000)

      |
      ↓

Express Route

      |
      ↓

db.query(SQL COMMAND, [dynamic values])

      |
      ↓

PostgreSQL Database

---

# **FULLSTACK DATA FLOW**

Frontend Button

      |
      ↓

React fetch() / axios Request

      |
      ↓

POST /save-one-country

      |
      ↓

Express Route

      |
      ↓

db.query(SQL COMMAND, [dynamic values])

      |
      ↓

PostgreSQL Database

      |
      ↓

Database Response

      |
      ↓

Express res.json()

      |
      ↓

React Receives JSON

      |
      ↓

setState()

      |
      ↓

UI Re-renders
