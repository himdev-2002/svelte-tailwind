<script lang="ts">
	import { setLocale, getLocale } from '$lib/paraglide/runtime.js';
	import { m } from '$lib/paraglide/messages.js';
	import { getContext,onMount } from 'svelte';
	import UserAuthForm from './(components)/user-auth-form.svelte';
	import AuthenticationLight from '$lib/img/authentication-light.png?enhanced';
	import AuthenticationDark from '$lib/img/authentication-dark.png?enhanced';
	import { Button } from '@/components/ui/button';
	import Gb from 'svelte-flags/Gb.svelte';
	import Id from 'svelte-flags/Id.svelte';
	import { Icons } from '$lib/components/icons';
	import { localStorageStore as htmlStore } from '../../stores/html';

	const app_ver: () => string = getContext('app_ver');
	const app_name: () => string = getContext('app_name');
	const mainLoader = htmlStore('main-loader', true);
	const holdMainLoader = htmlStore('hold-main-loader', true);
	const colorScheme = htmlStore('color-scheme', 'light');
	let isLoading = false;

	onMount(() => {
		mainLoader?.set(true);
		holdMainLoader?.set(true);
	});

	$effect.pre(() => {		
		holdMainLoader?.set(true);
		mainLoader?.set(true);
	});

	$effect(() => {		
		holdMainLoader?.set(false);
		mainLoader?.set(false);
	});
</script>

<div class="md:hidden">
	<enhanced:img src={AuthenticationLight} alt="Authentication" class="block dark:hidden" />
	<enhanced:img src={AuthenticationDark} alt="Authentication" class="hidden dark:block" />
</div>
<div
	class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	{#if getLocale().toUpperCase()== 'EN'}
		<Button
			variant="outline"
			size="icon"
			class="absolute right-4 top-4 md:right-8 md:top-8 px-2 py-1"
			onclick={() => setLocale('id')}
		>
			<Gb class="!h-6 !w-6"/>
		</Button>
	{:else if getLocale().toUpperCase()== 'ID'}
		<Button
			variant="outline"
			size="icon"
			class="absolute right-4 top-4 md:right-8 md:top-8 px-2 py-1 "
			onclick={() => setLocale('en')}
		>
			<Id class="!h-6 !w-6"/>
		</Button>
	{/if}
	{#if $colorScheme == 'light'}
		<Button
			variant="link"
			size="icon"
			class="absolute right-8 top-4 md:right-16 md:top-8 px-2 py-1"
			onclick={() => colorScheme.set('dark') }
		>
			<Icons.moon class="h-6 w-6 text-black rounded" />
		</Button>
	{:else}
		<Button
			variant="link"
			size="icon"
			class=" absolute right-8 top-4 md:right-16 md:top-8 px-2 py-1"
			onclick={() => colorScheme.set('light') }
		>
			<Icons.sun class="h-7 w-7 text-white" />
		</Button>
	{/if}
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
		></div>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			{app_name()} v{app_ver()}
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;{m["quote.text"]()}&rdquo;
				</p>
				<footer class="text-sm">{m["quote.author"]()}</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">{m["signin.lbl"]()}</h1>
				<p class="text-sm text-muted-foreground">{m["signin.txt"]()}</p>
			</div>
			<UserAuthForm />
			<!-- <p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p> -->
		</div>
	</div>
</div>
