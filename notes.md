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

-Section 4
-Section 5
-Section 6
-Section 7
