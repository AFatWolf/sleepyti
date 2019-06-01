const express = require("express");
const bodyParser = require("body-parser");
const dayTime = require("./day-time.js");

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));
app.use(express.static("public"));
app.set("view engine", "pug")


app.get('/', (req, res) => {
    res.render("index.pug");
});

app.post('/sleeptime', (req, res) => {
    let hour = req.body.hour;
    let minute = req.body.minute;
    let ampm = "am";
    console.log(typeof req.body);
    // if(req.body.hasOwnProperty("ampm"))
    //    ampm = req.body.ampm;
    if(hour !== "hour" && minute !== "minute")
    {
        curTime = new dayTime(hour, minute, ampm);
        nextTime = []
        
        // make sure they have at least 3 sleep cycle
        for(let i = 0; i < 2; i++)
            curTime.minusTime(1, 30);

        for(let i = 0; i < 5; i++)
        {
            curTime.minusTime(1, 30);
            nextTime.push(curTime.convertToAmpmTime().toString());
        }
        res.render("sleeptime.pug", {
            time: nextTime,
            action: "fall asleep"
        })
    }
    else
        res.render("alert.pug");
})

app.post('/sleeptime-now', (req, res) => {
    let today = new Date();
    let curTime = new dayTime(0, 0, "AM");
    curTime.second_constructor(today.getHours(), today.getMinutes());
    nextTime = []
    // make sure they have 3 sleep cycle
    for(let i = 0; i < 2;i ++)
        curTime.addTime(1, 30);   
    for(let i = 0; i < 5; i++)
    {
        curTime.addTime(1, 30);
        nextTime.push(curTime.convertToAmpmTime().toString());
    }
    res.render("sleeptime.pug", {
        time: nextTime,
        action: "wake up"
    })
})

app.listen(8080, () => {
    console.log(`Listening`);
})