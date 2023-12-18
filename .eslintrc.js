module.exports = {
	root: true,
	extends: [
		'plugin:@docusaurus/recommended',
		//'plugin:mdx/recommended'
	],
	overrides: [
		{
			files: ['*ts', '*tsx'],
			extends: [
				'@tool-belt/eslint-config/react',
				'plugin:@docusaurus/recommended',
			],
			parserOptions: {
				project: './tsconfig.json',
			},
			rules: {
				'import/no-unresolved': 0,
			},
		},
		{
			files: ['*.md', '*.mdx'],
			extends: [
				'plugin:mdx/recommended',
				'plugin:@docusaurus/recommended',
			],
			settings: {
				'mdx/code-blocks': true,
			},
		},
	],
};
