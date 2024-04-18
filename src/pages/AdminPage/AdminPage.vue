<template>
    <div style="height: 100vh; display: flex; flex-direction: row; align-items: center; justify-content: center;">
        <div style="display: flex; flex-direction: column; width: 20%; justify-content: space-between;">
            <div class="col-5">
                <Card button="true" >
                    <template #default>
                        <form id="sender-form" style="display: flex; flex-direction: column;">
                        <label for="sender">Sender:</label>
                        <select id="sender"></select>
                        <label for="receiver">Receiver:</label>
                        <select id="receiver"></select>
                    </form>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>
<script setup>
import Card from '@/shared/components/Card.vue';
</script>