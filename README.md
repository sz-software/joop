
# @sz-software/joop [![Build Status](https://travis-ci.org/sz-software/joop.svg?branch=master)](https://travis-ci.org/sz-software/joop)

> A very basic asynchronous class emulation in JavaScript.

### API

```javascript
const joop = require("@sz-software/joop")
const person = joop("path/to/person")

// Create a new instance of "person"
const instance1 = await person("John", "Doe")
// Use a static method to instantiate a instance
const instance2 = await person.fromString("John,Doe")
```

### Explanation

When `joop(dir)` is called, `dir` is shallowly scanned for `.js` files.
Each `.js` file corresponds to exactly one class method.
Private methods are prefixed with `_` (`_privateFn.js`)  and are not callable from outside.

If `dir` is an array, `path.join` is applied to it:

```javascript
const person1 = joop("path/to/person")
const person2 = joop(["path", "to", "person"])
// person1 === person2
```

Every class definition needs to have at least one method called `init`.
It is used to initialize the class as well for defining all public attributes.

### Example

```
module
├── myPublicFunction.js
├── _myPrivateFunction.js
└── init.js
```

Will define a "class" with the following methods:

- `public myPublicFunction`
- `private _myPrivateFunction`

`init.js` is always required and is **not** exported (it can't be called from the outside).

### init.js

The init method is used to initialize the class as well as for defining all public attributes.

> ⚠️ Public attributes cannot be later added.

init.js
```javascript
module.exports = function(...constructorArgs) {
    // Define a public attribute
    this.myPublicAttribute = "My Public attribute"
    // Define a private attribute
    this._myPrivateAttribute = "My private attribute"
}
```

The `init` method can be asynchronous:

```javascript
module.exports = async function(...constructorArgs) {
    await doSomething()
    await doSomethingElse()

    this._privateInstance = await createInstance()
}
```

### Static methods

Static methods can be added by adding a sub-folder called `static`:

```
module
├── init.js
└── static
    └── fromString.js
```

`this` will be set to the constructor object.
