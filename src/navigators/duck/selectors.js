import { createStructuredSelector } from 'reselect'

const isAuthenticated = state => true
const locale = state => null

export default createStructuredSelector({
  isAuthenticated,
  locale
})
