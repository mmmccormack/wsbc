const roster = {
    'kristy': 'f',
    'julie': 'f',
    'shawna': 'f',
    'pat': 'm',
    'tyler': 'm',
    'steve': 'm',
    'calvin': 'm',
    'gabe': 'm',
    'warren': 'm',
    'jake': 'm',
    'krae': 'm',
    'joe': 'm',
    'rosy': 'f',
    'balazo' : 'm',
    'jason' : 'm',
    'brittany' : 'f',
    'taylor' : 'f',
}
const stances = {
    'kristy': 'right',
    'julie': 'left',
    'shawna': 'right',
    'pat': 'right',
    'tyler': 'right',
    'steve': 'right',
    'warren': 'right',
    'jake': 'right',
    'krae': 'switch',
    'calvin': 'right',
    'joe': 'right',
    'gabe': 'switch',
    'rosy': 'right',
    'balazo': 'right',
    'jason': 'left',
    'brittany': 'right',
    'taylor': 'right',
}
// non-static lineup functions
const printoutContainer = document.querySelector('.printout');

let staticSwitch = true;

    const calcLineup = () => {
        staticSwitch = false;
        const batterList = document.querySelectorAll('.lineup .box');
        const rhythm = [];
        for (let i = 0; i < 3; i++) {
            rhythm.push(roster[batterList[i].innerHTML]);
        }
        const guys = [];
        const gals = [];
        batterList.forEach(batter => {
            if (roster[batter.innerHTML.toLowerCase()] === "m") {
                guys.push(batter.innerHTML.toLowerCase());
            } else {
                gals.push(batter.innerHTML.toLowerCase());
            }
        });
        for (let i = 1; i < 20; i++) {
            for (let i = 0; i < rhythm.length; i++) {
                const currentBatter = document.createElement('div');
                currentBatter.classList.add('box');
                let addedBatter;
                if (roster[batterList[i].innerHTML.toLowerCase()] === "m") {
                    addedBatter = guys.shift();
                    guys.push(addedBatter);
                }
                if (roster[batterList[i].innerHTML.toLowerCase()] === "f") {
                    addedBatter = gals.shift();
                    gals.push(addedBatter);
                }
                currentBatter.innerText = addedBatter;
                currentBatter.classList.add(stances[addedBatter]);
                currentBatter.addEventListener('click', (e) => e.target.classList.toggle('red'));
                printoutContainer.appendChild(currentBatter);
                printoutContainer.style.display = 'block'
                document.querySelector('.lineup-container').style.display = 'none';
            }
        }
    };

// static lineup functions
const handleDragStartLineup = ev => {
    dragSrcEl = ev.target;
    ev.target.classList.add('over');
    ev.dataTransfer.setData("text", ev.target.id);
    ev.effectAllowed = "move";
}
const handleDragOverLineup = ev => {
    ev.preventDefault();
}
const handleDropLineup = ev => {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("text");
    if (dragSrcEl.parentElement.id === "lineup" && ev.target.id !== "rosterLine") {
        if (dragSrcEl !== ev.target) {
            dragSrcEl.innerHTML = ev.target.innerHTML;
            dragSrcEl.id = ev.target.id;
            ev.target.innerHTML = ev.dataTransfer.getData('text');
            ev.target.id = ev.dataTransfer.getData('text');
        }
    } else if (dragSrcEl.parentElement.id === "lineup" && ev.target.id === "rosterLine") {
        const rosterContainer = ev.target;
        rosterContainer.appendChild(dragSrcEl);
    }
    if (ev.target.id === "lineup") {
        const batterAddedToLineup = document.getElementById(id);
        ev.target.appendChild(batterAddedToLineup);
    }
}

const handleDragEndLineup = ev => {
    ev.target.classList.remove('over');
    const lineupItems = document.querySelectorAll('.lineup .box');
    lineupItems.forEach( item => {
        item.classList.remove('red', 'left', 'right', 'switch', 'over');
        item.classList.add(stances[item.innerText]);
    })
    if (lineupItems.length >= 3) {
        for (let item = 0; item < lineupItems.length; item++) {
            let batterDragged = lineupItems[item];
            let batterAhead; 
            if (batterDragged.previousElementSibling == null) {
                batterAhead = lineupItems[lineupItems.length - 1];
            } else {
                batterAhead = batterDragged.previousElementSibling;
            }
            let batterBehind;
            if (batterDragged.nextElementSibling == null) {
                batterBehind = lineupItems[0];
            } else {
                batterBehind = batterDragged.nextElementSibling;
            }
            if (roster[batterAhead.textContent] === 'm' && roster[batterDragged.textContent] === 'm' && roster[batterBehind.textContent] === 'm') {
                batterAhead.classList.add('red');
                batterDragged.classList.add('red');
                batterBehind.classList.add('red');
            }
        }
    }
    return false;
}
// functions for position setting
const handleDragStartPos = ev => {
    dragSrcElPos = ev.target;
    ev.target.classList.add('over');
    ev.dataTransfer.setData("text", ev.target.id);
    ev.effectAllowed = "copy";
}
const handleDragOverPos = ev => {
        ev.preventDefault();
}
const handleDropPos = ev => {
    ev.preventDefault();
    if (dragSrcElPos !== ev.target) {
        ev.target.innerHTML = ev.dataTransfer.getData('text');
        ev.target.id = ev.dataTransfer.getData('text');
        dragSrcElPos.classList.remove('over');
        ev.target.innerHTML = ev.target.innerHTML.replace('pos', '');
    }
}
const handleDragEndPos = ev => {
  ev.target.classList.remove('over');
    return false;
}

let inningCount = 0;
const addInning = () => {
    const h3List = document.querySelectorAll('.position-container h3');
    const lastInning = h3List[h3List.length - 1].innerHTML;
    inningCount = ~~lastInning; 
    inningCount++;
    const positionContainer = document.querySelector('.position-container');
    const inningHeading = document.createElement('h3');
    inningHeading.classList.add(`inning${inningCount}`);
    inningHeading.innerHTML = inningCount;
    positionContainer.appendChild(inningHeading);
    for (let i = 1; i < 10; i++) {
        const positionSlot = document.createElement('div');
        positionSlot.classList.add(`pos-sub-container`, `box`, `i${inningCount}`);
        positionSlot.addEventListener('click', () => toggleInning(positionSlot.classList[2]));
        positionContainer.appendChild(positionSlot);
    }
    updateDropZones();
}

const displayReservePlayers = (activePlayers) => {
    const availablePlayers = document.querySelectorAll(`.roster-grid .box`);
    availablePlayers.forEach(box => box.classList.remove('red'))
    availablePlayers.forEach(player => {
        if (!activePlayers.includes(player.innerHTML)) {
            player.classList.toggle('red');
        }
    })
}

const toggleInning = inning => {
    const positionContainer = document.querySelectorAll(`.position-container .box`);
    positionContainer.forEach(box => box.classList.remove('red'))
    const inningRow = document.querySelectorAll(`.${inning}`);
    const activePlayers = [];
    inningRow.forEach(container => {
        container.classList.toggle('red');
        activePlayers.push(container.innerHTML)
    });
    displayReservePlayers(activePlayers);
}

const updateDropZones = () => {
    const dropZones = document.querySelectorAll('.pos-sub-container.box');
    dropZones.forEach(position => {
        position.addEventListener('dragover', handleDragOverPos);
        position.addEventListener('drop', handleDropPos);
    });
}

// scoring functions
const addInningScore = target => {
    const gloversOrOthers = document.querySelector(`.${target.classList[1][0]}`);
    let inningScore = target.innerHTML.slice(32);
    inningScore = ~~inningScore + 1;
    target.innerHTML = `<span class="edit-score"></span>${~~inningScore}`;
    gloversOrOthers.innerHTML = ~~gloversOrOthers.innerHTML + 1;
    updateEditButtons();
}

const updateInningScore = target => {
    if (target === null) {
        return;
    } else {
        let inningScore = prompt('Enter the score for this inning');
        if (!~~inningScore) {
            inningScore = 0;
        }
        target.innerHTML = `<span class="edit-score"></span>${~~inningScore}`;
        console.log(inningScore)
        const totalBox = document.querySelector(`.${target.classList[1][0]}`);
        let scoreTotal;
        for (let inning = 1; inning < 8; inning++) {
            const boxScore = document.querySelector(`.${target.classList[1][0]}${inning}`).innerHTML.slice(32);
            scoreTotal = ~~scoreTotal + ~~boxScore;
        }
        totalBox.innerHTML = scoreTotal;
        updateEditButtons();
    }
}


// event listeners
const positionItems = document.querySelectorAll('.roster-grid .box');
positionItems.forEach( item => {
    item.addEventListener('dragstart', handleDragStartPos);
    item.addEventListener('dragend', handleDragEndPos);
});
const lineupItems = document.querySelectorAll('.rosterLine .box');
lineupItems.forEach( item => {
    item.addEventListener('dragstart', handleDragStartLineup);
    item.addEventListener('dragend', handleDragEndLineup);
});
const inningScores = document.querySelectorAll('.inning-score');
inningScores.forEach( inningScore => {
    inningScore.addEventListener('click', () => addInningScore(inningScore));
})
const updateEditButtons = () => {
    const editScores = document.querySelectorAll('.edit-score');
    editScores.forEach( editScore => {
        editScore.addEventListener('click', (e) => {
            e.stopPropagation()
            updateInningScore(editScore.parentElement)
        })
    })
}
updateEditButtons();

document.querySelector('.lineup').addEventListener('dragover', handleDragOverLineup);
document.querySelector('.rosterLine').addEventListener('dragover', handleDragOverLineup);
document.querySelector('.lineup').addEventListener('drop', handleDropLineup);
document.querySelector('.rosterLine').addEventListener('drop', handleDropLineup);

// addInning();
updateDropZones(inningCount);


document.querySelector('.add-inning').addEventListener('click', () => addInning());

document.getElementById('dynamic').addEventListener('click', () => {
    calcLineup()
});
