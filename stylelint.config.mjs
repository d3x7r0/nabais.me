/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'order/order': [
      'custom-properties',
      'declarations',
      'rules',
      {
        type: 'at-rule',
        hasBlock: true,
      },
    ],
    'order/properties-alphabetical-order': true,
    'import-notation': null,
    'custom-property-empty-line-before': [
      'never',
      { ignore: ['after-comment', 'after-custom-property'] },
    ],
    'selector-class-pattern': null,
    'no-descending-specificity': null,
  },
}
