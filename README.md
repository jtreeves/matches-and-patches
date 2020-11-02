# Matches and Patches

I elaborated off my initial pitch: A game with 64 cards, where each player was dealt 4 cards, and in each round, they would choose one of their cards to play against their opponents. However, I realized that hierarchicalizing the cards based on how I was visualizing them would be difficult, so I pivoted to a game focused on matching previously played cards instead of beating them. To organize the played cards, I decided to use a board. As a result, it shifted from a card game to a tile game. It involves the same premise as the intial pitch (64 tiles, with each player dealt 4 initially), but winning the game has to do with the entire board, and it will be determined after all tiles are played, not on a round-by-round basis.

I call it Matches and Patches. The goal is to 'match' your tiles with existing tiles already on the board, and thus capture different 'patches' (aka, cells) on the board. In essence, it's Uno crossed with dominoes.

## Game Elements
The game will involve 1 board, 2 players, 64 standard tiles, 128 player tiles, and an interface that will run the game on an internet browser.

### Tiles
The 64 distinct standard tiles will be broken up into 3 categories, each featuring 4 subcategories, which will span across the categories (4 to the power of 3 will yield 64). The three categories will be color, shape, and number. Color's subcategories will be red, blue, yellow, and green. Shape's subcategories will be triangle, square, hexagon, and circle. Number's subcategories will be 1, 2, 3, and 4. As a result, there will be 16 red tiles, 16 triangle tiles, etc. For example, the 16 red tiles will include 4 triangles numbered 1 to 4, along with 4 circles numbered 1 to 4, etc.

In addition to the standard tiles, there are 128 non-distinct player tiles. Each player will only have one style of tile, and it will be used to indicate that they have won a particular cell on the board. There are only 128 of them in order to account for the possibility that 1 player may capture all 64 of the board's cells. However, the 128 number is only to account for an analog physical game set (or a hardcoded game); in practice, there will only be 2 pieces, stored as 2 elements in the code.

### Board
The board for the full game will be an 8-by-8 board, comprising 64 cells, analogous to a chess board. During production, there will also be a smaller, 4-by-4 board, comprising 16 cells. Upon completion, the user may have the option to play using either the large board or the small board. (Note: In both scenarios, the game will use all 64 tiles described above.)

### Interface
The game will run in the window of an internet browser. The user will play the game by clicking on different parts of the screen. For instance, for each move, they would click on the tile they want to play as well as the cell on the board on which they want to play that tile, then click a submit button to finalize their move. (See below, in the 'Game Play' section, for wireframes of the interface.)

### Players
The game involves 2 players. However, to make it more enjoyable for the user, they will be playing against an AI instead of another user. The user will henceforth be referred to as 'the user,' and the AI will henceforth be reffered to as 'the opponent.'

## Game Rules
The goal of the game is to match as many tiles as you can. You can try to match your tile with more than one other tile on the board. You can also use some game theory and put your tiles in places that don't benefit you but hopefully hurt your opponent.

### Setup
The board begins empty, and each player is dealt 4 tiles. Players can only see their own tiles.

### Rounds
In each round, the player will place 1 tile on the board. They will subsequently be dealt 1 new tile from the deck. As a result, they will always have 4 tiles (until the end of the game, unless they play using the small board). Each player plays their tiles simultaneously each round. That means the user will not know what tile the opponent will play or where the opponent will play it until after they both play their tiles. Since their are 64 tiles for 64 cells and each round involves playing 2 tiles (1 from each player), then the game can last a maximum of 32 rounds (or 8 rounds on the small board).

### First Move
Each player must make their first move on their respective center cell on the table. In other words, they must place their tile in the fourth row of the fourth column, from their point of view. No capturing will occur as a result of the first move; it merely 'sets the table.'

### Subsequent Moves
After the first move, each player can place their tiles on any cell on the board, *as long as that cell touches another cell that is currently occupied by another tile*. 'Touching' involves sharing either an entire edge or merely a corner. For example, in the second move, a player could place their tile on the cell in the third row of the third column. However, that player could not place their tile on the cell in the first row of the first column.

### Capturing
The goal is to 'capture' as many cells on the board as possible. To do that, you need to place a tile that matches an adjacent tile or tiles in one or multiple ways. Examples of matches include having the same number, color, or shape as the other tile (or any combination of those). Upon placing a tile that matches an adjacent tile already on the board, the player will 'capture' both cells involved in the match (i.e., the original cell already occupied on the board that contained the tile being matched and the new cell containing the tile played to match it). Players may also capture multiple cells in one round. (Note: The players may both try to match the same tile or tiles in the same round. In which case, there is a 'conflict.' See below on how those are handled.) When tiles are first played during a round, they will appear as the standard tiles. Only after 1 second's pause will the standard tiles involved in the 'capture' be replaced by the captor's player tile.

### Winning
The player who captures the most cells on the board wins the game. This can happen in one of two main ways, with some caveats about possible ties. In the first scenario, the entire board will be filled with tiles, and the player with the most captured cells wins. (In this scenario, the game lasts 32 rounds.) In the second scenario, the player who captures more than 32 cells first wins. (In this scenario, the game can terminate prior to 32 rounds.) These numbers obviously adjust accordingly for games played on the small board. (Note: It's possible for some cells to have standard tiles and remain 'uncaptured' after completely filling the board. These are called orphans, and they will be discussed in 'Rare Scenarios' below.)

### Potential Conflicts
Since each player plays their tiles simultaneously, it is possible for both players to attempt to play different tiles on the same cell in a given round. In that case, the cell goes to the player whose 'side' it 'belongs' to. The horizontal midline that separates the fourth and fifth rows divides the board into these two 'sides.' The cells from the first through fourth rows all initally 'belong' to the user; while the cells from the fifth through the eight rows all initially 'belong' to the opponent. After determining which player gets the cell, the other player must still play the tile they intially chose in a different cell on the board. (Note: Whoever wins that initial cell will automatically win any adjoining cells that the player is attempting to match; the other player cannot try to contest them in a possible match pair hierarchy.) As a result, if both players attempt to place a tile on the cell at the fourth row of the fifth column, the cell would go to the user, since it falls on their side.

Additionally, since the goal of the game is to 'match' ones tiles with the tiles already on the board, it's possible that both players may try to match the same tile (or tiles) simultaneously. In this scenario, the match is said to be in 'conflict,' and the player with the stronger match with the tile (or tiles) will win them. If both players have the same level of match with the given tile, then no player gets it, and all tiles involved remain uncaptured and as standard tiles (not individual player tiles). See 'Hierarchy of Match Pairs' below for explanations on how to handle trickier match conflicts, and observe how uncaptured cells from match pairs may become permanent orphans in 'Rare Scenarios.'

As mentioned before, the players may attempt to match their tile with more than one tile on the board in a given round. This leads to more complex match pairs, which leads to more complex match conflicts.

### Rare Scenarios
In the above scenarios, we discussed match pairs that would result with no captures. Some of those may find themselves no only not paired in that round but rather in the unenviable position of never being paired in the future. In short, they become permament orphans, since depending on their position, no one may be able to ever reach them again.

In the below example, the yellow circle attempts to match the yellow triangle, while the blue circle tries to match the yellow tringle since they both have same number. However, since they both only have 1 connection, neither of them can win, and all tiles remain unconquered. Unfortunately, the yellow trianle is now boxed in on all sides. Since it wasn't possible to match in the previous step, then it will never be able to pair with any tile. It is a permanent orphan.

### Hierarchy of Match Pairs
With complicated match pairs, a numerical method is need to clarify the score in any given match pair conflict. In general, the less pieces involved and the less commonalties they share, the lower their score. However, here's a more explicit breakdown of how to assign points to hypothetical match pairs to determine the winner (or ties):

| Points | Blocks   | Combinations              |
|  :---: |  :---:   |            :---:          |
| 1      | 1        | 1 match                   |
| 2      | 1        | 2 matches                 |
| 3      | 2        | 2 sets on 1 match         |
| 4      | 2        | 1 match across all 3      |
| 5      | 2        | 2 sets of 2 matches       |
| 6      | 2        | 2 matches across all 3    |
| 7      | 3        | 3 sets of 1 match         |
| 8      | 3        | 2 sets of 1 match         |
| 9      | 3        | 1 match across all 3      |
| 10     | 3        | 3 sets of 2 matches       |
| 11     | 3        | 2 sets of 2 matches       |
| 12     | 3        | 2 matches across all 3    |
| 13     | 4        | 4 sets of 1 match         |
| 14     | 4        | 3 sets of 1 match         |
| 15     | 4        | 2 sets of 1 match         |
| 16     | 4        | 1 match across all 4      |
| 17     | 4        | 4 sets of 2 matches       |
| 18     | 4        | 3 sets of 2 matches       |
| 19     | 4        | 2 sets of 2 matches       |
| 20     | 4        | 2 matches across all 4    |

(Note: The points above are only used to determine how to break match conflicts. They have no bearing on who wins the game, unless it ends with a tie, in which case the player with the most accumulated points wins.)

## Game Play
From opening the game app in the browser to winning the game and choosing to play again, this is what the user will see in the interface each step along the way.

### Landing Page
Upon opening the game, the user will see a landing page announcing the game, providing a basic description of it, and options to either start playing the game or watch a slideshow further explaining the game.

### Slideshow
If the user chooses to view the slideshow, they'll see some slides about the different tiles involved in the game and different scenarios they might run across.

### Starting the Game
Once the user decides to play the game, they will be sent to a game page featuring the board (either large or small) at the top, with the player's initial 4 cards below it, along with a sidebar to the right that will operate like a console, providing feedback throughout the game.

### Playing the Game
Once the game begins, the user will see advice like the below in the sidebar, informing them when they try to make an unallowed move and explaining why which player won a particular match. In the earlier iterations of the game build, this console will provide bare minimum support. However, in later iterations, this console should provide more detailed explanations, once its logic is built out.

### End of Game
As the game progresses, the board will get more crowded, thus providing less open cells for players to attempt to capture.

After winning, the interface will tell the user that they won and provide a button to play again.

## Full Version vs. Partial Version
The primary differences between what would be deemed the full version and the partial version have to do with the size of the board, which simplifies things immesurably. But it's also the quality of the AI that the user plays against. I can either maximize both things to make the highest quality and most difficult project, or I can minimize them and create an easier project.

### Large Board vs. Small Board
The small board should be built and conquered first. In a scenario in which I'm not able to finish the game beyond the small board, this approach will allow me to have at least something to show upon presesntation. Ideally, I'll be able to expand it to the full. Especially since the logic shouldn't be too different than with the smaller board. The main difference is the amount of time it would take to play the game. Time I won't have in abundance during the early programming hours, but that I will presumably have more of during the later days.

### Dumb AI vs. Smart AI
It's possible for the AI to be painfully dumb. As in, it doesn't know which tiles it currently has, what tiles are currently on the board, or even how to win the game. It only knows how to randomly select one of the tiles it currently has and randomply place it on any of the cells that are currently available. This would likely lead to some dull game play, but it would be comparatively easy to put it together just to be able to confirm that the game can play at its most rudimentary level.

In contrast, a smarter AI could be built to both know what tiles it has, what tiles are on the board, how to win the game, and probability theory to determine how likely it is that the user might get a tile that it might want itself.

To begin, I think it makes sense to build out the dumb AI on the small board. Then, after conquering it, I can build it out to a more advanced level with the large board and a more sophisticated AI.

## Coding Concepts
This game will implement various coding concepts. For example, the pages will be stored as HTML, the style will be rendered with CSS, and the user will be able to interact with it as a result of JavaScript.

### HTML
The pages will be built out of HTML. While it may be possible to host all of them on a single index.html page, I currently plan to use multiple HTML pages for different scenarios.

The landing page, in addition to linking with everything else, will involve code like this:
```html
<h1>Matches and Patches</h1>
<p>Here's some info about the game. Want to play?</p>
<button>Play</button>
```

The game page will involve div's for creating the grid that will host the board:
```html
<div id="game">
    <div id="cell1"></div>
    <div id="cell2"></div>
    <div id="cell3"></div>
    <div id="cell4"></div>
</div>
```

### CSS
There will be different CSS style sheets for handling different pieces of the project. Currently, I anticipate needing 3 style sheets: the landing page, the game board, and the cards.

Styling for the introductory landing page will look like this:
```css
h1 {
    font-size: 40px;
    color: blue;
}
```

Styling for the game board will look like this:
```css
#game {
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    grid-template-columns: repeat(8, 1 fr);
}
```

Styling for the cards will look like this:
```css
.red {
    background: red;
}

.blue {
    background: blue;
}
```

### JavaScript
The game's logic will be handled with JavaScript. This will be the bulk of the code. Different aspects of the game will be handled in different script files. I anticipate needing 3 files: the landing page, the game board, and the rules of the game (i.e., acceptable moves). Various specific JavaScript elements will be utilized throughout the game, including arrays (e.g., the cards), objects, logic (e.g., whether a specific move is allowed), functions, event listeners (e.g., what to do when the user clicks on a cell), and promises (e.g., waiting for the AI to evaluate its move before letting the user move).

The landing page script would include code like this:
```javascript
const button = document.querySelector('button');
button.addEventListener('click', startGame);
```

The game board will include code like this:
```javascript
const cell1 = document.querySelector('#cell1');
cell1.addEventListener('click', checkMove);
```

The rules file will include code like this:
```javascript
if (cell2 === '') {
    return cell2;
} else {
    return false;
}
```