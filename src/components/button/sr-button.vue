<template>
    <div class="btn-box">
        <button class="default-btn" :style="style" @click="btnEvent">{{btnConfig.mainText}}</button>
    </div>
</template>
<script>
    export default {
        props: ['btnConfig'],
        computed: {
            style: function () {
                var style = ''
                var data = this.btnConfig.styles;
                for (var i in data) {
                    var item = i + ':' + data[i] + ';';
                    style += item;
                }
                style = style+'line-height:'+data.height;
                return style;
            }
        },
        data() {
            return {}
        },
        methods: {
            btnEvent() {
                console.log('事件测试')
            }
        }
    }
</script>

<style>
    .default-btn {
        border: 0;
        padding: 0 10px;
        border-radius: 5px;
    }
</style>
