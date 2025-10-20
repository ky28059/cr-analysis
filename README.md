# cr-analysis
 Silly Big Data™ Clash Royale game analysis scripts & dashboard using the Clash Royale API.

### Running locally
You'll need a developer account and API token from the [Clash Royale developer site](https://developer.clashroyale.com/#/getting-started).
Then, create a `.env` file exporting your token like so:
```env
TOKEN=...
PLAYER_TAG="#..."
```
Run
```bash
npm start
```
to begin populating your `Battle` data. Since Clash Royale only returns recent battle data from the API, the script
appends new battles to a local cache at `battles.json`.

Once `battles.json` is populated, run
```bash
npm run dev
```
to start the dashboard.
