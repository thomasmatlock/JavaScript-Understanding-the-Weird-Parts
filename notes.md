This is notes

-Section 1

    -   in CS, there is a tendency to use big words that sound more complicated than the things they describe
    -   frameworks are just more javascript file sets, written by other devs

-Section 2

    - Conceptual asides include
        - syntax parsers
            - definition: a program that reads your code and determines what it does and if its grammar is valid. your code isnt magic, someone else wrote a program to translate it for the computer
            - the translator programs that translate your JS, Python, etc, to computer code are called compilers
        - lexical environments
            - definition: WHERE something sits physically in the code you write
            - 'lexical' means having to do with words or grammar. a lexical environment exists in programming languages in which WHERE you write something is important
            - ie a variable sits lexically/physically inside a function scope
        - execution context
            - a wrapper to help manage the code that is running
            - there are lots of lexical environments. which one is currently running is managed via execution contexts. It can and usually does contain things beyond what youve written in your code
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
            - a global object means its availebl to all code running inside that context
            - 'this' refers to the window object, the global parent object
            - global also means its not inside any function = if not in a function, its global

-Section 3
-Section 4
-Section 5
-Section 6
-Section 7
