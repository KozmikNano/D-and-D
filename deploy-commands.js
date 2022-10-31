const fs = require('node:fs');
const path = require('node:path');
const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('page').setDescription('Page 1 for Stats Info!').addUserOption(option => option.setName('input').setDescription('The user name to use').setRequired(true)),
	new SlashCommandBuilder().setName('page2').setDescription('Page 2 for Stats Info!').addUserOption(option => option.setName('input').setDescription('The user name to use').setRequired(true)),
	new SlashCommandBuilder().setName('page3').setDescription('Page 3 for Stats Info!').addUserOption(option => option.setName('input').setDescription('The user name to use').setRequired(true)),
	new SlashCommandBuilder().setName('stats').setDescription('View the stats of a player').addUserOption(option => option.setName('input').setDescription('The user name to use').setRequired(true)),
	new SlashCommandBuilder().setName('invite').setDescription('Get a single use Invite that lasts for a week'),
	new SlashCommandBuilder().setName('roll').setDescription('Roll a die').addNumberOption(option => option.setName('num').setDescription('The number of sideds').setRequired(false)),
	new SlashCommandBuilder().setName('makebio').setDescription('Make a bio for your character'),
	new SlashCommandBuilder().setName('bio').setDescription('View a bio for your character').addUserOption(option => option.setName('input').setDescription('The user name to use').setRequired(false)),
]
	.map(command => command.toJSON());
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(
	Routes.applicationCommands(clientId),
	{ body: commands },
);