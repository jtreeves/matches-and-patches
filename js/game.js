// Launch game elements when click 'play' button

play.addEventListener('click', beginGame)

function beginGame() {
    while (guideBody.firstChild) {
        guideBody.removeChild(guideBody.firstChild);
    }
    userTiles.removeChild(aboutUserTiles)
    options.removeChild(play)
    options.append(submit)
    options.append(reset)
    openingDeal()
    selectPatch()
    selectTile()
    feedback('To make your first move, click on one of your four tiles, then click on a patch on the board, then click the Submit button.')
}

// Choose one tile at random from the 'inactive' elements of the tiles object

let randomTileIndex = ''

function generateRandomTileIndex() {
    randomTileIndex = Math.floor(Math.random()*64)
    return randomTileIndex
}

function chooseTile() {
    let choice = ''
    let randomTileIndex = generateRandomTileIndex()
    if (tiles[randomTileIndex].status === 'inactive') {
        choice = tiles[randomTileIndex]
    } else {
        choice = chooseTile()
    }
    return choice
}

// Deal tile to user by changing the tile's status to 'user'

function dealTileToUser() {
    let choice = chooseTile()
    choice.status = 'user'
    userTiles.append(choice.div)
}

// Deal tile to opponent by changing the tile's status to 'opponent'

function dealTileToOpponent() {
    let choice = chooseTile()
    choice.status = 'opponent'
}

// Deal each side four tiles by using the above functions

function openingDeal() {
    dealTileToUser()
    dealTileToOpponent()
    dealTileToUser()
    dealTileToOpponent()
    dealTileToUser()
    dealTileToOpponent()
    dealTileToUser()
    dealTileToOpponent()
}

// Change board: After clicking 'submit' button, display user and opponent's moves simultaneously

submit.addEventListener('click', setUserMove)

function setUserMove() {
    setOpponentMove()
    changeBoard()
    checkMatchPairs()
    userTile.status = 'board'
    opponentTile.status = 'board'
    let scores = tally()
    feedback(`CURRENT SCORE: USER ${scores[0]}, OPPONENT ${scores[1]}`)
    subsequentDeal()
    selectPatch()
    selectTile()
    feedback('NEW ROUND')
    setTimeout(tokenUpgrade, 1000)
    setTimeout(determineWinner, 1000)
}

function setOpponentMove() {
    randomPatch()
    randomTile()
}

function changeBoard() {
    userPatch.div.append(userTile.div)
    opponentPatch.div.append(opponentTile.div)
}

function subsequentDeal() {
    dealTileToUser()
    dealTileToOpponent()
}

// Evaluate all possible match pairs for each player at the end of each round

function checkMatchPairs() {
    userPatch.status = userTile.name
    opponentPatch.status = opponentTile.name
    checkUserPairs()
    checkOpponentPairs()
}

function checkUserPairs() { 
    let userRow = userPatch.row
    let userColumn = userPatch.column
    let userTopPatchRow = userRow - 1
    let userBottomPatchRow = userRow + 1
    let userLeftPatchColumn = userColumn - 1
    let userRightPatchColumn = userColumn + 1
    let userTopPatch = ''
    let userBottomPatch = ''
    let userLeftPatch = ''
    let userRightPatch = ''
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].row === userTopPatchRow && patches[i].column === userColumn) {
            userTopPatch = patches[i]
        } else if (patches[i].row === userBottomPatchRow && patches[i].column === userColumn) {
            userBottomPatch = patches[i]
        } else if (patches[i].row === userRow && patches[i].column === userLeftPatchColumn) {
            userLeftPatch = patches[i]
        } else if (patches[i].row === userRow && patches[i].column === userRightPatchColumn) {
            userRightPatch = patches[i]
        }
    }
    let userTopTile = ''
    let userBottomTile = ''
    let userLeftTile = ''
    let userRightTile = ''
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].name === userTopPatch.status) {
            userTopTile = tiles[i]
        } else if (tiles[i].name === userBottomPatch.status) {
            userBottomTile = tiles[i]
        } else if (tiles[i].name === userLeftPatch.status) {
            userLeftTile = tiles[i]
        } else if (tiles[i].name === userRightPatch.status) {
            userRightTile = tiles[i]
        }
    }
    if (userTile.color === userTopTile.color || userTile.number === userTopTile.number || userTile.shape === userTopTile.shape) {
        userPatch.status = 'user captured'
        userTopPatch.status = 'user captured'
        feedback('USER MATCHED WITH TOP')
    }
    if (userTile.color === userBottomTile.color || userTile.number === userBottomTile.number || userTile.shape === userBottomTile.shape) {
        userPatch.status = 'user captured'
        userBottomPatch.status = 'user captured'
        feedback('USER MATCHED WITH BOTTOM')
    }
    if (userTile.color === userLeftTile.color || userTile.number === userLeftTile.number || userTile.shape === userLeftTile.shape) {
        userPatch.status = 'user captured'
        userLeftPatch.status = 'user captured'
        feedback('USER MATCHED WITH LEFT')
    }
    if (userTile.color === userRightTile.color || userTile.number === userRightTile.number || userTile.shape === userRightTile.shape) {
        userPatch.status = 'user captured'
        userRightPatch.status = 'user captured'
        feedback('USER MATCHED WITH RIGHT')
    }
}

function checkOpponentPairs() { 
    let opponentRow = opponentPatch.row
    let opponentColumn = opponentPatch.column
    let opponentTopPatchRow = opponentRow - 1
    let opponentBottomPatchRow = opponentRow + 1
    let opponentLeftPatchColumn = opponentColumn - 1
    let opponentRightPatchColumn = opponentColumn + 1
    let opponentTopPatch = ''
    let opponentBottomPatch = ''
    let opponentLeftPatch = ''
    let opponentRightPatch = ''
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].row === opponentTopPatchRow && patches[i].column === opponentColumn) {
            opponentTopPatch = patches[i]
        } else if (patches[i].row === opponentBottomPatchRow && patches[i].column === opponentColumn) {
            opponentBottomPatch = patches[i]
        } else if (patches[i].row === opponentRow && patches[i].column === opponentLeftPatchColumn) {
            opponentLeftPatch = patches[i]
        } else if (patches[i].row === opponentRow && patches[i].column === opponentRightPatchColumn) {
            opponentRightPatch = patches[i]
        }
    }
    let opponentTopTile = ''
    let opponentBottomTile = ''
    let opponentLeftTile = ''
    let opponentRightTile = ''
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].name === opponentTopPatch.status) {
            opponentTopTile = tiles[i]
        } else if (tiles[i].name === opponentBottomPatch.status) {
            opponentBottomTile = tiles[i]
        } else if (tiles[i].name === opponentLeftPatch.status) {
            opponentLeftTile = tiles[i]
        } else if (tiles[i].name === opponentRightPatch.status) {
            opponentRightTile = tiles[i]
        }
    }
    if (opponentTile.color === opponentTopTile.color || opponentTile.number === opponentTopTile.number || opponentTile.shape === opponentTopTile.shape) {
        opponentPatch.status = 'opponent captured'
        opponentTopPatch.status = 'opponent captured'
        feedback('OPPONENT MATCHED WITH TOP')
    }
    if (opponentTile.color === opponentBottomTile.color || opponentTile.number === opponentBottomTile.number || opponentTile.shape === opponentBottomTile.shape) {
        opponentPatch.status = 'opponent captured'
        opponentBottomPatch.status = 'opponent captured'
        feedback('OPPONENT MATCHED WITH BOTTOM')
    }
    if (opponentTile.color === opponentLeftTile.color || opponentTile.number === opponentLeftTile.number || opponentTile.shape === opponentLeftTile.shape) {
        opponentPatch.status = 'opponent captured'
        opponentLeftPatch.status = 'opponent captured'
        feedback('OPPONENT MATCHED WITH LEFT')
    }
    if (opponentTile.color === opponentRightTile.color || opponentTile.number === opponentRightTile.number || opponentTile.shape === opponentRightTile.shape) {
        opponentPatch.status = 'opponent captured'
        opponentRightPatch.status = 'opponent captured'
        feedback('OPPONENT MATCHED WITH RIGHT')
    }
}

// Replace match pairs with player tokens on the patches

function tokenUpgrade() {
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].status === 'user captured') {
            patches[i].div.removeChild(patches[i].div.firstChild)
            patches[i].div.append(userTokens[i].div)
        } else if (patches[i].status === 'opponent captured') {
            patches[i].div.removeChild(patches[i].div.firstChild)
            patches[i].div.append(opponentTokens[i].div)
        }
    }
}

// Create tally for each player that tallies their tokens on the board

function tally() {
    let scores = [0, 0]
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].status === 'user captured') {
            scores[0]++
        } else if (patches[i].status === 'opponent captured') {
            scores[1]++
        }
    }
    return scores
}

// Determine end of game and winner

function determineWinner() {
    let count = 0
    for (let i = 0; i < smallPatches.length; i++) {
        if (smallPatches[i].status === 'inactive') {
            count++
        }
    }
    if (count < 2) {
        feedback('GAME OVER!')
        let scores = tally()
        if (scores[0] > scores[1]) {
            feedback('You win!')
        } else if (scores[1] > scores[0]) {
            feedback('You lose!')
        } else {
            feedback('A tie!')
        }
    }
}