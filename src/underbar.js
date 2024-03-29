/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
  	return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n>array.length) {return array}
    else {
    return n === undefined ? array.pop() : array.slice(array.length - n)};
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
  	if(Array.isArray(collection)) {
  		for (var i = 0; i < collection.length; i++) {
  			iterator(collection[i], i, collection);
        }
  	} else {
  		for (var i in collection) {
  			iterator(collection[i], i, collection);
  		}                         
  	}
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
  	var results = [];
  	_.each(collection, function(item) {
  		if(test(item) === true) {
  			results.push(item)
  		}
  	})
  	return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var results = [];
  	_.each(collection, function(item) {
  		if(test(item) === false) {
  			results.push(item)
  		}
  	})
  	return results;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
  	array = array.sort(function(a, b) {return a-b});
  	var results = [array[0]];
  	for (var i = 1; i < array.length; i++) {
  		if(array[i] !== array[i-1]) {
  			results.push(array[i]);
  		}
  	}
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var results = [];
    for (var i = 0; i < collection.length; i++) {
        results.push(iterator(collection[i], i, collection));
        };
        return results;
      };
      


    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  // _.invoke(['a', 'b'], function(item) { return item.toUpperCase();})
  _.invoke = function(collection, methodName, args) {
    if (typeof(methodName) === "string") {
      return _.map(collection, function(item) {
        return item[methodName].apply(item, args);
      });
    } else {
      return _.map(collection, function(item) {
        return methodName.apply(item, args);
      });
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    accumulator = (accumulator == null ? collection[0] : accumulator)
    _.each(collection, function(item) {
      accumulator = iterator(accumulator, item)
    });
    return accumulator;
    };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item == target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here

    iterator = (iterator == null ? _.identity : iterator)
    return _.reduce(collection, function(truthTest, item){
      if(!truthTest){
        return false;
      }
      return !!iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = (iterator == null ? _.identity : iterator); 
    //using for loop
    if (collection.length === 0) {return false};
    var result = false;
    for (var i = 0; i < collection.length; i++) {
      if ((!!iterator(collection[i])) == true) {
        result = true;
      }
    }
    return result;
    //using reduce
    return _.reduce(collection, function(truthTest, item) {
    	if (truthTest) {
    		return true
    	}
    	return !!iterator(item);
    }, false)
    };
 
  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  	var extenders = Array.prototype.slice.call(arguments, 1);
  	_.each(extenders, function(args) {
  		_.each(args, function(value, key) {
  			obj[key] = value;
  		})
  	})
  	return obj;
  };

  //extend works but I'm not sure I understand it.

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  	var extenders = Array.prototype.slice.call(arguments, 1);
  	for (var i = 0; i < extenders.length; i++) {
  		for (var key in extenders[i]) {
  		  if (obj.hasOwnProperty(key) == false) {
          obj[key] = extenders[i][key];
        }
  	  }
    }
    return obj;
  };
  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var previousResults = {};

    return function(n) {
      if (previousResults.hasOwnProperty(n) == true) {
        return previousResults[n];
      } else {
        previousResults[n] = func.apply(this, arguments);
        return previousResults[n];
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2)
    var startTime = (Date.now() + wait);
    function checkTime() {
      if (startTime <= Date.now()) {
        return func.apply(this, args);
      }
    };
    setInterval(checkTime, 100);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newarray = array.slice();
    var placeHolder;
    var randomIndex;
    for(var i = newarray.length-1; i >= 0; i--) {
      randomIndex = Math.floor(Math.random() * i);
      placeHolder = newarray[i];
      newarray[i] = newarray[randomIndex];
      newarray[randomIndex] = placeHolder;
    }
    return newarray;
};


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
   //  console.log(typeof collection[0]);
   //  console.log(collection[0].hasOwnProperty(iterator));
  	// if ((typeof collection[0] === 'object') && (collection[0].hasOwnProperty(iterator))) {
   //    console.log("arrived");
  	// 	var sortable = [];
  	// 	var result = [];
  	// 	for (var i = 0; i < collection.length; i++) {
  	// 		sortable.push([i, collection[i][iterator]]);
  	// 	}
  	// 	sortable = sortable.sort(function(a, b) {return a[1] - b[1]});
  	// 	for (var i = 0; i < sortable.length; i++) {
  	// 		result.push(collection[sortable[i][0]]);
  	// 	}
   //    console.log(result);
  	// 	return result;
  	// } else if (iterator == "length") {
   //    console.log("length goes");
  	// 	var lengthList = [];
  	// 	var result = [];
  	// 	for (var i = 0; i < collection.length; i++) {
  	// 		lengthList.push([collection[i].length, collection[i], i]);
  	// 	}
  	// 	lengthList = lengthList.sort(function(a, b) {return a[0] - b[0]});
   //      for (var i = 0; i < lengthList.length; i++) {
   //      	result.push(collection[lengthList[i][2]]);
   //      }
   //      return result;
  	// } else {
  	// 	return collection.sort(function(a, b) {return a - b});
  	// }
    if (typeof iterator == "string") {
      var sortable = [];
      var result = [];
      for (var i = 0; i < collection.length; i++) {
        sortable.push([i, collection[i][iterator]]);
      }
      sortable = sortable.sort(function(a, b) {return a[1] - b[1]});
      for (var i = 0; i < sortable.length; i++) {
        result.push(collection[sortable[i][0]]);
      }
      console.log(result);
      return result;
    } else {
      var results = [];
      var finalresult = [];
      _.map(collection, function(a, b) {
        results.push([iterator(a), b]);
      });
      results = results.sort(function(a, b) {return a[0] - b[0]});
      for (var i = 0; i < results.length; i++) {
        finalresult.push(collection[results[i][1]]);
      }
      return finalresult;
    }
    // } else if (iterator == "length") {
    //   console.log("length goes");
    //   var lengthList = [];
    //   var result = [];
    //   for (var i = 0; i < collection.length; i++) {
    //     lengthList.push([collection[i].length, collection[i], i]);
    //   }
    //   lengthList = lengthList.sort(function(a, b) {return a[0] - b[0]});
    //     for (var i = 0; i < lengthList.length; i++) {
    //       result.push(collection[lengthList[i][2]]);
    //     }
    //     return result;
    // } else {
    //   return collection.sort(function(a, b) {return a - b});
    // }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  // this returns the right thing, but still fails the test?????
  _.flatten = function(nestedArray, result) {
    var newArray = [];
    function runThroughArray(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) == false) {
          newArray.push(arr[i]);
        } else { 
          runThroughArray(arr[i]);
        }
      }
      return newArray;
    };
    return runThroughArray(nestedArray);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
