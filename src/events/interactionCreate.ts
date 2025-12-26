import {
  Collection,
  GuildMember,
  Interaction,
  PermissionResolvable,
} from 'discord.js';

export default {
  name: 'interactionCreate',

  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    const member = interaction.member as GuildMember | null;
    if (command.permissions && member) {
      if (
        !member.permissions.has(command.permissions as PermissionResolvable[])
      ) {
        return interaction.reply({
          content: '❌ You do not have permission to use this command!',
          ephemeral: true,
        });
      }
    }

    const { cooldowns } = interaction.client;
    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection<string, number>());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const cooldownAmount = (command.cooldown ?? 3) * 1000;

    if (timestamps?.has(interaction.user.id)) {
      const expiration = timestamps.get(interaction.user.id)! + cooldownAmount;
      if (now < expiration) {
        const left = ((expiration - now) / 1000).toFixed(1);
        return interaction.reply({
          content: `⏳ Please wait **${left}s** before using this command again.`,
          ephemeral: true,
        });
      }
    }

    timestamps?.set(interaction.user.id, now);

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: '❌ There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
