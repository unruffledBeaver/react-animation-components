# react-animation-components

[![Travis](https://img.shields.io/travis/unruffledBeaver/react-animation-components.svg?style=flat-square)]()

A set of React Transition Wrapper Components (https://github.com/reactjs/react-transition-group) for basic animations.

[Checkout the Storybook!](http://react-animation-components.surge.sh/)

*   [Installation](#installation)
*   [Animation Components](#animation-components)
    *   [Fade](#Fade)
    *   [Transform](#Transform)
    *   [FadeTransform](#fadetransform)
*   [Wrapper Components](#group-components)
    *   [Stagger](#stagger)
    *   [Random](#random)
    *   [Loop](#loop)

## Installation

`npm install react-animation-components`

Make sure you also have installed the following peer dependencies:

```
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "react-transition-group": "^2.2.1",
    "prop-types": "^15.6.0"
```

## Animation Components

### Props available on all animation components

The following are available on any animation component as well as **any valid `Transition` props**. Transitions are set to `appear` and their `timeout` is calculated by combining the `delay` and `duration` by default but can be overwritten.

| Key      | Description                                    | Example              | Type     | Default Value |
| -------- | ---------------------------------------------- | -------------------- | -------- | ------------- |
| delay    | Sets the animations `transitionDelay`          | `500`                | _number_ | `0`           |
| duration | Sets the animations `transitionDuration`       | `1000`               | _number_ | `500`         |
| timingFn | Sets the animations `transitionTimingFunction` | `'ease-in-out'`      | _string_ | `'ease'`      |
| style    | Passes styles to wrapper `div`                 | `{ display:'flex' }` | _object_ | `{}`          |

### Fade

Transitions the wrapped element's opacity from `0` to `1`

#### Examples

```
import { Fade } from 'react-animation-components'

<Fade in>
  <h1>I'm transitioning to opacity:1</h1>
</Fade>

<Fade in={false}>
  <h1>I'm transitioning to opacity:0</h1>
</Fade>
```

### Transform

Transitions the wrapped element from one transform property to another. Any valid `transform` property will work.

#### Props

| Key   | Description                              | Example               | Type     | Default Value |
| ----- | ---------------------------------------- | --------------------- | -------- | ------------- |
| enter | The transform value when `in` is `true`  | `'translateX(100px)'` | _string_ | `'none'`      |
| exit  | The transform value when `in` is `false` | `'translateX(100px)'` | _string_ | `'none'`      |

#### Examples

```
import { Transform } from 'react-animation-components'

<Transform enter="translateX(100px)" in>
  <h1>I'm transitioning from my initial position to 100px right when `in` is `true`</h1>
</Transform>

<Transform enter="translateX(100px)" exit="translateX(-100px)" in>
  <h1>
    I'm 100px to the left of my initial position and
    I transition 100px right of my initial when `in` is `true`
  </h1>
</Transform>

<Transform enter="rotate(90deg)" in>
  <h1>I transition from initial positon to rotate 90deg when `in` is `true`</h1>
</Transform>
```

### FadeTransform

Combines `Fade` and `Transform` and accepts all the props of both.

#### Examples

```
import { FadeTransform } from 'react-animation-components'

<FadeTransform enter="translateX(100px)" in>
  <h1>I'm transitioning from my initial position to 100px right when `in` is `true`</h1>
</FadeTransform>

<FadeTransform enter="translateX(100px)" exit="translateX(-100px)" in>
  <h1>
    I'm 100px to the left of my initial position and
    I transition 100px right of my initial when `in` is `true`
  </h1>
</FadeTransform>

<FadeTransform enter="rotate(90deg)" in>
  <h1>I transition from initial positon to rotate 90deg when `in` is `true`</h1>
</FadeTransform>
```

## Wrapper Components

### Stagger

Uses `TransitionGroup` to stagger `delay` on a set of animation components

#### Props

| Key   | Description                              | Example | Type     | Default Value |
| ----- | ---------------------------------------- | ------- | -------- | ------------- |
| delay | The amount to separate each stagger by   | `1000`  | _number_ | `100`         |
| chunk | Used to limit the stagger into "chunks". | `5`     | _number_ | `0`           |

#### Examples

```
import { Fade, Stagger } from 'react-animation-components'

const items = ['first', 'second', 'third', 'fourth', 'fifth'];

<Stagger>
    {items.map(
        item => (
            <Fade>
                <h1>Each {item} will transition in with an incrementally larger delay than the previous</h1>
            </Fade>
        )
    )}
</Stagger>

<Stagger chunk={4}>
    {items.map(
        item => (
            <Fade>
                <h1>
                  Each {item} will increment in segments of 4.
                  First is 0, Second is 100, Third is 200, Fourth is 0, fifth is 100, and so on
                </h1>
            </Fade>
        )
    )}
</Stagger>
```

### Random

Uses `TransitionGroup` to randomize `delay` on a set of animation components

#### Props

| Key      | Description            | Example | Type     | Default Value |
| -------- | ---------------------- | ------- | -------- | ------------- |
| minDelay | Minimum delay possible | `100`   | _number_ | `0`           |
| maxDelay | Maximum delay possible | `5000`  | _number_ | `1500`        |

#### Examples

```
import { Fade, Random } from 'react-animation-components'

const items = ['first', 'second', 'third', 'fourth', 'fifth'];

<Random>
    {items.map(
        item => (
            <Fade>
                <h1>Each {item} will randomly FadeIn between 0 and 1500ms</h1>
            </Fade>
        )
    )}
</Random>

<Random minDelay={1000} maxDelay={5000}>
    {items.map(
        item => (
            <Fade>
                <h1>Each {item} will randomly FadeIn between 1000ms and 5000ms</h1>
            </Fade>
        )
    )}
</Random>
```

### Loop

Loops using the `onEntered` and `onExited` callbacks to toggle `in` on a **single** animation component.

#### Props

| Key        | Description                                                                                                                                            | Example            | Type       | Default Value              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------- | -------------------------- |
| in         | Initializes the loop when `true`                                                                                                                       | `true`             | _bool_     | `false`                    |
| interval   | Sets the interval to toggle `in`. Also sets the `duration`                                                                                             | `1000`             | _number_   | `500`                      |
| iterations | Maximum number of loops                                                                                                                                | `5.5`              | _number_   | `Infinity`                 |
| onIterate  | Callback that is called with the current count each time the loop iterates. Count is incremented by `0.5`                                              | any valid function | _function_ | `Function.prototype(noop)` |
| onComplete | Callback that is called when the `iterations` have been met. Waits an additional `interval` to ensure its called when the last iteration has completed | any valid function | _function_ | `Function.prototype(noop)` |

#### Examples

```
import { Fade, Loop } from 'react-animation-components'

<Loop in>
    <Fade>
        <h1>I will Fade in and out repeatedly on 500ms intervals</h1>
    </Fade>
</Loop>

<Loop in iterations={5.5}>
    <Fade>
        <h1>I will Fade in and out repeatedly on 500ms intervals 5.5 times</h1>
    </Fade>
</Loop>
```
