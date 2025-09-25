import { ROSTER_LIST, ROSTER_BY_COACH } from "./roster.js";

const ROSTER_STATS = Object.entries(ROSTER_BY_COACH).reduce((acc, [coach, roster]) => {
    if (acc[roster]) {
        acc[roster] += 1
    } else {
        acc[roster] = 1
    }
    return acc
}, {})

Object.entries(ROSTER_LIST).forEach(([key, value]) => {
    if (!ROSTER_STATS[value]) {
        ROSTER_STATS[value] = 0
    }
})

console.dir(Object.entries(ROSTER_STATS).sort((a, b) => b[1] - a[1]))