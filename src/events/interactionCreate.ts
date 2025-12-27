import {
  Collection,
  GuildMember,
  Interaction,
  MessageFlags,
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
          content: '❌ Nie posiadasz permisji, aby używać tej komendy!',
          flags: MessageFlags.Ephemeral,
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
          content: `⏳ Odczekaj **${left}s** przed ponownym użyciem tej komendy.`,
          flags: MessageFlags.Ephemeral,
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
          content: '❌ Wystąpił błąd przy próbie aktywowania komendy!',
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
