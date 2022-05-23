const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ra')
		.setDescription('进行ra检定')
		.addStringOption(option =>
			option.setName('技能')
				.setDescription('技能')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('成功率')
				.setDescription('成功率')),
	async execute(interaction) {
		const skill = interaction.options.getString('技能');
		const successRate = interaction.options.getInteger('成功率');
		const rollResult = Math.floor(Math.random() * 100) + 1;

		if (rollResult <= 5) {
			await interaction.reply(`检定结果: ${rollResult}/${successRate}, ${skill}大成功!`);
		}
		else if (rollResult <= successRate) {
			await interaction.reply(`检定结果: ${rollResult}/${successRate}, ${skill}成功!`);
		}
		else if (rollResult >= 95) {
			await interaction.reply(`检定结果: ${rollResult}/${successRate}, ${skill}大失败!`);
		}
		else {
			await interaction.reply(`检定结果: ${rollResult}/${successRate}, ${skill}失败!`);
		}
	},
};