# **MY MAIN - THE INITIAL SETUP FLOW**

> git clone <your-fork>

> cd <your-fork>

> git remote add upstream <team-repo>

> git remote -v

> git fetch upstream

> git checkout main

> git merge upstream/main

> git push origin main

> git switch -c seth

> git push -u origin seth

---

---

<br><br>

---

## **_DAILY MORNING FLOW_**

> git checkout main

> git fetch upstream

> git merge upstream/main

> git push origin main

### \*_Update your working branch_\*\*\*

---

> git checkout seth

> git merge main

---

---

<br><br>

---

## **_DAILY WORK FLOW_**

git add .

git commit -m "describe your changes"

git push

---

---

<br><br>

---

## **DATA FLOW**

Frontend Button

      |
      ↓

POST /save-one-country

      |
      ↓

Express route

      |
      ↓

db.query(SQL COMMAND, [dynamic values])

      |
      ↓

PostgreSQL

---

---

<br><br>

---

# **_BEFORE PULL REQ FLOW_**

> git checkout main

> git fetch upstream

> git merge upstream/main

> git checkout seth

> git merge main

> git push origin seth

---

---

<br>

---

## **IN-DEPTH DATA FLOW**

Frontend Button

      |
      ↓

fetch() POST Request

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

res.json()

      |
      ↓

React Receives JSON

      |
      ↓

setState()

      |
      ↓

UI Re-renders
