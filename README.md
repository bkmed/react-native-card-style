
# React Native Card Style
![npm version]
(https://lh3.googleusercontent.com/Xc2j79RJY8Arf2VosmlYypRp267SFXRK2iYbgIQAlQyz81cPyZzkytjIF6r_bP9OyQ=w1301-h641-rw?style=flat-square) ![npm downloads]
![npm version](https://lh3.googleusercontent.com/Xc2j79RJY8Arf2VosmlYypRp267SFXRK2iYbgIQAlQyz81cPyZzkytjIF6r_bP9OyQ=w1301-h641-rw?style=flat-square) ![npm downloads](https://lh3.googleusercontent.com/Xc2j79RJY8Arf2VosmlYypRp267SFXRK2iYbgIQAlQyz81cPyZzkytjIF6r_bP9OyQ=w1301-h641-rw?style=flat-square) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)


### A highly customizable material design card component for React Native.
 ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

## Get Started

### Installation

Install using npm:
```
npm install --save react-native-card-style
```
or install using Yarn
```
yarn add react-native-card-style
```

## Basic Usage

Import the components like so:  
```javascript
import { Card } from 'react-native-card-style';
```

Then insert the card in your code:
```js


  <Card>
    
  </Card>

```

## Card Component Options
| Prop        | Type           | Effect  | Default Value |
| ------------- |-------------| -----| -----|
| `isDark` | `boolean` | If the card background is dark, sets a light text color, this prop is passed to all child components | `true` |
| `mediaSource` | `object` | The image to show in background of a card, with content overlayed, passed to Image's `source` prop | `undefined` |
| `avatarSource` | `object` | The avatar image to be shown in the card's content or header section, whichever comes first, passed to Image's `source` prop | `undefined` |
| `style` | `object` | The style object to be merged with the default style | `undefined` |

## CardTitle Component Options
| Prop        | Type           | Effect  | Default Value |
| ------------- |-------------| -----| -----|
| `title` | `string` | The title text | `undefined` |
| `subtitle` | `string` | The subtitle text | `undefined` |
| `subtitleAbove` | `boolean` | Whether the subtitle should be shown above the title | `false` |
| `avatarSource` | `object` | The avatar image to be shown, passed to Image's `source` prop | `undefined` |
| `style` | `object` | The style object to be merged with the default style | `undefined` |

## CardContent Component Options
| Prop        | Type           | Effect  | Default Value |
| ------------- |-------------| -----| -----|
| `text` | `string` | The content text | `undefined` |
| `avatarSource` | `object` | The avatar image to be shown, passed to Image's `source` prop | `undefined` |
| `style` | `object` | The style object to be merged with the default style | `undefined` |

## CardImage Component Options
| Prop        | Type           | Effect  | Default Value |
| ------------- |-------------| -----| -----|
| `source` | `object` | The image to be shown, passed to Image's `source` prop | `undefined` |
| `style` | `object` | The style object to be merged with the default style | `undefined` |
| `resizeMode` | `string` | Determines how to resize the image when the frame doesn't match the raw image dimensions | `cover` |
| `resizeMethod` | `string` | Resize the image when the image's dimensions differ from the image view's dimensions. | `resize` |

## CardAction Component Options
| Prop        | Type           | Effect  | Default Value |
| ------------- |-------------| -----| -----|
| `separator` | `boolean` | Whether a separator should be shown | `true` |
| `inColumn` | `boolean` | Whether the buttons should be stacked in a column | `false` |
| `style` | `object` | The style object to be merged with the default style | `undefined` |

## CardButton Component Options
| Prop        | Type           | Effect  | Default Value |
| ------------- |-------------| -----| -----|
| `title` | `string` | The button's text | `undefined` |
| `color` | `string` | The color of button text | `orange` |
| `onPress` | `function` | The function to be called when button is pressed | `noop` (defined in [`src/utils`](https://github.com/SiDevesh/React-Native-Material-Cards/blob/master/src/utils/index.js)) |
| `style` | `object` | The style object to be merged with the default style | `undefined` |

