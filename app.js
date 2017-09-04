const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongo = require('mongodb');

const url = 'mongodb://heroku_3mts4t62:qhp2kn89i0lpu4nbsc5mvbev4s@ds123084.mlab.com:23084/heroku_3mts4t62' || 'mongodb://127.0.0.1:27017/funtodoapp';
const MongoClient = mongo.MongoClient;
let ObjectId = require('mongodb').ObjectId;
let port = process.env.PORT || 3000;
const c = console.log;


app.use("/", express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})


app.get("/tasks",function(req,res){
  MongoClient.connect(url,function(err,db){
    if(!err){
      let tasks = db.collection('tasks');
      tasks.find({}).toArray(function(error,results){
        res.send(JSON.stringify(results));
      })
    }
  })
})
app.post("/tasks/new",function(req,res){
  MongoClient.connect(url,function(err,db){
    let tasks = db.collection('tasks');
    tasks.insert({
      timestamp: new Date(),
      description: req.body.description
    })
  })

})

app.put("/tasks/update/:id",function(req,res){
  MongoClient.connect(url,function(err,db){
    let tasks = db.collection('tasks');
    tasks.update({
      _id: new ObjectId(req.params.id)
    }, {$set: {
      description: req.body.description
    }})
  })
})

app.delete("/tasks/delete/:id",function(req,res){
  MongoClient.connect(url,function(err,db){
  let tasks = db.collection('tasks');
    tasks.remove({_id: new ObjectId(req.params.id)},function(err,results){
      if(!err){
        console.log(results);
      }else{ console.log(error)};
    });
  });
})


app.listen(port,function(err){
  if(err){
    c(err);
  }else{
    c("listening on port: ", port);
  }
})
