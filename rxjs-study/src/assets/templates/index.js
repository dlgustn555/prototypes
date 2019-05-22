const idTemplate = `
  {{#items}}
  <li class="user">
    <img src="{{avatar_url}}" width="50px" height="50px" />
    <p><a href="{{html_url}}">{{login}}</a><p>
  </li>
  {{/items}}
`

export {
  idTemplate
}