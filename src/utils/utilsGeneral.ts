export function dateToUTC(d?: Date) {
    var date = d ? d : new Date();
    var utcDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    return new Date(utcDate);
}

export function capitalizeString(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}