export const urlBacklogApi = (locale) => {
    const addLocale = "/" + locale

    //To Do : find a way to use the token with the gesdimet_jwt package

    if(process.env.NODE_ENV === "development") {
        return locale ? process.env.BACKLOG_API_URL_DEVELOPMENT + addLocale : process.env.BACKLOG_API_URL_DEVELOPMENT;
    } else {
        return locale ? process.env.BACKLOG_API_URL_PRODUCTION + addLocale : process.env.BACKLOG_API_URL_PRODUCTION;
    }
}

export const urlRAWGApi =_ => { return "https://api.rawg.io"};