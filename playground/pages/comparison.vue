<template>
  <div>
    <NuxtLink to="/">Back to home page</NuxtLink>
    <NuxtLink to="https://overrides-only-demo.glitch.me/">Original demo</NuxtLink>
    <hr />
    <p>This page demonstrates the usage of font metric overrides.</p>
    <p>
      Different local fonts (Zapfino, Impact, and Georgia), all using the same font metric
      overrides, are used as fallbacks for Roboto.
    </p>
    <p>
      Roboto's font metric overrides are: ascent-override: 92.7734375%; descent-override:
      24.4140625%; linegap-override: 0%;
    </p>
    <p>
      If you don't have these local fonts installed, this
      <a href="/overrides.png" target="_blank">screenshot</a>
      shows what this demo would look like if you did.
    </p>
    <div class="example">
      <code>
        @font-face { font-family: fallback-a; src: local("Zapfino"); ascent-override: 92.7734375%;
        descent-override: 24.4140625%; linegap-override: 0%; }
      </code>
      <div class="layered">
        <div><span class="webfont">Lorum Ipsum</span></div>
        <div>
          <span class="fallback" style="font-family: fallback-a">Lorum Ipsum</span>
        </div>
      </div>
    </div>
    <div class="example">
      <code>
        @font-face { font-family: fallback-b; src: local("Impact"); ascent-override: 92.7734375%;
        descent-override: 24.4140625%; linegap-override: 0%; }</code
      >
      <div class="layered">
        <div><span class="webfont">Lorum Ipsum</span></div>
        <div>
          <span class="fallback" style="font-family: fallback-b">Lorum Ipsum</span>
        </div>
      </div>
    </div>
    <div class="example">
      <code>
        @font-face { font-family: fallback-c; src: local("Georgia"); ascent-override: 92.7734375%;
        descent-override: 24.4140625%; linegap-override: 0%; }
      </code>
      <div class="layered">
        <div><span class="webfont">abcdefghijklmnopqrstuvwxyz</span></div>
        <div>
          <span class="fallback" style="font-family: fallback-c">abcdefghijklmnopqrstuvwxyz</span>
        </div>
      </div>
    </div>
    <p><b>Baselines</b> (for sake of comparison)</p>
    <div class="example">
      These examples do not use font metric overrides.
      <div class="layered">
        <div><span class="webfont">Lorum Ipsum</span></div>
        <div>
          <span class="fallback" style="font-family: Zapfino">Lorum Ipsum</span>
        </div>
      </div>
    </div>
    <div class="example">
      <div class="layered">
        <div><span class="webfont">Lorum Ipsum</span></div>
        <div>
          <span class="fallback" style="font-family: Impact">Lorum Ipsum</span>
        </div>
      </div>
    </div>
    <div class="example">
      <div class="layered">
        <div><span class="webfont">Lorum Ipsum</span></div>
        <div>
          <span class="fallback" style="font-family: Georgia">Lorum Ipsum</span>
        </div>
      </div>
    </div>
    <Link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet" />
  </div>
</template>

<style>
body {
  padding: 20px;
}

.layered {
  display: grid;
}

.layered > * {
  grid-column-start: 1;
  grid-row-start: 1;
}
.example {
  margin: 10px 0px;
}
code {
  margin: 10px 0px;
  display: block;
}
.webfont {
  font-family: 'Roboto';
}

.webfont {
  color: blue;
  border: 1px solid blue;
}

.fallback {
  border: 1px solid red;
  color: red;
}

.webfont,
.fallback {
  font-size: 100px;
}
</style>
