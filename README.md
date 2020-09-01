# matrix2d
2d图形矩阵工具，通过矩阵，可以简单快捷的计算2d图形对象的平移、旋转，并自然的画在canvas上，并可以轻松的转换全局坐标和本地坐标。避免繁琐的三角函数数去计算对象的位置信息。


# API

* constructor(params) 构造，参数可以是空、Matrix2d对象、数组、字符串

```
new Matrix2d()
new Matrix2d(matrix)
new Matrix2d([a, b, c, d, e, f])
new Matrix2d('a, b, c, d, e, f')
```

* translate(x, y) 平移，返回已新的Matrix2d对象
* scale(x, y, cx, cy) 缩放
* rotate(r, cx, cy) 旋转
* multiply(matrix) 矩阵合并
* transform(context2d) 将矩阵应用到context2d上
* matrixTransform(point) 将矩阵应用到点上
* world2local(point) 将全局坐标转成本地坐标
* extract(point) 提取平移、旋转等信息
* toArray() toArray
* toString() toString

# demo

* demo/index.js 演示了如果平移、旋转一个矩形对象；如果根据matrix全局坐标(鼠标坐标)是否落在平移、旋转后的矩形对象上
