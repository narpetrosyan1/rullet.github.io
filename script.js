const prizes = {
    0: '$2000 in USDT(Tether)',
    1: '0.0958 BTC ($2914)',
    2: '1.9 ETH ($3633)',
    3: '56.379 DOGE ($3761)',
    4: '28 LTC ($2879)',
    5: '34 XMR ($5537)',
    6: '7984 XRP ($3805)',
    7: '150 SOL ($2823)',
};
const total_items = 8;
const minimum_jumps = 30; 
let current_index = -1;
let jumps = 0;
let speed = 30;
let timer = 0;
let prize = -1;

function runCircle() {
    $(`[data-order="${current_index}"]`).removeClass('is-active');

    current_index += 1;

    if (current_index > total_items - 1) {
        current_index = 0;
    }

    $(`[data-order="${current_index}"]`).addClass('is-active');
}

function generatePrizeNumber() {
    return Math.floor(Math.random() * total_items);
}

function controllSpeed() {
    jumps += 1;
    runCircle();

    if (jumps > minimum_jumps + 10 && prize === current_index) {
        clearTimeout(timer);

        swal({
            title: `You Have Won a ${prizes[current_index]}`,
            text: '🏆 Congratulations! \n DM Us on Telegram to Claim Your Reward.💬💰 \n https://t.me/crypto_fox_official',
            icon: 'success',
        });

        prize = -1;
        jumps = 0;
  
    } else {
       
        if (jumps < minimum_jumps) {
            speed -= 5; 
       
        } else if (jumps === minimum_jumps) {
            const random_number = generatePrizeNumber();
            prize = random_number;
        } else {
     
            if ( (jumps > minimum_jumps + 10) && prize === (current_index + 1) ) {
                speed += 600;
            } else {
                speed += 20; 
            }
        }
        if (speed < 40) {
            speed = 40;
        }

        timer = setTimeout(controllSpeed, speed);
    }
}

function init() {
    jumps = 0;
    speed = 100;
    prize = -1;
    controllSpeed();
}

$(document).ready(() => {
    $('#js-start').on('click', init);
});