import React, { Component } from 'react';
import { Box, Button, Menu, Text, RangeInput } from 'grommet';

class Header extends Component {
	render() {
		let {
			updateArraySize,
			updateSortingAlgorithm,
			arraySize,
			sortingAlgorithm,
			generateNewArray
		} = this.props;
		return (
			<Box
				background="brand"
				elevation="small"
				direction="row"
				align="center"
			>
				<Box
					direction="row"
					pad={{ vertical: 'small', left: 'large' }}
					gap="medium"
					align="center"
					height="72px"
					fill="horizontal"
				>
					<Box>
						<Button label="Generate New Array" onClick={generateNewArray}/>
					</Box>
					<Box direction="row" gap="small" align="center">
						<Text>Size</Text>
						<RangeInput
							value={arraySize}
							onChange={updateArraySize}
							min="5"
						/>
					</Box>
					<Box align="center" width="162px">
						<Menu
							label={sortingAlgorithm}
							items={[
								{
									label: 'Merge Sort',
									onClick: updateSortingAlgorithm
								},
								{
									label: 'Quick Sort',
									onClick: updateSortingAlgorithm
								},
								{
									label: 'Heap Sort',
									onClick: updateSortingAlgorithm
								},
								{
									label: 'Bubble Sort',
									onClick: updateSortingAlgorithm
								}
							]}
						/>
					</Box>
				</Box>
				<Box width="110px" margin={{ right: 'large' }}>
					<Button textAlign="center" label="Start" primary/>
				</Box>
			</Box>
		);
	}
}

export default Header;
