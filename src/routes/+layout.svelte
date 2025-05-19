<script lang="ts">
	import '../app.css';
	import { setContext } from 'svelte';
	import { PUBLIC_APP_NAME, PUBLIC_APP_VERSION } from '$env/static/public';
	import { localStorageStore as htmlStore } from '../stores/html';
	import { onMount } from 'svelte';
	import { Circle3} from '@/components/ui/custom';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';
	// import { SECRET_KEY } from "$env/static/private";

	let { children } = $props();
	setContext('app_ver', () => PUBLIC_APP_VERSION);
	setContext('app_name', () => PUBLIC_APP_NAME);
	// setContext('app_key', () => SECRET_KEY);

	const colorScheme = htmlStore('color-scheme', 'light');
	const mainLoader = htmlStore('main-loader', false);
	const holdMainLoader = htmlStore('hold-main-loader', false);

	onMount(() => {
		document.documentElement.style.colorScheme = $colorScheme;
		mainLoader?.set(false);
	});

	afterNavigate(() => {
		console.log('Navigation finished!');
		mainLoader?.set(true);
		setTimeout(() => {
			mainLoader?.set($holdMainLoader);
		}, 3000);
	});

	onNavigate(({ to, from, complete }) => {
		console.log('Navigating from', from?.url.pathname, 'to', to?.url.pathname);
		mainLoader?.set(true);
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await complete;
				setTimeout(() => {
					mainLoader?.set($holdMainLoader);
				}, 3000);
			});
		});
	});

	beforeNavigate(({ to, from, cancel }) => {
		console.log('About to navigate from', from?.url.pathname, 'to', to?.url.pathname);
		// Example: prevent navigation
		// if (!confirm('Are you sure you want to leave?')) cancel();
		mainLoader?.set(true);
	});
</script>

<div class="relative">
{#if $mainLoader}
	<div class="z-50 absolute w-full h-full min-h-screen bg-white/80 justify-center items-center flex">
		<Circle3 size="150" unit="px" duration="2s" />
	</div>
{/if}
{@render children()}
</div>