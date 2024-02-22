const roster = {
    'kristy': 'f',
    'julie': 'f',
    'shawna': 'f',
    'pat': 'm',
    'tyler': 'm',
    'steve': 'm',
    'gabe': 'm',
    'warren': 'm',
    'jake': 'm',
    'krae': 'm',
    'joe': 'm',
    'layla': 'f',
    'sub1' : 'f',
    'sub2' : 'f'
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
    'joe': 'right',
    'gabe': 'switch',
    'layla': 'right',
    'sub1': 'switch',
    'sub2': 'switch'
}

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
    } else if (dragSrcEl.parentElement.id === "lineup" && ev.target.id === "roster") {
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
const clearPositions = () => {
    dropZones.forEach(position => {
        position.removeAttribute('id');
        position.innerText = '';
    })
}
const toggleInning = inning => {
    const inningRow = document.querySelectorAll(`.${inning}`);
    inningRow.forEach(container => container.classList.toggle('red'))
}
const positionItems = document.querySelectorAll('.roster-grid .box');
    positionItems.forEach( item => {
        item.addEventListener('dragstart', handleDragStartPos);
        item.addEventListener('dragend', handleDragEndPos);
    });
const dropZones = document.querySelectorAll('.pos-sub-container.box');
    dropZones.forEach(position => {
        position.addEventListener('dragover', handleDragOverPos);
        position.addEventListener('drop', handleDropPos);
        position.addEventListener('click', () => {
            toggleInning(position.classList[2])
        });
    })
const lineupItems = document.querySelectorAll('.rosterLine .box');
    lineupItems.forEach( item => {
        item.addEventListener('dragstart', handleDragStartLineup);
        item.addEventListener('dragend', handleDragEndLineup);
    });

document.querySelector('.lineup').addEventListener('dragover', handleDragOverLineup);
document.querySelector('.rosterLine').addEventListener('dragover', handleDragOverLineup);
document.querySelector('.lineup').addEventListener('drop', handleDropLineup);
document.querySelector('.rosterLine').addEventListener('drop', handleDropLineup);

document.querySelector('.clear-positions').addEventListener('click', () => clearPositions());

// static lineup functions
