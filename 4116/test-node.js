let str = 'aaabbbbcccddddde'
// let result = 'a3b4c3d4e1a1'

// let len = str.split('a').length - 1
// console.log(len)



// 知道每个字符按顺序出现多少次


// let first = str[0]
// let re = new RegExp(first, 'g')

// let arr = str.match(re)
// console.log(arr)


let result = ''
function findNum (str) {
	if (str.length === 1) {
		result += str + 1
		return;
	}

	let arr = [...str]
	let first = arr[0]
	let count = 1

	for (var i = 1; i <= arr.length; i++) {

		if (arr[i] === first) {
			count++
		} else {
			result += first + count
			findNum(str.slice(count))
			break;
		}
	}
}

findNum(str)
console.log(result)