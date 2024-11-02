export const getRandomDarkColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const value = Math.floor(Math.random() * 16);
        if (i === 0) {
            color += Math.floor(Math.random() * 8).toString(16);
        } else {
            color += letters[value];
        }
    }
    return color;
};

export const formatTimestamp = (timestamp: string | number | Date): string => {
    const date = new Date(timestamp);
    const now = new Date();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const get12HourTime = (date: Date): string => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    const isSameDay = (d1: Date, d2: Date): boolean =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();

    const isYesterday = (d1: Date, d2: Date): boolean => {
        const yesterday = new Date(d2);
        yesterday.setDate(d2.getDate() - 1);
        return isSameDay(d1, yesterday);
    };

    const isSameWeek = (d1: Date, d2: Date): boolean => {
        const startOfWeek = new Date(d2);
        startOfWeek.setDate(d2.getDate() - d2.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return d1 >= startOfWeek && d1 <= endOfWeek;
    };

    if (isSameDay(date, now)) {
        return get12HourTime(date);
    } else if (isYesterday(date, now)) {
        return 'Yesterday';
    } else if (isSameWeek(date, now)) {
        return daysOfWeek[date.getDay()];
    } else {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
    }
}

export function getLastSeenMessage(timestamp: string): string {
    const now = new Date();
    const seenDate = new Date(timestamp);

    const diffInMs = now.getTime() - seenDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const dayOfWeekSeen = seenDate.getDay();
    const dayOfWeekNow = now.getDay();

    if (diffInMinutes < 1) {
        return "last seen just now";
    } else if (diffInMinutes < 60) {
        return `last seen ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
        return `last seen ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays === 1) {
        return "last seen yesterday";
    } else if (diffInDays < 7 && dayOfWeekSeen <= dayOfWeekNow) {
        const dayOptions = { weekday: 'long' } as const;
        return `last seen on ${seenDate.toLocaleDateString(undefined, dayOptions)}`;
    } else {
        const options = { month: 'numeric', day: 'numeric', year: '2-digit' } as const;
        return `last seen on ${seenDate.toLocaleDateString(undefined, options)}`;
    }
}

