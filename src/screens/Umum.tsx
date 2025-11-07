/* eslint-disable prettier/prettier */
import { Box } from 'native-base';
import * as React from 'react';

export default function Umum() {
	return (
		<>
			<Box
				safeAreaTop
				_light={{ bg: 'primary.900' }}
				_dark={{ bg: 'coolGray.900' }}
			/>
		</>
	);
}
