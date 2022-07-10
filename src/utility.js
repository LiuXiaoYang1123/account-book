export const LIST_VIEW = 'list'
export const CHART_VIEW = 'chart'
export const INCOME = 'income'
export const OUTCOME = 'outcome'
export const padLeft = n => {
    return (n < 10 ? '0' + n : n);
}

export const genRangeList = (startAt, size) => {
    const arr = []
    for (let i = 0; i < size; i++) {
        arr[i] = startAt + i;
    }
    return arr
}

export const parseToYearAndMonth = str => {
    const date = str ? new Date(str) : new Date();
    return {
        year: date.getFullYear(),
        month: date.getMonth()
    }
}