module.exports = {
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            // 给 sass-loader 传递选项
            scss: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                // 注意：在 sass-loader v7 中，这个选项名是 "data"
                prependData: `@import "~@/assets/variables.scss";`
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
                plugins: [
                    require("postcss-px-to-viewport")({
                        // 需要转换的单位，默认为"px"
                        unitToConvert: 'px',
                        // 设计稿的视口宽度, 将根据视口做比例换算，为兼容第三方ui组件库这里写375
                        viewportWidth: 375,
                        // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                        // viewportHeight: 1334,
                        // 转化精度，转换后保留位数
                        unitPrecision: 3,
                        // 能转化为vw的属性列表
                        propList: ["*"],
                        // 希望使用的视口单位
                        viewportUnit: 'vw',
                        // 字体使用的视口单位
                        fontViewportUnit: 'vw',
                        // 需要忽略的CSS选择器
                        selectorBlackList: [],
                        // 最小的转换数值
                        minPixelValue: 1,
                        // 媒体查询里的单位是否需要转换单位
                        mediaQuery: false,
                        // 转换后是否添加备用单位
                        replace: true,
                        // 忽略文件目录
                        // exclude: ['node_modules'],
                    }),
                ]
            }
        }
    }
}