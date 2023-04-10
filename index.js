// index.js
const fs = require("fs");

function calculateHouseEdge(betType, totalNumbers) {
    const winningNumbers = betType.winning_numbers;
    const payoutMultiplier = betType.payout_multiplier;

    const probabilityOfWinning = winningNumbers.length / totalNumbers;
    const expectedPayout = probabilityOfWinning * (payoutMultiplier + 1);

    return ((1 - expectedPayout) * 100).toFixed(2);
}

function getHouseEdgeStats(houseEdge) {
    const houseEdgeValues = Object.values(houseEdge);
    const numberOfBetTypes = houseEdgeValues.length;
    const lowestHouseEdge = Math.min(...houseEdgeValues);
    const highestHouseEdge = Math.max(...houseEdgeValues);

    return {
        lowestHouseEdge: lowestHouseEdge.toFixed(2),
        highestHouseEdge: highestHouseEdge.toFixed(2),
        numberOfBetTypes,
    };
}

fs.readFile("bet-types.json", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading the JSON file:", err);
        return;
    }

    const betTypes = JSON.parse(data);
    const totalNumbers = 38;
    let houseEdge = {};

    for (let betType in betTypes) {
        houseEdge[betType] = calculateHouseEdge(betTypes[betType], totalNumbers);
    }

    console.log(houseEdge);
    console.log(getHouseEdgeStats(houseEdge));
});
