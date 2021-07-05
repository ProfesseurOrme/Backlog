export const splitArray = (array) => {
    let newArray = [];
    array.map(item => {
        newArray.push(item.name);
    })
    return newArray.slice(0, -1).join(', ')+', '+newArray.slice(-1);
}

export const reformatDate = (date) => {
    const dateObject = new Date(date);
    return ((dateObject.getDate() >= 10 ? dateObject.getDate() : "0" + dateObject.getDate())  + "/" + (dateObject.getMonth() >= 10 ? dateObject.getMonth() : "0" + dateObject.getMonth()) + "/" + dateObject.getFullYear())
}