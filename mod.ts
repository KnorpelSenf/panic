// declare process type without importing it
import type p from "node:process";
declare const process: typeof p;

/** panics */
function die(message: string): never {
  // log the current position
  try {
    if (typeof console !== "undefined") {
      if ("trace" in console && typeof console.trace === "function") {
        console.trace(message);
      } else if (typeof Error !== "undefined") {
        if ("error" in console && typeof console.error === "function") {
          console.error(new Error(message));
        } else if ("log" in console && typeof console.log === "function") {
          console.log(new Error(message));
        }
      }
    }
  } catch {
    // catch mutations of global variables like console or Error
  }
  // open the debugger during development
  // deno-lint-ignore no-debugger
  debugger;
  // try to kill the process in some way
  try {
    if (typeof process !== "undefined") {
      if ("exit" in process && typeof process.exit === "function") {
        process.exit(42);
      }
    }
    if (typeof Deno !== "undefined") {
      if ("exit" in Deno && typeof Deno.exit === "function") {
        Deno.exit(42);
      }
    }
  } catch {
    // catch mutations of global variables like process or Deno
  }
  // if we are still alive, we can only block the UI
  if (typeof alert === "function") {
    while (true) {
      try {
        alert(message);
      } catch {
        // catch mutations of alert
      }
    }
  }
  // fml
  while (true);
}

/**
 * Panics in JavaScript.
 *
 * This will try as hard as possible to be the last function you ever call in
 * JavaScript. Only call this if you are sure that something is terribly wrong
 * with the state of your program, and you want to die immediately. There is no
 * way to catch this panic.
 *
 * Under the hood, it will:
 *
 * 1. Log where this function is called
 * 2. Set a breakpoint for the debugger (if attached)
 * 3. Kill or freeze the process forever
 *
 * You cannot escape this even by mutating any global variables.
 *
 * @param message An optional message for the panic
 */
export function panic(message: string = ""): never {
  die("PANIC: " + message);
}
/**
 * Panics in JavaScript. Put this function in unreachable places of your code
 * base.
 *
 * This will try as hard as possible to be the last function you ever call in
 * JavaScript. Only call this if you are sure that something is terribly wrong
 * with the state of your program, and you want to die immediately. There is no
 * way to catch this panic.
 *
 * Under the hood, it will:
 *
 * 1. Log where this function is called
 * 2. Set a breakpoint for the debugger (if attached)
 * 3. Kill or freeze the process forever
 *
 * You cannot escape this even by mutating any global variables.
 *
 * @param message An optional message for the panic
 */
export function unreachable(message: string = ""): never {
  die("UNREACHABLE: " + message);
}
/**
 * Panics in JavaScript. Use this function if a code path must not be reached
 * because you have not implemented it yet.
 *
 * This will try as hard as possible to be the last function you ever call in
 * JavaScript. Only call this if you are sure that something is terribly wrong
 * with the state of your program, and you want to die immediately. There is no
 * way to catch this panic.
 *
 * Under the hood, it will:
 *
 * 1. Log where this function is called
 * 2. Set a breakpoint for the debugger (if attached)
 * 3. Kill or freeze the process forever
 *
 * You cannot escape this even by mutating any global variables.
 *
 * @param message An optional message for the panic
 */
export function todo(message: string = ""): never {
  die("TODO: " + message);
}
/**
 * Panics in JavaScript. Use this function if a code path is not implemented and
 * must not be reached.
 *
 * This will try as hard as possible to be the last function you ever call in
 * JavaScript. Only call this if you are sure that something is terribly wrong
 * with the state of your program, and you want to die immediately. There is no
 * way to catch this panic.
 *
 * Under the hood, it will:
 *
 * 1. Log where this function is called
 * 2. Set a breakpoint for the debugger (if attached)
 * 3. Kill or freeze the process forever
 *
 * You cannot escape this even by mutating any global variables.
 *
 * @param message An optional message for the panic
 */
export function unimplemented(message: string = ""): never {
  die("UNIMPLEMENTED: " + message);
}
