<template>
    <div class="welcome fade-in">
        <div class="welcome-message slide-in">
            <h3>Welcome</h3>
            <p>
                The businesses shown on this map were part of an enormous 
                diaspora and long history of Chinese migration. Many of the 
                businesses shown here were begun by people who began their 
                journey in Hong Kong.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Welcome"
}
</script>

<style scoped lang="scss">
.welcome{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.welcome-message{
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: flex-start;
    margin: 10%;
    align-items: flex-start;
    text-align: start;
}
h3{
    margin: 0;
    font-weight: 100;
    font-size: 3.5rem;
}
p{
    font-size: 1.25rem;
}
@media only screen and (max-width: 1000px) {
    .welcome{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .welcome-message{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        h3{
            font-size: 3rem;
        }
    }
}
</style>