import React, { Component } from 'react';
import { defaultProps, Box, Grommet } from 'grommet';
import Header from './Header';

// change this value for the speed of the animation
const ANIMATION_SPEED_MS = 10;
console.log(defaultProps);
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
		sortingAlgorithm: 'Quick Sort',
		arrayValues: [],
		arrayColors: [],
		sorting: false
	};

	componentDidMount() {
		this.generateNewArray();
	}

	updateArraySize = e => {
		this.setState({ arraySize: e.target.value }, () => this.generateNewArray());
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

	swap = (arr, i, j, animation) => {
		const temp = arr[i];
		animation.push([i, j, 's']);
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

	animateSorting = animation => {
		for (let i = 0; i < animation.length; i++) {
			const isColorChange = animation[i][2] === 'c' ? true : false,
				isSwap = animation[i][2] === 's' ? true : false,
				isLastIteration = i === animation.length - 1 ? true : false;
			if (isColorChange) {
				const [color, barId] = animation[i];
				setTimeout(() => {
					document.getElementsByClassName('array-bar')[
						barId
					].style.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else if (isSwap) {
				setTimeout(() => {
					const [a, b] = animation[i];
					let arr = this.state.arrayValues.map(a => a);
					const temp = arr[a];
					arr[a] = arr[b];
					arr[b] = temp;
					this.setState({ arrayValues: arr });
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
			sortedArr = this.state.arrayValues.map(a => a).sort((a, b) => a - b),
			animation = [];
		if (this.state.sortingAlgorithm === 'Quick Sort') {
			this.quickSort(arr, 0, arr.length - 1, animation);
		}
		arr.forEach((value, id) => {
			if (
				sortedArr[id] === value
			) {
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
					margin={{ horizontal: 'xlarge' }}
					direction="row"
				>
					{this.state.arrayValues.map((value, position) => (
						<Box
							key={position}
							width="3px"
							height={value + 'px'}
							margin="1px"
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
