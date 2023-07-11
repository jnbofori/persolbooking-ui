<template>
  <div class="w-100 flex justify-center">
    <!-- 👉 Footer: left content -->
    <span class="text-center">
      &copy;
      {{ new Date().getFullYear() }}
      <span class="text-primary">Julian Ofori</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>