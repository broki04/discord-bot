import { SlashCommandBuilder, User } from 'discord.js';
import { Command } from '../../types/Command';
import { cmCommand } from './cm';
import { iqCommand } from './iq';
import { kissCommand } from './kiss';
import { getRandomMember } from '../../utils/getRandomMember';

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
      sub.setName('test').setDescription('debug komenda kurwa mac'),
    ) as SlashCommandBuilder,

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    console.log('subcommend called: ', sub);

    switch (sub) {
      case 'cm':
      case 'fiut':
        await cmCommand(interaction);
        break;

      case 'iq':
      case 'inteligencja':
        await iqCommand(
          interaction,
          interaction.options.getUser('target') ?? interaction.user,
        );
        break;

      case 'kiss':
      case 'buziak':
      case 'calus':
        if (!interaction.guild) return;

        const targetOption = interaction.options.getUser('target');

        let targetUser = targetOption;
        if (!targetUser) {
          targetUser =
            (await getRandomMember(interaction.guild, true)) ??
            interaction.user;
        }

        await kissCommand(interaction, targetUser);
        break;
    }
  },
};

export default command;
