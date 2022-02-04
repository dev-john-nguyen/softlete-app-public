import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.69434 17.455L7.33571 23.2331C7.8028 23.7115 8.59875 23.6056 8.92451 23.0217L20.6527 2" stroke-width="4" stroke-linecap="round"/>
</svg>`

interface Props {
    strokeColor: string;
}

class CheckedSvg extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={svg} width='100%' height='100%' stroke={this.props.strokeColor} />
        )
    }
}

export default CheckedSvg