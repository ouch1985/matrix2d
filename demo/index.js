
var container, canvas, ctx2d, size;
let needsUpdate = true;
let el = {x: 100, y: 100, width: 200, height:300, color: 'red', matrix: new Matrix2d().rotate(30, 200, 250)};
let step = 5;

function animate(){
    if(needsUpdate)render();
    needsUpdate = false;
    requestAnimationFrame(animate);
}

// 渲染，重绘
function render(){
    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    ctx2d.save();

    el.matrix.transform(ctx2d);
    ctx2d.fillStyle = el.color;
    ctx2d.beginPath();
    ctx2d.rect(el.x, el.y, el.width, el.height);
    ctx2d.fill();

    ctx2d.restore();
}

function event2point(event){
    let box = container.getBoundingClientRect();
    var x,y;
    if(event.touches && event.touches.length > 0){
        x = event.touches[0].x || event.touches[0].clientX;
        y = event.touches[0].y || event.touches[0].clientY;

        x -= box.left;
        y -= box.top;
    }else if(event.changedTouches && event.changedTouches.length > 0){
        x = event.changedTouches[0].x || event.changedTouches[0].clientX;
        y = event.changedTouches[0].y || event.changedTouches[0].clientY;
        x -= box.left;
        y -= box.top;
    }else if(event.offsetX || event.offsetY){
        x = event.clientX - box.left;
        y = event.clientY - box.top;
    }

    return {x: x || 0, y: y || 0};
}

// 命中测试
function hitTest(event, el){
    // 全局坐标
    var p = event2point(event);
    // 全局坐标转成元素的本地坐标
    p = el.matrix.world2local(p);

    // 判断坐标是否在矩形内
    let hited = p.x > el.x && p.x < (el.x + el.width) && p.y > el.y && p.y < (el.y + el.height);
    document.querySelector('#hit').innerText = hited ? 'yes' : 'no';
}

// 移动
function move(el, x, y){
    var start = {x: 0, y: 0};
    var end = {x: x, y: y};
    start = el.matrix.world2local(start);
    end = el.matrix.world2local(end);

    el.x = el.x + (end.x - start.x);
    el.y = el.y + (end.y - start.y);

    needsUpdate = true;
}

// 旋转
function rotate(el, deg){
    var matrix = new Matrix2d(el.matrix);
    var cx = el.x + el.width/2;
    var cy = el.y + el.height/2;
    el.matrix = matrix.rotate(deg, cx, cy);

    needsUpdate = true;
}

function main(){
    container = document.querySelector('#app');
    size = {width: container.clientWidth, height: container.clientHeight};

    canvas = document.querySelector('#canvas');
    canvas.style = `width:${size.width}px;height:${size.height}px`;
    ctx2d = canvas.getContext('2d');

    var dpr = window.devicePixelRatio;
    canvas.width = size.width * dpr;
	canvas.height = size.height * dpr;
	ctx2d.scale(dpr, dpr);
	ctx2d.save();

    document.querySelector('#left').addEventListener('click', function(event){
        event.stopPropagation();
        move(el, -step, 0);
    });

    document.querySelector('#right').addEventListener('click', function(){
        event.stopPropagation();
        move(el, step, 0);
    });

    document.querySelector('#up').addEventListener('click', function(){
        event.stopPropagation();
        move(el, 0, -step);
    });

    document.querySelector('#down').addEventListener('click', function(){
        event.stopPropagation();
        move(el, 0, step);
    });

    document.querySelector('#rleft').addEventListener('click', function(){
        event.stopPropagation();
        rotate(el, -step);
    });

    document.querySelector('#rright').addEventListener('click', function(){
        event.stopPropagation();
        rotate(el, step);
    });

    canvas.addEventListener('click', function(event){
        hitTest(event, el);
    });

    animate();
}

main();
