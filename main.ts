//% color=#700204 icon="\uf254"
//% groups='[]'
namespace timer {
    /**
     * After a certain amount of time, the attached code will run.
     * Blocks after this one will run without waiting.
     */
    //% blockid=timer_after
    //% block="after $time do"
    //% time.defl=500
    //% handlerStatement
    //% %time=timePicker ms"
    //% group="after statement"
    //% weight=10
    export function after(time: number, thenDo: () => void) {
        setTimeout(thenDo, time)
    }

    /**
     * Run the attached code seperately from other code.
     * This creates a seperate context for "pause" so that pauses
     * within or without this code are seperated.
     */
    //% blockid=timer_background
    //% block="separately do"
    //% handlerStatement
    //% group="run in state"
    //% weight=10
    export function background(then: () => void) {
        control.runInBackground(then)
    }

    /**
     * Run the seperated code from other code.
     * This creates a attech context like "on game update" so that updates
     * within or without this code are attached.
     */
    //% blockid=timer_parallel
    //% block="attach do"
    //% handerStatement
    //% group="run in state"
    //% weight=5
    export function parallel(then: () => void) {
        control.runInParallel(then)
    }

    let decounceTimeouts: { [key: string]: number } = {}
    /**
     * After this block hasn't been called with the given key
     * for a certain amount of time run the attached code.
     * Also known as "debounce".
     */
    //% blockid=timer_debounce
    //% block="after $key settled for $time do"
    //% time.defl=500
    //% key.defl="action"
    //% handlerStatement
    //% %time=timePicker ms"
    //% group="key statement"
    //% weight=10
    export function debounce(key: string, time: number, thenDo: () => void) {
        if (decounceTimeouts[key]) {
            clearTimeout(decounceTimeouts[key])
        }
        decounceTimeouts[key] = setTimeout(thenDo, time)
    }

    let throttleTimeouts: { [key: string]: number } = {}
    /**
     * Ensure that the attached code isn't run more than
     * once per time interval for the given key.
     * Also known as "throttle".
     */
    //% blockid=timer_throttle
    //% block="for $key at most once every $time do"
    //% time.defl=500
    //% key.defl="action"
    //% handlerStatement
    //% %time=timePicker ms"
    //% group="key statement"
    //% weight=5
    export function throttle(key: string, time: number, thenDo: () => void) {
        if (!throttleTimeouts[key]) {
            thenDo();
            throttleTimeouts[key] = setTimeout(() => {
                throttleTimeouts[key] = null;
            }, time)
        }
    }
}
