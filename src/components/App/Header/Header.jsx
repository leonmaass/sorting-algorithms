import React, { Component } from 'react';
import { Box, Button, Menu, RangeInput } from 'grommet';

class Header extends Component {
	render() {
		let {
			updateArraySize,
			updateSortingAlgorithm,
			arraySize,
			sortingAlgorithm,
			generateNewArray,
			startSorting,
			sorting
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
						<Button
							label="Generate New Array"
							onClick={generateNewArray}
							disabled={sorting}
						/>
					</Box>
					<Box direction="row" gap="small" align="center">
						<Button
							disabled={sorting}
							style={{ cursor: 'default' }}
						>
							Size
						</Button>
						<RangeInput
							value={arraySize}
							onChange={updateArraySize}
							min="5"
							max="100"
							step={5}
							disabled={sorting}
							style={
								sorting
									? { opacity: '0.3', cursor: 'default' }
									: { opacity: '1', cursor: 'pointer' }
							}
						/>
					</Box>
					<Box align="center" width="162px">
						<Menu
							label={sortingAlgorithm}
							disabled={sorting}
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
					<Button
						textAlign="center"
						label="Start"
						primary
						onClick={startSorting}
						disabled={sorting}
					/>
				</Box>
			</Box>
		);
	}
}

export default Header;
