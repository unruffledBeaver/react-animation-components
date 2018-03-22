import React from 'react';

import { storiesOf } from '@storybook/react';
import {
    withKnobs,
    text,
    boolean,
    number,
    object,
} from '@storybook/addon-knobs';

import {
    FadeInOut,
    FadeTransform,
    Loop,
    Random,
    Stagger,
    TweenTransform,
} from '../src/index';

const exampleArray = ['Example', 'Example', 'Example', 'Example', 'Example'];

storiesOf('Animations/FadeInOut', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <FadeInOut
            in={boolean('in', true)}
            delay={number('delay', 0)}
            duration={number('duration', 500)}
            timingFn={text('timingFn', 'ease')}
            unmountOnExit={boolean('unmountOnExit', false)}
            mountOnEnter={boolean('mountOnEnter', false)}
            enterOpacity={number('enterOpacity', 1)}
            exitOpacity={number('exitOpacity', 0)}
        >
            <h1>Example</h1>
        </FadeInOut>
    ));

storiesOf('Animations/TweenTransform', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <TweenTransform
            in={boolean('in', true)}
            delay={number('delay', 0)}
            duration={number('duration', 500)}
            timingFn={text('timingFn', 'ease')}
            enterTransform={text('enterTransform', 'translateY(50vh)')}
            exitTransform={text('exitTransform', 'none')}
        >
            <h1>Example</h1>
        </TweenTransform>
    ));

storiesOf('Animations/FadeTransform', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <FadeTransform
            in={boolean('in', true)}
            delay={number('delay', 0)}
            duration={number('duration', 500)}
            timingFn={text('timingFn', 'ease')}
            unmountOnExit={boolean('unmountOnExit', false)}
            mountOnEnter={boolean('mountOnEnter', false)}
            fadeProps={object('fadeProps', {
                enterOpacity: 1,
                exitOpacity: 0,
            })}
            transformProps={object('transformProps', {
                enterTransform: 'none',
                exitTransform: 'translateY(50vh)',
            })}
        >
            <h1>Example</h1>
        </FadeTransform>
    ));

storiesOf('Wrappers/Stagger', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <Stagger in={boolean('in', true)}>
            {exampleArray.map((example, i) => (
                <FadeInOut key={`${i}-example`}>
                    <h1>{example}</h1>
                </FadeInOut>
            ))}
        </Stagger>
    ))
    .add('chunks of 2', () => (
        <Stagger in={boolean('in', true)} chunk={2}>
            {exampleArray.map((example, i) => (
                <FadeInOut key={`${i}-example`}>
                    <h1>{example}</h1>
                </FadeInOut>
            ))}
        </Stagger>
    ));

storiesOf('Wrappers/Random', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <Random in={boolean('in', true)}>
            {exampleArray.map((example, i) => (
                <FadeInOut key={`${i}-example`}>
                    <h1>{example}</h1>
                </FadeInOut>
            ))}
        </Random>
    ));

storiesOf('Wrappers/Loop', module)
    .add('Bounce', () => (
        <Loop in>
            <TweenTransform enterTransform="translateY(10vh)" timeout={200}>
                <h1>Example</h1>
            </TweenTransform>
        </Loop>
    ))
    .add('Pulse', () => (
        <Loop in>
            <TweenTransform
                enterTransform="scale(1.2)"
                style={{ display: 'inline-block' }}
                timeout={100}
            >
                <h1>Example</h1>
            </TweenTransform>
        </Loop>
    ))
    .add('Rotate', () => (
        <Loop in>
            <TweenTransform
                enterTransform="rotate(360deg)"
                style={{ display: 'inline-block' }}
            >
                <h1>Example</h1>
            </TweenTransform>
        </Loop>
    ))
    .add('Blink', () => (
        <Loop in>
            <FadeInOut>
                <h1>Example</h1>
            </FadeInOut>
        </Loop>
    ));
