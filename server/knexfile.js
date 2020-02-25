// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/dmi-web-store'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-dmi-web-store'
  }
}
