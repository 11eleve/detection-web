<template>
    <div class="confirm-box" v-show="show">
      <p>{{ message }}</p>
      <button @click="onConfirm">确认</button>
      <button @click="onCancel">取消</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
        message: '删除后将无法还原',
      };
    },
    methods: {
      onConfirm() {
        // 在确认按钮被点击时执行的操作
        this.show = false;
        // 执行确认操作的逻辑代码...
      },
      onCancel() {
        // 在取消按钮被点击时执行的操作
        this.show = false;
        // 执行取消操作的逻辑代码...
      },
    },
  };
  </script>
  