const express = require('express');
const app = express();
app.set("view engine","ejs");


app.get('/',(req,res)=>{
    res.render('pagini_html/index');
});

app.use('/resurse_css', express.static('resurse_css'));
app.use('/resurse_poze', express.static('resurse_poze'));
app.use('/resurse_js',express.static('resurse_js'));
// am setat cele doua foldere static pentru a putea cauta prin ele 

app.get('/angajare',(req,res)=>{
    res.render('pagini_html/angajare');
});

app.get('/adoptie',(req,res)=>{
    res.render('pagini_html/adoptie');
})

app.listen(2402);
console.log('Aplicatia se va deschide pe portul 2402.');