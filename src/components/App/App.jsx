import React, { Component } from 'react';
import { Box, Chart, Grommet } from 'grommet';
import Header from './Header';
const theme = {
	global: {
		colors: {
			brand: '#061533',
			focus: 'transparent'
		},
		font: {
			family: 'Poppins',
			size: '18px'
		}
	}
};

class App extends Component {
	state = {
		arraySize: 5,
		sortingAlgorithm: 'Quick Sort',
		arrayValues: [24, 63, 13, 94, 78],
		arrayBounds: [0, 4],
		chartThickness: 'xlarge'
	};

	updateArraySize = e => {
		this.setState({ arraySize: e.target.value });
	};

	updateSortingAlgorithm = e => {
		this.setState({ sortingAlgorithm: e.target.innerText });
	};

	generateNewArray = () => {
		let arrayValues = [];
		for (let i = 0; i < this.state.arraySize; i++) {
			arrayValues.push(1 + Math.floor(Math.random() * Math.floor(100)));
		}
		this.calculateThickness();
		this.setState({
			arrayValues: arrayValues,
			arrayBounds: [0, this.state.arraySize - 1]
		});
	};

	calculateThickness = () => {
		if (this.state.arraySize <= 5) {
			this.setState({ chartThickness: 'xlarge' });
		} else if (this.state.arraySize <= 10) {
			this.setState({ chartThickness: 'large' });
		} else if (this.state.arraySize <= 25) {
			this.setState({ chartThickness: 'medium' });
		} else if (this.state.arraySize <= 65) {
			this.setState({ chartThickness: 'small' });
		} else {
			this.setState({ chartThickness: 'xsmall' });
		}
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
				/>
				<Box
					justify="center"
					align="center"
					margin="xlarge"
					height="70vh"
				>
					<Chart
						bounds={[this.state.arrayBounds, [0, 100]]}
						size="full"
						thickness={this.state.chartThickness}
						values={this.state.arrayValues}
						width="750px"
					alignSelf="center"
					/>
				</Box>
			</Grommet>
		);
	}
}

export default App;
