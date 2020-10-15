<template>
  <div class="about">
    <div class="about--text fade-in" id="slide1">
      <img class="slide-in" src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Early_painting_of_Hong_Kong_Island.jpg" alt="" />
      <p class="slide-in-right" style="font-size: 1.2em">Hong Kong was acquired by the British Empire in 1842 but this fact did not automatically bestow the benefits of British citizenship upon its inhabitants. Change began in 1914 when Hong Kong citizens became known as British subjects.</p>
    </div>
    <div class="about--text fade-in" id="slide2">
      <img class="slide-in-right" src="https://upload.wikimedia.org/wikipedia/commons/3/32/Hk1960c.jpg" alt="" />
      <p class="slide-in" style="font-size: 1.2em">From 1948 until 1962 British subjects, also known as Commonwealth subjects, could live in the UK with little restriction. It is during this latter period that the greatest emigration from Hong Kong to the UK took place.</p>

    </div>
    <div class="fade-in" id="example">
      <img class="slide-in" src="@/assets/unnamed.png" alt="" />
      <p class="slide-in-right" style="font-size: 1.2em">The Chinese Business project represents a first gathering of data on Chinese businesses in the city of Oxford. It is hoped that this research project will encourage further, more formal inquiry  in Oxford into the emergence of a small but significant ethnic community, revealing the ways in which the Chinese have contributed to the diversity of Oxford’s social history.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about{
  .about--text {
    display: flex;
    text-align: start;
    align-items: center;
    height: 40%;
    p{
      margin: 30px
    }
    img {
      width: 38%;
      height: 100%;
    }
  }
  #example{
    display: flex;
    text-align: start;
    align-items: center;
  }
    p{
      margin: 30px
    }
    img {
      width: 38%;
      height: 100%;
    }
}
#slide2 {
  display: flex;
  flex-direction: row-reverse;
}
@media only screen and (max-width: 900px) {
  .about{
    .about--text{
      display: flex;
      text-align: center;
      flex-direction: column;

      img {
        width: 100%;
      }
    }
    #example{
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
     img {
      width: 60%;
      height: 100%;
    }
  }
#slide2 {
  display: flex;
  flex-direction: column;
}
}
</style>