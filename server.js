const discord = require('discord.js');
const bot = new discord.Client();
const commands = require('./commands.js');

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
//busca giphy
bot.on('message', (msg) => {
  if(msg.content.indexOf("-gif")>-1){
    word = msg.content.toString().replace(/-gif /,'');
    console.log(word);
    search = 'https://giphy.com/search/'+word;
    console.log(search);
    if(search)
    commands.searchGiphy(msg.channel,search);
  }
});
//busca videos no youtube
bot.on('message', (msg) => {
  if(msg.content.indexOf("-youtube")>-1){
    word = msg.content.toString().replace(/-youtube /,'');
    console.log(word);
    search = 'https://www.youtube.com/results?search_query='+word;
    console.log(search);
    commands.searchVideos(msg.channel,search);
  }
});

//função que varre as fotos no site e traz para o discord
bot.on('message',(msg)=>{
  if(msg.content.toString().indexOf('-rule34')>-1){
    const search = msg.content.toString().replace(/-rule34 /,'');
    console.log(search);
    const url = 'https://rule34.paheal.net/post/list/'+search.toUpperCase()+"/1";
    commands.searchRule34(url,msg.channel);
  }
  });

//função que varre as fotos no site e traz para o discord
bot.on('message', (msg) => {
  if(msg.content.indexOf("-search")>-1){
    word = msg.content.toString().split(' ');
    console.log(word);
    search = 'https://www.flickr.com/search/?text='+word[1];
    console.log(search);
    commands.searchImages(msg.channel,search);
  }
});
//função que conecta no voice channel
bot.on('message', message => {

  if (message.content === '-join') {
      if(message.member.voiceChannel)
      message.member.voiceChannel.join()
    .then(connection => {
      message.channel.send(";D");
    }).catch(console.error);
}
});
//função que faz o bot sair do voice channel
bot.on('message',message=>{
  if (message.content === '-leave'){
    if (message.guild.voiceConnection)
    message.guild.voiceConnection.disconnect();
  }
});
//função que toca musica do URL do youtube
bot.on('message',message=>{
  if (message.content.toString().indexOf('-play')>-1){
   url = message.content.toString().split(' ');
   commands.playVideo(url[1],message);
  }
});


bot.login('NDI3NjMzMjQxMzExMjgxMTUy.DZnY5A.ou_GwDi-QuUU29QlBZM-cAL-8L4');