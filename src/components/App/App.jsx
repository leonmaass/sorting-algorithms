import React, { Component } from 'react';
import { Box, Grommet } from 'grommet';
import Header from './Header';

// change this value for the speed of the animation
const ANIMATION_SPEED_MS = 1;
const theme = {
	global: {
		colors: {
			brand: '#061533',
			focus: 'transparent',
			'accent-1': '#B578E8',
			text: {
				light: '#000'
			}
		},
		font: {
			family: 'Poppins',
			size: '18px'
		}
	}
};

class App extends Component {
	state = {
		arraySize: 50,
		sortingAlgorithm: 'Merge Sort',
		arrayValues: [],
		sorting: false
	};

	componentDidMount() {
		this.generateNewArray();
	}

	updateArraySize = e => {
		this.setState({ arraySize: e.target.value }, () =>
			this.generateNewArray()
		);
	};

	updateSortingAlgorithm = e => {
		this.setState({ sortingAlgorithm: e.target.innerText });
	};

	generateNewArray = () => {
		let arrayValues = [],
			bars = document.getElementsByClassName('array-bar');
		for (let i = 0; i < this.state.arraySize; i++) {
			arrayValues.push(
				100 + 5 * Math.floor(Math.random() * Math.floor(100))
			);
			if (bars[i] !== undefined) {
				bars[i].style.backgroundColor = '#B578E8';
			}
		}

		this.setState({
			arrayValues: arrayValues
		});
	};

	// HEAP SORT ALGORITHM

	siftDown = (arr, start, end, animation) => {
		var root = start,
			child = root * 2 + 1,
			toSwap = root;
		while (child <= end) {
			if (arr[toSwap] < arr[child]) {
				this.swap(arr, toSwap, child);
			}
			if (child + 1 <= end && arr[toSwap] < arr[child + 1]) {
				this.swap(arr, toSwap, child + 1);
			}
			if (toSwap !== root) {
				this.swap(arr, root, toSwap);
				root = toSwap;
			} else {
				return;
			}
			toSwap = root;
			child = root * 2 + 1;
		}
	};

	heapify = (arr, len, animation) => {
		// break the array into root + two sides, to create tree (heap)
		var mid = Math.floor((len - 2) / 2);
		while (mid >= 0) {
			this.shiftDown(arr, mid--, len - 1);
		}
	};

	heapSort = (arr, animation) => {
		var len = arr.length,
			end = len - 1;

		this.heapify(arr, len);

		while (end > 0) {
			this.propsswap(arr, end--, 0);
			this.shiftDown(arr, 0, end);
		}
		return arr;
	};

	// MERGE SORT ALGORITHM

	merge = (
		mainArray,
		startIdx,
		middleIdx,
		endIdx,
		auxiliaryArray,
		animation
	) => {
		let k = startIdx;
		let i = startIdx;
		let j = middleIdx + 1;
		while (i <= middleIdx && j <= endIdx) {
			//comparison add
			animation.push(['#FF4040', i, 'c']);
			animation.push(['#FF4040', j, 'c']);

			if (auxiliaryArray[i] <= auxiliaryArray[j]) {
				//comparison success
				animation.push(['#6FFFB0', i, 'c']);
				animation.push(['#6FFFB0', j, 'c']);
				// comparison remove
				animation.push(['#B578E8', i, 'c']);
				animation.push(['#B578E8', j, 'c']);
				// animate swap
				animation.push([auxiliaryArray[i], k, 'cV']);
				mainArray[k++] = auxiliaryArray[i++];
			} else {
				// comparison remove
				animation.push(['#B578E8', i, 'c']);
				animation.push(['#B578E8', j, 'c']);
				// animate swap
				animation.push([auxiliaryArray[j], k, 'cV']);
				mainArray[k++] = auxiliaryArray[j++];
			}
		}
		while (i <= middleIdx) {
			//comparison add
			animation.push(['#FF4040', i, 'c']);
			// comparison remove
			animation.push(['#B578E8', i, 'c']);
			// animate swap
			animation.push([auxiliaryArray[i], k, 'cV']);
			mainArray[k++] = auxiliaryArray[i++];
		}
		while (j <= endIdx) {
			//comparison add
			animation.push(['#FF4040', j, 'c']);
			// comparison remove
			animation.push(['#B578E8', j, 'c']);
			// animate swap
			animation.push([auxiliaryArray[j], k, 'cV']);
			mainArray[k++] = auxiliaryArray[j++];
		}
	};

	mergeSort = (mainArray, startIdx, endIdx, auxiliaryArray, animation) => {
		if (startIdx === endIdx) return;
		const middleIdx = Math.floor((startIdx + endIdx) / 2);
		this.mergeSort(
			auxiliaryArray,
			startIdx,
			middleIdx,
			mainArray,
			animation
		);
		this.mergeSort(
			auxiliaryArray,
			middleIdx + 1,
			endIdx,
			mainArray,
			animation
		);
		this.merge(
			mainArray,
			startIdx,
			middleIdx,
			endIdx,
			auxiliaryArray,
			animation
		);
	};

	// QUICK SORT ALGORITHM

	swap = (arr, i, j, animation) => {
		const temp = arr[i];
		// animate swap
		animation.push([arr[j], i, 'cV']);
		animation.push([temp, j, 'cV']);
		arr[i] = arr[j];
		arr[j] = temp;
	};

	partition = (arr, pivot, left, right, animation) => {
		let pivotValue = arr[pivot],
			partitionIndex = left;
		// add pivot
		animation.push(['#FF4040', pivot, 'c']);
		for (let i = left; i < right; i++) {
			// add partition index
			animation.push(['#FFAA15', partitionIndex, 'c']);
			// add comparison
			animation.push(['#FF4040', i, 'c']);
			if (arr[i] < pivotValue) {
				// comparison success
				animation.push(['#6FFFB0', i, 'c']);
				// remove comparison success
				animation.push(['#B578E8', i, 'c']);
				this.swap(arr, i, partitionIndex, animation);
				// remove old partition index
				animation.push(['#B578E8', partitionIndex, 'c']);
				partitionIndex++;
				// add new partition index
				animation.push(['#FFAA15', partitionIndex, 'c']);
			}
			// remove comparison
			animation.push(['#B578E8', i, 'c']);
		}
		// remove partition index
		animation.push(['#B578E8', partitionIndex, 'c']);
		this.swap(arr, right, partitionIndex, animation);
		// remove pivot
		animation.push(['#B578E8', pivot, 'c']);
		return partitionIndex;
	};

	quickSort = (arr, left, right, animation) => {
		let pivot, partitionIndex;

		if (left < right) {
			pivot = right;
			partitionIndex = this.partition(arr, pivot, left, right, animation);

			//sort left and right
			this.quickSort(arr, left, partitionIndex - 1, animation);
			this.quickSort(arr, partitionIndex + 1, right, animation);
		}

		return arr;
	};

	// ANIMATE SORTING

	animateSorting = animation => {
		for (let i = 0; i < animation.length; i++) {
			const [value, barId, animationType] = animation[i],
				barStyle = document.getElementsByClassName('array-bar')[barId]
					.style,
				isLastIteration = i === animation.length - 1 ? true : false;

			if (animationType === 'c') {
				setTimeout(() => {
					barStyle.backgroundColor = value;
				}, i * ANIMATION_SPEED_MS);
			} else if (animationType === 'cV') {
				setTimeout(() => {
					barStyle.height = `${value}px`;
				}, i * ANIMATION_SPEED_MS);
			}

			if (isLastIteration) {
				setTimeout(() => {
					this.setState({ sorting: false });
				}, i * ANIMATION_SPEED_MS);
			}
		}
	};

	startSorting = () => {
		this.setState({ sorting: true });
		let arr = this.state.arrayValues.map(a => a),
			sortedArr = arr.slice().sort((a, b) => a - b),
			animation = [];

		if (this.state.sortingAlgorithm === 'Quick Sort') {
			this.quickSort(arr, 0, arr.length - 1, animation);
		} else if (this.state.sortingAlgorithm === 'Merge Sort') {
			let auxiliaryArray = arr.slice();
			this.mergeSort(arr, 0, arr.length - 1, auxiliaryArray, animation);
		}

		arr.forEach((value, id) => {
			if (sortedArr[id] === value) {
				animation.push(['#6399F1', id, 'c']);
			}
		});
		this.animateSorting(animation);
	};

	render() {
		return (
			<Grommet theme={theme}>
				<Header
					updateArraySize={this.updateArraySize}
					updateSortingAlgorithm={this.updateSortingAlgorithm}
					arraySize={this.state.arraySize}
					sortingAlgorithm={this.state.sortingAlgorithm}
					generateNewArray={this.generateNewArray}
					startSorting={this.startSorting}
					sorting={this.state.sorting}
				/>
				<Box
					justify="center"
					margin={{ horizontal: 'xlarge', top: 'medium' }}
					direction="row"
					//align="center"
				>
					{this.state.arrayValues.map((value, position) => (
						<Box
							key={position}
							width="3px"
							margin="1.5px"
							style={{
								height: `${value}px`
							}}
							responsive={false}
							background="accent-1"
							className="array-bar"
						></Box>
					))}
				</Box>
			</Grommet>
		);
	}
}

export default App;
