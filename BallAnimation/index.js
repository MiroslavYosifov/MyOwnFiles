function getElementPosition(el) {
    const top = window.scrollY + el.getBoundingClientRect().top // Y
    const bottom = (top + el.offsetHeight);

    const left = window.scrollX + el.getBoundingClientRect().left // X
    const right = (left + el.offsetWidth);
    
    const centerY = (top + el.offsetHeight / 2);
    const centerX = (left + el.offsetWidth / 2);

    return { 
        top,
        bottom,
        left,
        right,
        centerY,
        centerX,
    };
}

async function isSetTimeoutExpire(time) {
    return new Promise((res, rej) => {

        if(typeof time != 'number') rej('Input data is not a number');
        
        setTimeout(function(){
            res(true);
        }, time);
    });
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomArbitraryDecimal(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomPropertiesOfElements(ballsElements) {

    const array = [];

    for (const ballElement of ballsElements) {

        const ballElementInfo = getElementPosition(ballElement);
        
        ballElementInfo.element = ballElement;
        ballElementInfo.speedX = getRandomArbitrary(8,10);
        ballElementInfo.speedY = getRandomArbitrary(8,10);
        ballElementInfo.locationX = 0;
        ballElementInfo.locationY = 0;
        ballElementInfo.scale = getRandomArbitraryDecimal(0.7, 1.4);;
        ballElementInfo.scaleSpeed = 0.005;

        array.push(ballElementInfo);
    }

    return array;
}

function resetElementPostion(dataBalls) {
    for (const ball of dataBalls) {
        ball.element.style.transition = "all .8s";
        ball.element.style.transform = `translate(0, 0) scale(1)`;
    }
}

function changeElementScale (ball) {
    if(ball.scale < 0.7) ball.scaleSpeed = 0.005;
    if(ball.scale > 1.4) ball.scaleSpeed = -0.005;
    ball.scale += ball.scaleSpeed;
}

function moveElement(ball) {
    ball.locationX += ball.speedX;
    ball.locationY += ball.speedY;
    ball.centerX += ball.speedX;
    ball.centerY += ball.speedY;
}

function changeElementDirection(ball, fieldPosition) {
    if(ball.centerX < fieldPosition.left) ball.speedX *= -1;
    if(ball.centerX > fieldPosition.right) ball.speedX *= -1;
    if(ball.centerY < fieldPosition.top) ball.speedY *= -1;
    if(ball.centerY > fieldPosition.bottom) ball.speedY *= -1;
}

async function boucingAnimation() {

    const field = document.getElementById('wrapper');
    const ballsElements = document.querySelectorAll('.media');

    const fieldPosition = getElementPosition(field);
    const dataBalls = generateRandomPropertiesOfElements(ballsElements);
    
    let isTimeOver = false;
    
    let bouncing = setInterval(() => {

        for (const ball of dataBalls) {

            moveElement(ball);
            changeElementDirection(ball, fieldPosition);
            changeElementScale(ball);
            
            ball.element.style.transform = `translate(${ball.locationX}px, ${ball.locationY}px) scale(${ball.scale})`;
        }

        if(isTimeOver) {
            clearInterval(bouncing) 
            resetElementPostion(dataBalls);
        };

    }, 10);

    isTimeOver = await isSetTimeoutExpire(4000);

}

function solve() {
    boucingAnimation();
}

solve();
