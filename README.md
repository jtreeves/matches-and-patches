# Matches and Patches

The goal is to 'match' your tiles with existing tiles already on the board, and thus capture different 'patches' (aka, cells) on the board. In essence, it's Uno crossed with Dominoes, but played on a Checkers board.

*How an opening hand could look at the beginning of a game:*
![Initial Game](/images/initial-game.png)

*What an opening move could look like, using the above tiles:*
![First Move](/images/first-move.png)

*How the board would look after two patches match with one another, to the user's advantage:*
![After Match](/images/after-match.png)

## Game Elements
The game involves 1 board, 2 players, 64 standard tiles, 128 player tiles, and an interface that will run the game on an internet browser.

### Tiles
The 64 distinct standard tiles are broken up into 3 categories, each featuring 4 subcategories, which span across the categories. The three categories are color, shape, and number. Color's subcategories are red, blue, yellow, and green. Shape's subcategories are triangle, square, trapezoid, and circle. Number's subcategories are 1, 2, 3, and 4. As a result, there are 16 red tiles, 16 triangle tiles, etc. For example, the 16 red tiles include 4 triangles numbered 1 to 4, along with 4 circles numbered 1 to 4, etc.

In addition to the standard tiles, there are 128 non-distinct player token tiles. Each player will only have one style of token tile, and it is used to indicate that they have won a particular patch on the board. There are only 128 of them in order to account for the possibility that 1 player may capture all 64 of the main board's patches.

### Board
The board for the full game is a 4-by-4 board, comprising 16 patches, analogous to a small Checkers board.

### Interface
The game runs in the window of an internet browser. The user plays the game by clicking on different parts of the screen. For instance, for each move, they would click on the tile they want to play as well as the patch on the board on which they want to play that tile, then click a submit button to finalize their move.

### Players
The game involves 2 players. However, to make it more enjoyable for the user, they are playing against an AI instead of another user. The user will henceforth be referred to as 'the user,' and the AI will henceforth be reffered to as 'the opponent.'

## Game Rules
The goal of the game is to match as many tiles as you can. You can try to match your tile with more than one other tile on the board. You can also use some game theory and put your tiles in places that don't benefit you but hopefully hurt your opponent.

### Setup
The board begins empty, and each player is dealt 4 tiles. Players can only see their own tiles.

### Rounds
In each round, the player places 1 tile on the board. They will subsequently be dealt 1 new tile from the deck. As a result, they will always have 4 tiles. Each player plays their tiles simultaneously each round. Since their are 64 tiles for 16 patches and each round involves playing 2 tiles (1 from each player), then the game can last a maximum of 8 rounds.

### Moves
Each player can place their tiles on any cell on the board.

### Capturing
The goal is to 'capture' as many patches on the board as possible. To do that, you need to place a tile that matches an adjacent tile or tiles in one or multiple ways. Examples of matches include having the same number, color, or shape as the other tile (or any combination of those). Upon placing a tile that matches an adjacent tile already on the board, the player will 'capture' both patches involved in the match (i.e., the original patch already occupied on the board that contained the tile being matched and the new patch containing the tile played to match it). Players may also capture multiple cells in one round. When tiles are first played during a round, they will appear as the standard tiles. Only after 1 second's pause will the standard tiles involved in the 'capture' be replaced by the captor's token, which helps the players keep track of the score merely by looking at the board.

### Winning
The player who captures the most patches on the board wins the game. The main way to do that happens when the entire board is filled with tiles, and the player with the most captured patches wins. (Note: It's possible for some cells to have standard tiles and remain 'uncaptured' after completely filling the board. These are called orphans, and they are discussed in 'Rare Scenarios' below.)

### Rare Scenarios
In the above scenarios, we discussed match pairs that would result with no captures. Some of those may find themselves no only not paired in that round but rather in the unenviable position of never being paired in the future. In short, they become permament orphans, since depending on their position, no one may be able to ever reach them again.

## Game Play
From opening the game app in the browser to winning the game and choosing to play again, this is what the user will experience in the interface each step along the way.

### Landing Page
Upon opening the game, the user sees a landing page with a blank board along with an announcement for the game, providing a basic description of it, and options to either start playing the game or watch a slideshow further explaining the game.

### Slideshow
If the user chooses to view the slideshow, they'll see some slides about the different how the game works and what they might expect to experience in the game play.

### Starting the Game
Once the user decides to play the game, the opening hand is dealt. The player will see their initial 4 cards below the blank board, along with a sidebar to the right that will operate like a console, providing feedback throughout the game.

### Playing the Game
Once the game begins, the user will see advice in the sidebar, informing them of what moves were just played and what the current score is.

### End of Game
As the game progresses, the board will get more crowded, thus providing less open patches for players to attempt to capture.

After winning, the interface will tell the user that they won. At this point, they may hit the Reset button to relaunch the game. (Note: This button is always available below the user's tiles and next to the Submit button.)

## Code Examples
Here are some snippets of JavaScript code from the game, along with explanations of what they do.

### Creating Tiles
The game uses a class to create all 64 tiles. The constructor takes in three parameters: color, number, and shape. The combinations of each of these parameters creates the unique identification for each tile. The constructor also automatically sets the status for each tile as 'inactive.' Inactive tiles are part of the deck; they can be dealt to players during any round. Throughout the game, the status of the tiles will change based on what's happening. For example, once a tile is dealt to the user, its status will be changed to 'user.' As a result, it can be played by the user, but it can no longer be dealt from the deck during a round. Since the tiles are dynamically created at the beginning of each game, all tiles will automatically reset with 'inactive' statuses when the game is reloaded.

```javascript
class Tile {
    constructor(color, number, shape) {
        this.color = color;
        this.number = number;
        this.shape = shape;
        this.status = 'inactive';
        this.div = document.createElement('div');
    }
}
```

### Computer Moves
For the computer to move during a round, it must randomly select 1 of the 4 tiles it currently has. It can recognize this because said tile's status will be set to 'opponent.'

```javascript
function randomTile() {
    generateRandomTileIndex()
    if (tiles[randomTileIndex].status === 'opponent') {
        opponentTile = tiles[randomTileIndex]
        opponentTile.status = 'opponent active'
        feedback(`Opponent Tile: ${opponentTile.name}`)
    } else {
        opponentTile = randomTile()
    }
    return opponentTile
}
```

### Changing Tiles to Tokens
After a player captures a patch, that patch needs to be replaced with a token to mark it as theirs. Since the visual marking of the board happens with DOM elements, and only one tile should display on a patch at any given time, the game needs to strip the captured patch of its previous child element and append a new element.

```javascript
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
```

### Checking for Matches
At the end of each round, the game needs to check to see if either of the newly played tiles match with any of the tiles currently on the board. This function checks the user's recently played tile for matches. It starts by looking at the patch on which the tile was played (userPatch), looks at the tile object that was played (userTile), and determines which 4 tiles on the board need to be investigated (top, bottom, left, and right). It does this by looking at the row and column value pairs in each of the patches' objects. It then needs to determine if there was a match between any of those 4 tiles. They could match on color, number, shape, or any combination of those 3. Since a match could result in capturing multiple patches at once (e.g., the tile could match with the tile above it and to the right of it, and thus capture both of them), these features needed to be checked with separate if statements, as opposed to a series of if ... else if statements.

```javascript
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
```