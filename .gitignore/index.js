const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = '/';

const fs = require("fs-extra");

client.login(process.env.TOKEN)



client.on('ready', () => {
    console.log("WiiZ Modération Allumé !")
    client.user.setStatus("Online")
    client.user.setGame(client.guilds.map(`/help | WiiZ Mod`))
    // message.channel.send(client.guilds.map(r => r.name + ` | **${r.memberCount}** membres`))
})

client.on('message', message => {

    if(message.content === 'Bonjour'){
        message.channel.send("Bonsoir :tada:\nNon j'dec\nSalut, comment ca va ?");
        console.log("Commande Bonjour");
    }

    if(message.content === "Bien"){
      message.channel.send("bah parfait du coup !");
    }

    if(message.content === "Le bot prend la conf"){
      message.channel.send("Walah, c'est qui qui prend la conf !\nExcuse toi !");
    }

    if(message.content === "Pardon"){
      message.channel.send("Je préfere ca !")
    }

    if(message.content === "Hey"){
      message.channel.send("Hey salut a tous les amis, c'est David LaFarge Pokemon !!")
    }


// HELP DEBUT
    if(message.content.startsWith(prefix + "mod")) {
      var mod_embed = new Discord.RichEmbed()
      .setColor("#B9121B")
      .setTitle("Page d'aide de Moderation :tools:")
      .setThumbnail(message.author.avatarURL)
      .addField("Modération - Basique :tools:", "/kick - Permet de kick un utilisateur\n/mute - Permet de mute un utilisateur\n/unmute - Permet d'unmute un utilisateur\n/clear - Permet de supprimer un nombre de message définie\n/ping - Permet d'afficher la latence avec le serveur\n/serverlist - Permet d'afficher touts les serveur ou WiiZBot est connecté !\n/regle - Affiche les règles du serveur ")
      .addField("Modération - Avancé :tools:", "/ban - Permet de ban un utilisateur\n/warn - Permet d'avertir un utilisateur\n/seewarns - Permet d'afficher les avertissement d'un utilisateur\n/deletewarns - Permet de supprimer un avertissement d'un utilisateur\n/dlchannel - Supprime le channel où tu te trouves")
      message.channel.send(mod_embed);
    }

    if(message.content === prefix + 'sb'){
      var sb_embed = new Discord.RichEmbed()
      .setColor("#046380")
      .setTitle("Page d'aide des Infos :bulb:")
      .setThumbnail(message.author.avatarURL)
      .addField("Commandes:",  "/statistique - Envoie les statistiques de l'utilisateur en privé\n/info - Affiche les infos du bot et du serveur\n/part - Affiche la liste des Partenaires\n/avatar - Affiche ton avatar\n/d invite - Créer une invitation du salon")
      message.channel.send(sb_embed);
    }

    if(message.content === prefix + 'fun/utilisateur'){
      var fun_embed = new Discord.RichEmbed()
      .setColor("#FDD131")
      .setTitle("Page d'aide des commandes Fun/Utiles :tada:")
      .setThumbnail(message.author.avatarURL)
      .addField("Commandes:", "/8ball <question> - Le bot vous donne une réponse\nBonjour - Le bot répond\n/pokemon - Affiche les paroles du générique de Pokemon\n/dog - Affiche des gifs de chiens\n/nbr - Affiche toutes les choses utiles à savoir\n/avatar - Affiche ton avatar")
      message.channel.send(fun_embed);

    }

    if(message.content === "w-i"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Page d'aide :wink:")
      .setThumbnail(message.author.avatarURL)
      .addField("Modération :tools:", "Faites `/mod` pour afficher les commandes de modération")
      .addField("Infos :bulb:", "Faites `/sb` pour afficher les commandes d'infos")
      .addField("Fun :tada:", "Faites `/fun` pour afficher les commandes fun")
      .addField(":warning: INFO IMPORTANTE :warning:", "NE PAS FAIRE DE COMMANDE EN PRIVE !!\nSauf `/mod`,`fun`,`sb`")
      .setFooter("Dev by wiiz")
      message.channel.send(help_embed);
      console.log("Menu d'aide demandé !")

    }

    if(message.content === "w-p"){
      var help_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Page d'aide :wink:")
      .setThumbnail(message.author.avatarURL)
      .addField("Modération :tools:", "Faites `/mod` pour afficher les commandes de modération")
      .addField("Infos :bulb:", "Faites `/sb` pour afficher les commandes d'infos")
      .addField("Fun :tada:", "Faites `/fun` pour afficher les commandes fun")
      .addField(":warning: INFO IMPORTANTE :warning:", "NE PAS FAIRE DE COMMANDE EN PRIVE !!\nSauf `/mod`,`fun`,`sb`")
      .setFooter("Dev by wiiz")
      message.reply("Check Your DM's")
      message.author.send(help_embed);
      console.log("Menu d'aide demandé !")

    }

    if(message.content === prefix + "help"){
        message.channel.send("Où veux tu que la page d'aide apparaisse ? \n```css\nw-i\n[ICI]```\n")
        message.channel.send("```css\nw-p\n[PRIVÉ]```")
    }
// HELP FIN
    if(message.content === prefix + 'info') {
        var info_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("Voici les infos sur moi et sur le serveur")
        .addField(" :robot: Nom du bot :", `${client.user.username}`, true)
        .addField(":hash: Descriminateur du bot", `#${client.user.discriminator}`)
        .addField(":id: ID du bot", `${client.user.id}`)
        .addField(":name_badge: Nom du discord", message.guild.name)
        .addField(":fire: Créateur du discord", message.guild.owner)
        .addField(":id: ID du créateur", message.guild.ownerID)
        .addField(":100: Nombre de membres sur le serveur :", message.guild.members.size)
        .addField(":100: Nombre de catégories et de salons :", message.guild.channels.size)
        .addField(":100: Nombre de roles", message.guild.roles.size)
        .setThumbnail(message.guild.iconURL)
        .setFooter("Info - wiiz")
        message.channel.sendMessage(info_embed)
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous ne pouvez pas effectuer ceci !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Veuillez mentionner un utilisateur ! :x:")
        }
        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Utilisateur imposible à expulser ou celui-ci n'existe pas")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission de kick");
        }

        kick.kick().then(member => {
          var kick_embed = new Discord.RichEmbed()
            .setTitle("Kick")
            .addField("Membre kick", member.user.username)
            .addField("Kick Par", message.author.username)
            message.channel.send(kick_embed);
        });
    }

    if(message.content.startsWith(prefix + 'ban')) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Tu ne peux pas ban d'utilisateur !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Veuillez mentionner un utilisateur a ban :x:");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne peut pas ban cet utilisateur, celui ci n'existe peut être pas ou est plus puissant que moi :thinking:");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission de ban");
        }
        ban.ban().then(member => {
            message.channel.send(`**${member.user.username}** a été banni par __${message.author.username}__`)
        }

        )
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Précise un nombre de message a supprimer")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`**${args[0]}** messages supprimés !`);
        })
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Veuillez mentionner un utilisateur");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Utilisateur introuvable ou impossible à mute");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission de mute");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} a été mute !`);
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Veuillez mentionner un utilisateur");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Utilisateur introuvable ou impossible à mute");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission de mute");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n est plus mute !`);
        })
    }

    //NE PAS OUBLIER LES PREREQUIS DANS LA VIDEO :

var fs = require('fs');

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

if (message.content.startsWith(prefix + "warn")){

if (message.channel.type === "dm") return;

var mentionned = message.mentions.users.first();

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

if(message.mentions.users.size === 0) {

  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");

}else{

    const args = message.content.split(' ').slice(1);

    const mentioned = message.mentions.users.first();

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          if (args.slice(1).length != 0) {

            const date = new Date().toUTCString();

            if (warns[message.guild.id] === undefined)

              warns[message.guild.id] = {};

            if (warns[message.guild.id][mentioned.id] === undefined)

              warns[message.guild.id][mentioned.id] = {};

            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;

            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){

              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};

            } else {

              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),

                time: date,

                user: message.author.id};

            }

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

message.delete();

            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');

message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

}



  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

    const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size !== 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          try {

            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

              return;

            }

          } catch (err) {

            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

            return;

          }

          let arr = [];

          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");

          for (var warn in warns[message.guild.id][mentioned.id]) {

            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+

            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");

          }

          message.channel.send(arr.join('\n'));

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

          console.log(args);

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }





  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

   const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    const arg2 = Number(args[1]);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){

          if (!isNaN(arg2)) {

            if (warns[message.guild.id][mentioned.id] === undefined) {

              message.channel.send(mentioned.tag+" n'a aucun warn");

              return;

            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {

              message.channel.send("**:x: Ce warn n'existe pas**");

              return;

            }

            delete warns[message.guild.id][mentioned.id][arg2];

            var i = 1;

            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){

              var val=warns[message.guild.id][mentioned.id][key];

              delete warns[message.guild.id][mentioned.id][key];

              key = i;

              warns[message.guild.id][mentioned.id][key]=val;

              i++;

            });

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              delete warns[message.guild.id][mentioned.id];

            }

            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);

            return;

          } if (args[1] === "tout") {

            delete warns[message.guild.id][mentioned.id];

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);

            return;

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

        }

      } else {

       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "statistique":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
        .setColor("#FCDC12")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur :id:`, msgauthor, true)
        .addField(`Statut de l'utilisateur`, message.author.status, true)
        .addField(`Plus haut role de l'utilisateur`, `${message.author.top_role}`)
        .addField(`Date de création de l'utilisateur:`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.channel.send({embed: stats_embed});
        break;
        case "ping":
        message.channel.sendMessage('Temps de latence avec le serveur: `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
        break;
        case "serverlist":
        message.channel.send(client.guilds.map(r => r.name + ` | **${r.memberCount}** membres`))
        break;
    }

// --------------------------  FUN  ----------------------------------------------------

const réponse = JSON.parse(fs.readFileSync("./eightball.json", "utf8"));

if (message.content.startsWith(prefix + "8ball")) {

    var args = message.content.split(" ").join(" ").slice(6);

    if(!args) return message.channel.send("Pose moi une question, je suis toute oui !")

    var ball_embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(":8ball: Voici mon 8ball")
    .addField("Question :", `${args}`)
    .addField('Réponse :', réponse[Math.round(Math.random() * réponse.length)])
    .setFooter("8ball - wiiz")
    message.channel.send(ball_embed);

}

    if(message.content.startsWith(prefix + 'dog')) {

        var chien = [

            "https://media.giphy.com/media/RQSuZfuylVNAY/giphy.gif",
            "https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif",
            "https://media.giphy.com/media/dTJd5ygpxkzWo/giphy.gif"
        ];

        var gif = chien[Math.floor(Math.random() * chien.length)];

        var dog_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Image aléatoir de chien :dog:")
        .setImage(gif)
        .setFooter("Image de chien - wiiz")
        message.channel.send(dog_embed);
    }

});

  client.on('message', message => {

  if(message.content === prefix + 'part') {
    var part_embed = new Discord.RichEmbed()
    .setDescription(":point_right: Liste des Partenaires :point_left:")
    .addField("Liste des Partenaires", "•------» VirToX.#0001 «------•\n•------» 𝕵𝖊𝖙𝕲𝖆𝖒𝖊#5169 «------•\n•------» ImHikaro#0991 «------•")
    message.channel.send(part_embed);

  }

  if(message.content === prefix + "pokemon") {
    var help_embed = new Discord.RichEmbed()
    .setTitle("Voici la chanson de pokemon")
    .addField("👇", "Un jour je serai le meilleur dresseur \nJe me battrai sans répit\nJe ferai tout pour être vainqueur \nEt gagner les défis \nJe parcourrai la Terre entière \nTraquant avec espoir \nLes Pokémon et leurs mystères\nLe secret de leurs pouvoirs\n[Refrain]\nPokémon\nAttrapez-les tous \nC'est notre histoire \nEnsemble pour la victoire \nPokémon \nRien ne nous arrêtera\nNotre amitié triomphera \nPokémon attrapez-les tous \nMême à notre âge\nUn voyage d'apprentissage \nÇa demande du courage \nPokémon !\nAttrapez-les tous \nAttrapez-les tous \nYeah !\n\nRien ni personne sur mon chemin\nNe pourra me briser\nCar pour accomplir mon destin\nJe suis déterminé\nQuand il faudra passer à l'action\nNos amis seront là\nEt tous ensemble nous gagnerons\nLe dernier des combats !\n\n[Refrain]\nAttrapez-les tous\nAttrapez-les tous !\nAttrapez-les tous !\nYeah !\n\n[Refrain]\nPokémon !")
    message.channel.send(help_embed);
  }

  if(message.content.startsWith(prefix + "sondage")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux pas effectuer de sondage");
      let args = message.content.split(" ").slice(1);
      let thingToEcho = args.join(" ")
      var embed = new Discord.RichEmbed()
        .setDescription(":tada: Sondage :tada:")
        .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
        .setColor("0x0000FF")
        .setTimestamp()
      message.delete();
      message.channel.send("@everyone !")
      message.channel.send(embed)
      .then(function (message) {
        message.react("✅")
        message.react("❌")
      }).catch(function() {
      });
      }});

client.on('message', message => {
  if(message.content === prefix + "role"){
    message.guild.createRole({
      name: "testrole",
      color: 'BLUE',
    })
    .then(role => console.log(`Nouveau role créer ! Nom: ${role.name}, Couleur: ${role.color}`))
    .then(role => message.channel.send("Role crée !"))
  }
})


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  if(!channel) return;
  channel.send(`**[+]** Bienvenue **${member}** sur le serveur !`)
})

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  if(!channel) return;
  channel.send(`**[-]** **${member}** nous a quittés !`)
})

client.on('message', message => {

  let msg = message.content.toLowerCase();
  let args = message.content.slice(prefix.length).trim().split(' ');
  let command = args.shift().toLowerCase();
  let say = args.join(' ');

  if(command === 'say') {
  if(!args[0]) return message.channel.send("Veuillez Introduire Un Texte ");
    var help_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField(`Annonce`, `${say}`)
    message.channel.sendEmbed(help_embed)

    message.delete();
  }
})

client .on('message', message => {
  if(message.content === prefix + "solo"){
    var solo_embed = new Discord.RichEmbed()
    .setColor("#848484")
    .addField("Situation Actuelle De L'utilisateur", "Tu es tout seul")
    .addField("Situation Actuelle Du Bot", "Il est tout seul")
    .addField("Ducoup", "Deviens ami avec le bot")
    message.channel.send("WiiZ s'ennuyait tellement qu'il a fait cette commande nulle :expressionless:")
    message.channel.send(solo_embed)
  }

  if(message.content === "Bonne nuit"){
    message.channel.send("Dors bien ^^")
  }

})


client.on('message', async message => {

  if(message.content === prefix + "regle"){
    message.channel.send("Où veux tu que la page d'aide apparaisse ? \n```css\nw-ri\n[ICI]```\n")
    message.channel.send("```css\nw-rp\n[PRIVÉ]```")
  }

  if(message.content === "w-ri"){
    message.channel.send("Règles du Samedi 29 Septembre 2018 à 19h35")
    message.channel.send("```diff\nVoici les règles:\n1). Aucune insulte n'est autorisée !\n-► Ban 1 semaine\n2). Aucune pub n'est autorisée sans le grade '▪️◾️◼️ Partenaires ◼️◾️▪️'\n-► Ban définitif !\n3). Aucune blague ou autre qui soit Raciste, homophobe,... n'est autorisée !\n-► Ban définitif !\n Règles pour le STAFF\n1). Les staff avec un grade plus bas que Super-Modérateur doivent obligatoirement demander la permission pour mettre un grade a un joueur !\n-► Unrank\n⚠️ INFOS ⚠️\nLes règles peuvent changer à tout moment !```")
  }

  if(message.content === "w-rp"){
    message.author.send("Règles du Samedi 29 Septembre 2018 à 19h35")
    message.author.send("```diff\nVoici les règles:\n1). Aucune insulte n'est autorisée !\n-► Ban 1 semaine\n2). Aucune pub n'est autorisée sans le grade '▪️◾️◼️ Partenaires ◼️◾️▪️'\n-► Ban définitif !\n3). Aucune blague ou autre qui soit Raciste, homophobe,... n'est autorisée !\n-► Ban définitif !\n Règles pour le STAFF\n1). Les staff avec un grade plus bas que Super-Modérateur doivent obligatoirement demander la permission pour mettre un grade a un joueur !\n-► Unrank\n⚠️ INFOS ⚠️\nLes règles peuvent changer à tout moment !```")
  }

})

client.on('message', message => {
  if(message.content === prefix + "test"){
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission `ADMINISTRATOR` pour effectuer les tests !")
    else {
      message.channel.send("Test effectué ci dessous ! ✅")
      message.channel.send("```css\n[TEST] TEST\n```")
    }
  }
})

client.on('message', message => {
  if(message.content === prefix + "nbr"){
    message.channel.send("```Voici toutes les choses à savoir contenant des nombres```")
    message.channel.send("Il y a `" + message.guild.members.size + "` Membres sur le serveur !")
    message.channel.send("Le bot contient `29 commandes`, dont `4` qui sont regroupées,`1` commande `INDISPONIBLE` et `1` impossible à effectuer (Message de bienvenue)")
  }
})

client.on('message', message => {
  if(message.content === prefix + "avatar"){
    message.channel.send(`Voici votre avatar : ${message.author.avatarURL}`)
  }
  if(message.content === prefix + "d invite"){
    channel.createInvite()
      .then(invite => console.log(`Created an invite with a code of ${invite.code}`))
      .catch(console.error);
  }
  if(message.content.startsWith(prefix + "dlchannel")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux pas supprimer de channels\nIl te manque la permission `ADMINISTRATOR`");
    // Delete the channel
    channel.delete()
      .then(console.log)
      .catch(console.error);
  }

})


// client.on('message', message => {
//   if(message.content === prefix + "help#2"){
//     var help2_embed = new Discord.RichEmbed()
//     .setTitle(message.author.name)
//     .setColor("#4589f7")
//     .addField("Title is : " + message.title)
//     .addField("Color is : " + message.color)
//     message.channel.send(help2_embed); 
//   }
// })


// client.on('message', async message => {

//   if(message.author.client) return;
//   if(message.channel.type === 'dm') return;

//   let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

//   if(!prefixes[message.guild.id]){
//     prefixes[message.guild.id] = {
//       prefixes: botconfig.prefix
//     };
//   }

//   let prefix = prefixes[message.guild.id].prefixes;
//   console.log(prefix);

//   let messageArray = message.content.split(" ");
//   let cmd = messageArray[0];
//   let args = messageArray.slice(1);
//   let commandfile = client.command.get(cmd.slice(prefix.length));
//   if(commandfile) commandfile.run(bot,message,args);

// })
