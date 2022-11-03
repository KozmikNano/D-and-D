# Dungeons and Dragons Discord Bot
This bot includes some stat saving, a profile builder, and die roller (1-∞ sides || 20 is defualt) all with "/" commands.

____

## Hosting
This discord bot is very light wait. All you need is a server (anything that can run node 18) and a writeable file system.

**Requirements**: 
- Node 18
- Preferably Linux OS (tested and developed on linux)
- A discord bot token [(Click here for steps)](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
- Time

### Setup and install
1. Download and enter folder:
```bash
git clone https://github.com/KozmikNano/D-and-D
cd D-and-D/
```

2. Install the dependencies
```bash
npm install
```

3. Edit config.json and set your [bot token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
`nano config.json`
```json
{
    "clientId": "bot-user-id",
	  "guildId": "testing-guild-id",
	  "token": "token-goes-here"
}
```

___
### Running
Now for hosting there are three meathods I would reccomend:
1. Use `npm start` to run
2. Use the `screen` tool to host it on a closed cli
```bash
screen -R bot
npm start
```
crtl+a, d

or 3. Use pm2
```bash
npm install pm2 -g
pm2 start index.js
```

## Finishing Notes
- Don't forget to invite the bot to your discord server
- Don't forget to make sure your bot's intents are enabled and your bot has perms
- **Errors and bugs**
  - There is a known issue where if two users use a modal (a form) the responses will be mixed
  - If you need assistance feel free to open a github issue!
- If you would like to add anything to this project I am always open with Pull Requests!
