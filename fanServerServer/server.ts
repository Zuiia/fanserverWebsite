import * as express from 'express';

const app = express();

app.use('/', express.static(`${__dirname}/dist`));

app.use(function (req, res) {
    res.sendFile(`${__dirname}/dist/index.html`)
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

app.listen(80, function () {
    console.log('');
    console.log('-------------------------------------------------------------');
    console.log('                    UserMan Server is running                ');
    console.log('-------------------------------------------------------------');
    console.log('       UserList:      http://localhost:8080                  ');
    console.log('-------------------------------------------------------------');
});