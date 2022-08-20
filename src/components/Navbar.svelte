<script lang="ts">
    let active = false;

    function toggle() {
        active = !active
    }

    const links = [
      {
        name: "About",
        href: "/about/",
      },
      {
        name: "Projects",
        href: "/projects/",
      },
      {
        name: "Blog",
        href: "/blog/",
      },
    ];
</script>

<nav class="navbar is-dark">
  <div class="navbar-brand">
    <a class="navbar-item has-text-weight-bold" href="/"> Eduardo Espadeiro </a>

    <button class="navbar-burger { active ? "is-active" : "" }" aria-label="menu" aria-expanded="false" on:click={ toggle }>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  </div>

  <div class="navbar-menu { active ? "is-active" : "" }">
    <div class="navbar-end">
      {#each links as link}
        <a class="navbar-item" href={ link.href }>{ link.name }</a>
      {/each}
    </div>
  </div>
</nav>
