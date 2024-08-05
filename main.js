import './style.css'

import { binarySearch } from './binarySearch.js'

document.querySelector('#app').innerHTML = `
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center" >
    <h1>Binary Search Fun by Nick Gillham</h1>
    <div style="width: 50%";>    
    <div class="card">
      <h2>List of Items: [ <span id="list"></span> ]</h2>
    </div>
    <div class="card">
      <input id="numberInput" type="text" style="width: 100px; height: 32px" />
      <button id="numberAdd" type="button">Click To Add a Number</button>
      <button id="randomAdd" type="button" style="margin-top: 8px">Add a bunch of randoms</button>
    </div>
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between">
      
      </div>
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; align-items: stretch; height: 240px">
      <input id="searchInput" type="text" placeholder="target" style="width: 100px; height: 32px; align-self: center; padding: 4px" />
      <button id="searchStep" type="button">Take a binary search step</button>
      <p id="steps-taken">Steps taken: 0</p>
      <button id="search" type="button">What index is the target?</button>
    </div>
    </div>
  </div>
`

let array = [2, 4, 5, 10, 50]
let low = 0
let high = array.length - 1
let steps = 0

// Function to update the content of the element with ID 'list'
function updateList() {
	const listElement = document.getElementById('list')
	listElement.innerHTML = array.map((num, index) => `<span id="item-${index}">${num}</span>`).join(', ')
}

function updateStepsTaken() {
	const stepsTakenElement = document.getElementById('steps-taken')
	stepsTakenElement.innerHTML = `Steps taken: ${steps}`
}

function resetTargetInput() {
	document.querySelector('#searchInput').value = ''
}

// Add a bunch of random numbers
document.querySelector('#randomAdd').addEventListener('click', addALoadOfRandomNumbers)
function addALoadOfRandomNumbers() {
	for (let i = 0; i < 10; i++) {
		array.push(Math.floor(Math.random() * 100))
	}
	array.sort((a, b) => a - b)

	updateList()

	// Reset search bounds
	low = 0
	high = array.length - 1
	steps = 0
	updateStepsTaken()
}

// Add a number
document.querySelector('#numberAdd').addEventListener('click', () => {
	let number = document.querySelector('#numberInput').value
	let cleanedNumber = parseInt(number)

	if (number !== '' && !isNaN(cleanedNumber)) {
		array.push(cleanedNumber)

		// Sort the array
		array.sort((a, b) => a - b)

		// Update the displayed list
		updateList()

		// Reset search bounds
		low = 0
		high = array.length - 1
		steps = 0
		updateStepsTaken()
	}

	// Reset input
	document.querySelector('#numberInput').value = ''
})

// Initial update of the list (in case the array is pre-populated)
updateList()

// Binary search step function
function binarySearchStep() {
	if (low > high) {
		alert('Item not found')
		return
	}

	const mid = Math.floor((low + high) / 2)
	const midValue = array[mid]
	const target = parseInt(document.querySelector('#searchInput').value)

	if (isNaN(target)) {
		alert('Please enter a valid number')
		resetTargetInput()
		return
	}

	if (!array.includes(target)) {
		alert('Item not in list')
		resetTargetInput()
		return
	}

	steps++
	updateStepsTaken()

	if (midValue === target) {
		alert(`Found ${target} at index ${mid} after ${steps} steps`)
		resetTargetInput()
		steps = 0
		updateStepsTaken()
		return
	}

	const fadeOutElements = []

	if (midValue < target) {
		for (let i = low; i <= mid; i++) {
			fadeOutElements.push(i)
		}
		low = mid + 1
	} else {
		for (let i = mid; i <= high; i++) {
			fadeOutElements.push(i)
		}
		high = mid - 1
	}

	fadeOutElements.forEach((index) => {
		const element = document.getElementById(`item-${index}`)
		if (element) {
			element.style.transition = 'opacity 0.5s'
			element.style.opacity = 0
			setTimeout(() => {
				element.style.display = 'none'
			}, 500)
		}
	})
}

document.querySelector('#search').addEventListener('click', () => binarySearch(array, parseInt(document.querySelector('#searchInput').value)))

document.querySelector('#searchStep').addEventListener('click', binarySearchStep)
