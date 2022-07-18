<script>
  import { fly, fade } from "svelte/transition";
  import { routeMapStore } from '$lib/stores/routemap'
  import { afterNavigate, beforeNavigate } from '$app/navigation'
  
  export let pathname = "";

  // sinal serve para determinar se a transicao e para a direita ou para a esquerda dependendo de routeMapStore
  let sinal = 1
  beforeNavigate(({ from, to }) => {
		sinal = $routeMapStore[from.pathname] < $routeMapStore[to.pathname] ? 1 : -1
  })

</script>

{#key pathname}
  <!-- <div
    in:fly={{ x: -5, duration: 500, delay: 500 }}
    out:fly={{ x: 5, duration: 500 }}
  > -->
  <!-- <div
    in:fly={{ x: -400, duration: 250, delay: 300 }} out:fly={{ x: 400, duration: 250 }}
  > -->
  <div in:fly={{ x: 400*sinal, duration: 250, delay: 300 }} out:fade={{ duration: 250 }} >
    <slot />
  </div>
{/key}

