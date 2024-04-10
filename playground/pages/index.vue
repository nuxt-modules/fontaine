<template>
  <div>
    <h1>A headline</h1>
    <h2>A subheading</h2>
    <p>
      Id occaecat labore et adipisicing excepteur consequat et culpa pariatur quis qui officia non
      cillum. Adipisicing aliquip occaecat non est minim nulla esse. Mollit in ex esse Lorem
      consectetur elit consequat quis adipisicing enim et culpa. Irure nostrud laboris consequat
      veniam dolor quis ullamco sint.
    </p>
    <p>
      Consequat elit anim ex mollit cillum eiusmod voluptate. Sunt dolor Lorem proident esse amet
      duis velit amet consectetur qui voluptate sint adipisicing. Voluptate nostrud non quis laborum
      veniam commodo duis laboris dolore veniam commodo amet. Officia cillum est sunt anim ullamco
      tempor ipsum dolore nisi dolore ut. Velit eu minim minim non laborum exercitation.
    </p>
    <p>
      Reprehenderit fugiat sit proident id laboris amet nulla quis est dolor consequat ad eiusmod.
      Mollit laborum cupidatat nisi commodo enim eiusmod sit. Est dolor ipsum nulla pariatur
      pariatur esse ea est labore fugiat eu velit. Minim ex sunt Lorem nisi non officia.
    </p>
    <hr>
    <NuxtLink to="/comparison">
      Comparison of using font-metric based overrides
    </NuxtLink>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Poppins variant';
  font-display: swap;
  src: url('/poppins.ttf');
}

@font-face {
  font-family: 'Roboto';
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2)
    format('woff2');
}

h1 {
  font-family: 'Poppins variant', sans-serif;
}

h2 {
  font-family: Roboto, Arial, Helvetica, sans-serif;
}

div {
  font-family: 'Poppins variant';
}
</style>
