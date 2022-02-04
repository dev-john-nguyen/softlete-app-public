import React from 'react';
import { SvgXml } from 'react-native-svg';

const graph = `<svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 13.49L7.5 7.48001L11.5 11.48L15.75 6.70001L20 1.92001L18.59 0.51001L11.5 8.48001L7.5 4.48001L0 11.99L1.5 13.49Z" />
</svg>`

interface Props {
    fillColor: string;
}

class GraphSvg extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={graph} width='100%' height='100%' fill={this.props.fillColor} />
        )
    }
}

export default GraphSvg;