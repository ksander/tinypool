# Tinypool - Object pool allocator for javascript
Object pooling can offer significant boost to real-time apps that need many allocations and de-allocations, where the cost of system initialization is very high, by re-using the objects and reducing the rate of invokation to bare minimum, thus delaying the Garbage Collector, so that the number of wasted resource at any time is very low.

Objects pool are used generally in video games, web applications and connections (transaction pool, database pool)

# Fixed-Size Features

* No loops, fast access
* No recursion
* Minimal initialization
* Trouble-free algorithm
* Pure Javascript

# Usage
Direct download link: [Tinypool.js](https://raw.githubusercontent.com/aleziev/tinypool/master/src/pool.js)

#### Creating a pool

Object pool constructor takes two parameters - _Allocator()_ and _Resetor()_. _Allocator_ is used to initialize a cache of your objects, while _Resetor_ reverses object state back to reference state, or any other task of your choice.

```javascript
    // Constructor 
     function Vector(x,y){
                this.x = x ? x : 0;
                this.y = y ? y : 0;
    }
    
    Vector.prototype.set = function(x,y){
        this.x = x; this.y = y;
        return this;
    }

    // Resetor - User defined
    function ResetVector(vector){
        vector.x = vector.y = 0;
    }

    // Creates the pool, then allocates 10 objects
    var pool = new Tinypool(Vector, ResetVector).allocate(10);

    // Allocate an object from the pool
    var vector = pool.acquire();
    
    // Manipulate the object
    vector.set(10, 20);
    
    // Send object back to the pool
    pool.release(vector);
    
```

It is possible to create a pool with anonymous functions:

```javascript
    var pool = new Tinypool(function(){
        this.value = '';
        this.name;
        
    }, function(obj){
        obj.value - '';
        obj.name = undefined;
    });
    
    // allocation is optional
    pool.allocate(100);

```

#### Properties

Tinypool object contains the following properties: 

* **acquire**  -  Action called when an object is allocated somewhere.
* **release**  -  Sends the object back to the pool.
* **allocate** -  Pre-allocates the pool with new allocators.
* **invoke**   -  Acquires an object from the pool by index. 


## Development Roadmap
As simple as this project is, there are ways to speed up the code a lot more. Here is a list of potential future improvements:

* Complex data structures for faster allocation (Linked List, Queued Hash-table)
* ES6 support with Generators and Maps
* Automatic object clean-up operations for complex objects
* Dynamically expandable pools (and retractable)
* Cache tracking and expiration timers
* Asynchronous cache pooling

## Version History

#### 0.1.0
      *project initialized

