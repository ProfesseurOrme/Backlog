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

    static searchByNameAndPlatform = (name, option, datas) => {

        let firstResult = [], finalResult = [];
        if(name) {
            datas.forEach(data => {
                if("slug" in data) {
                    (data.slug.includes(this.createSlug(name))) ? firstResult.push(data) : "";
                }else {
                    (data.username.includes(name)) ? firstResult.push(data) : "";
                }
            })
        } else {
            firstResult = datas;
        }

        if(option) {
            firstResult.forEach(data => {
                data.platforms.forEach(platform => {
                    (option === platform.name) ? finalResult.push(data) : "";
                })
            })
        } else {
            finalResult = firstResult;
        }

        return (finalResult.length >= 1) ? {nbResults : finalResult.length, datas :PlatformSelectService.prototype.sortValues(finalResult)} : [];
    }
}

export default PlatformSelectService;