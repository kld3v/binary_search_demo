export function binarySearch(array, target) {
	let left = 0
	let right = array.length - 1
	while (left <= right) {
		let middle = Math.floor((left + right) / 2)
		if (array[middle] === target) {
			alert(middle)
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
