import { Client, Events, GatewayIntentBits } from 'discord.js';
import loadCommands from './handlers/commandHandler';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

loadCommands(client);

client.once(Events.ClientReady, (c) => {
  console.log(`🤖 Logged in as ${c.user?.tag}`);
});

client.login(process.env.token);
