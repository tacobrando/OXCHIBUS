<template>
  <div class="add-collection">
    <div class="description">
      <p>
        Like to contribute to the map? If you know of a Chinese 
        business before the 1980's, fill in the form below. Once
        verified, we will add the business to our database and 
        it will appear on the map.
      </p>
    </div>
      <form @submit.prevent="addBusiness" >
        <div class="container">
          <div class="input">
            <p>Name</p>
            <input type="text">
          </div>
          <div class="input">
            <p>Email</p>
            <input type="email">
          </div>
        </div>
        <div class="container">
          <div class="input">
            <p>Name of Business</p>
            <input type="text">
          </div>
          <div class="input">
            <p>Owner</p>
            <input type="text">
          </div>
        </div>
        <div class="container">
          <div class="input">
            <select v-model="state.selected" id="selectBtn">
              <option value="1">1</option>
            </select>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
  setup() {
    const state = reactive({
      selected: ''
    })

    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.add-collection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  
}
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .container{
    display: flex;
    justify-content: center;
    width: 100%;

      .input {
        padding: 0 20px;

        p{
          font-weight: 300;
          margin: 10px;
        }
        
      }

      input {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        padding: 10px;
        width: 250px;
      }
  }
}
.description {
  display: flex;
  justify-content: center;

  p {
    width: 50%
  }

}


</style>