/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, //单引号
        semi: false, //分号
        printWidth: 80, //每行宽度至多80字符
        trailingComma: 'none', //不加对象 | 数组最后的逗号
        endOfLine: 'auto' //换行符号不限制
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] //忽略index.vue
      }
    ],
    'vue/no-setup-props-destructure': ['off'], //关闭props结构的校验
    'no-undef': 'error'
  }
}
