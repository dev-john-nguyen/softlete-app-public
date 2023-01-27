import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg  viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<path d="M12.73 0H5.27L0 5.27V12.73L5.27 18H12.73L18 12.73V5.27L12.73 0ZM16 11.9L11.9 16H6.1L2 11.9V6.1L6.1 2H11.9L16 6.1V11.9Z" />
<path d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14Z" />
<path d="M8 4H10V11H8V4Z" />
</svg>`

interface Props {
    fillColor: string;
}

class WarningSvg extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={svg} width='100%' height='100%' fill={this.props.fillColor} />
        )
    }
}

export default WarningSvg