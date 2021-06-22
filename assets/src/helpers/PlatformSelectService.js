import {element} from "prop-types";

export const platformSelector = (data) => {
    let results = [];

    data.forEach(game => {
        game.platforms.forEach(platform => {
            const result = results.find((element) => element.name === platform.name )

            if(!result) {
                results.push({name : platform.name})
            }
        })
    })

    return results;
}