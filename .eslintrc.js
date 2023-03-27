const { config } = require('@dhis2/cli-style')

module.exports = {
    root: true,
    extends: [config.eslintReact],
    rules: {
        'import/extensions': ['error', { js: 'never' }],
        'react-hooks/exhaustive-deps': 'off',
        'no-useless-escape': 'off',
        'react/no-unused-prop-types': 'off',
        'no-case-declarations': 'warn',
    },
}
