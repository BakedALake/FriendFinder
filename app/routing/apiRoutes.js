var friendsData = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        var userScores = req.body.scores;
        var bestMatch = -1;
        var bestDifference = 500;

        for (var i = 0; i < friendsData.length; i++) {
            var totalDifference = 0;
            console.log("\nCompairing you to friend number " + (i+1));
            for (var j = 0; j < 10; j++) {
                totalDifference += Math.abs(friendsData[i].scores[j] - userScores[j]);
                console.log("totalDifference after score " + (i+1) + " is " + totalDifference);
            }
            console.log("Final Total Difference is " + totalDifference);
            if (totalDifference < bestDifference) {
                bestMatch = i;
                bestDifference = totalDifference;
                console.log("Friend " + (i+1) + " is a new best match.");
            }
            else{
                console.log("Old match is still better.");
            }
        }

        friendsData.push(req.body);

        console.log("Your Scores: " + req.body.scores);
        console.log("MatchScores: " + friendsData[bestMatch].scores);

        res.send(friendsData[bestMatch]);
    });
};
