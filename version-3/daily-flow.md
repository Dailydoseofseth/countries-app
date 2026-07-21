# **MY MAIN - THE INITIAL SETUP FLOW**

> git clone <your-fork>

> git remote add upstream <team-repo>

> git fetch upstream

> git checkout main

> git merge upstream/main

> git push origin main

> git switch -c seth

> git push -u origin seth

---

---

## **_DAILY MORNING FLOW_**

> git checkout main

> git fetch upstream

> git merge upstream/main

> git push origin main

> git checkout seth

> git merge main



---
---
## **_DATA FLOW_**

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