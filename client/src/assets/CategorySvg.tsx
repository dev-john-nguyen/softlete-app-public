import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 0L3.5 9H14.5L9 0Z" />
<path d="M14.5 20C16.9853 20 19 17.9853 19 15.5C19 13.0147 16.9853 11 14.5 11C12.0147 11 10 13.0147 10 15.5C10 17.9853 12.0147 20 14.5 20Z" />
<path d="M0 11.5H8V19.5H0V11.5Z" />
</svg>`

interface Props {
    fillColor: string
}

class CategorySvg extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={svg} width='100%' height='100%' fill={this.props.fillColor} />
        )
    }
}

export default CategorySvg