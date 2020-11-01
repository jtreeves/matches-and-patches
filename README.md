# Matches and Patches

I elaborated off my initial pitch: A game with 64 cards, where each player was dealt 4 cards, and in each round, they would choose one of their cards to play against their opponents. However, I realized that hierarchicalizing the cards based on how I was visualizing them would be difficult, so I pivoted to a game focused on matching previously played cards instead of beating them. To organize the played cards, I decided to use a board. As a result, it shifted from a card game to a tile game. It involves the same premise as the intial pitch (64 tiles, with each player dealt 4 initially), but winning the game has to do with the entire board, and it will be determined after all tiles are played, not on a round-by-round basis.

I call it Matches and Patches. The goal is to 'match' your tiles with existing tiles already on the board, and thus capture different 'patches' (aka, cells) on the board. In essence, it's Uno crossed with dominoes.

## Game Elements
The game will involve 1 board, 2 players, 64 standard tiles, 128 player tiles, and an interface that will run the game on an internet browser.

### Tiles
The 64 distinct standard tiles will be broken up into 3 categories, each featuring 4 subcategories, which will span across the categories (4 to the power of 3 will yield 64). The three categories will be color, shape, and number. Color's subcategories will be red, blue, yellow, and green. Shape's subcategories will be triangle, square, hexagon, and circle. Number's subcategories will be 1, 2, 3, and 4. As a result, there will be 16 red tiles, 16 triangle tiles, etc. For example, the 16 red tiles will include 4 triangles numbered 1 to 4, along with 4 circles numbered 1 to 4, etc.

*Some example standard tiles:*
![Blue-Four-Square Card](/images/blue-four-square-card.png)

![Red-One-Circle Card](/images/red-one-circle-card.png)

![Green-Two-Triangle Card](/images/green-two-triangle-card.png)

In addition to the standard tiles, there are 128 non-distinct player tiles. Each player will only have one style of tile, and it will be used to indicate that they have won a particular cell on the board. There are only 128 of them in order to account for the possibility that 1 player may capture all 64 of the board's cells. However, the 128 number is only to account for an analog physical game set (or a hardcoded game); in practice, there will only be 2 pieces, stored as 2 elements in the code.

*The user's tile:*
![Eagle Token](/images/eagle-token.png)

*The opponent's tile:*
![Snake Token](/images/snake-token.png)

### Board
The board for the full game will be an 8-by-8 board, comprising 64 cells, analogous to a chess board. During production, there will also be a smaller, 4-by-4 board, comprising 16 cells. Upon completion, the user may have the option to play using either the large board or the small board. (Note: In both scenarios, the game will use all 64 tiles described above.)

*Large board:*
![Large Board](/images/large-empty-board.png)

*Small board:*
![Small Board](/images/small-empty-board.png)

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

*Possible first move with the large board:*
![First Move on Large Board](/images/opening-move-large-board.png)

*Possible first move with the small board:*
![First Move on Small Board](/images/opening-move-small-board.png)

### Subsequent Moves
After the first move, each player can place their tiles on any cell on the board, *as long as that cell touches another cell that is currently occupied by another tile*. 'Touching' involves sharing either an entire edge or merely a corner. For example, in the second move, a player could place their tile on the cell in the third row of the third column. However, that player could not place their tile on the cell in the first row of the first column.

*Example of a valid second move with the large board:*
![Second Move with No Matches on the Large Board](/images/second-move-no-matches-large-board.png)

*Example of a valid second move with the small board:*
![Second Move with No Matches on the Small Board](/images/second-move-no-matches-small-board.png)

### Capturing
The goal is to 'capture' as many cells on the board as possible. To do that, you need to place a tile that matches an adjacent tile or tiles in one or multiple ways. Examples of matches include having the same number, color, or shape as the other tile (or any combination of those). Upon placing a tile that matches an adjacent tile already on the board, the player will 'capture' both cells involved in the match (i.e., the original cell already occupied on the board that contained the tile being matched and the new cell containing the tile played to match it). Players may also capture multiple cells in one round. (Note: The players may both try to match the same tile or tiles in the same round. In which case, there is a 'conflict.' See below on how those are handled.) When tiles are first played during a round, they will appear as the standard tiles. Only after 1 second's pause will the standard tiles involved in the 'capture' be replaced by the captor's player tile.

*Possible second move with a single match before the cells are filled with player's individual tiles on the large board:*
![Second Move with One Match Before Tokens on Large Board](/images/second-move-one-match-before-tokens-large-board.png)

*How the board will look after the cells are filled with the player's individual tiles on the large board:*
![Second Move with One Match After Tokens on Large Board](images/second-move-one-match-after-tokens-large-board.png)

*Possible second move with a single match before the cells are filled with player's individual tiles on the small board:*
![Second Move with One Match Before Tokens on Small Board](/images/second-move-one-match-before-tokens-small-board.png)

*How the board will look after the cells are filled with the player's individual tiles on the small board:*
![Second Move with One Match After Tokens on Small Board](images/second-move-one-match-after-tokens-small-board.png)

*Another possible scenario for the small board:*
![Double Match and Single Match Before Tokens](/images/double-match-single-match-before-tokens-small-board.png)

![Double Match and Single Match After Tokens](/images/double-match-single-match-after-tokens-small-board.png)

### Winning
The player who captures the most cells on the board wins the game. This can happen in one of two main ways, with some caveats about possible ties. In the first scenario, the entire board will be filled with tiles, and the player with the most captured cells wins. (In this scenario, the game lasts 32 rounds.) In the second scenario, the player who captures more than 32 cells first wins. (In this scenario, the game can terminate prior to 32 rounds.) These numbers obviously adjust accordingly for games played on the small board. (Note: It's possible for some cells to have standard tiles and remain 'uncaptured' after completely filling the board. These are called orphans, and they will be discussed in 'Rare Scenarios' below.)

### Potential Conflicts
Since each player plays their tiles simultaneously, it is possible for both players to attempt to play different tiles on the same cell in a given round. In that case, the cell goes to the player whose 'side' it 'belongs' to. The horizontal midline that separates the fourth and fifth rows divides the board into these two 'sides.' The cells from the first through fourth rows all initally 'belong' to the user; while the cells from the fifth through the eight rows all initially 'belong' to the opponent. After determining which player gets the cell, the other player must still play the tile they intially chose in a different cell on the board. (Note: Whoever wins that initial cell will automatically win any adjoining cells that the player is attempting to match; the other player cannot try to contest them in a possible match pair hierarchy.) As a result, if both players attempt to place a tile on the cell at the fourth row of the fifth column, the cell would go to the user, since it falls on their side.

Additionally, since the goal of the game is to 'match' ones tiles with the tiles already on the board, it's possible that both players may try to match the same tile (or tiles) simultaneously. In this scenario, the match is said to be in 'conflict,' and the player with the stronger match with the tile (or tiles) will win them. If both players have the same level of match with the given tile, then no player gets it, and all tiles involved remain uncaptured and as standard tiles (not individual player tiles). See 'Hierarchy of Match Pairs' below for explanations on how to handle trickier match conflicts, and observe how uncaptured cells from match pairs may become permanent orphans in 'Rare Scenarios.'

In this scenario, both players are attempting to match with the yellow triangle. The user played the green triangle, while the opponent played the yellow circle:
![Simple Match Conflict Before Resolution on the Large Board](/images/simple-match-conflict-before-resolution-large-board.png)

The user wins the contest since their tile shares two features with the contested tile: The user's tile is both a triangle and a 2, as is the contested tile. In contrast, the opponent's tile only shares one feature with the contested tile: They are both yellow. As a result, the user's individual tiles (i.e., the eagle tiles) replace both the tile they played and the tile contested:
![Simple Match Conflict After Resolution on the Large Board](/images/simple-match-conflict-after-resolution-large-board.png)

*Same example on the small board:*
![Simple Match Conflict Before Resolution on the Small Board](/images/simple-match-conflict-before-resolution-small-board.png)

![Simple Match Conflict After Resolution on the Small Board](/images/simple-match-conflict-after-resolution-small-board.png)

As mentioned before, the players may attempt to match their tile with more than one tile on the board in a given round. This leads to more complex match pairs, which leads to more complex match conflicts.

In this scenario, both players are attempting to match with the red square and the blue circle. The user plays the yellow circle with a 3, while the opponent plays the blue circle with a 3. The user's tile matches its 3 with the red square and its circle with blue circle; while, the opponent's tile matches its 3 with the red square and both its shape and color with the blue circle with a 1:
![Complex Conflict Before Markers on the Large Board](/images/complex-conflict-before-markers-large-board.png)

The opponent wins the conflict because it matches 2 criteria with 1 of the contested tiles and 1 criteria with the other tile, for a total of 3 matches. In contrast, the user only had 1 match with each of the contested tiles, for a total of only 2 matches. As a result, the opponent's tiles (i.e., a snake) replace the key tiles:
![Complex Conflict After Markers on the Large Board](/images/complex-conflict-after-markers-large-board.png)

*Same example on the small board:*
![Complex Conflict Before Markers on the Small Board](/images/complex-conflict-before-markers-small-board.png)

![Complex Conflict After Markers on the Small Board](/images/complex-conflict-after-markers-small-board.png)

### Rare Scenarios
In the above scenarios, we discussed match pairs that would result with no captures. Some of those may find themselves no only not paired in that round but rather in the unenviable position of never being paired in the future. In short, they become permament orphans, since depending on their position, no one may be able to ever reach them again.

In the below example, the yellow circle attempts to match the yellow triangle, while the blue circle tries to match the yellow tringle since they both have same number. However, since they both only have 1 connection, neither of them can win, and all tiles remain unconquered. Unfortunately, the yellow trianle is now boxed in on all sides. Since it wasn't possible to match in the previous step, then it will never be able to pair with any tile. It is a permanent orphan.

![Match Conflict with No Solution on the  Small Board](/images/match-conflict-no-solution-small-board.png)

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

While this layout is unlikely to occur during a game, it's certainly possible. After you see what happens in the next move, you'll understand why it should be avoided:
![Possible Second Move for the Small Board](/images/possible-second-move-small-board.png)

In this rare instance, a player manages to capture five cells at once:
![Super Capture Before Markers on the Small Board](/images/super-capture-before-markers-small-board.png)

In the previous step, only the red square, blue cirlce, and yellow and green triangles were on the board, all merely connected by their corners. The user plays a blue triangle in the center of all of them. It matches the 3 of the red square, the blue of the circle above it, and the triangle shape of the two other figures. While the opponent played the red circle, and it has a strong match with the two cells it touches (it shares shape and number with the blue circle, and it shares color with the red square), the other pair is stronger. As a result, the user wins, and the user's eagle tiles now appear on all five cells:
![Super Capture After Markers on the Small Board](/images/super-capture-after-markers-small-board.png)

## Game Play
From opening the game app in the browser to winning the game and choosing to play again, this is what the user will see in the interface each step along the way.

### Landing Page
Upon opening the game, the user will see a landing page announcing the game, providing a basic description of it, and options to either start playing the game or watch a slideshow further explaining the game:
![Landing Page](/images/landing-page.png)

### Slideshow
If the user chooses to view the slideshow, they'll see some slides about the different tiles involved in the game and different scenarios they might run across (i.e., visuals similar to the proposals's wireframes):
![Slideshow Example 1](/images/slideshow1.png)

![Slideshow Example 2](/images/slideshow2.png)

![Slideshow Example 3](/images/slideshow3.png)

![Slideshow Example 4](/images/slideshow4.png)

### Starting the Game
Once the user decides to play the game, they will be sent to a game page featuring the board (either large or small) at the top, with the player's initial 4 cards below it, along with a sidebar to the right that will operate like a console, providing feedback throughout the game:
![Game Begins with the Small Board](/images/game-begins-small-board.png)

### Playing the Game
Once the game begins, the user will see advice like the below in the sidebar, informing them when they try to make an unallowed move and explaining why which player won a particular match. In the earlier iterations of the game build, this console will provide bare minimum support. However, in later iterations, this console should provide more detailed explanations, once its logic is built out.
![Advice Column 1](/images/advice-column1.png)

![Advice Column 2](/images/advice-column2.png)

By the middle of the game, the board may look something like this before matches are resolved:
![Middle Game Before Markers](/images/middle-game-before-markers-small-board.png)

And like this after the match has been resolved:
![Middle Game After Markers](/images/middle-game-after-markers-small-board.png)

### End of Game
As the game progresses, the board will get more crowded, thus providing less open cells for players to attempt to capture. In the below example, neither player can match with the one cell available for a match (the blue circle). So instead, they each put a tile on their side of the board, as isolated from that open tile as possible. (The opponent plays the green square, and the user plays the red square.)
![Late Game Desperation](/images/late-game-desperate-small-board.png)

In the next move, the user plays the green circle next to the blue circle, and the opponent plays the yellow triangle in the corner. As a result of this move, the user will capture blue circle, and both the cell with the blue circle and the cell with the green circle will receive the user's personal tile in the next phase. 
![Near End Game Before Markers](/images/near-end-game-before-markers-small-board.png)

Here, the blue cirlce and the green circle have been replaced by the user's personal tile (the eagle):
![Near End Game After Markers](/images/near-end-game-after-markers-small-board.png)

In the final move, the user plays the blue square, and the opponent plays the red circle:
![End Game Before Markers](/images/end-game-before-markers-small-board.png)

Since the blue square matches with both the yellow triangle (since they share the number 1) and the green square, the user will capture all 3 of those cells. The opponent, on the other hand, will match with the red square and capture its cell as well as its own.
![End Game After Markers](/images/end-game-after-markers-small-board.png)

As a result, the user wins the game. All of the cells are occupied, which means the game has ended, and the user has 8 cells, while the opponent only has 7 cells, so the user wins. (Note: The yellow triangle in the corner was never captured during the game because it was orphaned in a previous match conflict.) After winning, the interface will tell the user that they won and provide a button to play again:
![End Game Message for the Small Board](/images/end-message-small-board.png)

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

## Plan
This is merely an initial plan; it will likely change multiple times. However, it provides some reasonable goals, especially for the middle and end of the week.

### Timeline
Nov. 1: Adjust plan based on feedback from instructor

Nov. 2: Create repo, file structure, and basic content (e.g., board, cards, landing page); finalize game plan; at this stage, the user should be able to view the board, their cards, and change the board and their cards by clicking on certain combinations; use the information from the proposal to create the initial readme

Nov. 3: Set game flow logic in JavaScript; at this stage, the user should be able to execute various rounds of the game, with the AI responding at a very basic level

Nov. 4: Work on advanced logic aspects as well as integration and initial troubleshooting; at this stage, the game should be playable but not styled and with a few errors

Nov. 5: Build in the materials and user experience; this stage will constitute the first pass at seriously styling the game

Nov. 6: Tackle advanced styling, set up the live site, and fill out the readme file to reflect what I did over the previous week

Nov. 7: Play game extensively and get friends and family to also try it out

Nov. 8: Optimize for other platforms; edit it to maximize its aesthetic appearance

Nov. 9: Finalize by repeatedly troubleshooting and debugging

Nov. 10: Present final product to cohort

### File Structure
Possible files by file type:
- HTML: landing page; game page; cards page
- CSS: board styling; card styling; intro styling
- JavaScript: logic for game play; moves on board game; transitions and event listeners with DOM
- Markdown: README to provide explanatory info

Possible file hierarchies:
- First option's main folder
    - index.html
    - readme.md
    - text folder
        - cards.html
        - introduction.html
    - style folder
        - board.css
        - cards.css
        - introduction.css
    - script folder
        - game.js
        - moves.js
        - app.js
- Second option's main folder
    - index.html
    - readme.md
    - introduction folder
        - text.html
        - style.css
        - app.js
    - cards folder
        - images.html
        - style.css
    - board folder
        - style.css
        - main.js
        - game.js