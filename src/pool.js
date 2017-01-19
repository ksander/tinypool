/* jshint globalstrict: true, es5: true */
/* global module */

    /**
     * Fixed-Size Object Pool Allocator
     * 
     * @name Tinypool
     * @author Aleziev
     * @version 0.1.0 
     * @constructor
     */


(function(global){
    'use strict';


    function Pool(allocator, resetor){
        'use strict';

        if(typeof allocator !== 'function'){
            throw new Error("Allocator must be a function.");
        }

        this.allocated = 0;
        this.available = 0;
        this._allocator = allocator;
        this._resetor   = resetor;
    }

    Pool.MAX_POOL_SIZE = 255;

    Pool.prototype = {
        constructor: Pool,

        _allocator : null,
        _resetor   : null,

        _pool: [],

        acquire: function(){
            var available = this.available,
                obj;

            if(available <= 0){
                ++this.allocated;
                return new this._allocator();
            }

            obj = this._pool[available - 1];

            --this._pool.length;
            --this.available;

            return obj;
        },

        
        invoke: function(ind){
            var pool = this._pool,
                len, obj;

            obj = pool[ind];
            len = pool.length;

            if(available <= 0 && obj){
                while(ind < len){
                    this[ind] = undefined;
                    this[ind] = this[ind + 1];
                    ++ind;
                }

                --this._pool.length;
                --this.available;

                return obj;
            }

            return;
        },

        release: function(pool_obj){
            var pool = this._pool;
            
            this._resetor(pool_obj);
            pool[pool.length] = pool_obj;
            ++this.available;
        },


        allocate: function(size){
            var pool = this._pool;

            this.available += size & Pool.MAX_POOL_SIZE;

            while(size--){
                pool[pool.length] = new this._allocator();
            }

            return this;
        }

    };

    
    /* AMD & Node ready */
    
    if(typeof define === 'function' && define.amd){
        define(function () { return Pool; });
    } else if (typeof module !== 'undefined' && module.exports){
        module.exports = Pool;
    } else { //browser
        global['Tinypool'] = Pool;
    }

}(this));