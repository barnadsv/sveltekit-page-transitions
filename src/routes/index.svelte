<script>
  import { Block, BlockTitle, List, ListItem, Button } from 'konsta/svelte'
  import { navbarStore } from "$lib/stores/navbar"

  $navbarStore = 'Home'
</script>
  
<main>
<Block>
  <h1>Home</h1>
  <p>
    Navigate between pages using the links above, and an animated page transition
    will occur.
  </p>    
  <button class="btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg">Button</button>
  <BlockTitle>Simple List</BlockTitle>
  <List>
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
    <ListItem title="Item 3" />
  </List>
  <Button large>Button</Button>
</Block>
</main>

<!-- <style lang="postcss">
  main {
    min-height: 800px;
  }
</style> -->

