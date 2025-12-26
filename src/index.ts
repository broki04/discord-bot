import { Client, Events, GatewayIntentBits } from 'discord.js';
import loadCommands from './handlers/commandHandler';
import interactionCreate from './events/interactionCreate';
import { deployCommands } from './utils/deployCommands';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

loadCommands(client);

client.on(Events.InteractionCreate, interactionCreate.execute);

client.once(Events.ClientReady, async (c) => {
  await deployCommands();

  console.log(`🤖 Logged in as ${c.user?.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
