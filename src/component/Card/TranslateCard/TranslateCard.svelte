<script lang="ts">
	export let width: number | undefined;
	export let height: number | undefined;
	export let mask: boolean = false;

	var card: HTMLElement;
	function updatePointPosotion(
		event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }
	) {
		console.log(event);

		const rect = card.getBoundingClientRect();
		const hw = rect.width / 2;
		const hh = rect.height / 2;
		const ratioX = (event.x - (rect.x + hw)) / hw;
		const ratioY = (event.y - (rect.y + hh)) / hh;
		console.log(ratioX, ratioY);

		updateRatio(ratioX, ratioY);
	}
	function updateRatio(x: string | number, y: string | number) {
		card.style.setProperty('--ratio-x', x.toString());
		card.style.setProperty('--ratio-y', y.toString());
	}
</script>

<div
	bind:this={card}
	class:mask
	class="translate-card hover:opacity-100 {$$props.class ?? ''}  "
	style=" width:{width ? width + 'px' : '100%'} ; height:{height ? height + 'px' : '100%'}; "
	on:pointermove={updatePointPosotion}
	on:pointerleave={() => updateRatio(0, 0)}
>
	<slot />
</div>

<style>
	:root {
		--color1: #fac;
		--color2: #ddccaa;
	}
	.translate-card {
		--ratio-x: 0;
		--ratio-y: 0;
		--correction: 100%;
		transform-style: preserve-3d;
		transform: rotateY(calc(-20deg * var(--ratio-x))) rotateX(calc(20deg * var(--ratio-y)));
		transition: all 0.2s linear, opacity 0.8s ease;
		will-change: transform, filter;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		transform-origin: center;
	}
	.translate-card:hover {
		box-shadow: -20px -20px 30px -25px var(--color1), 20px 20px 30px -25px var(--color2),
			-7px -7px 10px -5px var(--color1), 7px 7px 10px -5px var(--color2),
			0 0 13px 4px rgba(255, 255, 255, 0.3), 0 55px 35px -20px rgba(0, 0, 0, 0.5);
	}

	.translate-card.mask::before,
	.translate-card.mask::after {
		content: '';
		position: absolute;
		border-radius: inherit;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-repeat: no-repeat;
		opacity: 0.5;
		mix-blend-mode: color-dodge;
		transition: all 0.33s ease;
	}
	.translate-card.mask::before {
		background-position: 50% 50%;
		background-size: 300% 300%;
		background-image: linear-gradient(
			115deg,
			transparent 0%,
			var(--color1) 25%,
			transparent 47%,
			transparent 53%,
			var(--color2) 75%,
			transparent 100%
		);
		opacity: 0.25;
		filter: brightness(0.5) contrast(1);
		z-index: 1;
	}

	.translate-card.mask::after {
		opacity: 1;
		background-image: url('/sparkles.gif'), url('/holo.webp'),
			linear-gradient(
				125deg,
				#ff008450 15%,
				#fca40040 30%,
				#ffff0030 40%,
				#00ff8a20 60%,
				#00cfff40 70%,
				#cc4cfa50 85%
			);
		background-position: 50% 50%;
		background-size: 160%;
		background-blend-mode: overlay;
		z-index: 2;
		filter: brightness(1) contrast(1);
		transition: all 0.33s ease;
		mix-blend-mode: color-dodge;
		opacity: 0.5;
	}
</style>
