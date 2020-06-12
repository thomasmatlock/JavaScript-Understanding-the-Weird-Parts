# Notes

-Section 1

    -   in CS, there is a tendency to use big words that sound more complicated than the things they describe
    -   frameworks are just more javascript file sets, written by other devs

-Section 2

    - Conceptual asides include
        - syntax parsers
            - definition: a program that reads your code and determines what it does and if its grammar is valid. your code isn't magic, someone else wrote a program to translate it for the computer
            - the translator programs that translate your JS, Python, etc, to computer code are called compilers
        - lexical environments
            - definition: WHERE something sits physically in the code you write
            - 'lexical' means having to do with words or grammar. a lexical environment exists in programming languages in which WHERE you write something is important
            - ie a variable sits lexically/physically inside a function scope
        - execution context
            - a wrapper to help manage the code that is running
            - there are lots of lexical environments. which one is currently running is managed via execution contexts. It can and usually does contain things beyond what you've written in your code
    - these are fundamental concepts to understanding JS under the hood
    - 7, name value pairs
        - names may be defined more than once, but only can have 1 value in any given context
        - that value may be more name-value pairs
        - object definition: simplest definition, an object is just a collection of name-value pairs
        - every time the execution context runs, it creates:
            - a global object called "this"
            - type 'this' into browser dev console to access it
            - the this object is the entire global object, a wrapper for your code
            - 'this' is the browser window, its even called 'window'
            - a global object means its available to all code running inside that context
            - 'this' refers to the window object, the global parent object
            - global also means its not inside any function = if not in a function, its global
            - everything global, gets attached to the global object
            - browser JS, the global object is the 'window' object, whereas in Node, its just the module itself
            - also, the "outer environment' comes into play all the time, but is null at the global level
    - 10, The Execution Context, Creation and Hoisting
        - you can call function before declarations
        - you cannot use variables before declaration
        - if you try using a variable before declaration, it will appear as undefined
            - however try using a variable thats never declared, it will cause an error.
                - note, this course must be old, because both cause uncaughtReference errors, so we'll roll with it for now
        - Execution Context is created in 2 phases
            - CREATION PHASE, setup the memory space (complete functions, and undefined variables)
                - creates Global object/this, and outer environment
                - sets aside memory space for variables and functions === "HOISTING"
                    - HOISTING is not moving variables and functions to the top of the module to make them available, but instead
                    - hoisting is: before your code begins to be executed, line by line, the JS engine has already set aside memory space for them. so they already exist.
                    - when the code executes line by line, it can access them
                    - functions are placed in their entirety into memory
                    - however, with variables, its a little different
                    - Execution Context is created (CREATION PHASE)
                       - created:
                        - global object
                        - 'this'
                         - Outer Environment
                    "Hoisting" === Variables Setup (set to 'undefined') and Functions setup
                        - undefined is a defined value, not the same as "not been defined"
                        - any undeclared variables during hoisting are going to be uncaught references
                        - "Undefined" === means I never set the value
                        - variables all receive a value of undefined during the creation phase of the execution context, which happens before the execution context moves into execution phase
            - EXECUTION PHASE, phase 2, running your code line by line
                - this is where assignments/declarations are set, ie, const a = 'hello world';
                - in the creation phase, the JS engine sets up memory space for variables and functions, but doesn't know what the variable contains until execution (line by line phase) where a value is assigned to the variable
                - until execution, JS engine assigns a placeholder, called 'undefined'
                - it would also be undefined if we just did: const a; initialized but never declared
                - all variables in JS are initially set to undefined
                - its bad to rely on hoisting in any way, its better to always call functions and use variables after declaration
    2.13 Conceptual Aside, single threaded synchronous execution
        - single threaded - one command at a time being executed. simple
        - synchronous = one line at a time, in order. simple
    2.14, function invocation and the execution stack
        - Invocation = running a function. Simple. In JS, this means using parens ()
        - put the name of the function, then parens (). you invoked the function
        - quick explainer:
            - function a()
            - function b() {
                a()
            }
            b()
            - heres what happens. global execution context starts, with creation phase, sets aside memory for the functions
            - when b() or a function is called, it creates a new execution context, (create and execute
            - here, it would create a new execution context for b(), then inside B when it hits the invoke a() it will create another execution context for that, adding it to the stack.
            - then as each execution context completes, its withdraws from it, and removes it from the execution stack.
            - you could also have 2 functions, a/b, call a below everything, and even though b is elsewhere in the code, it doesn't matter, it's already in the global execution context and ready to run
            - basically every time you invoke any function, its added to the execution stack, and only once it completes, it's "popped" off the stack and continues either to the next line of whatever parent context it started in, whether its the global, or another function that invoked, then that function resumes
    2.15, functions, context, and variable environments (big word alert)
        - variable environment === where the variable lives (global, local inside a function, etc)
        - variable environment === basically just scope, global or local to whatever execution context it resides in
    2.16, the scope chain
        - variables inside functions that are not declared inside functions, will look to their outer environment for that variable. simple.
        - also variables declared within its own execution context/scope, will not persist to their outside environment unless that function returns it to the outer environment
        - also it doesn't limit itself to its nearest parent outer environment, it will keep moving up all the way to the global environment to discover the variable. this is the scope chain, looking through greater and greater scopes for a variable value if its defined within its own execution context
        - really easy way to figure out the scope chain:
            - just look at it lexically, what code sits inside of what. pretty easy
    2.17, scope, es6, and let
        - scope === where a variable is available in your code, and also, whether its truly the same variable, or a new copy
        - lots of people learn by example-based  learning, project based. But also learning whats under the hood, whats really going on, makes you a better coder.
    2.18, async callback
        - async === means more than one at a time. simple.
        - JS doesn't run asynchronously, it runs sync stuff, but due to event loop/thread pool, it can have stuff run in the background
        - while you have execution contexts bubbling up, from global to the next, etc, you also have:
        - the event queue, which is like the ticker/timer moving everything along
        - the event queue is like a secondary execution context stack. This
        - the event queue gets looked at, when the execution stack empties
        - this means that clicks, http events, etc get handled, if nothing else is going on
        - JS looks at event queue, and if events have a function tied to them, like click to run a function, it will handle that function on execution stack, and pop the event off the event queue
        - JS wont handle any further event queue events, until the execution stack is empty again, which it does by running whatever function it does, line by line
        - in this way, it seems async, but technically its just shuttling synchronously between execution stack and event queue
        - even if you click while, for example, a function is running, JS will add that event to the event queue, but until the function is done and off the execution stack, it wont add it to the execution stack from the event queue, until execution stack is empty

-Section 3

    - 3.19, conceptual aside, types and javascript
        - dynamic typing, you dont tell the engine what type of data a variable holds, it figures it out while youre program is running
        - vars can hold different types of values because its all figured out during execution
        - in other languages, they use something called static typing, which requires you to tell the engine ahead of time what var type something is, ie: bool isNew = 'hello' (error because bools arent strings)
        - JS, on the other hand, you can swap data types on the fly, ie you save a string value and overwrite it with a integer value, then again with a boolean value
    - 3.20, primitive types (6 types)
        - primitive type === a type of data that represents a certain value, thats not an object, which is a collection of name/value pairs. primitives are just single values
        - 6 types:
            - undefined == lack of existence. JS sets this to variables initiallly in the creation phase, only re-assigns them during execution phase with their intended values. never set vars to undefined
            - null === lack of existence. you can set vars to null, if you want to set something to "not exist"
            - booleans === true or false.
            - number === floating point number. In JS, numbers ALWAYS have decimals attached to them
            - string === sequence of characters, numbers, symbosl
            - symbol, used in ES6.
    3.21, conceptual aside, operators
        - operators === special function that is syntactically (written) differently
        - generally, operators take 2 params and return one result
    3.22, operator precedence and associativity
        - operator precedence === simple, means which operator function gets called first (HIGHER precedence wins)
        - associativity === what order operator functions get called in: left to right, or right to left (when functions have the same precedence)
        - the pdf for this lesson contains the priority ranking from highest to lowest
        - one thing to remember is associativity, which means left to right or right to left. Its a column on that pdf. for vars its usually right to left, but parens, its left to right, for example. Using the equals sign is an assignment operator, which has associativity of right to left
        - REMEMBER, check precedence! (for which operators runs first), and if they are same priority, then check associativity (left to right, or right to left)
    3.24, conceptual aside, coercion
        - coercion === converting one value type to another, simple. happens often in JS because its dynamic (not static where var types are declared, in JS dynamic, var types can and do change often)
        - if you write: var a = 1 + '2'; it will coerce the number to a string, it returns a 12, as a string. It tries to figure out what the number would be if it were a string
    3.25, comparison operators
        - console.log(3 < 2 < 1) is equal to true. Why? comparison operators move left to right, so the left 'less than' op runs, which is  3< 2 = false. Now it becomes (false < 1). False is coerced to 0
        - Number(undefined) = error, returns NaN.
        - Number(null) = returns 0. similar to false coercing to 0, so does null
        - one thing to remember with comparison operators is that they coerce , but you need to use === to prevent any confusion, its strict comparison. a simple double ==  tries to coerce if possible, which causes problems. use === when possible
        - use triple === strict comparison 99% of the time
    3.27, existence and booleans
        - anything you use Boolean(undefined/null/"") to convert to a boolean converts to false, anything that assumes lack of existence will convert to false
        - also anything you put in an if statement, it will try to coerce to a boolean, if true, else false
        - this is useful in using coercion to our advantage to check if something has a value, because it fails if it contains null/undefined/"". The only caveat to this is if something might have 0 as a value. If theres any chance its zero, dont do this. Otherwise use if statements freely to check if something has a value
        - one way to get around that is: if (a || a === 0) strict comparison will run first and if its indeed 0, it becomes true. aka (false || true) which evals to true
    3.28, default values
        - so if you run a function that accepts an argument, but pass nothing to it as an argument, JS doesnt care, it simply gives it the value of undefined
        - however if you concatenate a console log combining a string and the argument, it will coerce the argument into a string with value of undefined
        - however, if you want a default value for a parameter, you can:
            name = name || '<your name here>' // this checks for a name value, if none passed, it evals to false, but the 2nd half of that statement will eval to true and use the '<your name here>' string
        - this is because an OR statement returns true if either side can be coerced to true
    3.29, framework aside, default values
        - say your import multiple js scripts into your html file, it pulls them all into, chunks them together, and they are run as if they are 1 file
        - caveat to this, if any vars or functions share the same name, the first imported ones will be overwritten with the values of the 2nd ones
        - one way to avoid this:
            - window.variableName = window.variableName || "variableName2"
            - this is way it checks if value exists, if yes, it gives it the default name on the 2nd half of the OR statement

-Section 4

    4.30, objects and the dot
        - objects and functions are very related in JS
        - in many ways the same subject
        - objects, as always are name value pairs
        - objects contain values, including:
            - properties
                -  properties include primitives , strings, numbers, booleans etc
                - properties also contain objects as properties, which then contain more primitives or more objects, whatever
            - methods (functions)
                - functions that sit on an object are called methods, whereas functions are freefloatering, unattached to objects
            - the important thing to rember is that an object sits in memory, and also stored is that objects references to other things in memory, like its properties or methods
            - basically sampleObject["sampleProperty"] === samepleObject.sampleProperty
    4.31, objects and object literals
    4.32, framework aside
        - namespace === container for variables and functions, typically to keep variables and functions with the same name separate
    4.33, JSON = JavaScript Object Notation (review last 3 mins of this)
        - HTTP used to use XML format to send/receive data. XML looks like HTML, with values enclosed in tags, ie: <firstName>Mary</firstName>
        - XML has lots of redundant characters, ie closing tags bump packet size by 50-100%, so JSON was created
        - JSON is like a subset of JS object literal syntax. Anything that is JSON is also valid JS, but not all JS object syntax is valid JSON.

-Section 5
-Section 6
-Section 7
