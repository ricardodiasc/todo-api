const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./banco-todos');
}


app.get('/todo',(request,response) =>{
    console.log('teste')
    let todo = [{
        id:1,
        descricao:'hello mf',
        completed:false
    }]

    //localStorage.setItem('todos',JSON.stringify(todo));
    
    response.json(JSON.parse(localStorage.getItem('todos')));
    response.end();
});


app.post('/todo',(request,response)=>{
    console.log('chegou no post');
    let todo = request.body;

    
    console.log(todo);
    response.end();
});

app.put('/todo',(request,response)=>{
    console.log('chegou no put');
    let todo = request.body;

    
})

//Starting the servers
app.listen(8080,()=>{
    console.log('Servidor de todos funcionando');
})