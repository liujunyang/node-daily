console.log(1)
setTimeout(() => {
	console.log(2)
	Promise.resolve(1).then(()=>{
		console.log('promise')
	})
})

setTimeout(()=>{
	console.log(3)
})