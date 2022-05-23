const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('r')
		.setDescription('进行roll')
		.addStringOption(option =>
			option.setName('点数')
				.setDescription('点数')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply('是大失败!');
	},
};