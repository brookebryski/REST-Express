const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(methodOverride(_method));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
    {
        id: uuid(),
        username: 'Brooke',
        comment: 'I love to travel!'
    },
    {
        id: uuid(),
        username: 'Ashley',
        comment: 'Me too!'
    },
    {
        id: uuid(),
        username: 'Bethany',
        comment: 'Me three!'
    },
    {
        id: uuid(),
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
    comments.push({ username, comment, id: uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
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
