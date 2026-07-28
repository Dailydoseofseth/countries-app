// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from "express";
import pg from "pg";
import config from "./config.js";

const db = new pg.Pool({
  connectionString: config.databaseUrl + "&uselibpqcompat=true",
  ssl: true,
});

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// ---------------------------------
// API Endpoints
// ---------------------------------

// -------
// USERS
// -------
app.get("/get-all-users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users;");

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to get users",
    });
  }
});

app.get("/get-newest-user", async (req, res) => {
  const result = await db.query(
    `
SELECT * FROM users
ORDER BY user_id DESC
LIMIT 1;
`,
  );

  res.json(result.rows[0]);
});

app.post("/add-one-user", async (req, res) => {
  const { name, country_name, email, bio } = req.body;

  const result = await db.query(
    `
INSERT INTO users
(name,country_name,email,bio)
VALUES($1,$2,$3,$4)
RETURNING *;
`,
    [name, country_name, email, bio],
  );

  res.json(result.rows[0]);
});

// ---

// ---------------
// SAVED_COUNTRIES
// ---------------
// GET all saved countries
app.get("/get-all-saved-countries", async (req, res) => {
  const result = await db.query("SELECT country_name FROM saved_countries;");

  res.json(result.rows);
});

// POST request to save one country
app.post("/save-one-country", async function (req, res) {
  // Get the country name from the request body
  const countryName = req.body.country_name;

  // Run the SQL query
  const result = await db.query(
    `
    INSERT INTO saved_countries (country_name)
    VALUES ($1)
    ON CONFLICT (country_name)
    DO NOTHING;
    `,
    [countryName],
  );

  // Send the database response back as JSON
  res.json(result.rows);
});

// POST request to unsave one country
app.post("/unsave-one-country", async function (req, res) {
  // Get the country name from the request body
  const countryName = req.body.country_name;

  // Run the SQL query
  const result = await db.query(
    `
    DELETE FROM saved_countries
    WHERE country_name = $1;
    `,
    [countryName],
  );

  // Send the database response back as JSON
  res.json(result.rows);
});

// -------------
// COUNTRY_COUNT
// -------------
app.post("/update-one-country-count", async (req, res) => {
  const { country_name } = req.body;

  const result = await db.query(
    `
INSERT INTO country_counts
(country_name,count)

VALUES($1,1)

ON CONFLICT(country_name)

DO UPDATE

SET count = country_counts.count + 1

RETURNING count;
`,
    [country_name],
  );

  res.json(result.rows[0]);
});
