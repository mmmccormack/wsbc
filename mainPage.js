import { app, getDatabase, database, ref, get } from './firebase.js'

const dbRef = ref(database);

const gameTimes = [`8:00pm`, `9:00pm`];

const weeklySchedule = ['May 3', 'May 10', 'May 17', 'May 24', 'May 31', 'June 7', 'June 14', 'June 21', 'June 28', 'July 5', 'July 12', 'July 19', 'July 26', 'August 2', 'August 9', 'August 16','August 23', 'August 30', 'playoffs'];
const weeklyScores = {
    1 : {
        'balls' : '',
        'bongs' : '',
        'glovers' : '',
        'cocks' : ''
    },
    2 : {
        'cocks' : '',
        'balls' : '',
        'bongs' : '',
        'glovers' : ''
    },
    3 : {
        'glovers' : '0',
        'cocks' : '0',
        'bongs' : '0',
        'balls' : '0'
    },
    4 : {
        'glovers' : '',
        'cocks' : '',
        'bongs' : '',
        'balls' : ''
    },
    5 : {
        'glovers' : '',
        'balls' : '',
        'cocks' : '',
        'bongs' : ''
    },
    6 : {
        'bongs' : '',
        'glovers' : '',
        'cocks' : '',
        'balls' : ''
    },
    7 : {
        'cocks' : '',
        'bongs' : '',
        'glovers' : '',
        'balls' : ''
    },
    8 : {
        'cocks' : '',
        'glovers' : '',
        'balls' : '',
        'bongs' : ''
    },
    9 : {
        'balls' : '0',
        'cocks' : '0',
        'glovers' : '0',
        'bongs' : '0'
    },
    10 : {
        'balls' : '',
        'cocks' : '',
        'glovers' : '',
        'bongs' : ''
    },
    11 : {
        'balls' : '',
        'glovers' : '',
        'bongs' : '',
        'cocks' : ''
    },
    12 : {
        'bongs' : '',
        'balls' : '',
        'cocks' : '',
        'glovers' : ''
    },
    13 : {
        'glovers' : '',
        'bongs' : '',
        'balls' : '',
        'cocks' : ''
    },
    14 : {
        'cocks' : '0',
        'cocks' : '0',
        'cocks' : '0',
        'cocks' : '0'
    },
    15 : {
        'bongs' : '',
        'cocks' : '',
        'balls' : '',
        'glovers' : ''
    },
    16 : {
        'cocks' : '',
        'glovers' : '',
        'bongs' : '',
        'balls' : ''
    },
    17 : {
        'cocks' : '',
        'bongs' : '',
        'glovers' : '',
        'balls' : ''
    },
    18 : {
        'cocks' : '',
        'bongs' : '',
        'glovers' : '',
        'balls' : ''
    },
    19 : {
        'cocks' : '0',
        'bongs' : '0',
        'glovers' : '0',
        'balls' : '0'
    }
};

const takeBases = ['none','cocks','glovers','none','balls','bongs','cocks','glovers','balls','none','glovers','bongs','glovers','cocks','none','balls'];

let dbSnapshot;


get(dbRef).then((snapshot) => {
    if(snapshot.exists()){
        dbSnapshot = snapshot.val()['-NKd-kS06Y9qY5yLoiKZ'];
        dbSnapshot.forEach((week, index) => {
            weeklyScores[index].balls = dbSnapshot[index].balls;
            weeklyScores[index].bongs = dbSnapshot[index].bongs;
            weeklyScores[index].glovers = dbSnapshot[index].glovers;
            weeklyScores[index].cocks = dbSnapshot[index].cocks;
        });
    } else {
        console.log("No data available")
    }
})
    .then(() => populateSchedule())
    .then(() => postStandings())
    .then(() => populatePlayoffs())
    .then(() => getCurrentWeek())
    .then(() => document.querySelector('.loading').style.display = 'none')
    .catch((error) => {
    console.log(error)
});

const totalStandings = {
    'wins' : {
        'bongs' : 0,
        'balls' : 0,
        'glovers' : 0,
        'cocks' : 0
    },
    'losses' : {
        'bongs' : 0,
        'balls' : 0,
        'glovers' : 0,
        'cocks' : 0
    },
    'ties' : {
        'bongs' : 0,
        'balls' : 0,
        'glovers' : 0,
        'cocks' : 0
    },
    'runs' : {
        'bongs' : 0,
        'balls' : 0,
        'glovers' : 0,
        'cocks' : 0
    }

}

const teamAndWinsRuns = [];

const addTeamInfo = team => {
    if (team === 'bongs') {
        return 'Bongs 4 Kitties';
    } else if (team === 'balls') {
        return 'Lucille Balls';
    } else if (team === 'cocks') {
        return 'Northcocks';
    } else if (team === 'glovers') {
        return 'Modern Glovers';
    }
};
const addPlayoffTeamInfo = team => {
    if (team == 'Bongs') {
        return 'bongs';
    } else if (team == 'Lucille Balls') {
        return 'balls';
    } else if (team == 'Northcocks') {
        return 'cocks';
    } else if (team == 'Modern Glovers') {
        return 'glovers';
    }
};

const populatePlayoffs = () => {
    const currentStandings = document.querySelectorAll('.place');
    const standingsArray = [];
    currentStandings.forEach(place => {
        const row = place.innerText;
        const num = row.indexOf(row.match(/\d/));
        const fullTeamName = row.slice(0, num).trim();
        standingsArray.push(addPlayoffTeamInfo(fullTeamName));
    });
    weeklyScores['16'] = {
        [standingsArray[0]] : '',
        [standingsArray[3]] : '',
        [standingsArray[1]] : '',
        [standingsArray[2]] : '',
    }
    weeklyScores['17'] = {
        [standingsArray[2]] : '',
        [standingsArray[1]] : '',
        [standingsArray[3]] : '',
        [standingsArray[0]] : '',
    }
    weeklyScores['18'] = {
        [standingsArray[0]] : '',
        [standingsArray[3]] : '',
        [standingsArray[1]] : '',
        [standingsArray[2]] : '',
    }
    for (let i = 1; i < weeklySchedule.length; i++) {
        if (i >= 16 && i <= 18) {
            const schedule = document.querySelector('.schedule');
            const week = document.createElement('div');
            addWeek(schedule, week, i);
            if (weeklySchedule[i-1] === 'August 16' || weeklySchedule[i-1] === 'August 23' || weeklySchedule[i-1] === 'August 30') { 
                populateTeams(week, i);
                addVersusAndGameTimes(week);
            } else if (weeklySchedule[i-1] === 'May 17' || weeklySchedule[i-1] === 'June 28' || weeklySchedule[i-1] === 'August 2' || weeklySchedule[i-1] === 'September 6') {
                week.innerText = 'Holiday Weekend - NO GAMES' 
                week.classList.add(`holiday`);
            } else {
                populateTeams(week, i);
                addVersusAndGameTimes(week);
            }
        }
    };
}

const whoTakesBases = (week, currentWeek) => {
    const thisWeeksTeams = week.querySelectorAll('.team');
    thisWeeksTeams.forEach(team => {
        if (team.classList[0] == takeBases[currentWeek]) {
            const takesTheBases = `<div class="bases"><img src="./assets/base-01.svg" /></div>`;
            team.innerHTML += takesTheBases;
        }
    })
}

const populateTeams = (week, currentWeek) => {
    let teamCounter = 1;
    for (let item in weeklyScores[currentWeek]) {
        const teamAndScore = document.createElement('div');
        if (weeklyScores[currentWeek][item] === '') {
            teamAndScore.innerHTML = `${addTeamInfo(item)} `;
        } else {
            teamAndScore.innerHTML = `${addTeamInfo(item)}  &ndash; ${weeklyScores[currentWeek][item]}`;
        }
        week.appendChild(teamAndScore).classList.add(item, `team`, `team${teamCounter}`, `week${currentWeek}`);
        if (teamCounter == 2) {
            teamAndScore.classList.add('secondTeam');
            week.appendChild(document.createElement('div')).classList.add('spacer');
        }
        teamCounter++;
    }
    whoTakesBases(week, currentWeek)
}

const addWeek = (weekDiv, week, currentWeek) => {
    const weekHeading = document.createElement('h2');
    if (currentWeek === 16 || currentWeek === 17 || currentWeek === 18) {
        weekDiv.appendChild(weekHeading).innerHTML = `Week ${currentWeek} - Semi-Finals - ${weeklySchedule[currentWeek-1]}`;
    } else {
        weekDiv.appendChild(weekHeading).innerHTML = `Week ${currentWeek} - ${weeklySchedule[currentWeek-1]}`;
    }
    weekDiv.appendChild(week).classList.add(`week`);
}

const addVersusAndGameTimes = week => {
    for (let i = 1; i < 3; i++) {
        const versus = document.createElement('h4');
        const gameTime = document.createElement('h5');
        const home = document.createElement('div')
        const away = document.createElement('div')
        home.innerHTML = '<h6>home</h6>';
        away.innerHTML = '<h6>away</h6>';
        gameTime.innerText = gameTimes[i-1];
        versus.innerText = `vs`;
        week.appendChild(home).classList.add(`home${i}`);
        week.appendChild(away).classList.add(`away${i}`);
        week.appendChild(versus).classList.add(`versus`,`versus${i}`);
        week.appendChild(gameTime).classList.add(`gameTime`,`gameTime${i}`);
    }
}


const populateSchedule = () => {
    for (let i = 1; i < 16; i++) {
        const schedule = document.querySelector('.schedule');
        const week = document.createElement('div');
        addWeek(schedule, week, i);
        if (weeklySchedule[i-1] === 'May 17' || weeklySchedule[i-1] === 'June 28' || weeklySchedule[i-1] === 'August 2' || weeklySchedule[i-1] === 'August 31') {
            week.innerText = 'Holiday Weekend - NO GAMES' 
            week.classList.add(`holiday`);
        } else if (weeklySchedule[i-1] === 'August 16' || weeklySchedule[i-1] === 'August 23' || weeklySchedule[i-1] === 'August 30') { 
            // populateTeams(week, i);
            // addVersusAndGameTimes(week);
        } else {
            populateTeams(week, i);
            addVersusAndGameTimes(week);
        }
    };
}


const getWinningTeam = (object, value) => {
    const winningTeam = Object.keys(object).find(key => object[key] === value);
    const totalWins = totalStandings.wins[winningTeam];
    const totalRuns = totalStandings.runs[winningTeam];
    totalStandings.wins[winningTeam] = totalWins + 1;
    totalStandings.runs[winningTeam] = totalRuns + value;
    object[winningTeam] = '';
}

const getLosingTeam = (object, value) => {
    const losingTeam = Object.keys(object).find(key => object[key] === value);
    const totalLosses = totalStandings.losses[losingTeam];
    const totalRuns = totalStandings.runs[losingTeam];
    totalStandings.losses[losingTeam] = totalLosses + 1;
    totalStandings.runs[losingTeam] = totalRuns + value;
    object[losingTeam] = '';
}

const tie = (object, value) => {
    const tiedTeam = Object .keys(object).find(key => object[key] === value);
    const totalTies = totalStandings.ties[tiedTeam];
    const totalRuns = totalStandings.runs[tiedTeam];
    totalStandings.ties[tiedTeam] = totalTies + 1;
    totalStandings.runs[tiedTeam] = totalRuns + value;
    object[tiedTeam] = '';
}

const findWinner = (scores, week) => {
    const homeScore = scores[0];
    const visScore = scores[1];
    if (homeScore > visScore) {
        getWinningTeam(weeklyScores[week], homeScore);
        getLosingTeam(weeklyScores[week], visScore);
        scores.shift();
        scores.shift();
    } else if (homeScore < visScore) {
        getWinningTeam(weeklyScores[week], visScore);
        getLosingTeam(weeklyScores[week], homeScore);
        scores.shift();
        scores.shift();
    } else if (homeScore === visScore || visScore === homeScore) {
        tie(weeklyScores[week], visScore);
        tie(weeklyScores[week], homeScore);
        scores.shift();
        scores.shift();
    } else {
        scores.shift();
        scores.shift();
    }
}

const postStandings = () => {
    const scores = [];
    // runs through scores of each week
    for (let i = 1; i < weeklySchedule.length; i++) {
        // find each score for each team in the week
        for (let item in weeklyScores[i]) {
            if (typeof weeklyScores[i][item] === `number`) {
                // scores added to array; first and second array values will be compared to find winner
                scores.push(weeklyScores[i][item]);
                if (scores.length === 2) {
                    findWinner(scores, i)
                }
            }
        }
    }
    // post standings inside div
    const standings = document.querySelector(`.standings`);

    for (let team in totalStandings.wins) {
        const teamInfo = {};
        teamInfo.team = team;
        teamInfo.wins = totalStandings.wins[team].toString();
        teamInfo.losses = totalStandings.losses[team].toString();
        teamInfo.ties = totalStandings.ties[team].toString();
        teamInfo.runs = totalStandings.runs[team].toString();
        teamAndWinsRuns.push(teamInfo)
    }

    // sort teams in array based on wins, and then by runs if they have equal wins
    teamAndWinsRuns.sort((a,b)=> (a.wins.localeCompare(b.wins) || a.ties.localeCompare(b.ties) || a.runs - b.runs ));

    // standings are sorted in reverse order, so the for loop is run backwards to go through the array
    for (let i = 3; i > -1; i--) {
        const teamInQuestion = teamAndWinsRuns[i].team;
        const place = document.createElement('div');
        place.innerText = `${addTeamInfo(teamInQuestion)}`;
        standings.appendChild(place).classList.add(teamInQuestion, `place`)
        const winTotal = document.createElement('div');
        const lossTotal = document.createElement('div');
        const tieTotal = document.createElement('div');
        const runTotal = document.createElement('div');
        winTotal.classList.add('numbers');
        lossTotal.classList.add('numbers');
        tieTotal.classList.add('numbers');
        runTotal.classList.add('numbers');
        place.appendChild(winTotal).innerText = totalStandings.wins[teamInQuestion]
        place.appendChild(lossTotal).innerText = totalStandings.losses[teamInQuestion]
        // may need to add number notation and a minus one for a universal rainout
        place.appendChild(tieTotal).innerText = totalStandings.ties[teamInQuestion]
        place.appendChild(runTotal).innerText = totalStandings.runs[teamInQuestion]
    }
}

const getCurrentWeek = () => {
    for (let i = 1; i < weeklySchedule.length; i++) {
        for (let item in dbSnapshot[i]) {
            if (dbSnapshot[i][item] === '') {
                const upcomingGame = document.querySelector('.upcomingGame');
                const week = document.createElement('div');
                addWeek(upcomingGame, week, i)
                populateTeams(week, i);
                addVersusAndGameTimes(week);
                return;
            }
        }
    }     
}