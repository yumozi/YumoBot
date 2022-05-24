const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiceRoll } = require('@dice-roller/rpg-dice-roller');
const utils = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sc')
		.setDescription('进行san check')
		.addStringOption(option =>
			option.setName('类型')
				.setDescription('类型')
				.setRequired(true)),
	async execute(interaction) {
		const rollType = interaction.options.getString('类型');
        const currentNickname = interaction.member.nickname;
        let memberSan = parseInt(currentNickname.substring(
            // Make sure we extract the second appearance of '/'
            currentNickname.indexOf('san:') + 4, currentNickname.indexOf('/', currentNickname.indexOf('san:'))
            ));
        const rollTypes = rollType.split('/');
        const successRoll = new DiceRoll('1d100');

        if (successRoll <= memberSan) {
            var roll = new DiceRoll(rollTypes[0]);
            var result = '成功';
        }
        else {
            var roll = new DiceRoll(rollTypes[1]);
            var result = '失败';
        }

        memberSan -= roll.total;
        const updatedNickname = currentNickname.replace(currentNickname.substring(
            currentNickname.indexOf('san:') + 4, currentNickname.indexOf('/', currentNickname.indexOf('san:'))
            ), `${memberSan}`);

        await interaction.member.setNickname(updatedNickname);
		await interaction.reply(`San Check: ${successRoll}/${memberSan} ${result}\n
            ${utils.discordEscape(roll.toString())}, san值更新成功`);
	},
};