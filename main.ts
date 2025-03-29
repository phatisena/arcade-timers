//% color=#4e54ed icon="\uf254"
//% groups='[]'
namespace timer {

    /**
     * After a certain amount of time, the attached code will run.
     * Blocks after this one will run without waiting.
     */
    //% blockid=timer_after
    //% block="after $time do"
    //% time.defl=500
    //% %time=timePicker ms"
    //% handlerStatement
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
    //% handlerStatement
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
    //% %time=timePicker ms"
    //% key.defl="action"
    //% handlerStatement
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
    //% %time=timePicker ms"
    //% key.defl="action"
    //% handlerStatement
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

    /**
     * Running this handlerstatement every ms
     */
    //% blockid=timer_interval
    //% block="on update every $delay ms do"
    //% handlerStatement
    //% time.defl=500
    //% %time=timePicker ms"
    //% group="run and update"
    //% weight=20
    export function intervalState(delay: number, then: () => void) {
        setInterval(then, delay)
    }

    /**
     * Running this statement every ms
     */
    //% blockid=timer_interval_handler
    //% block="on update every $delay ms"
    //% time.defl=500
    //% %time=timePicker ms"
    //% group="run and update"
    //% weight=15
    export function interval(delay: number, then: () => void) {
        setInterval(then, delay)
    }

    /**
     * Running this handlerstatement every time
     */
    //% blockid=timer_immediate_handler
    //% block="on update"
    //% handlerStatement
    //% group="run and update"
    //% weight=10
    export function immediateState(then: () => void) {
        setImmediate(then)
    }

    /**
     * Running this statement every time
     */
    //% blockid=timer_immediate
    //% block="on update do"
    //% group="run and update"
    //% weight=5
    export function immediate(then: () => void) {
        setImmediate(then)
    }

}
