import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		[x: string]: any;
		/** Provide classes to set the tab list flex justification.*/
		width?: number | undefined;
		/** Provide classes to set the tab group border styles.*/
		height?: number | undefined;
	};
	events: Record<string, never>;
	slots: {
		default: NonNullable<unknown>;
	};
};
export type TranslateCardProps = typeof __propDef.props;
export type TranslateCardEvents = typeof __propDef.events;
export type TranslateCardSlots = typeof __propDef.slots;
export default class TranslateCard extends SvelteComponentTyped<
	TranslateCardProps,
	TranslateCardEvents,
	TranslateCardSlots
> {}
export {};
