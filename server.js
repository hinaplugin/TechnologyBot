const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.login(process.env.DISCORD_TOKEN);

const setlistCommand = require('./setlist');

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const { commandName } = interaction;

    if (commandName === setlistCommand.data.name) {
        try {
            await setlistCommand.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーが発生しました．', ephemeral: true });
            } else {
                await interaction.followUp({ content: 'コマンド実行時にエラーが発生しました．', ephemeral: true });
            }
        }
    }
});