export const carouselTemplate = `
  <div id="carousel" class="view">
    <ul class="container">
      {{#panels}}
      <li class="panel" style="background-color:{{color}}">
        
      </li>
      {{/panels}}
    </ul>
  </div>
  <div id="carousel_content"></div>
`
// <img class="img" src="{{image}}">