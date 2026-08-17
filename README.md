# 📝 Countries API App

## 📌 Project Description & Purpose

The Countries API App is a full-stack web application that allows users to explore countries from around the world, view detailed information about each country, and save their favorite countries to a PostgreSQL database. The project was built to practice creating a complete application using React, Express, PostgreSQL, and REST API endpoints while connecting a frontend to a custom backend.

---

---

## 🚀 Live Site

**Live App:** https://countries-language-edition.netlify.app/

https://countries-app-unity.netlify.app/

---

---

## 🖼️ Screenshots

### Home Page
<img width="1280" height="800" alt="Screenshot 2026-07-29 at 2 11 12 PM" src="https://github.com/user-attachments/assets/747019e6-2ab2-4d8a-b0b8-0bbf46c082e3" />


### Saved Countries Page
<img width="1280" height="800" alt="Screenshot 2026-07-29 at 2 03 37 PM" src="https://github.com/user-attachments/assets/32cf705f-74be-4447-8da8-794796930bd9" />

### Country Details Page
<img width="1280" height="800" alt="Screenshot 2026-07-29 at 2 13 27 PM" src="https://github.com/user-attachments/assets/2349665e-83e3-4ea6-a2a0-66bb6ab94790" />


<details>
<summary>Click me ㊙🕵</summary>

# Hidden content. Hmm... What to add here?
_Add a screenshot of your application here after deploying._

Instructions to include a screenshot into your README:

1. Press **Command + Control + Shift + 4** to capture your app.
2. Open your repository on GitHub.
3. Edit the **README.md** by clicking the ✏️ pencil icon.
4. Paste the screenshot directly into the editor.
5. Commit your changes.

</details>

---

---

## ✨ Features

### _This is what you can do on the app!_

_Users can:_

- 🌎🌏 Browse a collection of countries.
- 📄👀 View detailed information about each country.
- ❤️❤️ Save favorite countries to a PostgreSQL database.
- 🔄🔙 Retrieve previously saved countries from the backend.
- 🌐🈂️ Switch the UI language between English, Vietnamese, and Traditional Chinese (country data itself stays in English).

---

---

## 🛠️ Tech Stack

### Frontend

- **Languages:** HTML, CSS, JavaScript
- **Framework:** React + Vite
- **Deployment:** Netlify

### Server / API

- **Languages:** JavaScript (Node.js)
- **Framework:** Express.js
- **Deployment:** Render

### Database

- **Database:** PostgreSQL
- **Hosting:** Neon

---

---

## 🔹 API Documentation

These are the API endpoints I built:

1. `GET /get-all-users`
2. `GET /get-newest-user`
3. `POST /add-one-user`
4. `GET /get-all-saved-countries`
5. `POST /save-one-country`
6. `POST /unsave-one-country`
7. `POST /update-one-country-count`

> Additional endpoints, IN THE FUTURE, may include:

- `GET /`
- `GET /health`
- `GET /currency`
- `...`

**API Base URL:**

https://countries-app-unity-v4.onrender.com

---

---

<br>

## 🗄️ Database Schema

```text
├── Schema Definition
 ├── Table names
 ├── Columns
 ├── Data types
 └── Constraints
```

```sql
CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
name VARCHAR NOT NULL,
country_name VARCHAR NOT NULL,
email VARCHAR UNIQUE NOT NULL,
bio VARCHAR
);

INSERT INTO users (name, country_name, email, bio)
VALUES
  ('Tommy', 'Taiwan', 'blahbadee@blah.bh', 'meh meh meh' ),
  ('Duyen', 'Vietnam', 'UmiSaid@YeuEm.vn', 'believe me i can fly'),
  ('Tee', 'Cambodia', 'weshallmeetagain@oldfriend.cb', 'I am thriving just as my country is now!');
```

```sql
CREATE TABLE saved_countries (
saved_country_id SERIAL PRIMARY KEY,
country_name VARCHAR NOT NULL UNIQUE
);

INSERT INTO saved_countries (country_name)
VALUES
('Ethiopia'),
('Brazil'),
('Mexico');
```

```sql
CREATE TABLE country_counts (
country_count_id SERIAL PRIMARY KEY,
country_name VARCHAR NOT NULL UNIQUE,
count INTEGER NOT NULL
);

INSERT INTO country_counts (country_name, count)
VALUES
  ('Ethiopia', 1),
  ('Brazil', 1),
  ('Mexico', 1);
```

---

---

<br>
<br>

# 💭 Reflections

### What I learned

This project helped me understand HOW data flows THROUGH a full-stack application. I gained experience building Express API endpoints, CONNECTING a React frontend TO a backend, WORKINGN WITH PostgreSQL databases, DEPLOYING multiple services, AND TROUBLESHOOTING/DEBUG deployment issues across Netlify, Render, and Neon.

### What I'm proud of

I'm proud that I successfully built and deployed a complete full-stack application with my own backend API and database. Seeing the frontend, backend, and database all communicate correctly was a major milestone & so satisfying!

### What challenged me

Deployment was the biggest challenge. I learned how to troubleshoot environment variables, proxy settings, build paths, database connections, and deployment configurations across multiple platforms.

### Future ideas

1. Add user authentication.
2. Allow users to remove countries from their saved list.
3. Add search, filtering, and more/other sorting options for countries.

---

---

<br>

## 🙌 Credits & Shoutouts

- AnnieCannons curriculum and instructors
  > - 'Sir Philliam the Wise'
  > - the "Nuclear Nine"
- React Documentation
- Express Documentation
- PostgreSQL Documentation
- Neon Database
- Render
- Netlify
- REST Countries API
  > - Vietnamese Coffee... DAILY
  > - DEV/DEBUG TOOLS!! lol
  > - myself 💪🥹

---

---

<br>
<details>
<summary>Click me ㊙🕵</summary>
 
# Hidden content. Hmm... What to add here?

I am going to really miss this time in life...

</details>
