export function binarySearch(array, target) {
	let left = 0
	let right = array.length - 1
	while (left <= right) {
		let middle = Math.floor((left + right) / 2)
		if (array[middle] === target) {
			alert(` index is ${middle}`)
			return middle
		} else if (array[middle] < target) {
			left = middle + 1
		} else {
			right = middle - 1
		}
	}
	alert("Target doesn't exist in the array")
	return -1
}

export function binarySearchFunctional(array, target) {
	let newArray = []

	function getMiddleIndex(array) {
		return Math.floor(array.length / 2)
	}

	function cutAwayLeftOrRightOfArray(array, index, leftOrRight) {
		if (leftOrRight === 'left') {
			return array.splice(0, index)
		}
		return array.splice(index + 1, index.length - 1)
	}

	if (array.length === 0) {
		return -1
	}

	if (!array.includes(target)) {
		alert('target not in array!')
		return -1
	}

	if (array.length === 1) {
		if (array[0] === target) {
			return 0
		} else {
			return -1
		}
	}

	let middle = getMiddleIndex(array)

	if (array[middle] === target) {
		alert(` target is at position ${middle}`)
		return middle
	} else if (array[middle] < target) {
		newArray = cutAwayLeftOrRightOfArray(array, middle, 'left')
		return binarySearchFunctional(newArray, target)
	} else {
		newArray = cutAwayLeftOrRightOfArray(array, middle, 'right')
		return binarySearchFunctional(newArray, target)
	}
}
