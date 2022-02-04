import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg viewBox="0 0 11 14"  xmlns="http://www.w3.org/2000/svg">
<path d="M2 3.64L7.27 7L2 10.36V3.64ZM0 0V14L11 7L0 0Z" />
</svg>`

interface Props {
    fillColor: string;
}

class PlaySvg extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={svg} width='100%' height='100%' fill={this.props.fillColor} />
        )
    }
}

export default PlaySvg