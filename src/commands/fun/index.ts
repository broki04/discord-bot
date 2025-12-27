import { MessageFlags, SlashCommandBuilder, User } from 'discord.js';
import { Command } from '../../types/Command';
import { cmCommand } from './cm';
import { iqCommand } from './iq';
import { kissCommand } from './kiss';
import { getRandomMember } from '../../utils/getRandomMember';
import { shipCommand } from './ship';

const command: Command = {
  permissions: [],
  cooldown: 5,

  data: new SlashCommandBuilder()
    .setName('fun')
    .setDescription('Kategoria rozrywkowych komend')

    .addSubcommand((sub) =>
      sub.setName('cm').setDescription('Sprawdzasz długość swojego fiflaka 🍆'),
    )
    .addSubcommand((sub) =>
      sub
        .setName('fiut')
        .setDescription('Sprawdzasz długość swojego fiflaka 🍆'),
    )
    .addSubcommand((sub) =>
      sub
        .setName('iq')
        .setDescription('Sprawdzasz czyjś, bądź swoje iq 🧠')
        .addUserOption((o) =>
          o.setName('target').setDescription('Wybierz osobę'),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('inteligencja')
        .setDescription('Sprawdzasz czyjś, bądź swoje iq 🧠')
        .addUserOption((o) =>
          o.setName('target').setDescription('Wybierz osobę'),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('kiss')
        .setDescription('Wysyłasz komuś buziaka 😘')
        .addUserOption((o) =>
          o.setName('target').setDescription('Wybierz osobę'),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('buziak')
        .setDescription('Wysyłasz komuś buziaka 😘')
        .addUserOption((o) =>
          o.setName('target').setDescription('Wybierz osobę'),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('calus')
        .setDescription('Wysyłasz komuś buziaka 😘')
        .addUserOption((o) =>
          o.setName('target').setDescription('Wybierz osobę'),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('ship')
        .setDescription('Czy pasujecie do siebie? Zaraz zobaczymy 💦')
        .addUserOption((o) =>
          o.setName('target').setDescription('Wybierz użytkownika'),
        )
        .addStringOption((o) =>
          o.setName('thing').setDescription('Jakaś rzecz'),
        ),
    ) as SlashCommandBuilder,

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case 'cm':
      case 'fiut': {
        await cmCommand(interaction);
        return;
      }

      case 'iq':
      case 'inteligencja': {
        await iqCommand(
          interaction,
          interaction.options.getUser('target') ?? interaction.user,
        );
        return;
      }

      case 'kiss':
      case 'buziak':
      case 'calus': {
        if (!interaction.guild) return;

        const targetUser =
          interaction.options.getUser('target') ??
          (await getRandomMember(interaction.guild, true)) ??
          interaction.user;
        await kissCommand(interaction, targetUser);
        return;
      }

      case 'love':
      case 'ship':
      case 'milosc': {
        if (!interaction.guild) return;

        const targetOption = interaction.options.getUser('target');
        const targetThing = interaction.options.getString('thing');

        if (targetOption && targetThing) {
          await interaction.reply({
            content:
              '❌ Musisz wybrać **osobę**, albo **rzecz** - nie obydwa na raz!',
            flags: MessageFlags.Ephemeral,
          });
          return;
        }

        const targetUser: User =
          targetOption ??
          (await getRandomMember(
            interaction.guild,
            true,
            interaction.user.id,
          )) ??
          interaction.user;

        await shipCommand(interaction, targetUser, targetThing);
        return;
      }
    }
  },
};

export default command;
