const express = require("express")
const server = express()

const db = require("./database/db")

// Configurar pasta pública
server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar caminhos da minha aplicação
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    console.log(req.body)
    return res.send('ok')
})

server.get("/search", (req, res) => {
    db.all("SELECT * FROM places", function(err, rows) {
        if (err) {
            return console.log(err)
        }
        return res.render("search-results.html", {places: rows})
    })
})

// Ligar o servidor
server.listen(3000)