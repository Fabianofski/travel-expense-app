<script lang="ts">
	import { capitalizeFirstLetter, wordToHexColor } from '../utils';

	export let url: string;
	export let name: string;
</script>

{#if url === 'default'}
	<svg viewBox="0 0 256 256" fill={wordToHexColor(name)} xmlns="http://www.w3.org/2000/svg">
		<rect fill="none" height="256" width="256" />
		<circle cx="128" cy="120" r="44" />
		<path
			d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm65.8,162.4a81.3,81.3,0,0,0-24.5-23,59.7,59.7,0,0,1-82.6,0,81.3,81.3,0,0,0-24.5,23,88,88,0,1,1,131.6,0Z"
		/>
	</svg>
{:else}
	<img src={url} alt={'Profile of' + capitalizeFirstLetter(name)} />
{/if}
