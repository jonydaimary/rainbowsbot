const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = process.env.TOKEN
const ms = require("ms");

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`rb!help`, { type : 'STREAMING', url: 'https://twitch.tv/romanvoyoutube'}).catch(console.error);
});
 
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id, ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`rb!help`, { type : 'STREAMING', url: 'https://twitch.tv/romanvoyoutube'}).catch(console.error);
});
 
client.on("guildDelete", guild => {
    
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`rb!help`, { type : 'STREAMING', url: 'https://twitch.tv/romanvoyoutube'}).catch(console.error);
});

client.on('guildMemberAdd', (member) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("R𝕒i𝕟b𝕠w#1111", "https://i.imgur.com/vM67SRdh.jpg")
    .setTitle('Добро пожаловать на Rainbow`s Server!')
    .setDescription('Rainbow`s Server — это стремительно развивающийся сервер Discord')
    .addField('Информация о сервере', `Основной аудиторией которого являются игроки абсолютно всех жанров игр. На сервере всегда можно поискать напарника по другим игровым дисциплинам.\n Обязательно прочитай <#469599206991200256>. \n **Мы рады, что ты зашел к нам** \n По вопросам обращайся к Главному Администратору, Главному модератору или Модератору\n\nЧеловек на сервере: **${member.guild.memberCount}**\n`)
    .setColor('00ff00')
    .setFooter('Rainbow`s server 🌈 Welcome!');
    
    member.send({embed});
    
})

client.on('guildMemberAdd', (member) => {
    let embed = new Discord.RichEmbed()
    .setTitle(`Новый участник сервера`)
    .setDescription(`К серверу присоединился ${member.user.tag}, `)
    .setColor('#800080')
    .setFooter(`Rainbow's server 🌈 Welcome!`)
    .setThumbnail(`https://media.giphy.com/media/dIL9AEkMQel0QLIjRR/giphy.gif`);
    
    client.channels.get('469599515561689092').send({embed});
    client.channels.get('469600390455885833').send({embed});
    
})

client.on('guildMemberRemove', (member) => {
    let embed = new Discord.RichEmbed()
    .setTitle(`Участник покинул сервер`)
    .setDescription(`С сервера ушел ${member.user.tag}`)
    .setColor('#800080')
    .setFooter(`Rainbow's server 🌈 Goodbye!`)
    
    client.channels.get('469600390455885833').send({embed});
    
})

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command =  args.shift().toLowerCase();
 // Direct Messages - #00ff00
 // Chat messages - #800080

 function embed_error(text) {
    let error_emoji = client.emojis.get(emojis.error);
    return new Discord.RichEmbed()
        .setTitle('Ошибка')
        .setColor('#C34E4E')
        .setFooter('Rainbow`s Server')
        .setDescription(`${error_emoji} ${text}`);
 }
 
 if (command === `warn`) {
    message.delete();
    let new_args = args;
    new_args.shift();
    let reason = new_args.join(' ').trim();

    let user = message.mentions.members.first();
    if (!user) return message.channel.send({embed: embed_error(`${message.author}, извините, но пользователь, которого вы упомянули, не является участником сервера или не существует`)});
    if (user.user.id === message.author.id) return message.channel.send({embed: embed_error(`${user.user}, извините, но вы не можете наказать самого себя.`)});
    if (user.user.bot) return message.channel.send({embed: embed_error(`${message.author}, извините, но вы не можете наказать бота`)});
    let reasontext = '';
    if (reason !== null && typeof reason !== undefined && reason !== '') reasontext = ` с причиной \`${reason}\``;
    if (reason === null || typeof reason === undefined || reason === '') reason = 'Причина не указана.';
    let accepting = message.channel.send(`Вы уверены, что хотите выписать предупреждение пользователю \`${user.user.tag}\`${reasontext}?\n\n**Напишите \`да\`, чтобы подтведить.**`);
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
    collector.on('collect', msg => {
        if (['да', 'ага', 'кнш', 'конечно', 'конешно', 'давай', 'йес', 'yes', 'y', 'aga', 'go', 'da', 'го'].includes(msg.content.toLowerCase())) {
                try {
                    let data = JSON.parse(body);
                    let footer = 'Rainbow`s Warnings' + data.id;
                    if (reason === null || typeof reason === 'undefined') reason = 'Причина не указана.';
                    let embed = new Discord.RichEmbed()
                        .setTitle('Предупреждение')
                        // .setDescription(`**Пользователь:** ${user.user}\n**Модератор:** ${message.author}\n**Причина:**\n\n${reason}`)
                        .addField('Пользователь', `${user.user} (\`${user.user.tag}\`)`, true)
                        .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
                        .setFooter(footer)
                        .setColor('#800080');
                    if (reason !== null && typeof reason !== undefined && reason !== '') embed.addField('Причина', `${reason}`);
                    message.channel.send(`${user.user}`, {embed}).then(() => {
                    });
                    message.guild.channels.get('426756919777165312').send({embed});
                } catch (Exception) {message.channel.send({embed: embed_error('Ошибка варна.')})}
            }
        });

    }


 if (command === 'lock') {
    let blacklist = [
        '469601334841311262',
        '469709697939669022',
        '469602360071815168',
        '469602042051035156',
        '469607537843634176',
    ];

    let channel = message.member.voiceChannel;
    if (!channel) return;
    if (blacklist.includes(channel.id)) return;
    channel.overwritePermissions(channel.guild.roles.find('name', '\@everyone'), {
        CONNECT: false
    })
    channel.overwritePermissions(message.author.id, {
        CONNECT: true
    })

}   

if (command === 'unlock') {
    let blacklist = [
        '469601334841311262',
        '469709697939669022',
        '469602360071815168',
        '469602042051035156',
        '469607537843634176',
    ];

    let channel = message.member.voiceChannel;
    if (!channel) return;
    if (blacklist.includes(channel.id)) return;
    channel.overwritePermissions(channel.guild.roles.find('name', '\@everyone'), {
        CONNECT: null
    })
}

if(command === `mute`) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Вы указали несуществующего пользователя");

    

    let role = message.guild.roles.find(r => r.name === "RBMute");
    if(!role) {
        try {
            role = await message.guild.createRole({
                name: "RBMute",
                color: "#00000",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }

    if(toMute.roles.has(role.id)) return message.channel.send("Этот пользователь уже замучен");

    await toMute.addRole(role);

    let reason = args.join(" ").slice(22)
    let muteschannel = message.guild.channels.find(`name`, "стафф-чат")

    
    let embed = new Discord.RichEmbed()
    .setDescription("Пользователь замучен")
    .setColor("#800080")
    .addField("Кого замутили:", toMute.toString())
    .addField("Кто замутил:", `${message.author}`)
    .addField("Причина:", reason || 'Причина не указана');

    message.channel.send(embed)
    muteschannel.send(embed);


    return

}

if(command === `unmute`) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Вы указали несуществующего пользователя");
    
    let role = message.guild.roles.find(r => r.name === "RBMute");
    
    if(!role || !toMute.roles.has(role.id)) return message.channel.send("Этот пользователь не замучен");

    await toMute.removeRole(role)
    let muteschannel = message.guild.channels.find(`name`, "стафф-чат");

    let embed = new Discord.RichEmbed()
    .setDescription("Пользователь размучен")
    .setColor("#800080")
    .addField("Кто размучен:", toMute.toString())

    message.channel.send(embed)
    muteschannel.send(embed);

    return

}


if (command === 'report') {
    let rUser = message.guild.member(message.mentions.users.first() || message.get.members.get(args[0]));
    if(!rUser) return message.channel.send("Не могу найти пользователя");
    let reason = args.join(" ").slice(22);
    
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Жалобы")
    .setColor("#800080")
    .addField("Нарушитель", `${rUser}, ID: ${rUser.id}`)
    .addField("Жалоба отправлена", `${message.author}, ID: ${message.author.id}`)
    .addField("Канал", message.channel)
    .setTimestamp(message.createdAt)
    .addField("Причина:", reason);

    let reportingEmbed = new Discord.RichEmbed()
    .setDescription("Жалоба отправлена")
    .setColor("#800080")
    .addField("Нарушитель", `${rUser}, ID: ${rUser.id}`)
    .addField("Причина:", reason);

    let reportschannel = message.guild.channels.find(`name`, "стафф-чат");
    if(!reportschannel) return message.channel.send("Не могу найти канал, для отправки жалобы");
    
    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    message.channel.send(reportingEmbed)
    
    return;
    }
   
 
    if (command === 'playlist') {
    let embed = new Discord.RichEmbed()
    .setTitle('Ссылки на музыкальные плейлисты')
    .addField('Monstercat', `https://www.youtube.com/playlist?list=PLe8jmEHFkvsaDOOWcREvkgFoj6MD0pQ67`)
    .addField('DubstepGutter', `https://www.youtube.com/watch?v=HD3BbsFR0Kk&list=PLAL-r3tHdQs0-7uaF76kAyhZCVpy-3k2v`)
    .addField('Proximity', `https://www.youtube.com/watch?v=PJRj2rIQEF4&list=PL3osQJLUr9gJC2gv-uC2IB8xuFfbWamag\n https://www.youtube.com/watch?v=SMs0GnYze34&list=PL3osQJLUr9gJBEBihy6C6x3fiRec_PtQK`)
    .addField('TrapNation', `https://www.youtube.com/watch?v=pxR2A7NApYI&list=PLC1og_v3eb4jJtActnUFBXYrTbr7oF6N-`)
    .setColor('#800080');
    
        message.channel.send({embed})
    }
    
    if (command === 'link') {
    let embed = new Discord.RichEmbed()
    .setTitle('Ссылка-приглашение для Rainbow`s Server')
    .setDescription('https://discord.gg/CtRp5GB')
    .setColor('#800080');

        message.channel.send({embed})
    }
    
    if (command === 'staff') {
        let embed = new Discord.RichEmbed()
        .setTitle('Персонал сервера')
        .addField('Главный администратор:', '<@340171098874183680>')
        .addField('Администратор','<@305408196078600192>')
        .addField('Главные модераторы:', '\n<@291277208431886356>\n<@392738552225464325>')
        .addField('Модератор:', '\n<@323053088346865665>')
        .setThumbnail(`https://media.giphy.com/media/1Q9CsjzWyt2qVzM0GH/giphy.gif`)
        .setColor('#800080');
    
            message.channel.send({embed})
        }
        

    if (command === 'user') {
        message.delete();
        let member = message.mentions.members.first();
        if (!member) user = message.member;
        let arr = {'online': 'Онлайн', 'dnd': 'Не беспокоить', 'idle': 'Нет на месте', 'offline': 'Оффлайн'};
        let embed = new Discord.RichEmbed()
        .setTitle("Информация о пользователе")
        .setColor('#800080')
        .setDescription(`**Name**: ${member.displayName} \n**ID**: ${member.id} \n**Status**: ${arr[member.user.presence.status]}`)
        .setThumbnail(member.user.avatarURL);
        
        message.channel.send({embed});
        
        }
    
    if (command === 'status') {
        message.delete();
        let user = message.mentions.users.first();
        if (!user ) return message.channel.send('Ошибка');
        let arr = {'online': 'Онлайн', 'dnd': 'Не беспокоить', 'idle': 'Нет на месте', 'offline': 'Оффлайн'};
        message.channel.send(arr[user.presence.status]);
        }
    
    if (command === 'help') {
        let embed = new Discord.RichEmbed()
            .setTitle("Помощь")
            .setColor('#800080')
            .setDescription(`Информация о командах\n\n __S__ - команды, доступные только персоналу \n\n**   rb!** - префикс бота\n\n**• help** - команда, которая вызывает перечень команд бота \n**lock** - команда, которая закрывает комнату\n**unlock** - команда, которая открывает комнату\n **• gif** - команда, которая отправляет GIF-изображение сервера\n **• report** - команда, которая отправляет жалобу на игрока \n __S__ **• user** - команда, которая показывает основную информацию о пользователе \n **• staff** - команда, которая показывает персонал сервера\n __S__ **•(un)mute** - команда, которая мутит игрока\n \n **Для просмотра второй страницы введите rb!help2**`)
            .setFooter("Страница 1/2");

            message.channel.send({embed});

          }
        if (command === 'help2') {
        let embed = new Discord.RichEmbed()
            .setTitle("Помощь")
            .setColor('#800080')
            .setDescription(`Информация о командах \n \n __S__ **• ban** - команда, которая банит игрока на сервере \n __S__ **•kick** - команда, которая выгоняет игрока с сервера \n __S__ **• purge** - команда, которая очищает определенное кол-во сообщений в чате \n **• ping** - команда, которая отправляет запрос на сервер \n **•info** - команда, которая содержит ключевую информацию о боте \n __S__ **•stats** - команда, которая содержит статистику бота в данный момент \n **• link** - команда, которая отправляет приглашение на сервер\n **• playlist** - команда, которая отправляет ссылки на музыкальные плейлисты (используется совместно с Rythm ботом)`)
            .setFooter("Страница 2/2");
    
            message.channel.send({embed});
    
        }
    
    if (command === 'info') {
        let embed = new Discord.RichEmbed()
            .setTitle("Rainbow`s Private bot")
            .setColor('#800080')
            .setDescription(`***Rainbow's Bot - бот, который разработан на языке JavaScript \nСпециально создан для Rainbow's Server***`)
            .setFooter("Created by R𝕒i𝕟b𝕠w#1111", "https://i.imgur.com/vM67SRdh.jpg");

            message.channel.send({embed});

          }

     if (command === 'gif') {
        let embed = new Discord.RichEmbed()
            .setTitle('Как вам GIF-ка?')
            .setDescription("Rainbow`s Server's GIF image")
            .setColor('#800080')
            .setThumbnail("https://media.giphy.com/media/1jl6KT45wrBmlOgd83/giphy.gif")
    
             message.channel.send({embed});
    
            }

    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
 
    if(command ==="stats") {
    if(!message.member.roles.some(r=>["Главный Администратор"].includes(r.name)) )
        return message.reply("у вас нет прав для выполнения данной команды");
        const embed = new Discord.RichEmbed()
            .setColor(`#00ff00`)
            .setTitle('Статистика')
            .setThumbnail(client.user.avatarURL);
        embed.addField('Пинг', client.ping, true);
        embed.addField('ОЗУ', `25`);
        embed.addField('Сервер', 'Rainbow`s Server');
        embed.addField('Порт', `58973009457`);
        let guilds = [];
        client.guilds.forEach(function (guild) {guilds.push(guild.name)});
        embed.addField('Гильдии', '```'+guilds.join('\n')+'```');
        message.author.send(embed);
        message.delete();
    }

    if (command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }
 
    if (command === "kick") {
        if(!message.member.roles.some(r=>["Главный Администратор", "Главный Модератор", "Модератор"].includes(r.name)) )
            return message.reply("у вас нет прав для выполнения данной команды");
 
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
            return message.reply("Укажите существующего пользователя");
        if(!member.kickable)
            return message.reply("Вы не можете этого сделать");
 
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
 
        await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} for reason: ${reason}`);
 
    }
 
    if(command === "ban") {
        if(!message.member.roles.some(r=>["Главный Администратор"].includes(r.name)) )
            return message.reply("у вас нет прав для выполнения данной команды");
 
        let member = message.mentions.members.first();
        if(!member)
            return message.reply("Укажите существующего пользователя");
        if(!member.bannable)
            return message.reply("Вы не можете этого сделать");
 
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
 
        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
 
    if(command === "purge") {
        const deleteCount = parseInt(args[0], 10);
 
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Укажите число от 2 до 100");
        if(!message.member.roles.some(r=>["Главный Администратор", "Главный Модератор", "Модератор"].includes(r.name)) )
            return message.reply("у вас нет прав для выполнения данной команды");
 
        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Вы не можете удалить сообщения из-за ${error}`));
    }
    
 });
 
client.login(process.env.TOKEN).catch(console.error);
