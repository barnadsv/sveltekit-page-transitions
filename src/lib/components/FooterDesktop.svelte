<script>
    import { themeStore } from '$lib/stores/theme'

    const toggleDark = () => {
        $themeStore['dark'] = !$themeStore['dark']
    }
</script>

<div class="btm-nav">
    <div>
        <a class="link" href="/">Home</a>
    </div>
    <div>
        <a class="link" href="/about">About</a>
    </div>
    <div>
        <button class="link" on:click={toggleDark}>Toggle</button>
    </div>
</div>
