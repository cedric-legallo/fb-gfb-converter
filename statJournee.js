import fs from 'node:fs/promises';

const param = parseInt(process.argv[2]?.split('=')[1])
const currentDay = isNaN(param) ? 2 : param

const prevStatFile = await fs.open(`./exports/GFB-S44-J${currentDay - 1}.csv`)
const currentStatFile = await fs.open(`./exports/GFB-S44-J${currentDay}.csv`)

const prevStat = {}
const currentStat = {}

function parseStatLine(line) {
    //Team, Coach, Roster, Value, W, D, L, TD+, TD-, KO+, KO-, Cas+, Cas-, Death+, Death-, Pass+, Pass-, Pass meters+, Pass meters-, Surf+, Surf-, Exp+, Exp-, SPP+, SPP-
    const [team, coach, roster, value, w, d, l, tdPlus, tdMinus, koPlus, koMinus, casPlus, casMinus, deathPlus, deathMinus, passPlus, passMinus, passMetersPlus, passMetersMinus, surfPlus, surfMinus, expPlus, expMinus, sppPlus, sppMinus] = line.split(', ')
    return {
        team,
        coach,
        roster,
        value,
        w: parseInt(w),
        d: parseInt(d),
        l: parseInt(l),
        tdPlus: parseInt(tdPlus),
        tdMinus: parseInt(tdMinus),
        koPlus: parseInt(koPlus),
        koMinus: parseInt(koMinus),
        casPlus: parseInt(casPlus),
        casMinus: parseInt(casMinus),
        deathPlus: parseInt(deathPlus),
        deathMinus: parseInt(deathMinus),
        passPlus: parseInt(passPlus),
        passMinus: parseInt(passMinus),
        passMetersPlus: parseInt(passMetersPlus),
        passMetersMinus: parseInt(passMetersMinus),
        surfPlus: parseInt(surfPlus),
        surfMinus: parseInt(surfMinus),
        expPlus: parseInt(expPlus),
        expMinus: parseInt(expMinus),
        sppPlus: parseInt(sppPlus),
        sppMinus: parseInt(sppMinus),
    }
}

for await (const line of prevStatFile.readLines()) {
    if (!line.startsWith('Team')) {
        const [, coach] = line.split(', ')
        prevStat[coach] = parseStatLine(line)
    }
}

for await (const line of currentStatFile.readLines()) {
    if (!line.startsWith('Team')) {
        const [, coach] = line.split(', ')
        currentStat[coach] = parseStatLine(line)
    }
}

const stats = {}
Object.keys(currentStat).forEach(coach => {
    stats[coach] = {
        team: currentStat[coach].team,
        coach: currentStat[coach].coach,
        roster: currentStat[coach].roster,
        value: currentStat[coach].value,
        w: currentStat[coach].w - (prevStat[coach]?.w ?? 0),
        d: currentStat[coach].d - (prevStat[coach]?.d ?? 0),
        l: currentStat[coach].l - (prevStat[coach]?.l ?? 0),
        tdPlus: currentStat[coach].tdPlus - (prevStat[coach]?.tdPlus ?? 0),
        tdMinus: currentStat[coach].tdMinus - (prevStat[coach]?.tdMinus ?? 0),
        koPlus: currentStat[coach].koPlus - (prevStat[coach]?.koPlus ?? 0),
        koMinus: currentStat[coach].koMinus - (prevStat[coach]?.koMinus ?? 0),
        casPlus: currentStat[coach].casPlus - (prevStat[coach]?.casPlus ?? 0),
        casMinus: currentStat[coach].casMinus - (prevStat[coach]?.casMinus ?? 0),
        deathPlus: currentStat[coach].deathPlus - (prevStat[coach]?.deathPlus ?? 0),
        deathMinus: currentStat[coach].deathMinus - (prevStat[coach]?.deathMinus ?? 0),
        passPlus: currentStat[coach].passPlus - (prevStat[coach]?.passPlus ?? 0),
        passMinus: currentStat[coach].passMinus - (prevStat[coach]?.passMinus ?? 0),
        passMetersPlus: currentStat[coach].passMetersPlus - (prevStat[coach]?.passMetersPlus ?? 0),
        passMetersMinus: currentStat[coach].passMetersMinus - (prevStat[coach]?.passMetersMinus ?? 0),
        surfPlus: currentStat[coach].surfPlus - (prevStat[coach]?.surfPlus ?? 0),
        surfMinus: currentStat[coach].surfMinus - (prevStat[coach]?.surfMinus ?? 0),
        expPlus: currentStat[coach].expPlus - (prevStat[coach]?.expPlus ?? 0),
        expMinus: currentStat[coach].expMinus - (prevStat[coach]?.expMinus ?? 0),
        sppPlus: currentStat[coach].sppPlus - (prevStat[coach]?.sppPlus ?? 0),
        sppMinus: currentStat[coach].sppMinus - (prevStat[coach]?.sppMinus ?? 0),
    }
})

const newStatLines = Object.values(stats).map(({team, coach, roster, value, w, d, l, tdPlus, tdMinus, koPlus, koMinus, casPlus, casMinus, deathPlus, deathMinus, passPlus, passMinus, passMetersPlus, passMetersMinus, surfPlus, surfMinus, expPlus, expMinus, sppPlus, sppMinus}) => ([`J${currentDay}`, team, coach, roster, value, w, d, l, tdPlus, tdMinus, koPlus, koMinus, casPlus, casMinus, deathPlus, deathMinus, passPlus, passMinus, passMetersPlus, passMetersMinus, surfPlus, surfMinus, expPlus, expMinus, sppPlus, sppMinus].join(', ')))

await fs.writeFile(`stat-J${currentDay}.csv`, 'Journée, Team, Coach, Roster, Value, W, D, L, TD+, TD-, KO+, KO-, Cas+, Cas-, Death+, Death-, Pass+, Pass-, Pass meters+, Pass meters-, Surf+, Surf-, Exp+, Exp-, SPP+, SPP-\n' + newStatLines.join('\n'))