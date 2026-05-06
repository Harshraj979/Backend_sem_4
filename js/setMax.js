const EventEmitter=require('events');
const emitter=new EventEmitter();

console.log("Default max listeners",emitter.getMaxListeners());
emitter.setMaxListeners(30);

for(let i=1;i<=25;i++){
    emitter.on('myEvent',()=>{
        console.log(`Listener ${i} called`);
    })
}
emitter.emit('myEvent');

console.log("Updated max listeners",emitter.getMaxListeners());