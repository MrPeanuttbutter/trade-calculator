import express from 'express'
import router from './routes/index.js'
import serveFavicon from 'serve-favicon';
import path from 'path';
const app=express();

// adding favicon
app.use(serveFavicon(path.join('public', 'img', 'favicon.ico')));

//port 
const port = process.env.PORT || 4000;

//using PUG
app.set('view engine', 'pug')

//obtener año actual creando middleware
app.use ((req,res,next)=>{
    const year=new Date();
    
    res.locals.fecha=year.getFullYear()
    
    next()
});

// defining public folder
app.use(express.static('public'))

//using router
app.use('/',router)

app.listen(port,()=>{
    console.log(`El servidor arranco en el puerto ${port}`)
})