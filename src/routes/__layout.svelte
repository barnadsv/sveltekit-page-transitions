<!-- 1. Assign current route's path to `pathname` prop -->
<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export const load = async ({ url: { pathname } }) => ({
    props: { pathname },
  });
</script>

<script>
  import "../app.css";
  import PageTransition from "$lib/components/PageTransition.svelte";
  import { themeStore } from "$lib/stores/theme";
  import { navbarStore } from "$lib/stores/navbar"
  import { ua } from '$lib/stores/ua/store'
  import UAParser  from 'ua-parser-js'
  import { App } from "konsta/svelte";
  import Button from "$lib/components/Button.svelte";
  import { Page, Navbar, Toolbar, Link } from 'konsta/svelte'
  import { onMount } from "svelte";

  export let pathname;
  let body = null
  let htmlElement = null
  let osTheme = null
  let title

  // Detectando o dispositivo para determinar o tema (ios|material)
  const parser = new UAParser()
  const device = parser.getResult()['device']
  if (device && ['tablet', 'mobile'].includes(device['type'])) {
      $ua.device['model'] = device['model']
      $ua.device['type'] = device['type']
      $ua.device['vendor'] = device['vendor']
      $ua.device['touchable'] = Object.keys(device).length > 0
  } else {
      $ua.device['touchable'] = false
  }
  osTheme = $ua.device['model'] ? $ua.device['model'] === 'iPhone' ? "ios" : "material" : "material"

  onMount(() => {
    htmlElement = window.document.firstElementChild
    body = window.document.body
  })

  const toggleDark = () => {
    $themeStore['dark'] = !$themeStore['dark']
  }

  $: {
    // console.log('Dark: ', $themeStore['dark'])
    // console.log('Pathname: ', pathname)
    // console.log('Width: ', $ua.width)
    // console.log('Height: ', $ua.height)
    // console.log('ua: ', $ua)
    // console.log('touchable: ', $ua['device']['touchable'])

    // osTheme = $ua.device['model'] ? $ua.device['model'].includes('iPhone') ? 'ios' : 'material' : 'material'

    title = $navbarStore

    // Se não for touchable, coloco classes no body, pra utilizar temas proprios.
    // Mas provavelmente irei usar alguma ui, como daisyui, que se vale das classes e atributos em html.
    if (htmlElement) {
        if ($themeStore['dark']) {
          if (!$ua.device['touchable']) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
          }
          htmlElement.classList.add('dark')
          htmlElement.setAttribute("data-theme", 'dark')
        } else {
          if (!$ua.device['touchable']) {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
          }
          htmlElement.classList.remove('dark')
          htmlElement.setAttribute("data-theme", 'light')
        }
      }
  }
</script>

<div bind:clientWidth={$ua.width} bind:clientHeight={$ua.height}>
{#if $ua.device['touchable']}
  {#if $themeStore['dark']}
  <App theme={osTheme} dark safeAreas>
      <Page>
        <Navbar {title} class="sticky top-0"></Navbar>
        <PageTransition {pathname}>
          <slot />
        </PageTransition>
        <Toolbar top="false" class="left-0 bottom-0 fixed w-full">
          <Link toolbar><a href="/">Home</a></Link>
          <Link toolbar><a href="/about">About</a></Link>
          <Link toolbar onClick={toggleDark}>Toggle</Link>
        </Toolbar>
      </Page>
  </App>
  {:else}
  <App theme={osTheme} safeAreas>
      <Page>
        <Navbar {title} class="sticky top-0"></Navbar>
        <PageTransition {pathname}>
          <slot />
        </PageTransition>
        <Toolbar top="false" class="left-0 bottom-0 fixed w-full">
          <Link toolbar><a href="/">Home</a></Link>
          <Link toolbar><a href="/about">About</a></Link>
          <Link toolbar onClick={toggleDark}>Toggle</Link>
        </Toolbar>
      </Page>
  </App>
  {/if}
{:else}
  <div class="layout">
    <slot />
  </div>
{/if}
</div>

<style>
  .layout {
    max-width: 64rem;
    margin: 1rem auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  :global(body.light-mode) {
    background-color: #f2eee2;
    color: #0084f6;
    transition: background-color 0.3s;
  }
  :global(body.dark-mode) {
    background-color: #1d3040;
    color: #bfc2c7;
  }
  :global(body.light-mode a) {
    color: #0084f6;
    transition: color 0.3s;
  }
  :global(body.dark-mode a) {
    color: #bfc2c7;
  }
</style>

