import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
<path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
</svg>`

interface Props {
    strokeColor: string;
}

class PlusSvg extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={svg} width='100%' height='100%' fill={this.props.strokeColor} />
        )
    }
}

export default PlusSvg