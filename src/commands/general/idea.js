const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

const Command = require('./../../command-processing/command');

const config = require('./../../../config');

const STAFF_ROLES = ['Модератор', 'Главный Модератор', 'Главный Администратор', 'Администратор'];

const ACCEPT_EMOJI = '480080157965811732';
const REJECT_EMOJI = '480080159232491542';

const REACTIONS_TO_ACCEPT = 3;
const REACTIONS_TO_REJECT = 3;

module.exports = class IdeaCommand extends Command {
    constructor() {
        super({
            name: 'idea',
            format: '<ваша идея>',
            description: 'Предложить идею для развития сервера',
            details: stripIndents`
                Позволяет предложить идею для развития сервера.
                Решение по вашей идее будет вынесено после 3х голосов от членов персонала (за или против).
            `,
            guildOnly: true
        });
    }

    parseArgs(rest) {
        return rest;
    }

    validate(message, idea) {
        if (!idea)
            return 'Предложение не может быть пустым';
        return true;
    }

    async run(message, idea) {
        const ideaMessage = await message.channel.send(
            new RichEmbed()
                .setTitle('Голосование за предложение:')
                .setDescription(idea)
                .setColor(config.embed.color.guild)
                .setFooter(message.author.tag, message.author.avatarURL)
        );
        await ideaMessage.react(ACCEPT_EMOJI);
        await ideaMessage.react(REJECT_EMOJI);
        const reactionListener = (reaction, user) => {
            if (reaction.message.id !== ideaMessage.id || user.bot)
                return;
            const count = reaction.users
                .filter(u => message.guild.member(u).roles
                    .map(r => STAFF_ROLES.map(_r => r.name === _r).reduce((a, b) => a || b))
                    .reduce((a, b) => a || b)
                ).array().length;
            if (reaction.emoji.id === ACCEPT_EMOJI && count >= REACTIONS_TO_ACCEPT) {
                const embed = new RichEmbed()
                    .setTitle('Предложение одобрено:')
                    .setDescription(idea)
                    .setColor(config.embed.color.guild)
                    .setFooter(message.author.tag, message.author.avatarURL);
                message.channel.send(embed);
                this.client.channels.get(config.channels.staffchat).send(embed);
                this.client.removeListener('messageReactionAdd', reactionListener);
            } else if (reaction.emoji.id === REJECT_EMOJI && count >= REACTIONS_TO_REJECT) {
                const embed = new RichEmbed()
                    .setTitle('Предложение отклонено:')
                    .setDescription(idea)
                    .setColor(config.embed.color.guild)
                    .setFooter(message.author.tag, message.author.avatarURL);
                message.channel.send(embed);
                this.client.channels.get(config.channels.staffchat).send(embed);
                this.client.removeListener('messageReactionAdd', reactionListener);
            }
        };
        this.client.on('messageReactionAdd', reactionListener);
    }
};