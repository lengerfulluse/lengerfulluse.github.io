---
layout: post
title: Swift Lang Guidance Learning Notes
category: programming
tags: [language]
published: True

---
最近在学习edge ML。试着把Craft + OCR Reader model从云端移植到iOS上，结果发现很多现代model基本要不是object c要不是swift。而之前一直是在用Java。就不得不在此从语言开始学习swift。遂有了如下的swift笔记。

<!--more--> 

![swift-lang]({{site.cdnurl}}/assets/img/post/swift-lang.jpg)

# 1. Constants and Variables

## 1.1 Declaring Constants and Variables

- You declare constants with the `let` keyword and variables with `var` keyword.

```swift
let attempts = 10
var currentAttempt = 0
```

## 1.2 Type Annotations

```swift
let attempt: Int 
var currentAttempt: String
```

## 1.3 Printing Constants and Variables

```swift
print("The current value of friendlyWelcome is \(friendlyWelcome)")
```

## 1.4 Type Aliases

Type aliases define an alternative name for an existing type. You define type aliases with the `typealias` keyword

```swift
typealias AudioSample = UNIT16
var maxAmplitudeFound = AudioSample.min
```

## 1.5 Booleans

Swift has a basic Boolean type, called `Bool` 

## 1.6 Tuples

Tuples group multiple values into a single compound value. **The values of a tuple can be of any type and don’t have to be of the same type as each other**

```swift
let http404Error = (404, "Not Found")
let (statusCode, statusMessage) = http404Error
// ignore parts of the tuple with an underscore(_)
let (justTheStatusCode, _)  = http404Error
```

## 1.7 Optionals

Use optional in situations where a value maybe absent. An optional represents two possibilities: Either there is a value, and you can unwrap the optional to access the value, or there isn’t a value at all. 

```swift
// serverResponseCode contains an actual Int value of 404
var serverResponseCode: Int? = 404

// serverResponseCode now contains no value
serverResponseCode = nil
```

## 1.8 Optional Binding

You use optional binding to find out whether an optional contains a value, and if so, to make that value available as a temporary constant or variable. 

```swift
if let constantName = someOptional {
    statements
}
```

## 1.9 Error Handling

You use error handling to respond to error conditions your program may encounter during execution.

Behavior same as Java. 

```swift
func makeASandwich() throws {
    // ...
}

do {
    try makeASandwich()
    eatASandwich()
} catch SandwichError.outOfCleanDishes {
    washDishes()
} catch SandwichError.missingIngredients(let ingredients) {
    buyGroceries(ingredients)
}
```

## 1.10 Assertions and Preconditions

Assertions and preconditions are checks that happen at runtime. You can also use assert for debugging purpose.3

# 2. Basic Operators

## 2.1 Nil-Coalescing Operator

```swift
// unwraps an optional a if it contians a value, or returns a default value b if a is nil
a ?? b
```

## 2.2 Range Operators

### Closed Range Operator

`a...b` defines a range that runs from a to b, and includes the value a and b. 

`a..<b` defines a range that runs from a to b, but doesn’t include b. 

# 3. Strings & Characters

# 4. Collection Types

Swift provides three primary collection types, known as arrays, sets and dictionaries, for storing collections of values. 

- Arrays are ordered collection of values
- Sets are unordered collections of unique values
- Dictionaries are unordered collections of key-value associations

You can create an empty set of a certain type using initializer syntax:

```swift
var letters = Set<Character>()
// We can also create a Set with an Array Literal
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
```

## Dictionary

As with arrays, you can create an empty Dictionary of a certain type by using initializer syntax:

```swift
var namesOfIntegers = [Int: String]()
// nameOfIntegers is an empty [Int: String] dictionary
nameOfIntegers = [:] 
// namesOfIntegers is once again an empty dictonary of type [Int: String]
```

# 5. Control Flow

Swift provides a variety of control flow statements. 

## 5.1 For-In Loops

```swift
let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    print("hello, \(name)")
}
```

## 5.2 While

A while loop starts by evaluating a single condition. 

## 5.3 Repeat-While

The other variation of the while loop, known as repeat-while loop, performs a single pass through the loop block first, before considering the loop’s condition.

```swift
repeat {
    statements
} while condition
```

## 5.4 Conditional Statements

`if`, `switch`, `where`, a switch case can use a where clause to check for additional conditions. 

## 5.5 Control Transfer Statements

- continue
- break
- fallthrough
- return
- throw

## 5.6 Checking API Availability

The compiler uses availability information in the SDK to verify that all of the APIs used in your code are available. 

```swift
if #available (iOS 10, macOS 10.12, *) {
} else {
}
```

# 6. Functions

## 6.1 Defining and Calling Functions

```swift
func greet (person: String) -> String {
    let greeting = "Hello"
    return greeting
}
```

![Screen Shot 2022-07-14 at 3.27.05 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de08ecf7-82e9-4732-853a-2c6b9adfe306/Screen_Shot_2022-07-14_at_3.27.05_PM.png)

## 6.2 Functions with Multiple Return Values

You can use a tuple type as the return type for a function to return multiple values as part of one compound return value. 

## 6.3 Specifying Argument Labels

You write an argument label before the parameter name, separated by a space:

```swift
func someFunction(argumentLebel parameterName: Int) {
    // in the function body, parameterName refers to the argument value for that parameter.
}
```

# 7. Closures

Closures are self-contained blocks of functionality that can be passed around and used in your code. **Closures can capture and store references to any constants and variables from the context in which they are defined.** This is known as **closing over** those constants and variables. Swift handles all of the memory management of capturing for you.

- **Global and nested functions, as introduced in Functions, are actually special cases of closures. Closures take one of the three forms:**
    - Global functions are closures that have a name and do not capture any values.
    - Nested functions are closures that have a name and can capture values from their enclosing function
    - Closure expressions are unnamed closures written in a lightweight syntax that can capture values from their surrounding context.
- **Swift  closure expressions have a clean, clear style, with optimizations that encourage brief, clutter-free syntax in a common scenarios.**
    - Inferring parameter and return value types from context.
    - Implicit returns from single-expression closures.
    - Shorthand argument names
    - Trailing closure syntax.

## 7.1 Closure Expressions

Closure expressions are a way to write inline closures in a brief, focused syntax. 

## 7.2 The Sorted Method

![Screen Shot 2022-07-14 at 3.55.32 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bbe0d3f5-1b6e-4587-80b3-4b3c5927ee46/Screen_Shot_2022-07-14_at_3.55.32_PM.png)

## 7.3 Closure Expression Syntax

Closure expression syntax has the following general form:

```swift
{ (parameters) -> return type in
    statements
}

// samples. 
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})
```

## 7.4 Trailing Closures

A trailing closure is written after the function call’s parentheses, even though it is still an argument to the function.

```swift
func someFunctionThatTakesAClosure(closure: () -> Void) {
    // function body goes here
}
```

![Screen Shot 2022-07-14 at 4.05.53 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cb2e1890-bbb1-44a6-bcb5-cbc8cc79d852/Screen_Shot_2022-07-14_at_4.05.53_PM.png)

## 7.5 Capturing Values

A closure can capture constants and variables from the surrounding context in which it is defined. The closure can then refer to and modify the values of those constants and variables from within its body, **even if the original scope that defined the constants and variables no longer exists** 

…

# 8. Enumerations

```swift
enum CompassPoint {
    case north
    case south
    case east
    case west
}

// You use the case keyword to introduce new enumeration cases.

enum Planet {
    case mercury, venus, earth, neptune
}
```

**You indicate that an enumeration case is recursive by writing indirect before it, which tells the compiler to insert the necessary layer of indirection**

![Screen Shot 2022-07-14 at 4.18.00 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0603a2e-a8d0-4c6c-b207-a395306219c9/Screen_Shot_2022-07-14_at_4.18.00_PM.png)

# 9. Structures and Classes

## 9.1 Structures and classes

**Commons**

- Define properties to store values
- Define methods to provide functionality
- Define subscripts to provide access to their values using subscript syntax
- Define initialize to set up their initial state
- Be extended to expand their functionality beyond a default implementation
- Conform to protocols to provide standard functionality of a certain kind

**Classes have additional capabilities that structures don’t have:**

- Inheritance enables one class to inherit the characteristics of another.
- Type casting enables you to check and interrupt the type of a class instance at runtime.
- Deinitializers enable an instance of a class to free up any resources it has assigned.
- Reference counting allows more than one reference to a class instance.

### Structures and Enumerations are Value Types, Classes Are Reference Types

# 10. Subscripts

Classes, structures and enumerations can define subscripts, which are shortcuts for accessing the member elements of a collection, list, or sequence. You use subscripts to set and retrieve values by index without needing separate methods for setting and retrieval. 

**Swift’s Dictionary type implements a subscript to set and retrieve the values stored in a Dictionary instance.**

```swift
var numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
numberOfLegs["bird"] = 2
```

## 10.1 Subscript Options

Subscripts can take any number of input parameters, and these input parameters can be of any type. 

# 11. Inheritance

A class can inherit methods, properties and other characteristics from another class. 

## 11.1 Subclassing

```swift
class SomeSubclass: SomeSuperclass {
    // subclass definition goes there
}
```

## 11.2 Overriding

A subclass can provide its own custom implementation of an instance method, type method, instance property, or subscript. 

[]()

![Screen Shot 2022-07-15 at 11.27.16 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2284b79f-2d13-45d9-94d2-8e5eebf71c8d/Screen_Shot_2022-07-15_at_11.27.16_AM.png)

## 11.3 Preventing Overrides

You can prevent a method, property or subscript from being overridden by marking it as `final`

# 12. Initialization

This process involves setting an initial value for each stored property on that instance and performing any other setup or initialization that is required before the new instance is ready for use.

Instances of class types can also implement a deinitializer, which performs any custom cleanup just before an instance of that class is deallocated. 

## 12.1 Initializers

```swift
init() {
    // perform some initialization here.
}
```

## 12.2 Default Initializers

Swift provides a default initializer for any structure or class that provides default values for all of its properties and does not provide at least one initializer itself. 

![Screen Shot 2022-07-15 at 12.17.28 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cf4f66b1-b0e5-470a-ab07-ce52b7e517d5/Screen_Shot_2022-07-15_at_12.17.28_PM.png)

# 13. Extensions

Extensions add new functionality to an existing class, structure, enumeration, or protocol type. This includes the ability to extend types for which you do not have access to the original source code.  

**Extensions in Swift can:**

- Add computed instance properties and computed type properties.
- Define instance methods and type methods
- Provide new initializers
- Define subscripts
- Define and use new nested types
- Make an existing type conform to a protocol

## 13.1 Extension Syntax

```swift
extension SomeType {
    // new functionality to add to SomeType goes here
}

extension SomeType: SomeProtocol, AnotherProtocol {
    // implementation of protocol requirements goes here
}
```

## 13.2 Computed Properties

Extensions can add computed instance properties and computed type properties to existing types. 

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double {return self }
    var cm: Double { return self / 100.0 }
    ...
}

let onekm = 1000.m
```

## 13.3 Initializers

Extensions can add new initializers to existing types. This enables you to extend other types to accept your own custom types as initializer parameters.

## 13.4 Methods

Extensions can add new instance methods and type methods to existing types. **The following example adds a new instance method called `repetitions` to the Int type: 

```swift
extension Int {
    func repetitions(task: () -> Void) {
    for _ in 0..<self {
    task()
        }
    }
}

// Print Hello! Hello! Hello!
3.repetitions {
    print("Hello!")
}
```

# 14. Protocols

A protocol defines a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality. The protocol can then be adopted by a class, structure, or enumeration to provide an actual implementation of those requirements.

```swift
// Protocol Syntax
protocol SomeProtocol {
}

struct SomeStructures: FirstProtocol, AnotherProtocol {
}

class SomeClass: SomeSuperClass, FirstProtocol, AnotherProtocol {
}
```

![Screen Shot 2022-07-15 at 1.04.23 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42879dc3-72e3-471f-988b-7297b57d3627/Screen_Shot_2022-07-15_at_1.04.23_PM.png)

# 15. Generics

Generic code enables you to write flexible, reusable functions and types that can work with any type, subject to requirements that you define.

# 16. Automatic Reference Counting

Swift uses Automatic Reference Counting(ARC) to track and manage your app’s memory usage.

# 17. Memory Safety

# 18. Access Control

# 19. Advanced Operators





So long, and thanks for all the fish.   
###参考  
[1] [Swift Lang Official Website](https://www.swift.org/getting-started/).   
