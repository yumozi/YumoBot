const { SlashCommandBuilder } = require('@discordjs/builders');
const { writeSt } = require('../db.js');

const regexDigit = /[0-9]/;
const regexAllDigits = /[0-9]/g;
const regexNonDigit = /\D/;
const regexAllNonDigits = /\D/g;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('st')
		.setDescription('PC属性设置')
		.addStringOption(option =>
			option.setName('属性')
				.setDescription('属性')
				.setRequired(true)),
	async execute(interaction) {
        let input = interaction.options.getString('属性');
		var arrCharacterInfo = [];

		let i = 0;
		while (i < input.length - 1) {
			if (regexDigit.test(input[i]) && regexNonDigit.test(input[i+1])) {
				arrCharacterInfo.push(input.slice(0, i + 1));
				input = input.slice(i + 1);
				i = 0;
			}
			else {
				i += 1;
			}
		}

		var jsonCharacterInfo = {};
		arrCharacterInfo.forEach(function(data)
		{
			var fieldName = data.match(regexAllNonDigits).join('');
			var fieldData = parseInt(data.match(regexAllDigits).join(''));
			jsonCharacterInfo[fieldName] = fieldData;
		});

		id = writeSt(jsonCharacterInfo);

		console.log(id);

		await interaction.reply(`${interaction.member.nickname}的角色保存成功, id: ${id}`);
	},
};