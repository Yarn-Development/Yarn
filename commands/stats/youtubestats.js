const fetch = require("node-superfetch"),
  { MessageEmbed } = require("discord.js");
exports.execute = async (client, message, args) => {
  let name = args.join(" ");

  if (!name)
    return message.channel.send(
      ":no_entry_sign: Please provid a channel name to view stats on."
    );

  try {
    const channel = await fetch.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${process.env.YT}&maxResults=1&type=channel`
    );

    const data = await fetch.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${process.env.YT}`
    );

    const youtubestatsbed = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle(`${channel.body.items[0].snippet.channelTitle}`)
      .setURL(
        `https://youtube.com/channel/${channel.body.items[0].id.channelId}`
      )
      .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
      .setTimestamp(new Date())
      .addFields(
        {
          name: "Subscribers Count",
          value: parseInt(
            data.body.items[0].statistics.subscriberCount
          ).toLocaleString(),
          inline: true,
        },
        {
          name: "Total Views",
          value: parseInt(
            data.body.items[0].statistics.viewCount
          ).toLocaleString(),
          inline: true,
        },
        {
          name: "Total Video(s)",
          value: parseInt(
            data.body.items[0].statistics.videoCount
          ).toLocaleString(),
          inline: true,
        },
        {
          name: "Channel Description",
          value: channel.body.items[0].snippet.description,
          inline: true,
        },
        {
          name: "Date Created",
          value: new Date(
            channel.body.items[0].snippet.publishedAt
          ).toDateString(),
          inline: true,
        },
        {
          name: "Country",
          value: data.body.items[0].snippet.country
            ? `${data.body.items[0].snippet.country}`
            : "No Country Provided",
          inline: true,
        }
      );
    message.channel.send({ embeds: [youtubestatsbed] });
  } catch (err) {
    console.log(err);
    const channel = await fetch.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${process.env.YT}&maxResults=1&type=channel`
    );
    message.channel.send(
      "Unknown channel data error - This is either due to the YouTube API key recieving a rate limit or the channel being invalid. Please try again later. "
    );
    if (!channel.body.items[0])
      return message.channel.send("No channel result. Try again.");
  }
};
exports.help = {
  name: "youtubestats",
  description: "Get information from a certain channel on youtube",
  aliases: [],
  usage: "youtubestats [channel]",
  category: "Statistics",
};
