# 文档内容

## 问题集合

### requestAnimationFrame 是全局的刷新回调，别的 chart 更新会执行怎么办？

不会影响，requestAnimationFrame 中的内容本身就是动画需要，但是需要按照业务来整理好执行的时机。

### requestAnimationFrame(fun()) 以及 requestAnimationFrame(fun)

两个是不一样的，一个是调用执行过的，一个是调用函数再执行。

### 蚂蚁线，判断数值相等的逻辑

考虑 终点值在比较值的一个范围内，通过一个可配置的数值，来计算是否在范围内。

```js
    // 关键代码
    getNearPoint(point: Point): boolean {
        const {x, y} = point;
        const leftX = this.comparePoint.x - Math.abs(this.countVal);
        const rightX = this.comparePoint.x + Math.abs(this.countVal);
        const leftY = this.comparePoint.y - Math.abs(this.countVal);
        const rightY = this.comparePoint.y + Math.abs(this.countVal);
        return leftX <= x && x <= rightX && leftY <= y && y <= rightY;
    }
```

### 闪烁的问题，试试双缓存 或者 是固定不动的 icons

第一种方法：

<https://juejin.cn/post/6844903832439242766>

第二种方法：

创建一个新的 `dom` 然后这个 `canvas` 是用于绘制静态图片，当`requestAnimationFrame`在执行绘制回调的时候不会影响到静态的图片的展示，这样可以避免掉不必要的内容渲染。

### 绘制 image 有的时候无法在画布上展示的问题，异步问题

### 如何实现一个动态的折线

<https://www.i4k.xyz/article/qq_36135258/98323403>
