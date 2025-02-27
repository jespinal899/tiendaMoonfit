const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname)));

let users = [
    { username: 'usuario', password: 'contraseña' } 
];


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

   
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
   
        res.sendFile(path.join(__dirname, 'formulario.html'));
    } else {
      
        res.send('Usuario o contraseña incorrectos');
    }
});


app.post('/register', (req, res) => {
    const { username, password } = req.body;


    const userExists = users.some(u => u.username === username);

    if (userExists) {
        res.send('El usuario ya existe');
    } else {
       
        users.push({ username, password });
        res.send('Usuario registrado correctamente');
    }
});


app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'formulario.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en  ${PORT}`);
});