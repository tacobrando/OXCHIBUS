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
      <form 
        method="post" 
        @submit.prevent="addBusiness"
      >
        <div class="container">
          <div class="input">
            <p>Name</p>
            <input 
              v-model="state.name" 
              required 
              type="text" 
              id="name"
            >
          </div>
          <div class="input">
            <p>Email</p>
            <input 
              v-model="state.email" 
              required 
              type="email" 
              id="email"
            >
          </div>
        </div>
        <div class="container">
          <div class="input">
            <p>Name of Business</p>
            <input 
              v-model="state.business_name" 
              required 
              id="business_name" 
              type="text"
            >
          </div>
          <div class="input">
            <p>Owner</p>
            <input 
              v-model="state.owner" 
              id="owner" 
              required 
              type="text"
            >
          </div>
        </div>
        <div class="container-select">
          <div class="select">
            <div class="option">
              <p>Year of opening</p>
              <select 
                v-model="state.open_year" 
                required 
                id="open_year"
              >
                <option 
                  v-for="year in years" 
                  :key="year" 
                  value="year"
                >
                  {{year}}
                </option>
              </select>
            </div>
            <div class="option">
              <p>Year of closing(optional)</p>
              <select 
                v-model="state.close_year" 
                id="open_year"
              >
                <option 
                  v-for="year in years" 
                  :key="year" 
                  value="year"
                >
                  {{year}}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="google-maps">
          <p>Location:</p>
          <AutoComplete 
            required 
            @set-marker="setInfo" 
          />
          <GoogleMaps 
            :showInput="true" 
            :data="state.data" 
          />
        </div>
        <button>SUBMIT</button>
      </form>
      <Confirmation 
        @close-modal="closeModal"
        v-if="state.confirmed" 
        :email="state.email"
        :loaded="state.loaded" 
        :message="state.message"
        :showModal="state.confirmed" 
      />
  </div>
</template>

<script>
import { computed, reactive } from '@vue/composition-api'
import GoogleMaps from './GoogleMaps/GoogleMaps'
import AutoComplete from './GoogleMaps/AutoComplete'
import Confirmation from './Confirmation'

import db from '@/utils/firebase'

export default {
  components: { GoogleMaps, AutoComplete, Confirmation },
  setup() {
    const state = reactive({
      message: '',
      data: [],
      selected: '',
      name: '',
      email: '',
      business_name: '',
      owner: '',
      address: '',
      lat: 0,
      lng: 0,
      open_year: 0,
      close_year: 0,
      confirmed: false,
      loaded: false,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
    })

    const years = computed(() => {
      return Array.from({length: 1981 - 1910}, (value, index) => 1910 + index)
    })

    function closeModal() {
      state.confirmed = !state.confirmed
      location.reload()
    }

    function setInfo(data) {
      state.data = []
      state.address = data.address
      state.lat = data.lat
      state.lng = data.lng
      state.data.push({ position: data })
    }

    function addBusiness() {
      let details = {
        name: state.name,
        email: state.email,
        business_name: state.business_name,
        owner: state.owner,
        open_year: state.open_year,
        close_year: state.close_year,
        lat: state.lat,
        lng:state.lng,
        address: state.address
      }
      db.collection('unverified').add(details)
      .then(() => {
        console.log("Sent")
        state.message = `Email has been Sent to`
        state.confirmed = !state.confirmed
        setTimeout(() => {
          state.loaded = !state.loaded
        }, 2000)
      }).catch((err) => {
        console.log(err)
        state.message = "Error, Please try again"
      })
    }

    return {
      state,
      years,
      setInfo,
      addBusiness,
      closeModal
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
  align-items: center;

  #email:invalid {
    background-color: #ffdddd;
  }
  button{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 37px;
    width: 40%;
    border-radius: 5px;
    height: 37px;
    border: 1px solid #dcdfe6;
    color: #606266;
    background-color: white;
    transition: 0.3s;

    &:hover{
      background: rgb(221, 221, 221)
    }
  }

  .google-maps{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 688px;
    height: 600px;

    p{
      margin: 0;
    }
  }

  .container-select{
    display: flex;
    flex-direction: column;

    p{
      margin: 20px 0px 0px 0px
    }

    .select{
      display: flex;
      flex-direction: row;
      justify-content: center;
      select{
        width: 272px;
        height: 37px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        text-align: center;
        font-size: 0.8rem;
        margin: 20px;

      }
    }

  }
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

@media only screen and (max-width: 800px) {
  form{
    display: flex;
    justify-content: center;
    flex-direction: column;

    .google-maps{
      width: 100%;
      height: 600px;
    }
  }
}


@media only screen and (max-width: 645px) {
  form{
    display: flex;
    flex-direction: column;

    .container{
      display: flex;
      flex-direction: column;

      input{
        width: 80%;
      }
    }
    .container-select{
      display: flex;
      flex-direction: column;
      .select{
        display: flex;
        flex-direction: column;
        
      }
    }
  }
}

</style>