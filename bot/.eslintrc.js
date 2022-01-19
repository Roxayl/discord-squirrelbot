module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: [
        'standard'
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        indent: ['error', 4]
    }
}
