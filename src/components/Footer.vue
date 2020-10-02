<template>
    <div class="footer-container">
        <footer class="footer">
            <p>&copy; {{new Date().getFullYear()}} Oxford Observed.</p>
        </footer>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer-container {
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    height: 100%;
    width: 100%;
}

</style>