import { Client, GatewayIntentBits } from "discord.js"
import { token } from "./config.json"
import onMessageCreate from "./callbacks/onMessageCreate"

const client: Client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
})

client.on("messageCreate", message => onMessageCreate(client, message));
client.login( token );