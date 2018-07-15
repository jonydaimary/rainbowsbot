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
    .addField('Информация о сервере', `Основной аудиторией которого являются игроки абсолютно всех жанров игр. На сервере всегда можно поискать напарника по другим игровым дисциплинам.\n Обязательно прочитай <#390193321315926017>. \n **Мы рады, что ты зашел к нам** \n По вопросам обращайся к Главному Администратору, Главному модератору или Модератору\n\nЧеловек на сервере: **${member.guild.memberCount}**\n`)
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
    
    client.channels.get('400010351518941195').send({embed});
    client.channels.get('357086268234137610').send({embed});
    
})

client.on('guildMemberRemove', (member) => {
    let embed = new Discord.RichEmbed()
    .setTitle(`Участник покинул сервер`)
    .setDescription(`С сервера ушел ${member.user.tag}`)
    .setColor('#800080')
    .setFooter(`Rainbow's server 🌈 Goodbye!`)
    
    client.channels.get('400010351518941195').send({embed});
    
})

client.on("message", async message => {
    
 // Direct Messages - #00ff00
 // Chat messages - #800080

    


module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}
  
 
 if (command === 'a') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`ДОБРО ПОЖАЛОВАТЬ`, `Перед тем, как начать общение на нашем севере, ознакомьтесь с основной информацией`)
        .setFooter(`Администрация | 11.07.2018`)
        .setColor(`#800080`)
        .setThumbnail(`https://i.imgur.com/r1yKCSM.jpg`);

        message.channel.send({embed})
        }

        if(command === 'report') {
            let rUser = message.guild.member(message.mentions.users.first() || message.get.members.get(args[0]));
            if(!rUser) return message.channel.send("Не могу найти пользователя");
            let reason = args.join(" ").slice(22);
            
            let reportEmbed = new Discord.RichEmbed()
            .setDescription("Жалоба")
            .setColor("#800080")
            .addField("Нарушитель", `${rUser}, ID: ${rUser.id}`)
            .addField("Жалоба отправлена", `${message.author}, ID: ${message.author.id}`)
            .addField("Канал", message.channel)
            .addField("Время", message.createdAt)
            .addField("Причина", reason)

            let reportedEmbed = new Discord.RichEmbed()
            .addField("Жалоба отправлена", `В скором времени персонал проверит её`)
            .addField("Нарушитель", `${rUser}`)
            .addField("Причина", reason)
            .setColor("#800080");
            
            let reportschannel = message.guild.channels.find(`name`, "staffchat");
            if(!reportschannel) return message.channel.send("Не могу найти канал, для отправки жалобы");
            
            message.delete().catch(O_o=>{});
            reportschannel.send(reportEmbed);
            message.channel.send(reportedEmbed);
            
            return;
            }
    
        if (command === 'b') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`ПОСТОЯННАЯ ССЫЛКА НА СЕРВЕР`, `https://discord.gg/qZWdVRj`)
        .addField(`• donationallerts`, `http://www.donationalerts.ru/r/rainbows_server\n**• qiwi**\nhttps://qiwi.me/rbserver`)
        .setThumbnail(`https://imgur.com/r1yKCSM`)
        .setColor(`#800080`)
        .setFooter(`Администрация | 11.07.2018`);
    
        message.channel.send({embed})
        }

    if (command === 'c') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`О НОВИЧКАХ`,'У каждого есть роль **Новичок**. Она выдаётся при подключении к серверу. Новичок не имеет никаких особых прав и привилегий на сервере')
        .setColor(`#800080`)
        .setFooter(`Администрация | 11.07.2018`);
        
        message.channel.send({embed})
        }

    if (command === 'd') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`РОЛИ СЕРВЕРА`, `**Главный администратор** является главным на сервере. Он следит, чтобы персонал выполнял свои обязанности и отвечает за рекламу сервера\n\nЕсли вы встретили нарушителя вы можете пожаловаться на него персоналу с ролями **Главный модератор** и **Модератор**\n\n**Помощник** - это человек, отвечающий на все вопросы участников **в специальном текстовом канале**\n\n\n\nЕсли вы долгое время на сервере и персонал вам доверяет, Вы можете получить роль **Проверенный участник** Она выдаётся по желанию администрации\n\nРоль **Кодер** выдаётся участникам, умеющих программировать на различных языках`)
        .setColor(`#800080`)
        .setFooter(`Администрация | 11.07.2018`);  
        message.channel.send({embed})
    }

    if (command === 'e') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`ПАРТНЁРСТВО`, `На нашем сервере предусмотрен обмен партнерскими ссылками. Вы должны сообщить **Главному администратору** о том, что вы хотите стать партнёром. Если вашу заявку примут, Вам скажут о дальнейших действиях\n**РАЗМЕЩЕНИЕ ПАРТНЁРСКИХ ССЫЛОК БЕЗ СОГЛАСИЯ АДМИНИСТРАЦИИ ЗАПРЕЩЕНО**\n\n**ТРЕБОВАНИЯ ДЛЯ ПАРТНЕРОВ**\n\n• На Вашем сервере должно быть не менее 70 участников (не считая ботов)\n• На Вашем сервере должен присутствовать актив (должно происходить общение)\n• Вы должны разместить наш партнёрский текст на своём сервере`)
        .setColor(`#800080`)
        .setFooter(`Администрация | 11.07.2018`);
        
        message.channel.send({embed})
        }

    if (command === 'f') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`ТЕКСТОВЫЕ КАНАЛЫ`, `#информация - канал, в котором представлена **основная информация**\n#правила - канал, в котором написаны **правила**\n#партнеры - канал для обмена **партнерскими ссылками**\n#события - канал для публикации **новостей** на сервере\n#chat - основной **чат** сервера\n#bots - канал для использования **ботов** \n#colors - канал для изменения **цвета**\n#support-chat - канал, в котором Вы можете посмотреть задать свои вопросы\n#achievements - канал для информации о **достижениях**\n#java - канал тематики языка Java\n#java-script - канал тематики языка JavaScript\n#python - канал тематики языка Python\n#php - канал тематики языка PHP`)
        .setColor(`#800080`)
        .setFooter(`Администрация | 11.07.2018`);

            
        message.channel.send({embed})
        }
        
    if (command === 'g') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`СИСТЕМА ВАРНОВ`, `**WARN** - предупреждение\nУ каждого участника есть право получить 3 варна. Они выдаются за нарушение правил. Администрация в праве кикать/понижать в должности при накоплении трёх варнов`)
        .setColor(`#800080`)
        .setFooter(`Администрация | 11.07.2018`);
    
        message.channel.send({embed})
        }

    if (command === 'h') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`СИСТЕМА ОПЫТА`, `По мере получения новых уровней Вы можете получить роли, с более полезными правами\n\nНиже представлены требования для получения ролей\n\n**Новичок** - 0 уровень\n**Поселенец** - 3 уровень\n**Местный** - 6 уровень\n**Старейшина** - 10 уровень\n\nУровень можно повысить проявляя активность в чате. Для того, чтобы избежать спама, бот засчитывает только одно сообщение в минуту. При получении уровня бот отправляет Вам в ват сообщение об этом`)
        .setColor(`#800080`)
        .setFooter(`Администрация | 11.07.2018`);

        
        message.channel.send({embed})
        }

    if (command === 'i') {
         message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`ВИДЫ ФИНАНСОВОЙ ПОДДЕРЖКИ`, `Вы можете поддержать нас. Все деньги пойдут на улучшение и развитие сервере`)
        .setColor(`#800080`);
      
        message.channel.send({embed})
        }

    if (command === 'j') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`ДОНАТ`, `**DONATE** - пожертвование\nВы можете пожертвовать некоторую сумму нашему серверу. При пожертвовании от **50₽** вы получаете роль @VIP . При пожертвовании от **100₽** вы получаете роль @PREMIUM\nВсе деньги идут на развитие сервера`)
        .setColor(`#800080`)
        .setFooter(`Администрация | 11.08.2018`)
         
        message.channel.send({embed})
    }

    if (command === 'k') {
        message.delete();
        let embed = new Discord.RichEmbed()
        .addField(`РЕКВЕЗИТЫ ОПЛАТЫ`, `**QIWI КОШЕЛЁК**\nhttps://qiwi.me/rbserver\n**ЯНДЕКС.ДЕНЬГИ**\n410013536900031`)
        .setThumbnail(`https://corp.qiwi.com/dam/jcr:fbce4856-723e-44a2-a54f-e7b164785f01/qiwi_sign_rgb.png`)
        .setColor(`#800080`);
         
        message.channel.send({embed})
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
    .setDescription('https://discord.gg/qZWdVRj')
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
            .setDescription(`Информация о командах\n\n __S__ - команды, доступные только персоналу \n\n**   rb!** - префикс бота\n\n **• vip** - команда для покупки VIP\n **• premium** - команда для покупки PREMIUM\n **• help** - команда, которая вызывает перечень команд бота \n **• gif** - команда, которая отправляет GIF-изображение сервера\n **• report** - команда, которая отправляет жалобу на игрока \n __S__ **• user** - команда, которая показывает основную информацию о пользователе \n **• staff** - команда, которая показывает персонал сервера \n \n **Для просмотра второй страницы введите rb!help2**`)
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
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
    
});
 
client.login(process.env.TOKEN).catch(console.error);