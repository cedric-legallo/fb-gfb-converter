import fs from 'node:fs/promises';
import { ROSTER_BY_COACH } from "./roster.js";

const path = process.argv[2]?.split('=')[1] ?? 'GFB.csv'

const file = await fs.open(path);
const days = []
let currentDay
let currentMatch
let last = false
for await (const line of file.readLines()) {
    if (line.startsWith('Ronde')) {
        currentDay = parseInt(line.charAt(6))
        currentMatch = 0
        days[currentDay] = []
        days[currentDay][currentMatch] = `J${currentDay}`
    } else if (line.startsWith('Round')) {
        currentDay = parseInt(line.charAt(6))
        currentMatch = 0
        days[currentDay] = []
        days[currentDay][currentMatch] = `J${currentDay}`
    } else if (currentDay) {
        if (line.startsWith(';')) {
            last = false
            const [,,coach,,score] = line.split(';')
            if (days[currentDay][currentMatch].endsWith(';')) {
                days[currentDay][currentMatch] += `${score};${coach};${ROSTER_BY_COACH[coach]};`
            } else {
                days[currentDay][currentMatch] += `;${coach};${ROSTER_BY_COACH[coach]};${score};`
            }
        } else {
            if (last) {
                days[currentDay].pop()
                currentDay = undefined
            } else {
                currentMatch +=1
                days[currentDay][currentMatch] = `J${currentDay}`
            }
            last = true
        }
    } else {
        // Do Nothing
    }
}
days.shift()

if (days.length) {
    days.forEach(async (day, idx) => {
        await fs.writeFile(`result-gfb-J${idx+1}.csv`, day.flat().join('\n'))
    });
    
    fs.writeFile('result-gfb-all.csv', days.flat().join('\n'))
    
    fs.writeFile('appariements.txt', days[days.length - 1].map((line, idx) => {
        const data = line.split(';')
        return `${idx + 1} ${data[1]} - ${data[5]}`
    }).join('\n'))
}