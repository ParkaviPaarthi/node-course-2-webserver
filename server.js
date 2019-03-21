var express=require('express');
var hbs=require('hbs');
var app=express();
var fs=require('fs');
const port=process.env.PORT || 3000;
hbs.registerPartials(__dirname+ '/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
})
app.set('view engine','hbs');
app.use((req,res,next)=>{
 var now=new Date().toString();
 var log=`${now}: ${req.method} ${req.path}`
 console.log(log);
 fs.appendFile('server.log',log+ '\n',(err)=>{
   if(err){
     console.log('unable to append server.log');
   }
 })
  next()
})

/*app.use((req,res,next)=>{
res.render('maintanence.hbs',{
  message:'The server is in maintanence mode,,,,...'
});
})*/
app.use(express.static(__dirname+ '/public'));
app.get('/',(req,res)=>{
//res.send('<h1>Hello World!!!<h1>');
/*res.send({
    name:'Andrew',
    likes:[
      'Biking',
      'Cities'
    ]
  });*/
  res.render('home.hbs',{
    pageTitle:'Home Page',
    message:'Hi Welcome to the home page useerr',

  })
  });
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',

  });
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'The user is not found'
  });
});

app.listen(port,()=>{
  console.log(`server is upon on port ${port}`);
});
