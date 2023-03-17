const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();

app.get('/api', function (req, res) {
    res.json({
        text: 'my api'
    })
})

app.post('/api/login', function (req, res) {

    const user = { id: 3 }
    const token = jwt.sign({ user }, 'my_secret_key');
    res.json({
        token: token
    });
});
app.get('/api/proteced', ensuretoken, function (req, res) {
    console.log(req.token)
    jwt.verify(req.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                Text: 'this is proteced',
                data: data
            })
        }
    })
    res.json({
        test: 'this is proteced'
    })
})

function ensuretoken(req, res, next) {
    const bearehead = req.headers["authorization"];
    if (
        typeof bearehead !== 'undefined') {
        const beare = bearehead.split(" ")
        const bearetoken = beare[1];
        req.token = bearetoken;
        next();
    }
    else {
        res.sendstatus(403);
    }
}
app.listen(3000, function () {
    console.log('appp listening on port 3000')
});
