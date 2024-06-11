export const formatDeliveryTime = (min) => {
    const milliseconds = Date.now() + (Number(min) * 60000);          //getting the milliseconds between today and 1/1/1970 and adding the milliseconds in minutes
    const deliveryTime = new Date(milliseconds);
    let hours = deliveryTime.getHours();
    const AmPm = hours > 12 ? 'pm' : 'am';
    hours = hours % 12;                                                 //converting 24 hour format into 12 hour format
    hours = hours ? hours : 12;
    let minutes = deliveryTime.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}${AmPm}`;
}