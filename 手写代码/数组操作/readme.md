*   splice：
    
    作用：

    1. **删除或替换**现有元素或者**原地添加新的元素**来修改数组,
    ```javaScript
        let arr = [1, 2, 3, 4, 5]
        let arr1 = [1, 2, 3, 4, 5]
        let arr2 = [1, 2, 3, 4, 5]
        
        arr.splice(1,3)//删除：从index为1开始，删除3个数，返回[2, 3, 4]，arr变为[1,5]

        arr1.splice(1,3,'item1','item2')//替换： 从index为1开始删除3个数，并在1之后依次插入'item1','item2'，返回[2,3,4],arr1变为[1, "item1", "item2", 5]

        arr2.splice(0,0,'item1','item2')//原地添加：从index为1开始，依次添加'item1','item2',返回[],arr2变为[1, "item1", "item2", 2, 3, 4, 5]

    ```
    2. 并以数组形式返回被修改的内容,

    3. 此方法会改变原数组
    
    语法：array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
    
    start：
    
    1. 指定修改的开始位置（从0计数）。
    
    2. 如果超出了数组的长度，则从数组末尾开始添加内容；
    ```javaScript
        let arr = [1, 2, 3, 4, 5]
        arr.splice(5,0,'item1','item2')//返回[],arr变为[1, 2, 3, 4, 5, "item1", "item2"]
    ```
    
    3. 如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
     ```javaScript
        let arr = [1, 2, 3, 4, 5]
        let arr1 = [1, 2, 3, 4, 5]
        arr.splice(-3,2)//等价于5-3 = 2,从index为2开始，删除两个，返回[3,4],数组变为[1,2,5]

        arr1.splice(-6,2)//5-6<0，看做从index等于0开始，删除两个，返回[1,2],arr1变为[3,4,5]
    ```

    deleteCount :
    
    1. 如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。

    2. 如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。

    ```javaScript
        let arr = [1,2,3,4]
        arr.splice(0)//返回[1,2,3,4],arr变为[]

    ```

    3. 如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。


    item1, item2, ... ：

    1. 由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。