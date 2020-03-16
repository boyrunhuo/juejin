function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j + 1]
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr
}

function bubbleSort2(arr) {
    var i = arr.length - 1
    while (i > 0) {
        var pos = 0;
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j;
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
        i = pos;
    }
    return arr
}


function selectionSort(arr) {
    var len = arr.length
    var minIndex, temp
    for (var i = 0; i < len - 1; i++) {
        minIndex = i
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {//寻找最小的数
                minIndex = j//将最小数的索引保存
            }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    console.timeEnd('选择排序耗时');
    return arr
}

function binaryInsertionSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var key = arr[i], left = 0, right = i - 1;
        while (left <= right) {
            var middle = parseInt((left + right) / 2)
            if (key < arr[middle]) {
                right = middle - 1
            } else {
                left = middle + 1
            }
        }
        for (var j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j]
        }
        arr[left] = key
    }
    console.timeEnd('二分插入排序耗时：')
    return arr;
}


function quickSort(array, left, right) {
    console.time('1.快速排序耗时');
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array' && typeof left === 'number' && typeof right === 'number') {
        if (left < right) {
            var x = array[right],
                i = left - 1,
                temp;
            for (var j = left; j <= right; j++) {
                if (array[j] <= x) {
                    i++;
                    temp = array[i]
                    array[i] = array[j];
                    array[j] = temp
                }
            }
            quickSort(array, left, i - 1)
            quickSort(array, i + 1, right)
            console.timeEnd('1.快速排序耗时');
            return array;
        }
    } else {
        return 'array is not an Array or left or right is not a number!';
    }
}

var quickSort2 = function(arr) { 
    if(arr.length <= 1) {
        return arr
    }

    var pivotIndex = Math.floor(arr.length / 2)
    var pivot = arr.splice(pivotIndex,1)[0]
    var left = []
    var right = []
    for(var i =0;i<arr.length;i++) {
        if(arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort2(left).concat([pivot],quickSort2(right))
}