const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// allow cors domain requests
app.use(cors());

// configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome to Monty Hall Simulator!");
});

// define a route with method post to get data from front-end
app.post('/simulate', (req, res) => {
    // get body of request
    const body = req.body;

    // check if for the user will either change or stick selected in the simulator
    const isSwitchSelected = body["isSwitchSelected"] || false; // set default value to false
    const numbersOfRound = body["numbersOfRound"] || 100; // set default value to 100

    // calculate and set values
    const result = simulationSystem(numbersOfRound, isSwitchSelected);

    // serve result
    res.send(result);
});


/**
 * core simulation repeat round of game base on the argument number
 *
 * @param {int} numbersOfRound
 * @param {boolean} isSwitchSelected
 * @returns object
 */
function simulationSystem(numbersOfRound, isSwitchSelected) {
    let roundLost, roundWon = 0;

    // repeat based on numbers of the round
    for (let i = 0; i < numbersOfRound; i++) {
        roundWon += simulateRound(isSwitchSelected);
    }

    // calculate lost
    roundLost = numbersOfRound - roundWon;

    // return object of results
    return {
        roundWon,
        roundLost
    };
}


/**
 * simulate a round of the game and check if, with random data, the user wins the game or not
 *
 * @param {boolean} isSwitchSelected
 * @returns boolean
 */
function simulateRound(isSwitchSelected) {

    // generate two random number for the car and user-selected gate
    const hasCar = getRandomNumber(0, 3);
    const selectedGate = getRandomNumber(0, 3);

    // select the gate with the goat to reveal
    const disclosedGate = gateDiscloser(hasCar, selectedGate);

    if (isSwitchSelected) {
        return hasCar === gateDiscloser(disclosedGate, selectedGate);
    } else {
        return hasCar === selectedGate;
    }
}


/**
 * select the gate number from [0, 1, 3] array that does not exist in arguments
 *
 * @param {int} hasCar
 * @param {int} selectedGate
 * @returns int
 */
function gateDiscloser(hasCar, selectedGate) {
    return [0, 1, 2].find(currentGate => {
        if (currentGate !== hasCar && currentGate !== selectedGate) {
            return true;
        }
        return false;
    });
}


/**
 * generate a random number between min and max
 *
 * @param {int} min
 * @param {int} max
 * @returns int
 */
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

app.listen(port, _ => console.log(`Monty Hall API App listening on port ${port}!`));

// Export the app object
exports._test = {
    getRandomNumber,
    gateDiscloser,
    simulateRound,
    simulationSystem,
}