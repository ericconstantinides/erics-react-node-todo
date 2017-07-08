/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _todo = __webpack_require__(2);

var _todo2 = _interopRequireDefault(_todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// the todo Revealing Module Pattern
var todo = function () {

  // cache DOM
  var container = document.getElementById('todo');
  var todoList = container.querySelector('[data-todo="list"]');
  var addTodoInput = container.querySelector('[data-todo="add-item"]');

  var todos = [];

  // Bind Event(s) (really it's just one event delegation)
  container.addEventListener('click', function (event) {
    // get the index using ES6 destructuring, then back to an array, then indexOf
    var index = [].concat(_toConsumableArray(todoList.children)).indexOf(event.target.closest('[data-todo^="item"]'));
    // get the database ID:
    var id = index >= 0 ? todos[index]._id : null;
    var action = event.target.getAttribute('data-todo');
    if (action === 'edit') editTodo(index);else if (action === 'delete') deleteTodo(index, id);else if (action === 'add') addTodo();else if (action === 'cancel') cancelTodo(index);else if (action === 'update') updateTodo(index, id);else if (action === 'checkmark') completeTodo(index, id);
  });

  container.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      var action = event.target.getAttribute('data-todo');
      if (action === 'add-item') addTodo();else {
        var index = [].concat(_toConsumableArray(todoList.children)).indexOf(event.target.closest('[data-todo^="item"]'));
        var id = index >= 0 ? todos[index]._id : null;
        if (action === 'edit-item') updateTodo(index, id);
      }
    }
  });

  container.addEventListener('keyup', function (event) {
    if (event.keyCode === 27) {
      var action = event.target.getAttribute('data-todo');
      var index = [].concat(_toConsumableArray(todoList.children)).indexOf(event.target.closest('[data-todo^="item"]'));
      if (action === 'edit-item') cancelTodo(index);
    }
  });

  getTodos(_render);

  // _render is the only place we repaint:
  function _render(selectedIndex) {
    todoList.innerHTML = '';
    todos.forEach(function (item) {
      if (item.status !== 'edit') {
        // this one displays the todo item:
        todoList.innerHTML += '<li class="list-group-item' + (item.status === 'complete' ? ' is-complete' : '') + '" data-todo="item">\n            <label class="form-check-label" data-todo="checkmark">\n              <input class="form-check-input" type="checkbox" ' + (item.status === 'complete' ? 'checked' : '') + ' value="" data-todo="checkmark">' + item.title + '\n            </label>\n            ' + (item.status === 'complete' ? '<button class="btn btn-sm btn-danger" data-todo="delete">Delete</button>' : '<button class="btn btn-sm btn-default" data-todo="edit">edit</button>') + '\n          </li>';
      } else {
        // This one edits:
        todoList.innerHTML += '<li class="list-group-item edit" data-todo="item-edit">\n          <input class="form-control" data-todo="edit-item" type="text" value="' + item.title + '">\n          <button class="btn btn-sm btn-default" data-todo="cancel">Cancel</button>\n          <button class="btn btn-sm btn-success" data-todo="update">Update</button>\n          <button class="btn btn-sm btn-danger" data-todo="delete">Delete</button>\n        </li>';
      }
    });
    if (selectedIndex !== undefined) {
      todoList.children[selectedIndex].querySelector('[data-todo="edit-item"]').select();
    }
  }

  function status(response) {
    if (response.status >= 200 && response.status < 300) return Promise.resolve(response);else return Promise.reject(new Error(response.statusText));
  }

  function json(response) {
    return response.json();
  }

  // RESTful events
  function getTodos(callback) {
    fetch('/todos').then(status).then(json).then(function (data) {
      todos = data;
      callback();
    }).catch(function (error) {
      return console.log('Request failed', error);
    });
  }

  function addTodo(input) {
    // check if there's an input:
    input = input || addTodoInput.value;
    // if either one is an input:
    if (input) {
      // add it to the list:
      var newTodo = { title: input, status: 'open' };
      var newPosition = todos.push(newTodo) - 1;

      // add it to the api
      fetch('/todos', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newTodo)
      }).then(status).then(json
      // Success, add the id to the last one:
      ).then(function (data) {
        return todos[newPosition]._id = data._id;
      }).catch(function (error) {
        return console.log('Request failed', error);
      });

      // clear out the input
      addTodoInput.value = '';
      _render();
    } else {
      alert('Please enter a todo item.');
    }
  }

  function completeTodo(index, dbId) {
    todos[index].status = todos[index].status === 'open' ? 'complete' : 'open';
    // add it to the api
    fetch('/todos/' + dbId, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ title: todos[index].title, status: todos[index].status })
    }).then(status).catch(function (error) {
      return console.log('Request failed', error);
    });
    _render();
  }

  function editTodo(index) {
    todos[index].status = 'edit';
    _render(index);
  }

  function cancelTodo(index) {
    todos[index].status = 'open';
    _render();
  }

  function updateTodo(index, dbId) {
    todos[index].title = todoList.children[index].querySelector('[data-todo="edit-item"]').value;
    todos[index].status = 'open';
    // update the api
    fetch('/todos/' + dbId, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ title: todos[index].title, status: todos[index].status })
    }).then(status).catch(function (error) {
      return console.log('Request failed', error);
    });
    _render();
  }

  function deleteTodo(index, dbId) {
    // take 1 object out of the array at the index:
    todos.splice(index, 1);
    // update the API
    fetch('/todos/' + dbId, { method: 'DELETE' }).then(status).catch(function (error) {
      return console.log('Request failed', error);
    });
    _render();
  }

  function todoApi(method, parameters) {}

  // return the public methods
  return {
    addTodo: addTodo,
    completeTodo: completeTodo,
    editTodo: editTodo,
    cancelTodo: cancelTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
  };
}();

if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
  var el = this;
  while (el) {
    if (el.matches(selector)) return el;
    el = el.parentElement;
  }
};

/***/ })
/******/ ]);