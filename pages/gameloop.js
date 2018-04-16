/**
 * Created by Logan Pedersen on 1/26/2018.
 */

let previousTime = performance.now();
let eventList = [];
let printList = [];
let newInfo = false;
let eventConsole = document.getElementById("EventSection");

function addEvent() {
    let name = document.getElementById("Name").value;
    let interval = parseInt(document.getElementById("Interval").value);
    let iterations = parseInt(document.getElementById("Iterations").value);
    eventList.push(MakeEvent(name, interval, iterations));
}

function MakeEvent(name, interval, iterations){
    let total = interval * iterations;
    let event = {
        name: name,
        interval: interval,
        iterations: iterations,
        totalTime: total
    };
    return event;
}

function update(elapsedTime){
    removable = [];
    printList.length = 0;

    for(let i = 0; i < eventList.length; ++i){
        eventList[i].totalTime -= elapsedTime;
        let dif = Math.floor(eventList[i].totalTime / eventList[i].interval) - eventList[i].iterations;
        if(dif < 0){
            for(dif < 0; ++dif;){
                if(eventList[i].iterations === 0) break;

                eventList[i].iterations -= 1;
                printList.push("Event: " + eventList[i].name + " (" + eventList[i].iterations + " remaining)"); //pushes info to be printed in the render function
            }
        }
        if (eventList[i].totalTime < 0){
            removable.push(eventList[i]);
        }
    }

    eventList = eventList.filter(event => !removable.includes(event)); //remove old events
    removable.length = 0; //reset delete tracker
    newInfo = (printList.length !== 0); //registers whether or not there was new information displayed.

}

function render(){

    for(let i = 0; i < printList.length; ++i){
        eventConsole.innerText += printList[i];
        eventConsole.innerHTML += "<br />";
    }

    if (newInfo){
        eventConsole.scrollTop = eventConsole.scrollHeight;
    }

}

function gameLoop(){
    let currentTime = performance.now();
    let elapsedTime = currentTime - previousTime;
    previousTime = currentTime;

    update(elapsedTime);
    render();


    requestAnimationFrame(gameLoop);
}




gameLoop();