# panic

Implements panics in JavaScript.

Exports four functions:

- `panic`: a general panic occurred
- `unreachable`: code path should not have been reached
- `todo`: this is yet to be implemented
- `unimplemented`: this will never be implemented

All of these functions should only be called if something is terribly wrong with
the state of your application and you want to kill it no matter what.

None of these functions allow your program to ever recover from calling them.
They should always be the very last thing you do.

For exmaple, they are great if you want to implement assertions.

```ts
function assert(shouldBeTrue: boolean) {
  if (!shouldBeTrue) panic();
}

function killPlayer(player: Player) {
  assert(player.alive);
  player.alive = false;
}
```

Under the hood, these functions will:

1. Log where this function is called
2. Set a breakpoint for the debugger (if attached)
3. Kill or freeze the process forever

Be careful!
