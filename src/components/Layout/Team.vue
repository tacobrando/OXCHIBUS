<template>
  <div class="team">
        <div class="team-info">
            <p>
                We are a loosely based community research team interested in creating a first baseline history (1910 to 
                1980) of the Chinese business workforce in Oxford , inspired by Ming-Ai (London) Institute research track-
                record; we aim to add to the growing body of local knowledge of how ethnic Chinese came to the United 
                Kingdom, earnt their livelihoods, contributed to community life, and created lasting homes for their 
                descendants.
                It can encourage further studies and additional information via the website on data presented.
            </p>
        </div>
        <div class="card-container">
            <div @click="showModal('Cecilia Young')" class="card">
                <p>Cecilia Young</p>
                <Modal 
                    name="Cecilia Young" 
                    role="Project Coordinator"
                    url="../assets/Members/Cecilia Young.jpg"
                    v-if="state.cDialog" 
                    @showModal="showModal" 
                />
            </div>
            <div @click="showModal('Maria Mak')" class="card">
                <p>Maria Mak</p>
                <Modal 
                    name="Maria Mak"
                    role="Interviewer"
                    url="../assets/Members/Maria Mak.jpg"
                    v-if="state.mDialog" 
                    @showModal="showModal" 
                />
            </div>
            <div @click="showModal('Michal Bosworth')" class="card">
                <p>Michal Bosworth</p>
                <Modal 
                    name="Michal Bosworth" 
                    role="Historian"
                    url="../assets/Members/Michal Bosworth.jpg"
                    v-if="state.mBDialog" 
                    @showModal="showModal" 
                />
            </div>
            <div @click="showModal('Winnie Sung')" class="card">
                <p>Winnie Sung</p>
                <Modal 
                    name="Winnie Sung" 
                    role="Interviewer"
                    url="../assets/Members/Winnie Sung.jpg"
                    v-if="state.wDialog" 
                    @showModal="showModal"
                />
            </div>
            <div @click="showModal('Matthew Lee')" class="card">
                <p>Matthew Lee</p>
                <Modal 
                    name="Matthew Lee" 
                    role="Technical Support"
                    url="../assets/Members/Matthew Lee.jpg"
                    v-if="state.mLDialog" 
                    @showModal="showModal" 
                />
            </div>
        </div>
  </div>
</template>

<script>
import Modal from '@/components/Modals/Modal'
import {reactive} from '@vue/composition-api'
export default {
    components: { Modal },
    setup() {
        const state = reactive({
            cDialog: false,
            mLDialog: false,
            mBDialog: false,
            mDialog: false,
            wDialog: false
        })
        function showModal(code) {
            switch(code){
                case "Matthew Lee":
                    return state.mLDialog = !state.mLDialog
                case "Cecilia Young":
                    return state.cDialog = !state.cDialog
                case "Michal Bosworth":
                    return state.mBDialog = !state.mBDialog
                case "Maria Mak":
                    return state.mDialog = !state.mDialog
                case "Winnie Sung":
                    return state.wDialog = !state.wDialog
            }
        }
        return {
            state,
            showModal
        }
    }


}
</script>

<style lang="scss" scoped>
.team{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center ;
  padding: 0 4rem 2rem 4rem;
}
.team-info{
    width: 70%;
}
.card-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px
}
.card{
    border: 1px solid black;
    padding: 0px 10px;
    margin: 5px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 8px;

    &:hover{
        background: rgb(221, 221, 221)
    }
}
@media only screen and(max-width: 900px) {
    .team-info{
        width: 100%;
    }
}
@media only screen and(max-width: 600px) {
    .card-container{
        display: flex;
        
    }
}
</style>