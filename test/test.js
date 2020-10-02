var assert = require('assert');

var app = require('./../app.js');


describe('Simulate', function() {
    describe('#generate random number', function() {
        it('should be between 5 to 8', function() {
            assert.notEqual([5, 6, 7, 8].indexOf(app._test.getRandomNumber(5, 8)), -1);
        });
    });

    describe('#disclose which number [0, 1, 2] not selected', function() {
        it('should be zero', function() {
            assert.equal(app._test.gateDiscloser(1, 2), 0);
        });
    });

    describe('#simulate round that is randomly true or false', function() {
        it('should be true (winner) or false (looser) with switch true', function() {
            assert.equal(typeof app._test.simulateRound(true), 'boolean');
        });

        it('should be true (winner) or false (looser) with switch false', function() {
            assert.equal(typeof app._test.simulateRound(false), 'boolean');
        });
    });

    describe('#simulate 1000 rounds with stick to selected gate', function() {
        it('should be lost number be grater than the won number', function() {
            const roundsResult = app._test.simulationSystem(1000, false);
            assert.equal(roundsResult.roundWon < roundsResult.roundLost, true);
        });
    });
    describe('#simulate 1000 rounds with change the selected gate', function() {
        it('should be won number be grater than the lost number', function() {
            const roundsResult = app._test.simulationSystem(1000, true);
            assert.equal(roundsResult.roundWon > roundsResult.roundLost, true);
        });
    });


});