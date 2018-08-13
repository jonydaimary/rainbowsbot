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
    const command = args.shift().toLowerCase();
 // Direct Messages - #00ff00
 // Chat messages - #800080

 setInterval(() => {
    let guild = client.guilds.get('469596213491138570');
    guild.members.forEach((id, member) => {
        if (member.roles.has('469612245744091181') && !member.roles.has('470625504035078154')) {
            member.addRole('470625504035078154')
        }
    });
}, 3e5)

if(command === `mute`) {
    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.sendMessage("У вас нет прав");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("Вы указали несуществующего пользователя");

    let role = message.guild.role.some(r=> ["RBMute"].includes(r.name));
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

    if(toMute.roles.has(role.id)) return message.channel.sendMessage("Этот пользователь уже замучен");

    await toMute.addRole(role);
    message.channel.sendMessage("Пользователь замучен");

    return

}

if(command === `unmute`) {
    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.sendMessage("У вас нет прав");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("Вы указали несуществующего пользователя");
    
    let role = message.guild.role.some(r=> ["RBMute"].includes(r.name));
    
    if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("Этот пользователь не замучен");

    await toMute.removeRole(role);
    message.channel.sendMessage("Пользователь размучен");

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
    .addField("Причина", reason);

    let reportingEmbed = new Discord.RichEmbed()
    .setDescription("Жалоба отправлена")
    .setColor("#800080")
    .addField("Нарушитель", `${rUser}, ID: ${rUser.id}`)
    .addField("Причина", reason);

    let reportschannel = message.guild.channels.find(`name`, "стафф-чат");
    if(!reportschannel) return message.channel.send("Не могу найти канал, для отправки жалобы");
    
    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    message.channel.send(reportingEmbed)
    
    return;
    }
   
 
 if (command === 'vip') {
        let embed = new Discord.RichEmbed()
        .setTitle('Платная роль "VIP"')
        .setDescription(`**Перед покупкой оповестить <@340171098874183680>**`)
        .addField(`**Цена**`,`50₽`)
        .addField(`Оплата`, `http://www.donationalerts.ru/r/rainbows_server`)
        .setColor('#800080');
        
            message.channel.send({embed})
        }
        
    if (command === 'premium') {
        let embed = new Discord.RichEmbed()
        .setTitle('Платная роль "PREMIUM"')
        .setDescription(`**Перед покупкой оповестить <@340171098874183680>**`)
        .addField(`**Цена**`,`100₽`)
        .addField(`Оплата`, `http://www.donationalerts.ru/r/rainbows_server`)
        .setColor('#800080');
            
            message.channel.send({embed})
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
        .addField('Главный администратор, владелец сервера:', '<@340171098874183680>')
        .addField('Главный администратор','<@305408196078600192>')
        .addField('Главные модераторы:', '\n<@291277208431886356>\n<@392738552225464325>')
        .addField('Модераторы:', '\n<@323053088346865665>\n<@287844541627891712>')
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
            .setDescription(`Информация о командах\n\n __S__ - команды, доступные только персоналу \n\n**   rb!** - префикс бота\n\n **• vip** - команда для покупки VIP\n **• premium** - команда для покупки PREMIUM\n **• help** - команда, которая вызывает перечень команд бота \n **• gif** - команда, которая отправляет GIF-изображение сервера\n **• report** - команда, которая отправляет жалобу на игрока \n __S__ **• user** - команда, которая показывает основную информацию о пользователе \n **• staff** - команда, которая показывает персонал сервера\n __S__ **•(un)mute** - команда, которая мутит игрока\n \n **Для просмотра второй страницы введите rb!help2**`)
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