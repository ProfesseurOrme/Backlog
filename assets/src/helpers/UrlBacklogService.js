export const urlBacklogApi = () => {
    if(process.env.NODE_ENV === "development") {
        return process.env.BACKLOG_API_URL_DEVELOPMENT;
    } else {
        return process.env.BACKLOG_API_URL_PRODUCTION;
    }
}

export const urlRAWGApi =_ => { return "https://api.rawg.io"};