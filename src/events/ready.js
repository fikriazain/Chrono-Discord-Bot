const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true, // This tells our bot to only run this event ONE time on boot
	execute(client) {
		console.log(`✅ Chrono is online! Logged in as ${client.user.tag}`);
	},
};