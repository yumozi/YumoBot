require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", msg => {
  if (msg.content.includes(".ra")) {
    msg.reply("大失败！哈哈！");
  }
})
client.login(process.env.DISCORD_TOKEN);