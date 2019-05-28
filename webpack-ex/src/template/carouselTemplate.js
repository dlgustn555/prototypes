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
`

export {
  carouselTempalte
}
