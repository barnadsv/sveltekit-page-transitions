<script>
  import { fly } from "svelte/transition";
  export let pathname = "";
</script>

<!-- Whenever pathname changes, unmount (page transition out), then re-mount (page transition in) -->
{#key pathname}
  <div
    in:fly={{ x: -5, duration: 500, delay: 500 }}
    out:fly={{ x: 5, duration: 500 }}
  >
  <!-- <div in:fly={{ x: -100, duration: 200, delay: 200 }} out:fly={{ x: 100, duration: 200 }}> -->
    <slot />
  </div>
{/key}
