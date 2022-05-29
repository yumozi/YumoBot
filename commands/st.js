const { SlashCommandBuilder } = require('@discordjs/builders');

const mongo = require('mongodb').MongoClient
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:user@cluster0.fdrnt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



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
		let inputs = [];

		let i = 0;
		while (i < input.length - 1) {
			if (/[0-9]/.test(input[i]) && /\D/.test(input[i+1])) {
				inputs.push(input.slice(0, i + 1));
				input = input.slice(i + 1);
				i = 0;
			}
			else {
				i += 1;
			}
		}
		console.log(inputs)

		id = interaction.member.id;


		client.connect(err => {
			const collection = client.db("test").collection("devices");

			collection.insertOne({ id: 'Test', age: '30', stats: inputs}, ((error, item) => {
				if(error) {
				 console.error(error)
				 return
				}
				 console.log(inputs)
			}))



			client.close();
		});


		await interaction.reply('uploaded');
	},
};