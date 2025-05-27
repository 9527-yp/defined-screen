
export const zoom = {
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
            if(target.className === 'piont-drag-zoom'){
                // (clientX, clientY)点击位置距离当前可视区域的坐标(x, y)
                // offsetLeft、offsetTop 距离上层或父级的左边距和上边距

                // 初始位置和尺寸
                const startX = event.clientX
                const startY = event.clientY
                const startWidth =block.width
                const startHeight = block.height

                let width = null;
                let height = null;
                // 绑定移动和停止函数
                document.onmousemove = (event) => {
                    // 获取新的鼠标位置(event.clientX, event.clientY)
                    // 弹窗应该在的位置(left, top)

                    // 计算新的宽高
                    width = startWidth + event.clientX - startX
                    height = startHeight + event.clientY - startY

                    // offsetWidth、offsetHeight 当前元素的宽度
                    // innerWidth、innerHeight 浏览器可视区的宽度和高度

                    // 获取弹窗在页面中距X轴的最小、最大 位置
                    const minX = 0;
                    const maxX = window.innerWidth;

                    if (width <= minX) {
                        width = minX;
                    } else if (width >= maxX) {
                        width = maxX;
                    }

                    // 获取弹窗在页面中距Y轴的最小、最大位置
                    const minY = 0;
                    const maxY = window.innerHeight;
                    if (height <= minY) {
                        height = minY;
                    } else if (height >= maxY) {
                        height = maxY;
                    }

                    // 赋值移动
                    _binding.value.blocks.forEach(item => {
                        if(item.dragShow === true){
                            item.width = width;
                            item.height = height;
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