import { computed } from 'vue';
export function useState(state) {
    // 表单位置尺寸
    const styleForm = computed({
        get: () => {
            let style = {};
            state.value.blocks.forEach(item => {
                if(item.activeShow === true){
                    style = {
                        width: item.width,
                        height: item.height,
                        left: item.left,
                        top:  item.top,
                        zIndex: item.zIndex
                    }
                }
            });
            return style;
        }
    })

    const cntEditBox = computed(() => {
        let isShow = false;
        state.value.blocks.forEach(item => {
            if(item.activeShow){
                if(item.key === 'moduleText' || item.key === 'moduleImg' || item.key === 'moduleVideo'){
                    isShow = true;
                }
            }
        });
        return isShow;
    })

    const textBox = computed(() => {
        let isShow = false;
        state.value.blocks.forEach(item => {
            if(item.activeShow && item.key === 'moduleText'){
                isShow = true;
            }
        });
        return isShow;
    })

    const imgBox = computed(() => {
        let isShow = false;
        state.value.blocks.forEach(item => {
            if(item.activeShow && item.key === 'moduleImg'){
                isShow = true;
            }
        });
        return isShow;
    })

    // 是否选中AI推演
    const isDeepSeek = computed(() => {
        let isShow = true;
        state.value.blocks.forEach(item => {
            if(item.activeShow && item.key === 'moduleDeepSeek'){
                isShow = false;
            }
        });
        return isShow;
    })

    const moduleTitle = computed({
        get: () => {
            let moduleTitle = '';
            state.value.blocks.forEach(item => {
                if(item.activeShow){
                    moduleTitle = item.moduleTitle
                }
            });
            return moduleTitle;
        }
    })

    return {
        styleForm,
        cntEditBox,
        textBox,
        imgBox,
        isDeepSeek,
        moduleTitle,
    }
}