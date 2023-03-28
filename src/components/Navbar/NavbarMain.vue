<template>
  <nav class="flex justify-between bg-gray-200">
    <RouterLink to="/">
      <h1 class="text-3xl p-2">Myco<span class="text-blue-500">Track</span></h1>
    </RouterLink>
    <div class="flex text-2xl gap-5 my-auto align-center mr-2">
      <RouterLink to="/login">
        <h1>Sign in</h1>
      </RouterLink>
      <RouterLink to="/signup">
        <h1>Sign up</h1>
      </RouterLink>
    </div>
  </nav>
</template>
