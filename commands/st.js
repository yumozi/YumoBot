const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('st')
		.setDescription('人物设置')
		.addStringOption(option =>
			option.setName('理智')
				.setDescription('理智')
				.setRequired(true)),
	async execute(interaction) {
		const san = interaction.options.getString('理智');
		await interaction.member.setNickname(san);
		await interaction.reply('设置成功！');
	},
};