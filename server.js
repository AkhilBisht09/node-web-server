const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
hbs.registerPartials(__dirname+'/views/partials');
var app=express(); 
app.set('view engine','hbs');


app.use((request,response,next)=>{
    var now=new Date().toString();
    var log=`${now} ${request.method} ${request.url}`
    console.log(log);
    fs.appendFileSync('server.log',log+'\n');
    next();
})
app.use((request,response,next)=>{
    response.render('maintainence.hbs')
})
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getcurrentyear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(message)=>{
    return message.toUpperCase();
})
app.get('/',(request,response)=>{
//response.send("<h1>Hello World</h1>");
response.render('home.hbs',{
    welcome:"Akhil",
    title:'Home Page',
});
});
app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        title:'About Page'
    });
});
app.get('/bad',(request,response)=>{
    response.send({
        error:"bad server",
        errorCode:404
    });
});
app.listen(3000,()=>{
    console.log("server is up in port 3000");
});
