const MaxHeap = require('./MaxHeap');

var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});


app.get('/', function(req, res) {
    res.status(200).send('Server is running on PORT', PORT);
});

app.get('/ProcessSentence', function(req, res, next) {
    const sentence = req.query.sentence;
    const processedSentence = processSentence(sentence);
    res.status(200).send(processedSentence);
});

const processSentence = (sentence) => {
    const stringArray = sentence.split(/\s+/); // split based on white space or carriage return
    const maxHeap = new MaxHeap();
    stringArray.forEach(element => {
        maxHeap.insert(element);
    });
    const result = maxHeap.heapSort();
    return result;
}


