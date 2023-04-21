import { defineConfig } from '@vue/cli-service'

export default defineConfig({
  publicPath:
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === 'production'
      ? '/mycotrack_frontend/' // note the trailing slash
      : '/'
})
