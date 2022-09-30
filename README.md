---
description: Setup @codegouvfr/react-dsfr in your project
---

# 🔧 Initial setup

{% hint style="warning" %}
If you already had the DSFR installed in your project, let's start from scratch: &#x20;

* Remove [`@gouvfr/dsfr`](https://www.npmjs.com/package/@gouvfr/dsfr) from your dependencies.
* Remove all imports:`dsfr.css, dsfr.module.js the favicon and the fonts.`
* Remove `thedata-fr-scheme` (and `data-fr-theme` ) attribude from your `<html/>` tag
{% endhint %}

```bash
yarn add @codegouvfr/react-dsfr # Or: 'npm install --save @codegouvfr/react-dsfr'
```

{% tabs %}
{% tab title="Create React App" %}
#### package.json

```diff
 "scripts": {
+    "postinstall": "copy_dsfr_dist_to_public"
 }
```

`update_dsfr_static_resources` is a `bin` script of `@codegouvfr/react-dsfr` that copies `@gouvfr/dsfr/dist` into `public/dsfr`

#### .gitignore

```diff
+ /public/dsfr
```

#### public/index.html

Add the following code in the `<head />`&#x20;

```ejs
<link rel="apple-touch-icon" href="%PUBLIC_URL%/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="%PUBLIC_URL%/dsfr/favicon/favicon.ico" type="image/x-icon" />
<link rel="manifest" href="%PUBLIC_URL%/dsfr/favicon/manifest.webmanifest" crossorigin="use-credentials" />

<link rel="stylesheet" href="%PUBLIC_URL%/dsfr/dsfr.min.css" />
```

#### src/index.tsx

```diff
 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import App from './App';
+import { startDsfrReact } from "@codegouvfr/react-dsfr";
+startDsfrReact({ "defaultColorScheme": "system" });

 const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
 );
 root.render(
   <React.StrictMode>
     <App />
   </React.StrictMode>
 );
```

You can find an example setup [here](https://github.com/codegouvfr/dsfr-react/tree/main/src/test/frameworks/cra).
{% endtab %}

{% tab title="Next.js" %}
```bash
yarn add --dev next-transpile-modules # Or: 'npm install --save-dev next-transpile-modules'
```

#### next.config.js

```diff
+const withTM = require('next-transpile-modules')(['@codegouvfr/react-dsfr']);
 
-module.exports = {
+module.exports = withTM({
   reactStrictMode: true,
+  webpack: config => {
+
+   config.module.rules.push({
+      test: /\.(woff2|webmanifest)$/,
+      type: "asset/resource"
+    });
+
+    return config;
+  }
-}
+});
```

#### pages/\_app.tsx

If you don't have an `_app.tsx` or an `_app.js` in your project, create one.

```tsx
import DefaultApp from "next/app";
import { withAppDsfr } from "@codegouvfr/react-dsfr/lib/nextJs";
import "@codegouvfr/react-dsfr/dsfr/dsfr.css";

export default withAppDsfr(
    DefaultApp, // Provide your custom App if you have one
    { "defaultColorScheme": "system" }
);
```

#### pages/\_document.tsx

This is optional, it enables to get rid of the white flashes on pages reload. &#x20;

[Here is a video to help you decide if you need this or not.](https://user-images.githubusercontent.com/6702424/192881319-a43b88dd-d800-4ebe-b8f0-988d800d4ea5.mov)

```tsx
import DefaultDocument, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from "next/document";
import { getColorSchemeSsrUtils } from "@codegouvfr/react-dsfr/lib/nextJs";

const { 
  readColorSchemeFromCookie, 
  getColorSchemeHtmlAttributes 
} = getColorSchemeSsrUtils();

export default function Document() {
  return (
    <Html {...getColorSchemeHtmlAttributes()}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {

  const initialProps = await DefaultDocument.getInitialProps(ctx);

  readColorSchemeFromCookie(ctx);

  return { ...initialProps };

};
```

{% hint style="warning" %}
This feature [opte you out of Automatic Static Optimization](https://nextjs.org/docs/messages/opt-out-auto-static-optimization). It's not a bug, only the price to pay for ultimate UX. &#x20;
{% endhint %}

You can find an example setup [here](https://github.com/codegouvfr/dsfr-react/tree/main/src/test/frameworks/next).
{% endtab %}

{% tab title="Vite" %}
#### package.json

```diff
 "scripts": {
+    "postinstall": "copy_dsfr_dist_to_public"
 }
```

`update_dsfr_static_resources` is a `bin` script of `@codegouvfr/react-dsfr` that copies `@gouvfr/dsfr/dist` into `public/dsfr`

#### .gitignore

```diff
+ /public/dsfr
```

#### index.html

Add the following tags in the `<head />`&#x20;

```html
<link rel="apple-touch-icon" href="/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="/dsfr/favicon/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="/dsfr/favicon/favicon.ico" type="image/x-icon" />
<link rel="manifest" href="/dsfr/favicon/manifest.webmanifest" crossorigin="use-credentials" />

<link rel="stylesheet" href="/dsfr/dsfr.min.css" />
```

#### src/main.tsx

<pre class="language-diff"><code class="lang-diff"><strong> import React from "react";
</strong> import ReactDOM from "react-dom/client";
 import { App } from "./App";
+import { startDsfrReact } from "@codegouvfr/react-dsfr";
+startDsfrReact({ "defaultColorScheme": "system" });

 ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   &#x3C;React.StrictMode>
     &#x3C;App />
   &#x3C;/React.StrictMode>
 );
</code></pre>

You can find an example setup [here](https://github.com/codegouvfr/dsfr-react/tree/main/src/test/frameworks/vite).
{% endtab %}

{% tab title="Other" %}
There isn't specific instructions for your React setup but don't worry, you can figure out what needs to be done by reading the instructions for Vite.&#x20;

The gist of it is, there is a few things that, for performance reasons, react-dsfr dosen't automatically do for you and thus you have to do manually: &#x20;

* Loading `@codegouvfr/react-dsfr/dsfr/dsfr.min.css` (as soon as possilbe)
* Setting up the Favicon. &#x20;
* Preloading the relevent font variant to avoid [FOUT](https://fonts.google.com/knowledge/glossary/fout).&#x20;

Then, you must call `startDsfrReact()` as soon as posible, wherever in your code, just make sure you do so only once and, if you are in an SSR setup, only on the client side.

```typescript
import { startDsfrReact } from "@codegouvfr/react-dsfr";

const isBrowser = typeof window === "object" && typeof document === "object";

if( isBrowser ){
    startDsfrReact({ "defaultColorScheme": "system" });
}
```

If you are in an SSR setup and want to avoit white flashes on reload let's [get in touch](https://github.com/codegouvfr/dsfr-react).
{% endtab %}
{% endtabs %}

### Avoiding or flash of unstyled text (FOUT) &#x20;

{% hint style="danger" %}
The official recommendation from the DSFR team is to accept the Flash of Unstiled text because preloading fonts **significantly delays the First Contentfull Paint (FCP) for users with slow internet connection and slow devices**.

Measures have been taken in the JS code to mitigate discomfort induced by the FOUT.
{% endhint %}

{% embed url="https://user-images.githubusercontent.com/6702424/193168884-703a3c95-45be-47ad-823d-15bb6b8e620d.gif" %}
What FOUT looks like, it's usally must faster
{% endembed %}

To get rid of FOUT you can preload the font, make sure you only preload the ones immediately used (look in the network tab of your browser dev tool)

{% tabs %}
{% tab title="Create React App" %}
#### public/index.html

Add the following code in the `<head />`&#x20;

```ejs
<%
[
  //"Marianne-Light",
  //"Marianne-Light_Italic",
  "Marianne-Regular",
  //"Marianne-Regular_Italic",
  "Marianne-Medium",
  //"Marianne-Medium_Italic",
  "Marianne-Bold",
  //"Marianne-Bold_Italic",
  //"Spectral-Regular",
  //"Spectral-ExtraBold"
].forEach(function(name){ %>
  <link rel="preload" href="%PUBLIC_URL%/dsfr/fonts/<%=name%>.woff2" as="font" crossorigin="anonymous" />
<% }); %>
```
{% endtab %}

{% tab title="Next.js" %}
#### pages/\_app.tsx

```diff
 import DefaultApp from "next/app";
 import { withAppDsfr } from "@codegouvfr/react-dsfr/lib/nextJs";
 import "@codegouvfr/react-dsfr/dsfr/dsfr.css";
 
 export default withAppDsfr(
     DefaultApp, // Provide your custom App if you have one
     {
         "defaultColorScheme": "system",
+        "preloadFonts": [
+  		//"Marianne-Light",
+       	//"Marianne-Light_Italic",
+		"Marianne-Regular",
+		//"Marianne-Regular_Italic",
+		"Marianne-Medium",
+		//"Marianne-Medium_Italic",
+		"Marianne-Bold",
+		//"Marianne-Bold_Italic",
+		//"Spectral-Regular",
+		//"Spectral-ExtraBold"
+        ]
+    }
);
```
{% endtab %}

{% tab title="Vite" %}
#### index.html

Add the following tags in the `<head />`&#x20;

```html
<!--<link rel="preload" href="/dsfr/fonts/Marianne-Light.woff2" as="font" crossorigin="anonymous" />-->
<!--<link rel="preload" href="/dsfr/fonts/Marianne-Light_Italic.woff2" as="font" crossorigin="anonymous" />-->
<link rel="preload" href="/dsfr/fonts/Marianne-Regular.woff2" as="font" crossorigin="anonymous" />
<!--<link rel="preload" href="/dsfr/fonts/Marianne-Regular_Italic.woff2" as="font" crossorigin="anonymous" />-->
<link rel="preload" href="/dsfr/fonts/Marianne-Medium.woff2" as="font" crossorigin="anonymous" />
<!--<link rel="preload" href="/dsfr/fonts/Marianne-Medium_Italic.woff2" as="font" crossorigin="anonymous" />-->
<link rel="preload" href="/dsfr/fonts/Marianne-Bold.woff2" as="font" crossorigin="anonymous" />
<!--<link rel="preload" href="/dsfr/fonts/Marianne-Bold_Italic.woff2" as="font" crossorigin="anonymous" />-->
<!--<link rel="preload" href="/dsfr/fonts/Spectral-Regular.woff2" as="font" crossorigin="anonymous" />-->
<!--<link rel="preload" href="/dsfr/fonts/Spectral-ExtraBold.woff2" as="font" crossorigin="anonymous" />-->
```
{% endtab %}
{% endtabs %}
