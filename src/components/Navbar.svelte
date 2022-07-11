<script>
    let active = false;

    function toggle() {
        active = !active
    }
</script>

<nav class="navbar is-black">
  <div class="navbar-brand">
    <a class="navbar-item has-text-weight-bold" href="/"> Eduardo Espadeiro </a>

    <button class="navbar-burger { active ? 'is-active' : '' }" aria-label="menu" aria-expanded="false" on:click={ toggle }>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  </div>

  <div class="navbar-menu { active ? 'is-active' : '' }">
    <div class="navbar-end">
      <a class="navbar-item" href="/">Home</a>
      <a class="navbar-item" href="/">Project</a>
      <a class="navbar-item" href="/">Blog</a>
    </div>
  </div>
</nav>
