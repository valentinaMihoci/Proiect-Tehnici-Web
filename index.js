const express = require('express');
const fs = require('fs');
const path = require('path');
const formidableMiddleware = require('./middlewares/formidableMiddleware');
const app = express();
const formidable=require('formidable');
const dataDir = path.join(__dirname,"data");
const imagineDir = path.join(__dirname, "resurse_poze/public/imagini");
const session = require('express-session');
const crypto = require('crypto');

app.set("view engine","ejs");

app.use('/resurse_css', express.static('resurse_css'));
app.use('/resurse_poze', express.static('resurse_poze'));
app.use('/resurse_js',express.static('resurse_js'));
// am setat cele foldere static pentru a putea cauta prin ele 
app.use(session({
    secret: 'abcdefg', // folosit pentru criptarea session ID-ului
    resave: true, //sa nu stearga sesiunile idle
    saveUninitialized: false //nu salveaza obiectul sesiune daca nu am setat un camp
}));

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
});


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
             //   numarTelefon: req.body.numarTelefon,
                img: `resurse_poze/public/imagini/${id}.${imagineEXT}` 
                
            }
    fs.writeFileSync(path.join(dataDir,`${id}.json`),JSON.stringify(anunt1));        
    res.redirect('/logat');
});

app.get('/login', function(req,res){
    res.render('pagini_html/login',{'mesaj': 'Pentru a adauga anunt trebuie sa te loghezi...'});
});

app.post('/login_post', function(req, res) {
    var user;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

     var useri= JSON.parse(fs.readFileSync("useri.json"));
     var cipher = crypto.createCipheriv('aes128','passwordpassword', 'vectorvector1234');
     var parolacriptata = cipher.update(fields.parola, 'utf8',"hex");
     parolacriptata += cipher.final("hex");
      for(var x of useri){                    //verificarea datelor de login
   	 	if (fields.username == x.username && parolacriptata==x.parola)
			user=fields.username;
			}
   
   	 if(user){
   		 req.session.username=user;//setez userul ca proprietate a sesiunii
                 	res.redirect('/anunt_add');}
   	 else {
		req.session.username=false;

	       res.redirect('/incorect');}
   	 });
});


app.get('/logat', function(req, res) {
    res.render('pagini_html/logout',{'nume': req.session.username});
});

app.get('/incorect', function(req, res) {
    res.render('pagini_html/login',{'mesaj': 'Username/parola gresita'});
});

app.get('/logout', function(req, res) {
    req.session.destroy();  //distrugem sesiunea cand se intra pe pagina de logout
    res.redirect('/adoptie');
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