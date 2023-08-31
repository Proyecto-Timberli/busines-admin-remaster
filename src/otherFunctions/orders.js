
export function scroll(a, b) {
    window.scrollTo(a || 0, b || 0)
}

export function ordenamiento(array, atribute, orden) {
    let arrayDeObj = [...array]

    let arrayObj = arrayDeObj.sort(function (a, b) {
        let c = a
        let d = b

        if (atribute === "name") {
            c = a[atribute].toLowerCase()
            d = b[atribute].toLowerCase()
        }
        else if (atribute === "identifier") {
            c = a[atribute].toLowerCase()
            d = b[atribute].toLowerCase()
        }
        else if (atribute === "numero") {
            d = Number(a[atribute].length)
            c = Number(b[atribute].length)
        }
        else {
            c = Number(a[atribute])
            d = Number(b[atribute])
        }

        if (c > d) {
            return 1;
        }
        if (c < d) {
            return -1;
        }
        // a must be equal to b
        else return 0;
    });
    if (orden && orden === "desc") {
        arrayObj.reverse()
    }
    return arrayObj
}

export function filtroName(array, search, attibute) {
    return array.filter(e => e[attibute] && e[attibute].toLowerCase().includes(search.toLowerCase()))
}


const dateOptions = {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "numeric",
    minute: "numeric"
};
export const formatDate = date => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES', dateOptions);
};
export const getDateTime = date => {
    const newDate = new Date(date);
    return newDate.getTime()
}