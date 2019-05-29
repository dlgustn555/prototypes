const carouselTempalte = `
  <div id="carousel" class="view">
      <ul class="container">
        {{#panels}}
        <li class="panel" style="background-color:{{color}}">
          <img class="img" src="{{image}}">
        </li>
        {{/panels}}
      </ul>
  </div>
  <div id="carousel_content">
  </div>
`
const contentTemplate = `
  <div>
    <p>Post No. {{postNo}}</p>
    <h2>{{title}}</h1>
    <h4>{{body}}</h3>
  </div>
`
export {
  carouselTempalte,
  contentTemplate
}
