<template>
  <div>
    <h1>Longport接口 - 匯萬盈兆</h1>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/balance">Balance</NuxtLink>
          <span> ：查询长桥的余额</span>
        </li>
        <li>
          <NuxtLink to="/quote">Stock Quote</NuxtLink>
          <span> ：使用长桥的API查询美国或者香港股票</span>
        </li>
        <li>
          <NuxtLink to="/watch">Watch List</NuxtLink>
          <span> ：查询长桥的自选关注列表</span>
        </li>
      </ul>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>

</script>

<style scoped>
nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: block;
  margin-bottom: 10px;
}

nav ul li a {
  text-decoration: none;
  color: #000;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
