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
  import PageTransitionDesktop from '$lib/components/PageTransitionDesktop.svelte'
  import { fade } from "svelte/transition";
  import { themeStore } from "$lib/stores/theme";
  import { navbarStore } from "$lib/stores/navbar"
  import { deviceStore } from '$lib/stores/device'
  import UAParser  from 'ua-parser-js'
  import { App } from "konsta/svelte";
  import Button from "$lib/components/Button.svelte";
  import { Page, Navbar, Toolbar, Link, Panel } from 'konsta/svelte'
  import Footer from '$lib/components/Footer.svelte'
  import FooterDesktop from '$lib/components/FooterDesktop.svelte'
  import { onMount } from "svelte";

  export let pathname;
  let body = null
  let htmlElement = null
  let osTheme = null
  let title
  let leftPanelOpened = false 
  
  // TODO
  // Transformar Panel em um componente para ser o menu e concentrar o codigo

  // Detectando o dispositivo para determinar o tema (ios|material)
  const parser = new UAParser()
  const device = parser.getResult()['device']
  if (device && ['tablet', 'mobile'].includes(device['type'])) {
      $deviceStore['model'] = device['model']
      $deviceStore['type'] = device['type']
      $deviceStore['vendor'] = device['vendor']
      $deviceStore['touchable'] = Object.keys(device).length > 0
  } else {
      $deviceStore['touchable'] = false
  }
  osTheme = $deviceStore['model'] ? $deviceStore['model'] === 'iPhone' ? "ios" : "material" : "material"  

  onMount(() => {
    htmlElement = window.document.firstElementChild
    body = window.document.body
  })

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
          if (!$deviceStore['touchable']) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
          }
          htmlElement.classList.add('dark')
          htmlElement.setAttribute("data-theme", 'dark')
        } else {
          if (!$deviceStore['touchable']) {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
          }
          htmlElement.classList.remove('dark')
          htmlElement.setAttribute("data-theme", 'light')
        }
      }
  }
</script>

<div bind:clientWidth={$deviceStore.width} bind:clientHeight={$deviceStore.height}>
{#if $deviceStore['touchable']}
  {#if $themeStore['dark']}
  <App theme={osTheme} dark safeAreas>
      <Page>
        <Navbar {title} class="sticky top-0"></Navbar>
        <PageTransition {pathname}>
          <slot />
        </PageTransition>
        <Footer />
        <Panel
          side="left"
          opened={leftPanelOpened}
          onBackdropClick={() => (leftPanelOpened = false)} >
          <Page>
            <p>Left Panel</p>
          </Page>
        </Panel>
      </Page>
  </App>
  {:else}
  <App theme={osTheme} safeAreas>
      <Page>
        <Navbar {title} class="sticky top-0"></Navbar>
        <PageTransition {pathname}>
          <slot />
        </PageTransition>
        <Footer />
        <Panel
          side="left"
          opened={leftPanelOpened}
          onBackdropClick={() => (leftPanelOpened = false)} >
          <Page>
            <p>Left Panel</p>
          </Page>
        </Panel>
      </Page>
  </App>
  {/if}
{:else}
  <PageTransitionDesktop {pathname}>
    <div class="layout">
    <slot />
  </div>
  </PageTransitionDesktop>
  <FooterDesktop />
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

