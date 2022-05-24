const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiceRoll } = require('@dice-roller/rpg-dice-roller');
const utils = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('r')
		.setDescription('进行roll')
		.addStringOption(option =>
			option.setName('类型')
				.setDescription('类型')
				.setRequired(true)),
	async execute(interaction) {
		const rollType = interaction.options.getString('类型');
		const roll = new DiceRoll(rollType);
		await interaction.reply(`骰子结果: ${utils.discordEscape(roll.toString())}`);
	},
};