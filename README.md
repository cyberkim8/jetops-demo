# JetOps demo — Phuket Jetski Club

Four self-contained demo pages for the daily operations of a guided jet-ski tour
(Koh Sirey → 9 islands → Monkey Island, Phuket east coast). Plain static HTML — no build
step, no backend, no tracking, no third-party scripts.

| Page | What it shows |
|---|---|
| [`index.html`](index.html) | **Photo delivery** — the guide picks day, trip and team colour and sends the photos → the tourist opens the free full-quality gallery, finds their jet ski by number and saves the photos (`?view=about\|guide\|tourist`) |
| [`weather.html`](weather.html) | **Crew weather board** — live forecast and marine data for the open crossing to Monkey Island, a go / caution / reroute verdict, tide windows per stop, a crew summary and a client briefing; *Today* and *Tomorrow* (for the evening-before brief) |
| [`dashboard.html`](dashboard.html) | **Operations dashboard** — a simulated day on a real-coordinate route map: teams on the water, event feed, tech board, photo completeness, shifts and the end-of-day report |
| [`bot.html`](bot.html) | **LINE ops-bot showcase** — group message → event → alert to the lead guide → daily digest; the data is the real output of the bot's code (`?play=all`) |

**Languages:** English (default), Thai and Russian — use the switcher on any page (or `?lang=`); the choice is
remembered in the browser. **Theme:** follows your device; the light/dark toggle is in the header. The Thai text is a draft that is still being reviewed by a native speaker.

**Demo scenarios:** `weather.html?wx=ok|warn|bad` and `dashboard.html?wx=ok|warn|bad` show the calm /
borderline / storm states on any day. Scenarios replace wave and wind only — tide times stay live.

## Data and privacy

- **Weather and tide:** [Open-Meteo](https://open-meteo.com/) forecast and marine APIs (data licensed
  under CC BY 4.0). This demo calls Open-Meteo's free, non-commercial endpoints directly from the browser;
  a production deployment uses a licensed plan behind a small server-side proxy. If live data is not
  available, the page says so and shows clearly labelled sample data.
- **Wave/wind thresholds** for the verdict are preliminary and are being calibrated with the lead guide.
- **Everything else is simulated.** Photos are generated placeholders; no customer photos and no
  personal data are published in this repository. Demo state stays in your browser's `localStorage`
  (the photo page has a "Reset demo data" button).

## Run locally

```bash
python3 -m http.server 8000    # then open http://localhost:8000
```

---

This repository is published from a private source repository; direct edits here are overwritten
by the next sync.
