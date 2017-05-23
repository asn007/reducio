reducio
=======

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/611d380ea49c42acb5d87a50f55babd8)](https://www.codacy.com/app/asn007/reducio?utm_source=github.com&utm_medium=referral&utm_content=asn007/reducio&utm_campaign=badger)

A library for getting rid of switch-case boilerplate in redux reducers

## How does it help me
Ever noticed how your reducers mostly do repetitive tasks, like updating fetched data, toggling something, stuff like this? I bet you did, and __reducio__ may help you get rid of it. How? Reducio allows you to create a reducer creator - a function, which takes some parameters and returns a fully featured reducer, which you can later plug where your architecture allows you to. Reducio also provides you with utilities to compose reducers (by reducer I mean a function which takes two parameters, old state and action and returns new state based on action) into one combined reducer function.

Let's see how it works in [Usage](#usage)

## Installation
  `npm install reducio`

## Usage
  ```js
  import { createReducer } from 'reducio';
  import { filter } from 'lodash';

  const basicReducer = createReducer(
    // this reducer will only get invoked when action.type equals SOMETHING
    (action) => action.type === 'SOMETHING',
    // this reducer sets the `key` property of state to action.payload. Yes, just like your reducers
    (state, action) => Object.assign({}, state, { key: action.payload })
    // the third argument is the action modifier
    // it accepts an action and the result of that function is 'Object.assign'ed
    // to a new action, which initially has the props of an old action
    // Resulting action is then passed to a 2nd argument of createReducer
    (action) => ({ payload: action.data.filter(item => item.hasThisVariable))}
  )
  ```
