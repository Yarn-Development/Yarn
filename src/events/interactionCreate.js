module.exports = async (client,interaction) => {
    if (interaction.isCommand()) {
        const command = client.interactions.get(interaction.commandName);



        if (!command) return interaction.reply({
            content: "Error! Command Sent Invalid! Please try again later.",
            ephemeral:true
        });

        command.execute(client, interaction);
    }

    if (interaction.isContextMenu()) {

        const command = client.interactions.get(interaction.commandName);
        if (command) command.execute(client, interaction);
    }
};