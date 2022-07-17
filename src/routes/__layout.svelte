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
  import { App } from "konsta/svelte";
  import Button from "$lib/components/Button.svelte";
  import { Page, Navbar, Toolbar, Link } from 'konsta/svelte'
  import { onMount } from "svelte";

  export let pathname;
  // let body = null
  let htmlElement = null

  onMount(() => {
    htmlElement = window.document.firstElementChild
    // body = window.document.body
  })

  const toggleDark = () => {
    $themeStore['dark'] = !$themeStore['dark']
  }

  $: {
    console.log($themeStore['dark'])
    if (htmlElement) {
        // htmlElement = window.document.firstElementChild
        if ($themeStore['dark']) {
          // body.classList.add("dark-mode");
          htmlElement.classList.add('dark')
          htmlElement.setAttribute("data-theme", 'dark')
        } else {
          // body.classList.remove("dark-mode");
          htmlElement.classList.remove('dark')
          htmlElement.setAttribute("data-theme", 'light')
        }
      }
  }
</script>

{#if $themeStore['dark']}
<App theme="ios" dark>
  <!-- <div class="layout"> -->
    <!-- <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <Button>Toggle</Button>
    </nav> -->

    <!-- 2. Pass `pathname` prop to the component so it knows when to transition -->
    <Page>
      <Navbar>{$navbarStore}</Navbar>
      <PageTransition {pathname}>
        <slot />
      </PageTransition>
      <Toolbar top="false" class="left-0 bottom-0 fixed w-full">
        <Link toolbar><a href="/">Home</a></Link>
        <Link toolbar><a href="/about">About</a></Link>
        <Link toolbar onClick={toggleDark}>Toggle</Link>
      </Toolbar>
    </Page>
  <!-- </div> -->
</App>
{:else}
<App theme="ios">
  <!-- <div class="layout"> -->
    <!-- <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <Button>Toggle</Button>
    </nav> -->

    <!-- 2. Pass `pathname` prop to the component so it knows when to transition -->
    <Page>
      <Navbar>{$navbarStore}</Navbar>
      <PageTransition {pathname}>
        <slot />
      </PageTransition>
      <Toolbar top="false" class="left-0 bottom-0 fixed w-full">
        <Link toolbar><a href="/">Home</a></Link>
        <Link toolbar><a href="/about">About</a></Link>
        <Link toolbar onClick={toggleDark}>Toggle</Link>
      </Toolbar>
    </Page>
  <!-- </div> -->
</App>
{/if}

<style>
  /* .layout {
    max-width: 64rem;
    margin: 1rem auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  } */
  /* :global(body) {
    background-color: #f2eee2;
    color: #0084f6;
    transition: background-color 0.3s;
  }
  :global(body.dark-mode) {
    background-color: #1d3040;
    color: #bfc2c7;
  }
  :global(body a) {
    color: #0084f6;
    transition: color 0.3s;
  }
  :global(body.dark-mode a) {
    color: #bfc2c7;
  } */
</style>
