const http = require('http')
const fs = require('fs')


const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let path = ""
    console.log(req.url)
    switch (req.url) {
        case '/':
            res.statusCode = 200;
            path += "index.html"
            break;
        case '/contact-me':
            res.statusCode = 200;
            path += "contact-me.html"
            console.log(path)
            break;
        case '/about':
            res.statusCode = 200;
            path += "about.html"
            break;
        case '/about-redirect':
            res.setHeader('Location', '/about')
            path += "about.html"
            res.statusCode = 301;
            break;
        default:
            res.statusCode = 400;
            path += "404.html"
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            res.end(data);
        }
    })
})

server.listen(3000, 'localhost', () => { console.log("port 3000 is running") })


/*
*/