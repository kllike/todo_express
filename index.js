const express= require('express')
const { default: test } = require('node:test')

const app = express()
const path = require('path')
const fs = require('node:fs');

//fro prasing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const readFile = (filename) =>{
    return new Promise((resolve, reject) =>{
        //get data from file
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            //tasks list data from file
            const tasks = JSON.parse(data) 
            resolve(tasks)
          });
    })
} 

app. get ('/', (req, res) => {
    //tasks list data from file
    readFile('./tasks.json')
    .then(tasks =>{
        console.log(tasks)
        res.render('index', {tasks: tasks} )
    } )
}) 
    


app.post('/', (req, res)  => {
    //tasks list data from file
    console.log('form sent data')
    let task = req.body.task
    readFile('./tasks.json') 
    .then((tasks) => {
        let index
        if(tasks.length === 0)
        {
            index = 0
        } else{
            index = tasks[tasks.length-1].id + 1; 
        } 

        const newTask = {
            "id" : index,
            "task" : req.body.task
        }
        console.log(newTask)
        tasks.push(newTask)
        console.log(tasks)
        data = JSON.stringify(tasks, null, 2)
        console.log(data)
        fs.writeFile('./tasks.json', data, err =>{
            if (err){
                console.error(err);
                return;
            } else{
                console.log('saved')
            } 
            //redirect to / to see result
            res.redirect('/')
        })
    })
}) 


app. listen(3001, () => {
    console.log('Server is started http://localhost:3001')
} )                     