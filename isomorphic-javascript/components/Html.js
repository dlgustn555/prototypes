import React from 'react';

const Html = ({ title = '', description = '', children }) => (
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="descritpion" content={description} />
      <title>{title}</title>
      <script src="client.js"></script>
    </head>
    <body>
      <div
        id="app"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </body>
  </html>
);

export default Html;