export const formatDate = (date: Date | string | undefined | null) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;

    if (isNaN(d.getTime())) return "";

    return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

export const formatTime = (time: Date | string | undefined | null) => {
    if (!time) return "";
    const d = typeof time === "string" ? new Date(time) : time;


    if (isNaN(d.getTime())) return "";

    return d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};
