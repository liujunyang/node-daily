// 用setTimeout 自己实现一个 setInterval
// 可以清除定时器，比如有3个，可以清除2，但是1 3 还在
let timerCache = {}

function mySetInterval (timer, time, fn) {
	clearTimeout(timerCache[timer])

	timerCache[timer] = setTimeout(() => {
		fn()
		mySetInterval(timer, time, fn)
	}, time)
}

mySetInterval('timer1', 1000, () => {
	console.log('timer1')
})

mySetInterval('timer2', 2000, () => {
	console.log('timer2')
})

mySetInterval('timer3', 3000, () => {
	console.log('timer3')
})

function clearMyInterval (timer) {
	console.log(`清除了定时器${timer}`)
	clearTimeout(timerCache[timer])
}

setTimeout(() => {
	clearMyInterval('timer1')
}, 5000)

setTimeout(() => {
	clearMyInterval('timer2')
}, 7000)

setTimeout(() => {
	clearMyInterval('timer3')
}, 9000)
