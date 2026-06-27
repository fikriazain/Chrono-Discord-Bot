const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// 1. Import the config.json file directly
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'src\\commands'); 
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// 2. Pass the token variable directly from your config
const rest = new REST().setToken(token); 

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// 3. Pass clientId and guildId directly from your config
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();