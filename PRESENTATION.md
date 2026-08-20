# 🌍 Where in the World? — From Hand-Coded to AI-Assisted

### A live demo for AnnieCannons students (new *and* seasoned)

> 🎤 **Presenter note:** This whole doc is written to be read out loud. Skim the headers, riff on the callout boxes, and actually click around the live app when a section says "🖱️ Try it."

---

## 👋 Welcome — Why This App, Why This Talk

This is the **Countries App** — the same project a lot of you have already built, or are about to build, as part of the AnnieCannons curriculum. It fetches real country data from a public API, lets you search and filter it, save your favorites to a real database, and shows you a little profile page.

Here's the twist for today: **this exact app has two eras.**

- 🧑‍💻 **Era 1 — Hand-coded.** Versions 0 through 4, built line-by-line the old-fashioned way: typing every `useState`, debugging every `undefined is not a function`, googling "react router dom v6 nested routes" at 11pm.
- 🤖 **Era 2 — AI-assisted.** Everything after that — a language toggle and a whole 4-mode theming system — built by talking to Claude Code the way you'd talk to a very fast, very literal pair-programming partner.

Neither era replaces the other. **Era 1 is why Era 2 works at all.** You can't review an AI's diff, catch a bad suggestion, or ask a smart follow-up question if you don't already know what a `useState` or a SQL `INSERT` is supposed to look like. This talk is about showing both eras side by side — and being honest about what changed.

> 🎓 **Beginner corner:** If you're new, don't worry about absorbing every code snippet below. The point isn't "memorize this." The point is "see what's possible, and see that the fundamentals you're learning right now are the whole foundation this is built on."

---

## 🏗️ Era 1: The Hand-Coded Foundation

Open up the repo and you'll see `version-0` through `version-4` sitting right next to each other. That's not clutter — it's the paper trail of a curriculum, each folder one step harder than the last:

| Version | What got added | The lesson |
|---|---|---|
| `version-0` / `version-1` | Static React UI, hardcoded local data | Components, props, JSX basics |
| `version-2` | Real fetch from the REST Countries API | `useEffect`, async data, loading states |
| `version-3` | Split into `client/` + `server/`, first Express endpoints | Full-stack data flow, routes |
| `version-4` | Postgres database (via Neon), save/unsave, view counters | Real persistence, SQL, deployment |

By `version-4`, this app does everything a "real" small product does:

- 🔎 Search + filter a live dataset
- 🖼️ A detail page per country with dynamic routing
- ❤️ Save/unsave countries — a genuine `INSERT` / `DELETE` round-trip to Postgres
- 👀 A view counter per country (also Postgres — every detail page visit does an `UPDATE`)
- 📝 A profile form that writes to a `users` table

Here's the actual data flow, straight from this project's own `daily-flow.md` notes — this diagram predates any AI involvement and it's still exactly correct:

```
Frontend Button
      |
      ↓
fetch() POST Request
      |
      ↓
POST /save-one-country      ← Express route
      |
      ↓
db.query(SQL COMMAND, [dynamic values])
      |
      ↓
PostgreSQL Database
      |
      ↓
res.json()                  ← Database Response
      |
      ↓
React Receives JSON → setState() → UI Re-renders
```

> 🧠 **For the more advanced folks:** notice this is the *same* mental model whether a human typed the `fetch()` call or an AI agent did. The request/response cycle doesn't change. What changes is *who's typing the boilerplate* — which is exactly why the fundamentals still matter more than the tool.

🖱️ **Try it:** Open the app, save a country, then reload the page. That heart didn't just toggle a local variable — it's sitting in a real database row right now.

---

## 🌐 The Turn: Why We Added AI *On Top* of a Finished App

Here's the honest framing for today: **this app was already done.** Fully working, deployed, demo-able. So why go back and add more?

Because the industry didn't stop moving just because the app was finished. Using an AI coding agent well — writing a clear prompt, reading its diff before accepting it, catching when it's wrong — is quickly becoming as basic an expectation as knowing git. AnnieCannons' own curriculum has a whole worksheet for this now (`AI-ADD-FEATURE.md`, sitting right in this repo), and the instructions on it are blunt about the one rule that matters:

> **"Read the diff before accepting it. You're responsible for the code that ends up in your branch, even if the agent wrote it."**

So the plan was: keep the hand-coded core exactly as-is, and layer two new features on top *entirely* through conversation with Claude Code — on their own feature branches, tested, reviewed, and merged like any real feature would be.

---

## 🗣️ Era 2, Feature 1: Speaking Three Languages

**The ask, in plain English:** "Let people switch the app's UI between English, Vietnamese, and Traditional Chinese — but leave the actual country data (names, capitals) in English, since that comes from an external API we don't control."

**What that turns into in React** is a `Context` — which, if you haven't hit that lesson yet, is just React's way of saying *"let any component in the app read this value, without passing it down through props one level at a time."*

```jsx
// src/context/LanguageContext.jsx
function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  function setLanguage(nextLanguage) {
    setLanguageState(nextLanguage);
    localStorage.setItem(STORAGE_KEY, nextLanguage); // remembers your choice next visit
  }

  function t(key) {
    const strings = translations[language] || translations[DEFAULT_LANGUAGE];
    return strings[key] ?? key; // unknown key? show the key itself — visibly wrong beats invisibly blank
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

> 🎓 **Beginner corner:** that `t()` function is the whole trick. Instead of writing `"Saved Countries"` directly in your JSX, you write `{t("savedCountries")}`, and one dictionary object decides what that actually renders as, per language. Swap the dictionary, swap the whole app's text — no other file needs to change.

**This is also where testing entered the project for the first time.** Vitest + React Testing Library got added alongside this feature, with tests covering: does it default to English, does switching actually re-render the text, does it persist after a refresh, does an unknown key fail *visibly* instead of silently. That last one is a genuinely good instinct an AI agent has by default — fail loud, not quiet.

🖱️ **Try it:** flip the language dropdown in the header. Then reload the page — it remembered.

---

## 🎨 Era 2, Feature 2: Four Ways to See the Same App

This one started small — "add light and dark mode" — and then, mid-conversation, kept growing because that's what happens when the cost of asking "what if we also tried—" drops to almost zero:

1. ☀️ **Light** — the original palette
2. 🌙 **Dark** — a proper dark theme
3. 🌗 **Color-blind-safe / high contrast** — an actual accessibility mode
4. 🎪 **Google-Mode** — a just-for-fun Sesame-Street-style rainbow reskin, because why not

### The clever bit: one set of CSS variables, four themes

Instead of writing four separate stylesheets, every component in this app was already using semantic CSS variables (`--white`, `--dark-blue-3`, etc. for "surface color," "text color," and so on). Adding a theme means **re-pointing those same variable names** under a `data-theme` attribute:

```css
/* the base palette (light mode) */
:root {
  --light-grey: hsl(0, 0%, 98%);   /* page background */
  --white: hsl(0, 0%, 100%);       /* card/surface background */
  --dark-blue-3: hsl(200, 15%, 8%); /* text */
}

/* dark mode: same variable NAMES, new values — zero component changes needed */
:root[data-theme="dark"] {
  --light-grey: hsl(207, 26%, 17%);
  --white: hsl(209, 23%, 22%);
  --dark-blue-3: hsl(0, 0%, 96%);
}
```

And the React side is almost suspiciously simple — one `useEffect` that stamps the chosen theme onto the `<html>` tag, and CSS does the rest:

```jsx
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);
```

> 🧠 **For the more advanced folks:** this is a textbook case of picking the right abstraction *before* you need it paying off later. Nobody planned for 4 themes when those CSS variables were first named — but because the app was already using variables instead of hardcoded colors, "add a theme" became a CSS-only problem instead of a "touch every component" problem.

### The accessibility mode wasn't a vibe — it was math

When asked to make the 3rd mode genuinely color-blind-safe, the answer wasn't "pick colors that look okay." It was picking a documented-safe hue pairing (blue + orange — the pairing that stays distinguishable across the most common forms of color blindness) and then *actually calculating* WCAG contrast ratios before committing to a final palette:

```python
# quick contrast check run during development — not a guess
def ratio(c1, c2):
    l1, l2 = rel_luminance(c1), rel_luminance(c2)
    l1, l2 = max(l1, l2), min(l1, l2)
    return (l1 + 0.05) / (l2 + 0.05)

# text_cream on page_bg: 15.55   ← WCAG AAA only requires 7.0
# heading_orange on page_bg: 8.74
```

> 🎓 **Beginner corner:** "WCAG" is just the rulebook for "can people actually read this." AAA is its strictest tier. The numbers above mean this isn't just *an* accessible palette — it clears the hardest bar by a wide margin, on purpose, checked with real math instead of eyeballing it.

🖱️ **Try it:** cycle through all four theme icons in the header. Then specifically try the Google-Mode profile form — notice even the placeholder text is colorful, not the default washed-out grey. That was a real bug someone caught by actually looking at it, not something that was "obviously" going to be a problem from the code alone.

---

## 🪞 Old and New, Side by Side

| | Era 1 (hand-coded) | Era 2 (AI-assisted) |
|---|---|---|
| **Who typed the code** | You, line by line | Claude Code, from conversation |
| **Who's responsible for it** | You | **Still you** |
| **How bugs got caught** | Manual testing, console.logs | Automated tests + live browser checks, same as always |
| **Was it reviewed before merging** | Yes | Yes — same git branch → PR → main flow |
| **Did it need you to understand React/SQL/CSS** | Obviously | **Also yes** — you can't write a good prompt or catch a bad diff without it |

The point of this whole demo isn't "AI replaced the hard part." It's that **the hard part didn't move.** Understanding what a Context does, what a SQL `UNIQUE` constraint means, why a contrast ratio matters — that's still 100% on you. What changed is that once you understand it, you can now describe what you want in a sentence and get a first draft in seconds instead of an hour. The skill that got *more* valuable, not less, is knowing enough to tell whether that first draft is actually right.

---

## 🎉 Wrap-Up / Call to Action

If you're newer: everything in "Era 1" above is exactly where you are right now, and that's exactly where you should be. Don't skip to the AI part.

If you've got some of the fundamentals down: this repo's `AI-ADD-FEATURE.md` is the literal worksheet for doing what we just walked through, on your own feature idea. Pick something from its list (a flag quiz, a comparison tool, offline caching) or make one up, branch off `main`, and go build it with an agent — then come back and show *us* the diff you had to correct it on.

> 🎤 **Presenter close:** Live-switch the theme to Google-Mode one more time right here, let the room see the rainbow cards, and land the plane on: *"Every part of this was reviewed, tested, and understood before it got merged. That's the whole job. The tool just changed."*
