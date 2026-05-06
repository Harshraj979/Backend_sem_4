const EventEmitter=require('events');
const emitter=new EventEmitter();

function myListener(){
    console.log(`Hello there`);
}

emitter.on('myEvent',myListener);

//once listener-executes only one
emitter.once('myEvent',myListener);

//every 1 second .. this will execute an infinite loop
const intervalId= setInterval(()=>{
    emitter.emit('myEvent');
},1000);

//set time out will stop the event after a particular after 10 sec.
setTimeout(()=>{
    console.log('Listener removed & interval stopped');
    emitter.removeListener('myEvent',myListener);
    clearInterval(intervalId);
},3000);