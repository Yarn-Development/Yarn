const ms = require('ms');

exports.execute = async (client, message, args) => {
  // If the member doesn't have enough permissions
  if (
    !message.member.hasPermission('MANAGE_MESSAGES') &&
    !message.member.roles.cache.some((r) => r.name === 'Giveaways')
  ) {
    return message.channel.send(
        ':x: You need to have the manage messages permissions to start giveaways.',
    );
  }

  // Giveaway channel
  const giveawayChannel = message.mentions.channels.first();
  // If no channel is mentionned
  if (!giveawayChannel) {
    return message.channel.send(':x: You have to mention a valid channel!');
  }

  // Giveaway duration
  const giveawayDuration = args[1];
  // If the duration isn't valid
  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return message.channel.send(':x: You have to specify a valid duration!');
  }

  // Number of winners
  const giveawayNumberWinners = parseInt(args[2]);
  // If the specified number of winners is not a number
  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return message.channel.send(
        ':x: You have to specify a valid number of winners!',
    );
  }

  // Giveaway prize
  const giveawayPrize = args.slice(3).join(' ');
  // If no prize is specified
  if (!giveawayPrize) {
    return message.channel.send(':x: You have to specify a valid prize!');
  }

  message.channel.send('Do You Want Any Bonus Enteries?');
  const filter = (m) => m.author.id === message.author.id;
  await message.channel
      .awaitMessages(filter, {
        max: 1,
        time: 300000,
        errors: ['time'],
      })
      .then(async (collected) => {
        if (collected.first().content.toLowerCase() === 'yes') {
          await message.channel.send(
              `Alright which role will have bonus enteries?`,
          );
          await message.channel
              .awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time'],
              })
              .then(async (rolen) => {
                rolename = rolen.first().content;
              });
          await message.channel.send(
              `How many bonus eneteries will we have for ${rolename}?`,
          );
          await message.channel
              .awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time'],
              })
              .then(async (rolentery) => {
                BonusEntries = parseInt(rolentery.first().content);
                message.channel.send(
                    `✅ Alright **${rolename}** will have **${BonusEntries}** Extra Enteries`,
                );
              });
        } else {
          if (collected.first().content.toLowerCase() === 'no') {
            message.channel.send('Aight! Skipping this!');
            rolename = null;
            BonusEntries = null;
          } else {
            message.channel.send('Invalid Response Collected, Skipping!');
            rolename = null;
            BonusEntries = null;
          }
        }
      });

  // Start the giveaway
  client.giveawaysManager.start(giveawayChannel, {
    // The giveaway duration
    time: ms(giveawayDuration),
    // The giveaway prize
    prize: giveawayPrize,
    // The giveaway winner count
    winnerCount: parseInt(giveawayNumberWinners),
    // BonusEntries If Provided

    bonusEntries: [
      {
        // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
        bonus: new Function(
            'member',
            `return member.roles.cache.some((r) => r.name === \'${rolename}\') ? ${BonusEntries} : null`,
        ),
        cumulative: false,
      },
    ],
    // Who hosts this giveaway
    hostedBy: client.config.hostedBy ? message.author : null,
    // Messages
    messages: {
      giveaway:
        (client.config.everyoneMention ? '@everyone\n\n' : '') +
        '🎉🎉 **GIVEAWAY** 🎉🎉',
      giveawayEnded:
        (client.config.everyoneMention ? '@everyone\n\n' : '') +
        '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
      timeRemaining: 'Time remaining: **{duration}**!',
      inviteToParticipate: `React with 🎉 to participate!`,
      winMessage: 'Congratulations, {winners}! You won **{prize}**!',
      embedFooter: 'Giveaways',
      noWinner: 'Giveaway cancelled, no valid participations.',
      hostedBy: 'Hosted by: {user}',
      winners: 'winner(s)',
      endedAt: 'Ended at',
      units: {
        seconds: 'seconds',
        minutes: 'minutes',
        hours: 'hours',
        days: 'days',
        pluralS: false, // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
      },
    },
  });

  message.channel.send(`Giveaway started in ${giveawayChannel}!`);
};

exports.help = {
  name: 'giveaway',
  aliases: ['start'],
  category: 'Giveaways',
  usage: 'start #channel <duration> [winners] {prize}',
};
