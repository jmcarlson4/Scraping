var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var db = require("./models");
var PORT = 8080;
var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//var routes
//mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });


app.get("/", function (request, response) {

    //response.send("Scrape");
    axios.get("https://www.nytimes.com/").then(function (res) {
        response.render("index");
        var $ = cheerio.load(res.data);
        $("article h2").each(function (i, element) {
            var result = {};
            result.title = $(this).text();
            result.link = $(this).parents("a").attr("href");
            console.log(result);
            db.News.create(result).then(function (dbNews) {
                console.log("HELP!");
                console.log(dbNews);
            }).catch(function (err) {
                console.log(err);
            });
        });
    });
});


// app.get("/scrape", function (request, response) {
//     axios.get("https://www.nytimes.com/").then(function (response) {
//         var $ = cheerio.load(response.data);
//         $("article h2").each(function (i, element) {
//             var result = {};
//             console.log("TITLE");
//             //console.log($(this).children("a").text());
//             result.title = $(this).text();
//             result.link = $(this).parents("a").attr("href");
//             db.News.create(result).then(function (dbNews) {
//                 // console.log("HELP!");
//                 console.log(dbNews);
//             }).catch(function (err) {
//                 console.log(err);
//             });
//         });
//         response.json(result)
//         //response.send("Scrape Complete");
//     });
// });
// app.get("/articles/:id", function (request, response) {
//     db.News.findOne({ _id: request.params.id }).populate("notes").then(function (dbNews) {
//         response.json(dbNews);
//     }).catch(function (err) {
//         response.json(err);
//     });
// });
// app.post("/articles/:id", function (request, response) {
//     db.Notes.create(request.body).then(function (dbNotes) {
//         return db.News.findOneAndUpdate({ _id: request.params.id }, { note: dbNotes._id }, { new: true });
//     }).then(function (dbNews) {
//         response.json(dbNews);
//     }).catch(function (err) {
//         response.json(err);
//     });
// });
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

