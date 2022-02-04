import React from 'react';
import { SvgXml } from 'react-native-svg';

const menu = `<svg viewBox="0 0 8 14"  xmlns="http://www.w3.org/2000/svg">
<path d="M7 1L1 7L7 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

interface Props {
    strokeColor: string;
}

class Chevron extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={menu} width='100%' height='100%' stroke={this.props.strokeColor} />
        )
    }
}

export default Chevron