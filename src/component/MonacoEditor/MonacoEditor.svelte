<script lang="ts">
	import type monaco from 'monaco-editor';
	import { onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

	export let value: string;

	let divEl: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;
	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}

				return new editorWorker();
			}
		};

		Monaco = await import('monaco-editor');
		editor = Monaco.editor.create(divEl, {
			value: '',
			language: 'json',
			minimap: {
				enabled: false
			},
			formatOnPaste: true,
			formatOnType: true
		});

		editor.addAction({
			id: 'autoFormat',
			label: 'AutoFormat',
			keybindings: [Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.KeyQ],
			run: (currentEditor) => {
				setTimeout(() => {
					currentEditor.setValue(JSON.stringify(JSON.parse(currentEditor.getValue()), null, 2));
				}, 500);
			}
		});
		return () => {
			editor.dispose();
		};
	});
	$: {
		if (editor) {
			editor.setValue(value);
		}
	}
</script>

<div bind:this={divEl} class="h-screen" />
