const discord = require('discord.js');
const request = require('request');
const bot = new discord.Client();

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
    searchGiphy(msg.channel,search);
  }
});
var searchGiphy = function(id,url){
  return request(url,(err,resp,body)=>{
    giphys = body.toString().match(/https:\/\/gph.is\/\w{0,20}/gi);
    console.log(giphys);
    if(giphys)
    sendGiphy(id,giphys);
  });
}
var sendGiphy = function(id,url){
  id.send(url[(Math.floor((Math.random() * url.length) + 1))])
}
//busca videos no youtube
bot.on('message', (msg) => {
  if(msg.content.indexOf("-youtube")>-1){
    word = msg.content.toString().replace(/-youtube /,'');
    console.log(word);
    search = 'https://www.youtube.com/results?search_query='+word;
    console.log(search);
    searchVideos(msg.channel,search);
  }
});
var searchVideos = function(id,search){
  return request(search,(err,resp,body)=>{
    var regEXP = /\/watch\?v=\w{7,20}/i;
    videos = body.toString().match(regEXP);
    console.log(videos);
    if(videos)
    sendVideos(id,videos); 
  })
}
var sendVideos = function(id,videos){
    id.send("https://www.youtube.com/"+videos);
}

//função que varre as fotos no site e traz para o discord
bot.on('message',(msg)=>{
  if(msg.content.toString().indexOf('-rule34')>-1){
    var search = msg.content.toString().split(' ');
    var url = 'https://rule34.paheal.net/post/list/'+search[1].toUpperCase()+"/1";
    searchRule34(url,msg.channel);
  }
  });

var searchRule34 = function(url, id){
  return request(url,(err,resp,body)=>{
  console.log(body);
   var linkImage= body.toString().match(/http:\/\/\w{4,7}.paheal.net\/_images\/\w{30,40}\/\d{6,8}/gi);
   console.log(linkImage);
   var image = linkImage[Math.floor((Math.random() * linkImage.length) + 1)]
   if(image)
    id.send(image);
   });
}

//função que varre as fotos no site e traz para o discord
bot.on('message', (msg) => {
  if(msg.content.indexOf("-search")>-1){
    word = msg.content.toString().split(' ');
    console.log(word);
    search = 'https://www.flickr.com/search/?text='+word[1];
    console.log(search);
    searchImages(msg.channel,search);
  }
});
var searchImages = function(id,search){
  return request(search,(err,resp,body)=>{
    var regEXP = /c1.staticflickr.com\/\d\/\d{4}\/\d{10}_\w{10}_?\w?.jpg/gi;
    imagens = body.toString().match(regEXP);
    console.log(imagens);
    if(imagens)
    sendImages(id,imagens); 
  })
}
var sendImages = function(id,link){
    var image = link[Math.floor((Math.random() * link.length) + 1)]
    id.send("https://"+image);
}
//função que conecta no voice channel
bot.on('message', message => {

  if (message.content === '-join') {
      message.member.voiceChannel.join()
    .then(connection => {
      message.channel.send("Senta que la vem historia")
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
   playVideo(url[1],message);
  }
});

var playVideo = function(url,message){
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 0.2 };
  message.member.voiceChannel.join()
  .then(connection => {
    const stream = ytdl(url, { filter : 'audioonly' });
    const dispatcher = connection.playStream(stream, streamOptions);
  })
  .catch(console.error);
}

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  if (newMember.displayName === "Dollynho") return;
  let guild = newMember.guild;
  let channel = guild.channel;
  
  if (oldMember.voiceChannel === undefined && newMember.voiceChannel) {
    memberJoinedChannel(guild, newMember);
  }
  else if (oldMember.voiceChannel && newMember.voiceChannel === undefined) {
    memberLeftChannel(guild, oldMember);
  }
});

bot.login('NDI3NjMzMjQxMzExMjgxMTUy.DZnY5A.ou_GwDi-QuUU29QlBZM-cAL-8L4');