import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg viewBox="0 0 581 581" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M261.542 464.25H319.458V406.333H261.542V464.25ZM290.5 0.916626C130.65 0.916626 0.916748 130.65 0.916748 290.5C0.916748 450.35 130.65 580.083 290.5 580.083C450.35 580.083 580.083 450.35 580.083 290.5C580.083 130.65 450.35 0.916626 290.5 0.916626ZM290.5 522.167C162.794 522.167 58.8334 418.206 58.8334 290.5C58.8334 162.794 162.794 58.8333 290.5 58.8333C418.206 58.8333 522.167 162.794 522.167 290.5C522.167 418.206 418.206 522.167 290.5 522.167ZM290.5 116.75C226.502 116.75 174.667 168.585 174.667 232.583H232.583C232.583 200.729 258.646 174.667 290.5 174.667C322.354 174.667 348.417 200.729 348.417 232.583C348.417 290.5 261.542 283.26 261.542 377.375H319.458C319.458 312.219 406.333 304.979 406.333 232.583C406.333 168.585 354.498 116.75 290.5 116.75Z" />
</svg>`

interface Props {
    fillColor: string
}

class HelpSvg extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={svg} width='100%' height='100%' fill={this.props.fillColor} />
        )
    }
}

export default HelpSvg;