"use strict";
// // T表示泛型，具体什么类型是调用这个方法的时候决定的
// function getInfo<T>(value:T):T {
//     return value;
// }
// // console.log(getInfo<number>(111));
// console.log(getInfo<string>('ceshi'));
// // 泛型类
// class MinClass {
//     public list:number[] = [];
//     add(num:number) {
//         this.list.push(num);
//     }
//     min():number {
//         let minNum = this.list[0];
//         for (let i = 1; i < this.list.length; i++) {
//             if (minNum > this.list[i]) {
//                 minNum = this.list[i];
//             }
//         }
//         return minNum;
//     }
// }
// let min = new MinClass();
// min.add(2);
// min.add(4);
// min.add(5);
// min.min(5); // 2
// 泛型类
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.list = [];
    }
    MinClass.prototype.add = function (num) {
        this.list.push(num);
    };
    MinClass.prototype.min = function () {
        var minNum = this.list[0];
        for (var i = 1; i < this.list.length; i++) {
            if (minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum;
    };
    return MinClass;
}());
// 实例化类并且指定了类的泛型为number
// let min = new MinClass<number>();
// min.add(1);
// min.add(4);
// min.add(5);
// console.log(min.min()); // 1
// 实例化类并且指定了类的泛型为string
var min = new MinClass();
min.add('a');
min.add('c');
min.add('d');
console.log(min.min()); // a
