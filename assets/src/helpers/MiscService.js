export const splitArray = (array) => {
    let newArray = [];
    array.map(item => {
        newArray.push(item.name);
    })
    return newArray.slice(0, -1).join(', ')+', '+newArray.slice(-1);
}

export const reformatDate = (date) => {
    if (date) {
        let dArr = date.split("-");
        return dArr[2] + "/" + dArr[1] + "/" + dArr[0];
    } else {
        return "TBA";
    }
}