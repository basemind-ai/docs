import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const discordInviteLink = 'https://discord.gg/ReZ9SZwvwu';
const docsSiteUrl = 'https://your-docusaurus-site.example.com';
const logo = 'img/logo.svg';
const organizationName = 'BaseMind.AI';

const config: Config = {
	baseUrl: '/',
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
	projectName: organizationName,
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
				alt: `${organizationName} Logo`,
				src: logo,
			},
			title: organizationName,
		},
		prism: {
			darkTheme: prismThemes.dracula,
			theme: prismThemes.github,
		},
	} satisfies Preset.ThemeConfig,
	title: organizationName,
	url: docsSiteUrl,
};

export default config;
