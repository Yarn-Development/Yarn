module.exports = (client, queue, query) => {
	queue.metadata.send(
		`${client.emotes.error} - No results found on YouTube for ${query} !`,
	);
};
