import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4ZM10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2C9.1 2 10 2.9 10 4Z" />
<path d="M0 14V16H16V14C16 11.34 10.67 10 8 10C5.33 10 0 11.34 0 14ZM2 14C2.2 13.29 5.3 12 8 12C10.69 12 13.77 13.28 14 14H2Z" />
<path d="M21 6H15V8H21V6Z" />
</svg>`

interface Props {
    fillColor: string
}

class PersonRemoveSvg extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={svg} width='100%' height='100%' fill={this.props.fillColor} />
        )
    }
}

export default PersonRemoveSvg