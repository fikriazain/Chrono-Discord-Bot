const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nudge-chrono')
    .setDescription('Nudge Chrono to respond to your message!'),
  async execute(interaction) {
    await interaction.reply('Yes, yes I am here!');
  },
};