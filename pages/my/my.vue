<template>
	<view class="my-wrap">
		<!-- 用户未登录时，显示登录组件 -->
		<my-login v-if="!token"></my-login>
		<!-- 用户登录后，显示用户信息组件 -->
		<my-user-info v-else backgroundColor="#c00000" height="35%"></my-user-info>
	</view>
</template>

<script>
import { badgeMixin } from '@/mixins/badge/index.js'


import { mapState } from 'vuex';
export default {
	mixins: [badgeMixin],
	data() {
		return {};
	},
	computed: {
		...mapState('user', ['token'])
	},
	methods: {}
};
</script>

<style lang="less" scoped>
@import url('./style/my.less');
</style>
