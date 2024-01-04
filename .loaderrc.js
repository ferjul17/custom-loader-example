import jsStringEscape from 'js-string-escape'

export const test = /\.graphql$/
export const loader = content => `export default "${jsStringEscape(content)}"`
export default {test, loader}

