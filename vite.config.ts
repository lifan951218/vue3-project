import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	base: './',
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			// 自定义的主题色
	// 			additionalData: `@use "./src/styles/element/index.scss" as *;`,
	// 		},
	// 	},
	// },
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		//按需引入element
		// Components({
		// 	resolvers: [
		// 		ElementPlusResolver({
		// 			// 按需引入修改主题色添加这一行，使用预处理样式
		// 			importStyle: "sass",
		// 		}),
		// 	],
		// }),
		// // 自动引入，注意这里需要在Components之后引入
		// AutoImport({
		// 	resolvers: [
		// 		ElementPlusResolver({
		// 			// 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
		// 			importStyle: "sass",
		// 		}),
		// 	],
		// }),
	],
	optimizeDeps: {
		include: ['schart.js']
	}
});


