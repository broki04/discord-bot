import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionResolvable,
} from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  permissions?: PermissionResolvable[];
  cooldown?: number;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
