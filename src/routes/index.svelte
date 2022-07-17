<script>
  import { Block } from 'konsta/svelte'
  import { navbarStore } from "$lib/stores/navbar"

  $navbarStore = 'Home'
</script>
  
<Block>
  <h1>Home</h1>
  <p>
    Navigate between pages using the links above, and an animated page transition
    will occur.
  </p>    
</Block>

