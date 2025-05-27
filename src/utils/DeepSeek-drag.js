// directives/dragToSnap.js
export default {
    mounted(el, binding) {
      const options = {
        snapEdge: true,
        edgeDistance: 10,
        transition: 'left 0.3s ease-out',
        allowClick: true,
      };
  
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        let clickStartTime, clickStartX, clickStartY, clickEndX, clickEndY;
        const CLICK_THRESHOLD = 5; // 移动距离阈值(像素)
        const CLICK_MAX_DELAY = 200; // 点击最大延迟(毫秒)
  
      // 初始化样式
      el.style.userSelect = 'none';
      el.style.touchAction = 'none'; // 防止触摸设备上的默认行为
      
      // 设置初始位置
      if (!el.style.left && !el.style.right) {
        el.style.left = 'calc(50% - ' + (el.offsetWidth / 2) + 'px)';
        el.style.top = '50px';
      }
  
      // 获取当前计算位置
      const getCurrentPosition = () => {
        return {
          left: parseFloat(el.style.left) || 0,
          top: parseFloat(el.style.top) || 0
        };
      };
  
      // 鼠标按下/触摸开始
      const startDrag = (clientX, clientY) => {
        console.log('鼠标按下...')
        if (options.allowClick) {
            clickStartTime = Date.now();
            clickStartX = clientX;
            clickStartY = clientY;
        }

        const currentPos = getCurrentPosition();
        isDragging = true;
        startX = clientX;
        startY = clientY;
        initialLeft = currentPos.left;
        initialTop = currentPos.top;
        el.style.transition = 'none';
        el.dispatchEvent(new CustomEvent('drag-start'));
      };
  
      // 拖拽中
      const onDrag = (clientX, clientY) => {
        if (!isDragging) return;
        console.log('拖拽中...')
        
        const dx = clientX - startX;
        const dy = clientY - startY;
        
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;
        
        // 边界限制
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - el.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - el.offsetHeight));
        

        binding.value.state.blocks.forEach(item => {
            if(item.key === 'moduleDeepSeek' && binding.value.id === item.id){
                item.left = newLeft;
                item.top = newTop;
            }
        });
        
        el.dispatchEvent(new CustomEvent('dragging', {
          detail: { x: newLeft, y: newTop }
        }));
      };
  
      // 结束拖拽
      const endDrag = (clientX, clientY) => {
        if (!isDragging) return;
        console.log('鼠标抬起...')
        isDragging = false;
        el.style.transition = options.transition;

        clickEndX = clientX;
        clickEndY = clientY;

        // 判断是否是点击而非拖拽
        const isClick = (
            Date.now() - clickStartTime < CLICK_MAX_DELAY &&
            Math.abs(clickEndX - clickStartX) < CLICK_THRESHOLD &&
            Math.abs(clickEndY - clickStartY) < CLICK_THRESHOLD
        );
        
        if (isClick) {
            // 如果是点击，模拟触发click事件
            el.dispatchEvent(new CustomEvent('drag-click'));
            return;
        }
        
        if (options.snapEdge) {
          const iconRect = el.getBoundingClientRect();
          const iconCenter = iconRect.left + iconRect.width / 2;
          const screenCenter = window.innerWidth / 2;
          
          let finalLeft;
          if (iconCenter < screenCenter) {
            finalLeft = options.edgeDistance;
            el.dispatchEvent(new CustomEvent('snap-left'));
          } else {
            finalLeft = window.innerWidth - el.offsetWidth - options.edgeDistance;
            el.dispatchEvent(new CustomEvent('snap-right'));
          }
          
          binding.value.state.blocks.forEach(item => {
            if(item.key === 'moduleDeepSeek' && binding.value.id === item.id){
                item.left = finalLeft;
            }
        });
        }
        
        el.dispatchEvent(new CustomEvent('drag-end'));
      };
  
      // 鼠标事件
      el.addEventListener('mousedown', (e) => {
        e.preventDefault(); // 防止文本选中等默认行为
        startDrag(e.clientX, e.clientY);
      });
  
      document.addEventListener('mousemove', (e) => {
        onDrag(e.clientX, e.clientY);
      });
  
      document.addEventListener('mouseup', (e) => {
        endDrag(e.clientX, e.clientY)
      });
  
      // 触摸事件
      el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: false });
  
      document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        onDrag(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: false });
  
      document.addEventListener('touchend', endDrag);
  
      // 清理函数
      el._cleanupDragToSnap = () => {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', endDrag);
      };
    },
  
    unmounted(el) {
      if (el._cleanupDragToSnap) {
        el._cleanupDragToSnap();
      }
    }
  };