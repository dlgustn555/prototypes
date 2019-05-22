const userTemplate = '<p>{{name}} - {{birthYear}} - {{nationality}}</p>'

export const userIdTemplate = `
  {{#items}}
  <li>{{login}} - <a href="{{url}}">상세보기</a></li>
  {{/items}}
`

export default userTemplate
