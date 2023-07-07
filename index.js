const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
    {
        id: 1,
        username: 'Brooke',
        comment: 'I love to travel!'
    },
    {
        id: 2,
        username: 'Ashley',
        comment: 'Me too!'
    },
    {
        id: 3,
        username: 'Bethany',
        comment: 'Me three!'
    },
    {
        id: 4,
        username: 'Gio',
        comment: 'Same'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment});
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === parseInt(id));
    res.render('comments/show', { comment });
})

// Tacos initial example 
app.get('/tacos', (req, res) => {
    res.send("Get /tacos response");
})

app.post('/tacos', (req, res) => {
   const { meat, qty } = req.body;
   res.send(`OK, here are ${qty} ${meat} tacos.`)
})

// Port 
app.listen('3000', () => {
    console.log("Listening on port 3000");
})
