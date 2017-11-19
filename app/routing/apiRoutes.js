//Routing for API calls

var friendData = require('../data/friends'); //import file

function calcMatch(friendData, userData) {
    // performs match calculations

    var totalDifference = []; //temporarily holds match calculations
    let total = 0; //running total

    for (let index = 0; index < friendData.length; index++) { //loop through friends object
        let element = friendData[index];

        for (let i = 0; i < userData.scores.length; i++) { //loop through scores array
            let u = userData.scores[i];
            let f = friendData[index].scores[i];

            total += Math.abs(u - f); //running total (adds up numbers)
        }
        totalDifference.push(total); // record result to array
        total = 0; //reset for next person

    }
    //return index of match (person with the least differences)
    let bestMatch = indexOfSmallest(totalDifference);

    //now that we have a result for the current user, add them to the friendData array.
    friendData.push(userData);

    return friendData[bestMatch]; //return match
}

function indexOfSmallest(array) {
    var lowestScore = 0;
    for (var index = 1; index < array.length; index++) {
        if (array[index] < array[lowestScore]) lowestScore = index;
    }
    return lowestScore;
}

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friendData); //output friend JSON
    });

    app.post("/api/friends", function(req, res) {

        //now that we have a friend request, calculate a match
        res.json(calcMatch(friendData, req.body));
    });
};
