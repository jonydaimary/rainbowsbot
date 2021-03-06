const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

const Command = require('./../../processing/commands/command');

const config = require('./../../../json/config');

const SUGGESTIONS_CHANNEL = '469599925403910145';

const ACCEPT_EMOJI = '480080157965811732';
const REJECT_EMOJI = '480080159232491542';
const DELETE_EMOJI = '❎';

const REACTIONS_TO_ACCEPT = 8;
const REACTIONS_TO_REJECT = 8;

module.exports = class IdeaCommand extends Command {
    constructor() {
        super({
            name: 'idea',
            format: '<ваша идея>',
            description: 'Предложить идею для развития сервера',
            details: stripIndents`
                Позволяет предложить идею для развития сервера.
                Решение по вашей идее будет вынесено после 3х голосов от членов персонала (за или против).
                Автор идеи и создатель сервера могут удалить её используя ${DELETE_EMOJI}.
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
        message.delete();
        const ideaMessage = await this.client.channels.get(SUGGESTIONS_CHANNEL).send(
            new RichEmbed()
                .setTitle('Голосование за предложение:')
                .setDescription(idea)
                .setColor(config.embed.color.guild)
                .setFooter(message.author.tag, message.author.avatarURL)
        );
        await ideaMessage.react(ACCEPT_EMOJI);
        await ideaMessage.react(REJECT_EMOJI);
        await ideaMessage.react(DELETE_EMOJI);
        const reactionListener = (reaction, user) => {
            if (reaction.message.id !== ideaMessage.id || user.bot)
                return;
            if (reaction.emoji.name === DELETE_EMOJI) {
                if (user.id == message.author.id || user.id == message.guild.ownerID) {
                    this.client.removeListener('messageReactionAdd', reactionListener);
                    ideaMessage.delete();
                } else reaction.remove(user);
                return;
            }
            const count = reaction.count - 1;
            if (reaction.emoji.id === ACCEPT_EMOJI && count >= REACTIONS_TO_ACCEPT) {
                const embed = new RichEmbed()
                    .setTitle('Предложение одобрено:')
                    .setDescription(idea)
                    .setColor(config.embed.color.guild)
                    .setFooter(message.author.tag, message.author.avatarURL);
                message.channel.send(embed);
                this.client.channels.get(config.channels.staff).send(embed);
                this.client.removeListener('messageReactionAdd', reactionListener);
            } else if (reaction.emoji.id === REJECT_EMOJI && count >= REACTIONS_TO_REJECT) {
                const embed = new RichEmbed()
                    .setTitle('Предложение отклонено:')
                    .setDescription(idea)
                    .setColor(config.embed.color.guild)
                    .setFooter(message.author.tag, message.author.avatarURL);
                message.channel.send(embed);
                this.client.channels.get(config.channels.staff).send(embed);
                this.client.removeListener('messageReactionAdd', reactionListener);
            }
        };
        this.client.on('messageReactionAdd', reactionListener);
    }
};