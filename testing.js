var mergeArrays = function (array1, array2) {
    if (array1.Query && array2.Query) {
        Array.from(array1.Query).concat(array2.Query);
        delete array2.Query;
    }
    for (var resolver in array2)
        array1[resolver] = array2[resolver];
    return array1;
};
var array1 = {
    Query: {
        Events: function () { return ({ id: 1, title: 2 }); }
    },
    Events: {
        location: function () { return ({ lat: 23, long: 34 }); }
    }
};
var array2 = {
    Query: {
        Resources: function () { return [{ id: 1, url: '3223' }, { id: 1, url: '322233243' }]; }
    }
};
var newArray = mergeArrays(array1, array2);
console.log(newArray);
