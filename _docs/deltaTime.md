<!--

so: 1 loop = 1 frame

and we could do something like

each frame: pos += 5px

but: in one computer -- 1 frame = 16ms  -- and on another one -- 1 frame = 40ms

so: you movements is frame dependent.

# we want something more like:

5px per 1 second -- and keep it like this for the rest of our game.

## this is where deltaTime comes in::

- calc time elapsed between previous frame and current frame.

   elapsed_time_mil = current_time - prev_time

   elapsed_time_second = elapsed_time_mil / 1000

now: this might give you something like 0.016 sec -- per frame

now: we want 5px per 1 sec

so: we can just grab the exact amount of speed that we should move in 0.016 sec

so: our deltaTime = 0.016 sec

so: if speed = 5px

distance move this frame = speed * deltaTime
   - we grab a fraction of speed
   - multi by a value between 0 to 1 -- gives you parts

now: imagine going 60 frame per second (or whatever)

if: each frame is = 0.016 -- and we grabbing just enough speed

after 60 frame -- 60 * 0.016 = ~ 1sec

so: after 60 frame -- we have moved 5px

======
and the faster the frame rate is -- 60fps vs 30fps -- the less time between each frames so -- you multiply speed with a smaller fraction. -- but: eventually if you add them up you get 1 sec and your original 5px speed

-->
