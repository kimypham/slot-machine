/*
slot machine
- 3 vertical reels containing symbols - emojis
- spin button: when clicked, spin all reels. after certain time, the reels will stop one by one
- the left reel will stop, then middle, then right --> after small delay between each reel
- if the symbols match, player wins
- if symbols dont match, player can spin again (nothing happens)
*/
const symbols = ['♥️', '♠️'];
let intervalLeftId = null;
let intervalMiddleId = null;
let intervalRightId = null;

function startSpin() {
    intervalLeftId = setInterval(() => {
        document.getElementById('left-selected').innerText =
            symbols[Math.floor(Math.random() * symbols.length)];
    }, 50);
    intervalMiddleId = setInterval(() => {
        document.getElementById('middle-selected').innerText =
            symbols[Math.floor(Math.random() * symbols.length)];
    }, 50);
    intervalRightId = setInterval(() => {
        document.getElementById('right-selected').innerText =
            symbols[Math.floor(Math.random() * symbols.length)];
    }, 50);
}

document.querySelector('button').addEventListener('click', () => {
    if (intervalLeftId) {
        // stop animating
        document.querySelector('button').innerText = 'Stopping...';
        document.querySelector('button').disabled = true;

        setTimeout(() => {
            clearInterval(intervalLeftId);
            intervalLeftId = null;
        }, 500);
        setTimeout(() => {
            clearInterval(intervalMiddleId);
            intervalMiddleId = null;
        }, 1000);
        setTimeout(() => {
            clearInterval(intervalRightId);
            intervalRightId = null;

            const leftElement =
                document.getElementById('left-selected').innerText;
            const middleElement =
                document.getElementById('middle-selected').innerText;
            const rightElement =
                document.getElementById('right-selected').innerText;
            if (
                leftElement === middleElement &&
                middleElement === rightElement
            ) {
                document.getElementById('game-status').innerText = 'You won!';
            } else {
                document.getElementById('game-status').innerText = 'Try again';
            }

            document.querySelector('button').disabled = false;
            document.querySelector('button').innerText = 'Spin!';
        }, 1500);
    } else {
        // start animation
        startSpin();
        document.querySelector('button').innerText = 'Stop!';
        document.getElementById('game-status').innerText = '';
    }
});
