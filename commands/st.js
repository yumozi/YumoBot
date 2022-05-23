const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('st')
		.setDescription('人物设置')
		.addStringOption(option =>
			option.setName('姓名')
				.setDescription('姓名')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('体力')
				.setDescription('体力')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('理智')
				.setDescription('理智')
				.setRequired(true)),
	async execute(interaction) {
		const name = interaction.options.getString('姓名');
		const health = interaction.options.getString('体力');
		const san = interaction.options.getString('理智');
		await interaction.member.setNickname(`${name} (HP:${health}/${health} san:${san}/${san})`);
		await interaction.reply('设置成功!');
	},
};