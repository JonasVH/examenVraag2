var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
    if(err) return console.log(err);
    db=database.db('exam');
})

/* GET home page. */
router.get('/', (req, res)=> {
    db.collection('students').find().toArray((err,result)=>{
        if(err) return console.log(err);
        res.render('list.ejs',{exam:result})
    })
})

router.get('/add/', (req, res)=> {        
    res.render('add.ejs');
})

router.post('/add', (req, res)=> {
    
    console.log(req.body.exam);
    
    db.collection('students').find(({naam :req.body.naam,studierichting:req.body.studierichting}), function (err, doc) {
        if (doc){
            console.log("Name exists already");
        }else{
            db.collection('students').insertOne(req.body);  
        }
    });

    
    res.redirect('/student')
})

router.get('/lijstalf/', (req, res)=> {        
    res.render('lijstalf.ejs');
})

router.post('/delete', (req, res)=> {
    db.collection('products').deleteOne(req.body);        
    res.redirect('/products')
})

router.post('/lijstalf', (req, res)=> {
        db.collection('students').find({naam :req.body.naam}).sort( { reden: 1 } ).toArray((err,result)=>{
            if(err) return console.log(err);
            res.render('list.ejs',{exam:result})
        })
    })

    
module.exports = router;