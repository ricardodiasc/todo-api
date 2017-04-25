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


app.use((req, resp, next)=>{
    // Website you wish to allow to connect
    resp.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    resp.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    resp.setHeader('Access-Control-Allow-Credentials', true);    
    
    next();
});


app.get('/todo',(request,response) =>{
    console.log('teste')
    let todo = [{
        id:1,
        descricao:'hello mf',
        completed:false
    }]

    //localStorage.setItem('todos',JSON.stringify(todo));
    console.log(localStorage.getItem('todos'));
    response.json(JSON.parse(localStorage.getItem('todos')));
    response.end();
});


app.post('/todo',(request,response)=>{
    console.log('chegou no post');
    let todo = request.body;

    let localTodos = JSON.parse(localStorage.getItem('todos'));
    if(localTodos === undefined || localTodos === null){
        localTodos = [todo];
    } else {
        localTodos.push(todo);
    }
    localStorage.setItem('todos',JSON.stringify(localTodos));
    
    console.log(todo);
    response.end();
});

app.put('/todo',(request,response)=>{
    console.log('chegou no put');
    let todo = request.body;

    let localTodos = JSON.parse(localStorage.getItem('todos'));

    localTodos.forEach(function(todoLocal,index) {
        if(todoLocal.id === todo.id){
            localTodos[index] = todo;
        }
    }, this);

    localStorage.setItem('todos',JSON.stringify(localTodos));
    
    response.end();
});

app.delete('/todos',(request,response) => {
        // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    console.log('chegou no delete');
    localStorage.clear();
    response.end();
})

//Starting the servers
app.listen(8080,()=>{
    console.log('Servidor de todos funcionando');
    
})