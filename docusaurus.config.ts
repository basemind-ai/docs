import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const basemind = 'BaseMind.AI';
const deploymentBranch = 'gh-pages';
const discordInviteLink = 'https://discord.gg/ReZ9SZwvwu';
const docsSiteUrl = 'https://your-docusaurus-site.example.com';
const logo = 'img/logo.svg';
const organizationName = 'basemind-ai';
const repositoryName = 'docs';

const config: Config = {
	baseUrl: '/docs/',
	deploymentBranch,
	favicon: 'img/favicon.ico',
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	organizationName,
	presets: [
		[
			'classic',
			{
				blog: false,
				docs: {
					routeBasePath: '/',
					sidebarPath: './sidebars.ts',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],
	projectName: repositoryName,
	tagline: '',
	themeConfig: {
		image: 'img/log-with-text.png',
		navbar: {
			items: [
				{
					'aria-label': 'Discord Invite',
					'className': 'navbar--discord-link',
					'href': discordInviteLink,
					'position': 'right',
				},
				{
					'aria-label': 'GitHub Organization',
					'className': 'navbar--github-link',
					'href': 'https://github.com/basemind-ai',
					'position': 'right',
				},
			],
			logo: {
				alt: `${basemind} Logo`,
				src: logo,
			},
			title: basemind,
		},
		prism: {
			darkTheme: prismThemes.dracula,
			theme: prismThemes.github,
		},
	} satisfies Preset.ThemeConfig,
	title: basemind,
	trailingSlash: false,
	url: docsSiteUrl,
};

export default config;
