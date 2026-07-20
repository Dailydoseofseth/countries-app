-------------------------------------
🧩 SQL ↔️ EXPRESS API MATCHING WORKSHEET
---

---

It's time to build your own API for your full-stack Countries App!

So far, you've already deployed your database and wrote SQL commands to interact with your database directly.

Now, you’ll connect those same SQL commands to the corresponding API endpoints.

This will help you pseudo-code before you start coding your Countries API!

Your task: Match your SQL code to each API endpoint.

---

## 📁 STEP 1: FIND YOUR DB FIDDLE

Paste the link to your "Countries App SQL" DB Fiddle below.
If you're having trouble finding it, try checking your submission to assignment titled "Countries App — Version 3 — Milestone: Create SQL Database Schema"

🔗 My Countries App SQL DB Fiddle Link: \_**\_ https://www.db-fiddle.com/f/hnqejaf8wLzo5ASpFzB8YG/28 \_\_**

---

## 📁 STEP 2: MATCH YOUR SQL TO API ENDPOINTS

For each API endpoint below:
1️⃣ Find the SQL command in your DB Fiddle that performs the same action.
2️⃣ Copy and paste YOUR SQL command under that endpoint️.
3️⃣ Identify the dynamic values ($1, $2, etc.) your helper function will use in your SQL command.

---

## 📊 EXAMPLE

Here's an example of how you'd fill out this pseudo-coding template for an example endpoint.

🔹 POST /update-one-animal-name

- Description: Retrieves the most recently added user.
  Your SQL command:
  UPDATE animals SET name = $1 WHERE id = $2

---

# **_📊 USERS_**

---

🔹 GET /get-newest-user

- Description: Retrieves the most recently added user.
  Your SQL command:

> SELECT \* FROM users
> ORDER BY user_id DESC
> LIMIT 1;

---

🔹 GET /get-all-users

- Description: Retrieves all users from the database.  
  Your SQL command:

> SELECT \* FROM users;

---

🔹 POST /add-one-user

- Description: Adds/INSERT INTO a/ONE new user to the database.  
  Your SQL command:

> INSERT INTO users (name, country_name, email, bio)
> VALUES ($1, $2, $3, $4);

---

---

# **_📊 SAVED COUNTRIES_**

---

🔹 GET /get-all-saved-countries

- Description: Retrieves a list of all saved countries.  
  Your SQL command:

> SELECT country_name FROM saved_countries;

---

🔹 POST /save-one-country

- Description: Saves a country if it hasn’t already been saved.  
  Your SQL command:

> INSERT INTO saved_countries (country_name)
> VALUES ($1)
> ON CONFLICT (country_name)
> DO NOTHING;

---

🔹 POST /unsave-one-country

- Description: Unsaves a country if it has been saved.  
  Your SQL command:

> DELETE FROM saved_countries
> WHERE country_name = $1;

---

---

# **_📊 COUNTRY COUNTS_**

---

🔹 POST /update-one-country-count

- Description: Updates (or initializes) the view count for a country.  
  Your SQL command:

> NSERT INTO country_counts (country_name, count)
> VALUES ($1, 1)
> ON CONFLICT (country_name)
> DO UPDATE
> SET count = country_counts.count + 1
> RETURNING count;

---
