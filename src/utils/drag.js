
export const drag = {
    mounted(
        el,
        _binding,
        vnode
    ) {
        const vnodeEl = vnode.el;

        // 获取盒子的位置信息
        el.onmousedown = (event) => {
            const target = event.target;

            // 获取拖拽block
            const block = _binding.value.blocks.find(item => item.dragShow === true)

            // 移动
            if(target.className === 'piont-drag-icon'){
                // (clientX, clientY)点击位置距离当前可视区域的坐标(x, y)
                // offsetLeft、offsetTop 距离上层或父级的左边距和上边距
                
                // 获取鼠标在弹窗中的位置
                const mouseX = event.clientX - vnodeEl.offsetLeft;
                const mouseY = event.clientY - vnodeEl.offsetTop;

                let left = null;
                let top = null;
                // 绑定移动和停止函数
                document.onmousemove = (event) => {
                    // 获取新的鼠标位置(event.clientX, event.clientY)
                    // 弹窗应该在的位置(left, top)
                    left = event.clientX - mouseX
                    top = event.clientY - mouseY

                    // offsetWidth、offsetHeight 当前元素的宽度
                    // innerWidth、innerHeight 浏览器可视区的宽度和高度

                    // 获取弹窗在页面中距X轴的最小、最大 位置
                    const minX = 0;
                    const maxX = window.innerWidth - block.width;

                    if (left <= minX) {
                        left = minX;
                    } else if (left >= maxX) {
                        left = maxX;
                    }

                    // 获取弹窗在页面中距Y轴的最小、最大位置
                    const minY = 0;
                    const maxY = window.innerHeight - block.height;
                    if (top <= minY) {
                        top = minY;
                    } else if (top >= maxY) {
                        top = maxY;
                    }
                    // console.log(top, 'top')
                    // console.log(left, 'left')
                    // 赋值移动
                    _binding.value.blocks.forEach(item => {
                        if(item.dragShow === true){
                            item.left = left;
                            item.top = top;
                        }
                    });

                };
                document.onmouseup = () => {
                    document.onmousemove = document.onmouseup = null;
                };
            }
        }
    }
};