## Challenge 2 — Grid Treasure Search

Build a **10×10 grid** containing:

- 1 player
- 1 hidden treasure
- The player can move **one cell at a time** with the arrow keys.
- The treasure is placed at a random cell.
- The player does **not** know its location.
- When the player reaches the treasure, display **“Found!”** and stop further movement.

### Your goal

The important part is **not the Canvas**. The problem is to correctly represent and detect the relationship between the player's position and the hidden target.

### Prerequisites — learn these first

You already proved the previous skills, so **do not study them again**.

New concepts you need:

1. **Random integers in a range**
   - Generate a random row/column from `0` to `9`.

2. **Coordinate comparison**
   - Determine whether two grid positions represent the same cell.

3. **Boolean expressions**
   - Combining conditions with `&&` / `||`.

4. **State flags**
   - Represent something like `found = true/false`.

5. **Basic event/state flow**
   - Understand what should happen after the treasure is found.

That's it. **No new data structures, algorithms, recursion, vectors, physics, or advanced math.**

The challenge is intentionally small, but unlike Challenge 1, it requires you to decide **how to represent and detect the game condition yourself.**
