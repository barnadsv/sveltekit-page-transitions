<script>
    import { themeStore } from '$lib/stores/theme'
    import { Toolbar, Link } from 'konsta/svelte'

    const toggleDark = () => {
        $themeStore['dark'] = !$themeStore['dark']
    }
</script>

<Toolbar top="false" class="left-0 bottom-0 fixed w-full">
    <Link toolbar><a href="/">Home</a></Link>
    <Link toolbar><a href="/about">About</a></Link>
    <Link toolbar onClick={toggleDark}>Toggle</Link>
</Toolbar>