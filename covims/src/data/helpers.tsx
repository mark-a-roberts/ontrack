const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;

export const capitalize = (str: string) => (str.charAt(0).toUpperCase() + str.slice(1));

interface CloseItem {
    lat: number,
    lon: number
}

export const close = (item: CloseItem, lat: number, lon: number) => Math.pow(item.lat - lat, 2) + Math.pow(item.lon - lon, 2);

export const timeDifference = (t1: Date, t2: Date): string => {
    const timeDiff = t1.getTime() - t2.getTime();
    let ds = '';
    if (timeDiff < HOUR) {
        let min = Math.floor(timeDiff / MIN);
        ds = (min !== 0) ? min + ' mins ago' :
            Math.floor(timeDiff / SEC) + ' secs ago';
    } else {
        const today = t1.toDateString();
        let y: Date = new Date(t1);
        y.setDate(t1.getDate() - 1);
        const yesterday = y.toDateString();
        if (today === t2.toDateString()) {
            // today
            ds = 'Today';
        } else if (yesterday === t2.toDateString()) {
            // yesterday
            ds = 'Yesterday'
        } else {
            ds = t2.toLocaleDateString('en', {'month': 'short', 'day': 'numeric'});
        }
        ds += ' ' + t2.toLocaleTimeString('en', {'hour12': false, 'hour': '2-digit', 'minute': '2-digit'});
    }
    return ds;

};
