import { Client, Events, GatewayIntentBits } from 'discord.js';
import loadCommands from './handlers/commandHandler';
import interactionCreate from './events/interactionCreate';
import { deployCommands } from './utils/deployCommands';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

loadCommands(client);

const clientId = process.env.CLIENT_ID!;
const guildIds = process.env.GUILD_IDS?.split(',') || [];
const deployGlobal = process.env.DEPLOY_GLOBAL === 'true';

client.on(Events.InteractionCreate, interactionCreate.execute);

client.once(Events.ClientReady, async () => {
  console.log(`🤖 Logged in as ${client.user?.tag}`);

  await deployCommands(clientId, guildIds, deployGlobal);
});

client.login(process.env.DISCORD_TOKEN);
