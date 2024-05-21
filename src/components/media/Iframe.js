// IframeComponent.js
import React from 'react';


const IframeComponent = ({ContentComponent}) => {
  return (
    <iframe
      title="MyIframe"
      width="600"
      height="400"
      srcDoc={`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Iframe Content</title>
        </head>
        <body>
          <div id="root"></div>
          <script>
            // Render the React component inside the iframe
            const root = document.getElementById('root');
            const content = React.createElement(ContentComponent);
            ReactDOM.render(content, root);
          </script>
        </body>
      </html>`}
      frameBorder="0"
    />
  );
};

export default IframeComponent;
