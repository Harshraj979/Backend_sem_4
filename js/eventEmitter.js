const eventEmitter=require('events');
/*
const booking=new eventEmitter();

booking.on('newBooking',(user)=>{
    console.log(`Ticket generated for ${user}` );
})
booking.on('newBooking',(user)=>{
    console.log(`Email sent to ${user}`);
})
booking.on('newBooking',(user,seatType)=>{
    console.log(`Event recorded as ${user} ${seatType} seat type in the system`);
})

booking.emit('newBooking', 'John Doe','premium');
*/

function createBookingSystem() {
    const booking = new eventEmitter();

    booking.on('newBooking', (user) => {
        console.log(`Ticket generated for ${user}`);
    });

    booking.on('newBooking', (user) => {
        console.log(`Email sent to ${user}`);
    });

    booking.on('newBooking', (user, seatType) => {
        console.log(`Event recorded as ${user} ${seatType} seat type in the system`);
    });

    return booking;
}

const booking = createBookingSystem();
booking.emit('newBooking', 'John Doe', 'premium');

const calculate=new eventEmitter();

function calculatePercentage(a,b,c,d,e)
{
    return ((a+b+c+d+e)/500)*100;
}

const users = [
    { name: 'Harsh', scores: [80, 90, 85, 88, 92] },
    { name: 'Aman', scores: [75, 85, 90, 92, 88] },
    { name: 'Bobby', scores: [70, 80, 85, 78, 82] }
];

calculate.on('percentage',(user,percentage)=>{
    console.log(`${user} achieved ${percentage} in his exam`);
})


users.forEach(user => {
    const percentage = calculatePercentage(...user.scores);
    calculate.emit('percentage', user.name, percentage);
});
