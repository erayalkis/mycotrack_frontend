<template>
  <nav class="flex justify-between bg-gray-200">
    <RouterLink to="/">
      <h1 class="text-3xl p-2">MycoTrack</h1>
    </RouterLink>
    <div class="flex text-3xl p-2 gap-4 justify-between align-center">
      <RouterLink to="/login">
        <h1 class="cursor-pointer">Login</h1>
      </RouterLink>
      <RouterLink to="/signup">
        <h1 class="cursor-pointer">Signup</h1>
      </RouterLink>
    </div>
  </nav>
</template>
