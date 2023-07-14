<script lang="ts">
	import { fade } from 'svelte/transition';
	import dagre from 'dagre';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { getLines, getLineStyle, type Line } from '$lib/util/graphUtil';
	import type { Relation, User } from './+page.server';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { relation } from '$lib/relationship/relationUtil';
	import { readKey } from '$lib/util/storage';

	export let data: PageData;
	const NODE_PREFIX = 'node-';
	const MIN_MARGIN = 80;
	var g = new dagre.graphlib.Graph();
	const INPUT_ERROR_CLASS = 'input-error';
	let search: HTMLElement;
	$: nodes = g.nodes();
	$: lines = new Array<Line>();
	$: marginRightNeed = 0;
	$: marginButtonNeed = 0;
	$: searchUser = '';

	onMount(() => {
		g.setGraph({
			nodesep: 25,
			rankdir: 'TB',
			marginy: 45,
			marginx: 100,
			ranksep: 80
		});

		g.setDefaultEdgeLabel(function () {
			return {};
		});

		let userList: User[] = [];
		const simpleDataJson = readKey('relationData');
		const simpleData = JSON.parse(simpleDataJson);
		if (Object.keys(simpleData).length !== 0) {
			userList = simpleData;
		}
		for (const user of userList) {
			g.setNode(user.name, { width: 200, height: 100 });
			user.relation?.forEach((relationUser) => deepBuildRelation(relationUser, user));
		}
		dagre.layout(g);
		lines = [];
		g.edges().forEach(function (e) {
			lines.push(...getLines(e, g));
		});
		nodes = g.nodes();
		// 模拟画布
		marginRightNeed = g.graph().width!.valueOf() + 200;
		marginButtonNeed = g.graph().height!.valueOf() + 200;
	});
	function deepBuildRelation(relation: Relation, parent: User) {
		const currentUser = relation.user;
		g.setNode(currentUser.name, { label: relation.type, width: 200, height: 100 });
		g.setEdge(parent.name, currentUser.name);
		currentUser.relation?.forEach((relationUser) => deepBuildRelation(relationUser, currentUser));
	}

	function showDraw(node: string): any {
		const drawerSetting: DrawerSettings = {
			position: 'right',
			width: ' w-1/4',
			meta: { user: node }
		};
		drawerStore.open(drawerSetting);
	}

	function handleSearch(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		if (searchUser && event.key == 'Enter') {
			const currentSelectedNode = NODE_PREFIX + searchUser;
			const layout = document.getElementById('graph-layout')!;
			const currentNode = document.getElementById(currentSelectedNode);
			if (currentNode == null) {
				if (search) {
					search.classList.add(INPUT_ERROR_CLASS);
				}
				return;
			}
			search.classList.remove(INPUT_ERROR_CLASS);
			const currentWind = {
				top: layout.scrollTop,
				left: layout.scrollLeft,
				bottom: layout.clientHeight + layout.scrollTop,
				right: layout.clientWidth + layout.scrollLeft
			};

			if (
				!checkInSafeArea(
					currentWind,
					currentNode.offsetTop,
					currentNode.offsetLeft,
					currentNode.clientHeight,
					currentNode.clientWidth
				)
			) {
				const moveTop = Math.max(
					calculateMarginTop(
						currentWind.top,
						currentWind.bottom,
						currentNode.offsetTop,
						currentNode.clientHeight
					),
					0
				);
				const moveLeft = Math.max(
					calculateMarginLeft(
						currentWind.left,
						currentWind.right,
						currentNode.offsetLeft,
						currentNode.clientWidth
					),
					0
				);
				layout.scrollTo({
					top: moveTop,
					left: moveLeft
				});
			}
		}
	}

	function checkInSafeArea(
		currentWind: { top: number; left: number; bottom: number; right: number },
		offsetTop: number,
		offsetLeft: number,
		height: number,
		width: number
	): boolean {
		return (
			currentWind.top < offsetTop - MIN_MARGIN &&
			currentWind.left < offsetLeft - MIN_MARGIN &&
			currentWind.bottom > offsetTop + height + MIN_MARGIN &&
			currentWind.right > offsetLeft + width + MIN_MARGIN
		);
	}

	function calculateMarginTop(start: number, end: number, current: number, base: number): number {
		const random = Math.random() * 10;
		if (current <= start + MIN_MARGIN) {
			return current - (MIN_MARGIN + random);
		} else if (current + base >= end - MIN_MARGIN) {
			return current + MIN_MARGIN + base + random;
		}
		return start;
	}
	function calculateMarginLeft(start: number, end: number, current: number, base: number): number {
		const random = Math.random() * 10;
		if (current <= start + MIN_MARGIN) {
			return current - (MIN_MARGIN + random);
		} else if (current + base >= end - MIN_MARGIN) {
			return start + MIN_MARGIN + base + random + (current - end);
		}
		return start;
	}
</script>

<div
	bind:this={search}
	class="input-group input-group-divider grid-cols-[auto_1fr_auto] fixed w-1/5 z-[999] top-7 ml-8 opacity-25 hover:opacity-100 focus:opacity-100 rounded-2xl"
>
	<div class="input-group-shim">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
	</div>
	<input
		type="search"
		placeholder="Search..."
		on:keypress={handleSearch}
		bind:value={searchUser}
		on:input={() => search.classList.remove(INPUT_ERROR_CLASS)}
	/>
</div>

<div id="graph-layout" class=" relative w-full h-full overflow-scroll scroll-smooth">
	{#each nodes as node}
		<div
			id={NODE_PREFIX + node}
			transition:fade
			class="card absolute bg-orange-400 card-hover grid grid-cols-2 grid-rows-3 gap-1 pt-4 px-4"
			style="left:{g.node(node).x}px;top:{g.node(node).y}px; width:{g.node(node)
				.width}px;height:{g.node(node).height}px"
			class:selected-node={searchUser == node}
			on:click={() => showDraw(node)}
			on:keydown
		>
			<div class="  row-span-2">Icon</div>
			<div class="  line">{node}</div>
			<div class="  line">男</div>
			<div class="  line col-span-2 mb-1">1996年05月20日</div>
			<span class="  absolute -top-3 -right-3 text-white px-1 bg-blue-500">
				{g.node(node).label || ''}</span
			>
		</div>
	{/each}
	{#each lines as line}
		<div
			transition:fade
			class="absolute flow-line"
			style="left:{line.startX}px;top:{line.startY}px;{getLineStyle(line)}"
		/>
	{/each}
	<div
		class=" absolute h-1 -z-10"
		style="width:{marginRightNeed}px ; height:{marginButtonNeed}px;"
	/>
</div>

<Drawer>
	<span>{$drawerStore.meta.user}</span>
</Drawer>
