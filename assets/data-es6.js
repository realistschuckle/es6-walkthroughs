// exports browsers and tests

exports.name = 'ES6';
exports.target_file = 'es6/index.html';
exports.skeleton_file = 'es6/skeleton.html';

exports.tests = [
{
  name: 'proper tail calls (tail call optimisation)',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tail-position-calls',
  exec: function() {/*
    "use strict";
    return (function f(n){
      if (n <= 0) {
        return  "foo";
      }
      return f(n - 1);
    }(1e6)) === "foo";
  */},
  res: {
    tr: false
 }
},
{
  name: 'arrow functions',
  link: 'http://wiki.ecmascript.org/doku.php?id=harmony:arrow_function_syntax',
  exec: function() {
    try {
      eval('var a = () => 5;');
    } catch (e) {
      return false;
    }
    return true;
  },
  res: {
    tr: true
 }
},
{
  name: 'const',
  link: 'http://wiki.ecmascript.org/doku.php?id=harmony:const',
  exec: function () {
    try {
      return eval('(function () { const foobarbaz = 12; return typeof foobarbaz === "number"; }())');
    } catch (e) {
      return false;
    }
  },
  res: {
    tr: true
 }
},
{
  name: 'let',
  link: 'http://wiki.ecmascript.org/doku.php?id=harmony:let',
  exec: [
    {
      type: 'application/javascript;version=1.8',
      script: function () {
        test((function () {
          try {
            return eval('(function () { let foobarbaz2 = 123; return foobarbaz2 == 123; }())');
          } catch (e) {
            return false;
          }
        }()));
        global.__let_script_executed = true;
      }
    },
    {
      script: function () {
        if (!global.__let_script_executed) {
          test((function () {
            try {
              return eval('(function () { "use strict"; __let_script_executed = true; let foobarbaz2 = 123; return foobarbaz2 == 123; }())');
            } catch (e) {
              return false;
            }
          }()));
        }
      }
    }
  ],
  res: {
    tr: true
 }
},
{
  name: 'default function parameters',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-functiondeclarationinstantiation',
  exec: function () {/*
    var passed = (function (a = 1, b = 2) { return a === 3 && b === 2; }(3));

    // explicit undefined will defer to the default
    passed    &= (function (a = 1, b = 2) { return a === 1 && b === 3; }(undefined, 3));

    // defaults can refer to previous parameters
    passed    &= (function (a, b = a) { return b === 5; }(5));

    return passed;
  */},
  res: {
    tr: true
   }
},
{
  name: 'rest parameters',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-function-definitions',
  exec: function() {/*
    return (function (...args) { return typeof args !== "undefined"; }())
  */},
  res: {
    tr: true
 }
},
{
  name: 'spread call (...) operator',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-argument-lists-runtime-semantics-argumentlistevaluation',
  exec: function () {/*
    return Math.max(...[1, 2, 3]) === 3
  */},
  res: {
    tr: true
 }
},
{
  name: 'spread array (...) operator',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array-literal',
  exec: function() {/*
    return [...[1, 2, 3]][2] === 3;
  */},
  res: {
    tr: true
 }
},
{
  name: 'string spreading',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array-literal',
  exec: function() {/*
    return ["a", ..."bcd", "e"][3] === "d" && Math.max(..."1234") === 4;
  */},
  res: {
    tr: true
  }
},
{
  name: 'class',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-class-definitions',
  exec: function () {/*
    class C extends Array {
      constructor() { this.b = true; }
      a(){}
      static d(){}
    }
    return C.d && new C().a && new C().b && new C() instanceof Array;
  */},
  res: {
    tr: true
 }
},
{
  name: 'super',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-super-keyword',
  exec: function () {/*
    var passed = true;
    var B = class extends class {
      constructor(a) { return this.id + a; }
      foo(a)         { return a + this.id; }
    } {
      constructor(a) {
        this.id = 'AB';
        // "super" in the constructor calls
        // the superclass's constructor on "this".
        passed &= super(a)     === 'ABCD';
        // "super" can be also used to call
        // superclass methods on "this".
        passed &= super.foo(a) === 'CDAB';
      }
      foo(a) {
        passed &= super.foo(a) === 'YZEF';
      }
    }
    var b = new B("CD");
    // "super" is bound statically, even though "this" isn't
    var obj = { foo: b.foo, id:"EF" };
    obj.foo("YZ");
    return passed;
  */},
  res: {
    tr: true
 }
},
{
  name: 'computed properties',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-initialiser',
  exec: function() {/*
    var x = 'y';
    return ({ [x]: 1 }).y === 1;
  */},
  res: {
    tr: true
 }
},
{
  name: 'shorthand properties',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-initialiser',
  exec: function () {/*
    var a = 7, b = 8, c = {a,b};
    return c.a === 7 && c.b === 8;
  */},
  res: {
    tr: true
 }
},
{
  name: 'shorthand methods',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-initialiser',
  exec: function() {/*
    return ({ y() { return 2; } }).y() === 2;
  */},
  res: {
    tr: true
 }
},
{
  name: '__proto__ in object literals',
  annex_b: true,
  note_id: 'proto-in-object-literals',
  note_html: 'Note that this is distinct from the existence or functionality of <code>Object.prototype.__proto__</code>.',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-__proto__-property-names-in-object-initializers',
  exec: function() {
    var passed = { __proto__ : [] } instanceof Array
      && !({ __proto__ : null } instanceof Object);

    // If computed properties are supported, the following
    // check must also be passed.
    var a = "__proto__";
    try {
      eval("passed &= !({ [a] : [] } instanceof Array)");
    }
    catch(e) {}
    return passed;
  },
  res: {
    tr: true
  }
},
{
  name: 'modules',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-modules',
  exec: function () {/*
    export var foo = 1;
    return true;
  */},
  res: {
    tr: true
 }
},
{
  name: 'for..of loops',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-for-in-and-for-of-statements',
  exec: function () {/*
    var arr = [5];
    for (var item of arr)
      return item === 5;
  */},
  res: {
    tr: true
 }
},
{
  name: 'generators (yield)',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generator-function-definitions',
  exec: function () {/*
    var generator = (function* () {
      yield* (function* () {
        yield 5; yield 6;
      }());
    }());

    var item = generator.next();
    var passed = item.value === 5 && item.done === false;
    item = generator.next();
    passed    &= item.value === 6 && item.done === false;
    item = generator.next();
    passed    &= item.value === undefined && item.done === true;
    return passed;
  */},
  res: {
    tr: true
 }
},
{
  name: 'octal literals',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-numeric-literals',
  exec: function () {/*
    return 0o10 === 8 && 0O10 === 8;
  */},
  res: {
    tr: true
  }
},
{
  name: 'binary literals',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-numeric-literals',
  exec: function () {/*
    return 0b10 === 2 && 0B10 === 2;
  */},
  res: {
    tr: true
  }
},
{
  name: 'template strings',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literals',
  exec: function () {/*
    var a = "ba", b = "QUX";
    return `foo bar
${a + "z"} ${b.toLowerCase()}` === "foo bar\nbaz qux";
  */},
  res: {
    tr: true
 }
},
{
  name: 'tagged template strings',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literals',
  exec: function () {/*
    var called = false;
    function fn(parts, a, b) {
      called = true;
      return parts instanceof Array &&
        parts[0]     === "foo"      &&
        parts[1]     === "bar\n"    &&
        parts.raw[0] === "foo"      &&
        parts.raw[1] === "bar\\n"   &&
        a === 123                   &&
        b === 456;
    }
    return fn `foo${123}bar\n${456}` && called;
  */},
  res: {
    tr: true
 }
},
{
  name: 'RegExp "y" flag',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-get-regexp.prototype.sticky',
  exec: function () {/*
    var re = new RegExp('\\w');
    var re2 = new RegExp('\\w', 'y');
    re.exec('xy');
    re2.exec('xy');
    return (re.exec('xy')[0] === 'x' && re2.exec('xy')[0] === 'y');
  */},
  res: {
    tr: false
 }
},
{
  name: 'RegExp "u" flag',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-get-regexp.prototype.unicode',
  exec: function() {/*
    return "𠮷".match(/./u)[0].length === 2;
  */},
  res: {
    tr: true
 }
},
{
  name: 'typed arrays',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-typedarray-objects',
  exec: function () {/*
    var buffer = new ArrayBuffer(64);
    var passed = true;
    var view;

    // Check that each int type overflows as expected.
    view = new Int8Array(buffer);         view[0] = 0x80;
    passed &= view[0] === -0x80;
    view = new Uint8Array(buffer);        view[0] = 0x100;
    passed &= view[0] === 0;
    view = new Uint8ClampedArray(buffer); view[0] = 0x100;
    passed &= view[0] === 0xFF;
    view = new Int16Array(buffer);        view[0] = 0x8000;
    passed &= view[0] === -0x8000;
    view = new Uint16Array(buffer);       view[0] = 0x10000;
    passed &= view[0] === 0;
    view = new Int32Array(buffer);        view[0] = 0x80000000;
    passed &= view[0] === -0x80000000;
    view = new Uint32Array(buffer);       view[0] = 0x100000000;
    passed &= view[0] === 0;
    // Check that each float type loses precision as expected.
    view = new Float32Array(buffer);      view[0] = 0.1;
    passed &= view[0] === 0.10000000149011612;
    view = new Float64Array(buffer);      view[0] = 0.1;
    passed &= view[0] === 0.1;
    return passed;
  */},
  res: {
    tr: false
  }
},
{
  name: 'typed arrays (DataView)',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-dataview-objects',
  exec: function () {/*
    var buffer = new ArrayBuffer(64);
    var view = new DataView(buffer);
    var passed = true;

    view.setInt8 (0, 0x80);        passed &= view.getInt8(0)   === -0x80;
    view.setUint8(0, 0x100);       passed &= view.getUint8(0)  === 0;
    view.setInt16(0, 0x8000);      passed &= view.getInt16(0)  === -0x8000;
    view.setUint16(0,0x10000);     passed &= view.getUint16(0) === 0;
    view.setInt32(0, 0x80000000);  passed &= view.getInt32(0)  === -0x80000000;
    view.setUint32(0,0x100000000); passed &= view.getUint32(0) === 0;
    view.setFloat32(0, 0.1);       passed &= view.getFloat32(0)=== 0.10000000149011612;
    view.setFloat64(0, 0.1);       passed &= view.getFloat64(0)=== 0.1;
    return passed;
  */},
  res: {
    tr: false
 }
},
{
  name: 'Map',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-map-objects',
  exec: function () {/*
    var key = {};
    var map = new Map();

    map.set(key, 123);

    return map.has(key) && map.get(key) === 123 &&
           map.size === 1;
  */},
  res: {
    tr: true
  }
},
{
  name: 'Set',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-set-objects',
  exec: function () {/*
    var obj = {};
    var set = new Set();

    set.add(123);
    set.add(123);

    return set.has(123) && set.size === 1;
  */},
  res: {
    tr: true
  }
},
{
  name: 'WeakMap',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-weakmap-objects',
  exec: function () {/*
    var key1 = {};
    var weakmap = new WeakMap();

    weakmap.set(key1, 123);

    return weakmap.has(key1) && weakmap.get(key1) === 123;
  */},
  res: {
    tr: false
  }
},
{
  name: 'WeakSet',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-weakset-objects',
  exec: function () {/*
    var obj1 = {}, obj2 = {};
    var weakset = new WeakSet();

    weakset.add(obj1);
    weakset.add(obj1);

    return weakset.has(obj1);
  */},
  res: {
    tr: false
  }
},
{
  name: 'Proxy',
  link: 'http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies',
  exec: function () {
    try {
      return typeof Proxy !== "undefined" &&
           new Proxy({}, { get: function () { return 5; } }).foo === 5;
    }
    catch(err) { }
    return false;
  },
  res: {
    tr: false
 }
},
{
  name: 'Reflect',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-reflection',
  exec: function () {
    var i, names =
      ["apply","construct","defineProperty","deleteProperty","getOwnPropertyDescriptor",
      "getPrototypeOf","has","isExtensible","set","setPrototypeOf"];

    if (typeof Reflect !== "object") {
      return false;
    }
    for (i = 0; i < names.length; i++) {
      if (!(names[i] in Reflect)) {
        return false;
      }
    }
    return true;
  },
  res: {
    tr: false
 }
},
{
  name: 'Reflect.Loader',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-loader-objects',
  exec: function () {
    var i, names =
      ["define", "delete", "entries", "get", "global", "has", "import",
      "keys", "load", "module", "newModule", "realm", "set", "values",
      "normalize", "locate", "fetch", "translate", "instantiate"];

    if (typeof Reflect !== "object" || typeof Reflect.Loader !== "function"
        || typeof Reflect.Loader.prototype !== "object") {
      return false;
    }
    for (i = 0; i < names.length; i++) {
      if (!(names[i] in Reflect.Loader.prototype)) {
        return false;
      }
    }
    return true;
  },
  res: {
    tr: false
 }
},
{
  name: 'block-level function declaration',
  note_id: 'block-level-function',
  note_html: 'Note that prior to ES6, it was <a href="http://wiki.ecmascript.org/doku.php?id=conventions:no_non_standard_strict_decls">recommended</a> that ES5 implementations forbid block-level declarations in strict mode.',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-functiondeclarationinstantiation',
  exec: function () {/*
    'use strict';
    {
      function f(){}
    }
    return typeof f === "undefined";
  */},
  res: {
    tr: true
 }
},
{
  name: 'hoisted block-level function declaration',
  note_id: 'hoisted-block-level-function',
  note_html: 'Note that the specified semantics is identical to that used by Internet Explorer prior to IE 11.',
  annex_b: true,
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-block-level-function-declarations-web-legacy-compatibility-semantics',
  exec: function () {/*
    // Note: only available outside of strict mode.
    var passed = f() === 2 && g() === 4;
    if (true) { function f(){ return 1; } } else { function f(){ return 2; } }
    if (false){ function g(){ return 3; } } else { function g(){ return 4; } }
    return passed;
  */},
  res: {
    tr: false
 }
},
{
  name: 'destructuring',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-destructuring-assignment',
  exec: function () {/*
    // Array destructuring
    var [a, , [b], g] = [5, null, [6]];
    // Object destructuring
    var {c, x:d, h} = {c:7, x:8};
    // Combined destructuring
    var [e, {x:f, i}] = [9, {x:10}];

    return a === 5 && b === 6 && c === 7 &&
           d === 8 && e === 9 && f === 10 &&
           g === undefined && h === undefined && i === undefined;
  */},
  res: {
    tr: true
  }
},
{
  name: 'destructuring parameters',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-destructuring-assignment',
  exec: function () {/*
    return (function({a, x:b}, [c, d]) {
      return a === 1 && b === 2 && c === 3 && d === 4;
    }({a:1, x:2},[3, 4]));
  */},
  res: {
    tr: true
 }
},
{
  name: 'destructuring defaults',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-destructuring-assignment',
  exec: function () {/*
    var {a = 1, b = 1, c = 3} = {b:2, c:undefined};
    return a === 1 && b === 2 && c === 3;
  */},
  res: {
    tr: true
 }
},
{
  name: 'destructuring rest',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-destructuring-assignment',
  exec: function () {/*
    var [a, ...b] = [3, 4, 5];
    var [c, ...d] = [6];
    return a === 3 && b instanceof Array && (b + "") === "4,5" &&
           c === 6 && d instanceof Array && d.length === 0;
  */},
  res: {
    tr: true
 }
},
{
  name: 'Promise',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects',
  exec: function () {
    return typeof Promise !== 'undefined' &&
           typeof Promise.all === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Object.assign',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign',
  exec: function () {
    return typeof Object.assign === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Object.is',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.is',
  exec: function () {
    return typeof Object.is === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Object.getOwnPropertySymbols',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.getownpropertysymbols',
  exec: function () {
    return typeof Object.getOwnPropertySymbols === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Object.setPrototypeOf',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.setprototypeof',
  exec: function () {
    return typeof Object.setPrototypeOf === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Object.prototype.__proto__',
  annex_b: true,
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.__proto__',
  exec: function () {
    var a = {},
        desc = Object.getOwnPropertyDescriptor
            && Object.getOwnPropertyDescriptor(Object.prototype,"__proto__");
    return !!(desc
        && "get" in desc
        && "set" in desc
        && desc.configurable
        && !desc.enumerable
        && Object.create(a).__proto__ === a);
  },
  res: {
    tr: false
 }
},
{
  name: 'function "name" property',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-setfunctionname',
  exec: function () {
    return (function foo(){}).name == 'foo';
  },
  res: {
    tr: false
 }
},
{
  name: 'Function.prototype.toMethod',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-function.prototype.tomethod',
  exec: function () {
    return typeof Function.prototype.toMethod === "function";
  },
  res: {
    tr: false
 }
},
{
  name: 'String.raw',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.raw',
  exec: function () {
    return typeof String.raw === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'String.fromCodePoint',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.fromcodepoint',
  exec: function () {
    return typeof String.fromCodePoint === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'String.prototype.codePointAt',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.codepointat',
  exec: function () {
    return typeof String.prototype.codePointAt === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'String.prototype.normalize',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.normalize',
  exec: function () {
    return typeof String.prototype.normalize === "function"
      && "c\u0327\u0301".normalize("NFC") === "\u1e09"
      && "\u1e09".normalize("NFD") === "c\u0327\u0301";
  },
  res: {
    tr: false
 }
},
{
  name: 'String.prototype.repeat',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.repeat',
  exec: function () {
    return typeof String.prototype.repeat === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'String.prototype.startsWith',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.startswith',
  exec: function () {
    return typeof String.prototype.startsWith === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'String.prototype.endsWith',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.endswith',
  exec: function () {
    return typeof String.prototype.endsWith === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'String.prototype.contains',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.contains',
  exec: function () {
    return typeof String.prototype.contains === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'String.prototype HTML methods',
  annex_b: true,
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.anchor',
  exec: function () {
    var i, names = ["anchor", "big", "bold", "fixed", "fontcolor", "fontsize",
      "italics", "link", "small", "strike", "sub", "sup"];
    for (i = 0; i < names.length; i++) {
      if (typeof String.prototype[names[i]] !== 'function') {
        return false;
      }
    }
    return true;
  },
  res: {
    tr: true
 }
},
{
  name: 'Unicode code point escapes',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals',
  exec: function () {/*
    return '\u{1d306}' == '\ud834\udf06';
  */},
  res: {
    tr: true
 }
},
{
  name: 'Symbol',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-symbol-constructor',
  exec: function() {
    try {
      var object = {};
      var symbol = Symbol();
      var value = Math.random();
      object[symbol] = value;
      return typeof symbol === "symbol" &&
             object[symbol] === value &&
             Object.keys(object).length === 0 &&
             Object.getOwnPropertyNames(object).length === 0;
    }
    catch(e) {
      return false;
    }
  },
  res: {
    tr: false
 }
},
{
  name: 'Global symbol registry',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-symbol.for',
  exec: function() {/*
    var symbol = Symbol.for('foo');
    return Symbol.for('foo') === symbol &&
           Symbol.keyFor(symbol) === 'foo';
  */},
  res: {
    tr: false
 }
},
{
  name: 'Symbol.hasInstance',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-well-known-symbols',
  exec: function() {/*
    var passed = false;
    var obj = { foo: true };
    var C = function(){};
    C[Symbol.hasInstance] = function(inst) { passed = inst.foo; return false; };
    obj instanceof C;
    return passed;
  */},
  res: {
    tr: false
 }
},
{
  name: 'Symbol.isConcatSpreadable',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-well-known-symbols',
  exec: function() {/*
    var a = [], b = [];
    b[Symbol.isConcatSpreadable] = false;
    a = a.concat(b);
    return a[0] === b;
  */},
  res: {
    tr: false
 }
},
{
  name: 'Symbol.isRegExp',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-well-known-symbols',
  exec: function() {/*
    return RegExp.prototype[Symbol.isRegExp] === true;
  */},
  res: {
    tr: false
 }
},
{
  name: 'Symbol.iterator',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-well-known-symbols',
  exec: function() {/*
    var a = 0, b = {};
    b[Symbol.iterator] = function() {
      return {
        next: function() {
          return {
            done: a === 1,
            value: a++
          };
        }
      };
    };
    var c;
    for (c of b) {}
    return c === 0;
  */},
  res: {
    tr: false
 }
},
{
  name: 'Symbol.toPrimitive',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-well-known-symbols',
  exec: function() {/*
    var a = {}, b = {}, c = {};
    var passed = 0;
    a[Symbol.toPrimitive] = function(hint) { passed += hint === "number";  return 0; };
    b[Symbol.toPrimitive] = function(hint) { passed += hint === "string";  return 0; };
    c[Symbol.toPrimitive] = function(hint) { passed += hint === "default"; return 0; };

    a >= 0;
    b in {};
    c == 0;
    return passed === 3;
  */},
  res: {
    tr: false
 }
},
{
  name: 'Symbol.toStringTag',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-well-known-symbols',
  exec: function() {/*
    var a = {};
    a[Symbol.toStringTag] = "foo";
    return (a + "") === "[object foo]";
  */},
  res: {
    tr: false
 }
},
{
  name: 'Symbol.unscopables',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-well-known-symbols',
  exec: function() {/*
    var a = { foo: 1, bar: 2 };
    a[Symbol.unscopables] = { bar: true };
    with (a) {
      return foo === 1 && typeof bar === "undefined";
    }
  */},
  res: {
    tr: false
 }
},
{
  name: 'RegExp.prototype.match',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-regexp.prototype.match',
  exec: function () {
    return typeof RegExp.prototype.match === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'RegExp.prototype.replace',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-regexp.prototype.replace',
  exec: function () {
    return typeof RegExp.prototype.replace === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'RegExp.prototype.search',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-regexp.prototype.search',
  exec: function () {
    return typeof RegExp.prototype.search === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'RegExp.prototype.split',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-regexp.prototype.split',
  exec: function () {
    return typeof RegExp.prototype.split === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'RegExp.prototype.compile',
  annex_b: true,
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-regexp.prototype.compile',
  exec: function () {
    return typeof RegExp.prototype.compile === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Array.from',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from',
  exec: function () {
    return typeof Array.from === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Array.of',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.of',
  exec: function () {
    return typeof Array.of === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Array.prototype.copyWithin',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.copywithin',
  exec: function () {
    return typeof Array.prototype.copyWithin === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Array.prototype.find',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.find',
  exec: function () {
    return typeof Array.prototype.find === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Array.prototype.findIndex',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.findindex',
  exec: function () {
    return typeof Array.prototype.findIndex === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Array.prototype.fill',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.fill',
  exec: function () {
    return typeof Array.prototype.fill === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Array.prototype.keys',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.keys',
  exec: function () {
    return typeof Array.prototype.keys === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Array.prototype.values',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.values',
  exec: function () {
    return typeof Array.prototype.values === 'function';
  },
  res: {
    tr: true
  }
},
{
  name: 'Array.prototype.entries',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.entries',
  exec: function () {
    return typeof Array.prototype.entries === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Array.prototype[Symbol.unscopables]',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype-@@unscopables',
  exec: function () {/*
    var unscopables = Array.prototype[Symbol.unscopables];
    var ns = "find,findIndex,fill,copyWithin,entries,keys,values".split(",");
    for (var i = 0; i < ns.length; i++) {
      if (!unscopables[ns[i]]) return false;
    }
    return true;
  */},
  res: {
    tr: false
 }
},
{
  name: 'Number.isFinite',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isfinite-number',
  exec: function () {
    return typeof Number.isFinite === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Number.isInteger',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger',
  exec: function () {
    return typeof Number.isInteger === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Number.isSafeInteger',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.issafeinteger',
  exec: function () {
    return typeof Number.isSafeInteger === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Number.isNaN',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isnan',
  exec: function () {
    return typeof Number.isNaN === 'function';
  },
  res: {
    tr: true
 }
},
{
  name: 'Number.EPSILON',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.epsilon',
  exec: function () {
    return typeof Number.EPSILON === 'number';
  },
  res: {
    tr: true
 }
},
{
  name: 'Number.MIN_SAFE_INTEGER',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.min_safe_integer',
  exec: function () {
    return typeof Number.MIN_SAFE_INTEGER === 'number';
  },
  res: {
    tr: true
 }
},
{
  name: 'Number.MAX_SAFE_INTEGER',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer',
  exec: function () {
    return typeof Number.MAX_SAFE_INTEGER === 'number';
  },
  res: {
    tr: true
 }
},
{
  name: 'Math.clz32',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.clz32',
  exec: function () {
    return typeof Math.clz32 === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.imul',
  link: 'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.imul',
  exec: function () {
    return typeof Math.imul === 'function';
  },
  res: {
    tr: false
  }
},
{
  name: 'Math.sign',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.sign',
  exec: function () {
    return typeof Math.sign === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.log10',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.log10',
  exec: function () {
    return typeof Math.log10 === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.log2',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.log2',
  exec: function () {
    return typeof Math.log2 === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.log1p',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.log1p',
  exec: function () {
    return typeof Math.log1p === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.expm1',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.expm1',
  exec: function () {
    return typeof Math.expm1 === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.cosh',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.cosh',
  exec: function () {
    return typeof Math.cosh === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.sinh',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.sinh',
  exec: function () {
    return typeof Math.sinh === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.tanh',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.atanh',
  exec: function () {
    return typeof Math.tanh === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.acosh',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.acosh',
  exec: function () {
    return typeof Math.acosh === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.asinh',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.asinh',
  exec: function () {
    return typeof Math.asinh === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.atanh',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.atanh',
  exec: function () {
    return typeof Math.atanh === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.hypot',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.hypot',
  exec: function () {
    return typeof Math.hypot === 'function';
  },
  res: {
    closure:     false,
    tr: false
 }
},
{
  name: 'Math.trunc',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.trunc',
  exec: function () {
    return typeof Math.trunc === 'function';
  },
  res: {
    tr: false
 }
},
{
  name: 'Math.fround',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.fround',
  exec: function () {
    return typeof Math.fround === 'function';
  },
  res: {
    tr: false
  }
},
{
  name: 'Math.cbrt',
  link: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.cbrt',
  exec: function () {
    return typeof Math.cbrt === 'function';
  },
  res: {
    tr: false
 },
  separator: 'after'
}
];

//Shift annex B features to the bottom
exports.tests = exports.tests.filter(function(e) { return !e.annex_b })
        .concat(exports.tests.filter(function(e) { return  e.annex_b }));
