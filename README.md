# \$switch 💰Expression based switch branching.

_You can read this as dolla'-switch._

Javascript's `switch` is unfortunately not an expression, which means you can't use it as a right hand side of an expression or in places where you can only put a single value. Luckily, `$switch` can function as an expression.

## Why would I use this over `switch`?
Well, the whole point of `$switch` is that it's an expression, that means, you can use it wherever you'd use a value: in-line evaluations, return statements, if statements, heck, you can use it in the key-expression for an object (but that's just ugly).

You can do neat expressions like this:

```javascript
const constructor = $switch(typeof x, 
  { 'number': () => Number,
    'string': () => String,
    'date':   () => Date,
    'object': () => Object },
    () => null);
```

And the best part, it's Typescript-powered, that means, you'll get completion assistance and typecheck for exhaustiveness (when using `$switch.strict`).

## Examples

Take this basic example, that demonstrates the usage as an expression:
```typescript
type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'phriday' | 'saturday' | 'sunday';
const today: Day = pickRandom('monday', 'phriday', 'sunday') as Day;

// Inline, you have no option but to define a 'let' / 'var', and assign it in a switch:
let drinkOfTheDay = 'water or something';
switch (today) {
    case 'phriday':
        drinkOfTheDay = 'beer';
        break;
    case 'saturday':
        drinkOfTheDay = 'wine';
        break;
    case 'sunday':
        drinkOfTheDay = 'vodka';
        break;
    default:
        drinkOfTheDay = 'water';
        break;
}
// Or optionally, you can switch the above in a function, or an IIFE and return from each 'case'
// - but that doesn't make it any prettier. 


// With $switch:
import $switch from 'dolla-switch';

const drinkOfTheDay = $switch(day, {
        phriday: () => 'beer',
        saturday: () => 'wine',
        sunday: () => 'vodka',
    }, () => 'water');
}
```

Working with regular `switch` statements would be a pain in `jsx` - `$switch` is convenient here as well:
```jsx
<div> Today is {today}!</div>
<div>
{
  $switch(today, {
    'phriday': () => <GifPartyParrot />,
    'saturday': () => <GifDancingDog />,
    'sunday': () => <GifSleepyGary />
  }, () => <GifWorkingPerson />)
}
</div>
```


With `$switch.strict` - you get even more safety, courtesy of Typescript:
```typescript
const today: Day = 'phriday';

const drinkOfTheDay$ = $switch.strict(today, {
    phriday: () => 'beer',
    saturday: () => 'wine', // Errors for extra cases, because from the types it's visible, that 'today' can only be 'phriday' 
    sunday: () => 'vodka',
});

const today: Day = 'phriday' as Day;

const drinkOfTheDay$ = $switch.strict(today, { // Errors for the cases object, because
    phriday: () => 'beer',                     // the rest of the cases aren't handled
    saturday: () => 'wine',
    sunday: () => 'vodka',
});
```

For your cases, give it a spin.

## Installation

For now, you can only use this with node.js, or using a bundler, because it's not exposing any globals, but who are we kidding, it's 2020, you probably do this daily already.

```bash
npm install --save dolla-switch
```

## Examples

And \$switch also supports types through [Typescript](http://typescriptlang.org/)!

<small>Contains no meat™!</small>
