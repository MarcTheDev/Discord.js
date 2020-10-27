const Discord = require('discord.js');
const { markAsUntransferable } = require('worker_threads');
const client = new Discord.Client();
const config = require('./config.json');
const secret = require('./secret.json');
let time = 1;

client.on("ready", () =>{
    console.log(client.user.tag + " has logged in!");
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    let member = newPresence.member;
    if(!oldPresence) {
        console.log('There was no old presence, waiting.');
        return;
    }
    if (member.id === config.user) {
        if(oldPresence.status !== newPresence.status) {
            if (newPresence.status === "online") {
                member.send(config.online[Math.floor(config["online"].length * Math.random())] + ` <@${config.user}>`);
            } else if (newPresence.status === "dnd") {
                member.send(config.dnd[Math.floor(config["dnd"].length * Math.random())] + ` <@${config.user}>`);
            } else if (newPresence.status === "idle") {
                member.send(config.idle[Math.floor(config["idle"].length * Math.random())] + ` <@${config.user}>`);
            } else if (newPresence.status === "offline") {
                member.send(config.offline[Math.floor(config["offline"].length * Math.random())] + ` <@${config.user}>`);
            }
            console.log("The Shelby bot ran " + time + " times this session!");
            time++;
        }
    }
});

client.on("message", msg => {
    if(msg.content === ".shelby") {
        msg.reply(config.shelby[Math.floor(config["shelby"].length * Math.random())]);
        console.log(msg.author.tag + " ran the Shelby command for a picture of her ugly ass.");
    }
});

client.login(secret.token);