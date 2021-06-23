class PlatformSelectService {

    sortValues(results) {
        return results.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }

    static createSlug(search) {
        return search.split(' ').join('-').toLowerCase()
    }

    static platformSelector = (data) => {
        let results = [];
        data.forEach(game => {
            game.platforms.forEach(platform => {
                const result = results.find((element) => element.name === platform.name )

                if(!result) {
                    results.push({name : platform.name, uuid : platform.uuid})
                }
            })
        })

        return PlatformSelectService.prototype.sortValues(results);
    }

    static searchByNameAndPlatform = (name, option, games) => {

        let firstResult = [], finalResult = [];
        if(name) {
            games.forEach(game => {
                (game.slug.includes(this.createSlug(name))) ? firstResult.push(game) : "";
            })
        } else {
            firstResult = games;
        }

        if(option) {
            firstResult.forEach(game => {
                game.platforms.forEach(platform => {
                    (option === platform.name) ? finalResult.push(game) : "";
                })
            })
        } else {
            finalResult = firstResult;
        }

        return (finalResult.length >= 1) ? {nbResults : finalResult.length, games :PlatformSelectService.prototype.sortValues(finalResult)} : [];
    }
}

export default PlatformSelectService;