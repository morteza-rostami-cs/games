## Challenge 2 — The Moving Target

We're going to increase the difficulty **one step**, not jump dramatically.

Build a small Canvas program with:

- A **player square** controlled by the arrow keys.
- A **target square** somewhere on the canvas.
- The target continuously moves around the canvas.
- If the player touches the target, the target should **immediately move to a new position**.
- Keep a score: **+1 every time the player catches the target**.
- The target must never leave the canvas.

### The important part

I'm deliberately **not** telling you how the target should move.

You need to decide:

- What information the target needs to store.
- How its movement works.
- How you determine whether the two squares are touching.
- How you choose a new valid position after a catch.
- How you prevent the target from leaving the screen.

You are free to choose the movement behavior. It can be simple.

### Constraints

Don't add unnecessary complexity:

- No physics.
- No acceleration.
- No enemies.
- No menus.
- No external libraries.
- JavaScript + HTML Canvas only.

And **don't look up a solution to this particular problem**. Looking up Canvas APIs is completely fine.

The interesting part for me is seeing **how you invent the solution yourself**.

When you're done, send me the code again. I won't just judge whether it works — I'll look at **how you reasoned about the problem**, and that will determine Challenge 3.
