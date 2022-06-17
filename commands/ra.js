const { SlashCommandBuilder } = require('@discordjs/builders');
const { readSt } = require('../db.js');

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
		const rollResult = Math.floor(Math.random() * 100) + 1;
		var successRate = interaction.options.getInteger('成功率');

		// if no success rate specified, try to fetch database
		if (successRate == null) { 
			successRate = await readSt(interaction.guildId, interaction.user.id, skill);
		}

		if (skill != null) {
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
		}
		else {
			if (rollResult <= 5) {
				await interaction.reply(`检定结果: ${rollResult}/${successRate}, 大成功!`);
			}
			else if (rollResult <= successRate) {
				await interaction.reply(`检定结果: ${rollResult}/${successRate}, 成功!`);
			}
			else if (rollResult >= 95) {
				await interaction.reply(`检定结果: ${rollResult}/${successRate}, 大失败!`);
			}
			else {
				await interaction.reply(`检定结果: ${rollResult}/${successRate}, 失败!`);
			}
		}
	},
};