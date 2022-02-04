import React from 'react';
import { SvgXml } from 'react-native-svg';

const svg = `<svg  viewBox="0 0 16 21" xmlns="http://www.w3.org/2000/svg">
<path d="M15.48 11.3499C13.91 7.2699 8.32 7.0499 9.67 1.1199C9.77 0.679896 9.3 0.339896 8.92 0.569896C5.29 2.7099 2.68 6.9999 4.87 12.6199C5.05 13.0799 4.51 13.5099 4.12 13.2099C2.31 11.8399 2.12 9.8699 2.28 8.4599C2.34 7.9399 1.66 7.6899 1.37 8.1199C0.69 9.1599 0 10.8399 0 13.3699C0.38 18.9699 5.11 20.6899 6.81 20.9099C9.24 21.2199 11.87 20.7699 13.76 19.0399C15.84 17.1099 16.6 14.0299 15.48 11.3499ZM6.2 16.3799C7.64 16.0299 8.38 14.9899 8.58 14.0699C8.91 12.6399 7.62 11.2399 8.49 8.9799C8.82 10.8499 11.76 12.0199 11.76 14.0599C11.84 16.5899 9.1 18.7599 6.2 16.3799Z" />
</svg>`

interface Props {
    fillColor: string
}

class FireSvg extends React.Component<Props, {}> {
    render() {
        return (
            <SvgXml xml={svg} width='100%' height='100%' fill={this.props.fillColor} />
        )
    }
}

export default FireSvg