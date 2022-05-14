const express = require('express');
const fs = require('fs');
const path = require('path');
const formidableMiddleware = require('./middlewares/formidableMiddleware');
const app = express();
const dataDir = path.join(__dirname,"data");
const imagineDir = path.join(__dirname, "resurse_poze/public/imagini");

app.set("view engine","ejs");

app.use('/resurse_css', express.static('resurse_css'));
app.use('/resurse_poze', express.static('resurse_poze'));
app.use('/resurse_js',express.static('resurse_js'));
app.use(express.static(path.join(__dirname,"resurse_poze/public/imagini")));
// am setat cele doua foldere static pentru a putea cauta prin ele 


app.get('/',(req,res)=>{
    res.render('pagini_html/index');
});

app.get('/angajare',(req,res)=>{
    res.render('pagini_html/angajare');
});

app.get('/adoptie',(req,res)=>{
    const files = fs.readdirSync(dataDir);
    const anunturi = files.map(filename => {
        const file = fs.readFileSync(path.join(dataDir, filename));
        return JSON.parse(file);
    })
    res.render('pagini_html/adoptie',{anunturi});
})

app.get('/anunt_add',(req,res)=>{
    res.render('pagini_html/anunt_add');
});

app.post('/anunt_add',formidableMiddleware(),(req,res)=>{
    const imagine = req.files.img;
    const id = Date.now();
    const imagineEXT = imagine.originalFilename.split(".").at(-1);
    const fileData = fs.readFileSync(imagine.filepath);
    fs.writeFileSync(path.join(imagineDir,`${id}.${imagineEXT}`),fileData);
    const anunt1 = { 
                id, 
                title:req.body.title,
                detalii:req.body.detalii, 
                img: `/public/imagini/${id}.${imagineEXT}` 
            }
    fs.writeFileSync(path.join(dataDir,`${id}.json`),JSON.stringify(anunt1));        
    res.redirect('/adoptie#anunturi');
});

app.use(function(req,res){
   // console.log(req.url);
	res.render("pagini" + req.url + ".ejs", { ip:req.ip }, function (err, rezultatRandare) {

		if (err) {
			if (err.message.includes("Failed to lookup view"))
				res.status(404).render("pagini_html/404");
				else
					throw err;
		}
		else {
			res.send(rezultatRandare);
		}
	});
});

app.listen(2402);
console.log('Aplicatia se va deschide pe portul 2402.');