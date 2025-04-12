// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace svelteHTML {
		// eslint-disable-next-line ts/consistent-type-definitions
		interface HTMLAttributes<T> {
			'on:copy-done'?: (e: CustomEvent<T>) => void;
			'on:copy-error'?: (e: CustomEvent<T>) => void;
		}
	}

	declare module '*.png?enhanced';
}

export {};
