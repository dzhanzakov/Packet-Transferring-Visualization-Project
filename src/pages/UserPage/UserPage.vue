<template>
    <div style="height: 100vh; display: flex; flex-direction: row; align-items: center; justify-content: space-around;">
      <div style="display: flex; height: 50%; flex-direction: column; width: 20%; align-items: center; justify-content: center;">
        <div style="width: 45%; height: 45%;">
          <Card>
            <template #default>
                <form id="sender-form" @submit.prevent="submitAction" style="display: flex; flex-direction: column;">
                    <label for="sender">Sender:</label>
                    <select v-model="sender" id="sender"></select>
                    <label for="receiver">Receiver:</label>
                    <select v-model="receiver" id="receiver"></select>
                    <button type="submit">GO</button>
                </form>
            </template>
          </Card>
        </div>
        <div style="width: 45%; height: 45%;">
          <Card title="Paths">
          </Card>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; width: 30%; justify-content: space-between;">
          <PhoneComponent></PhoneComponent>
      </div>
      <div style="display: flex; flex-direction: column; width: 40%; justify-content: space-between;">
        <Card title="Graph">
          <template #default>
            <main>
              <div id="graph"></div>
            </main>
          </template>
        </Card>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted , nextTick} from 'vue';
import { receiveGraph, receiveShortestPath } from '../UserPage/api/api';
import { drawGraph, transformDataToGraph, visualizeShortestPath } from './functions/graphFunctions';
import PhoneComponent from '@/shared/components/PhoneComponent.vue';
import Card from '../../shared/components/Card.vue';
import { receiver, sender } from './values/value';
const messageContainer = ref(null); 

let latestGraphData = ref(null);
  
  onMounted(async () => {
    try {
      const arr = await receiveGraph();
      latestGraphData.value = arr[arr.length - 1];
      drawGraph(latestGraphData.value);
      await nextTick();
      messageContainer.value = document.getElementById('message-container');
    } catch (error) {
      console.error('Failed to receive graph data:', error);
    }
});



async function submitAction() {
    const requestData = {
      graph: transformDataToGraph(latestGraphData.value),
      source: sender.value,
      target: receiver.value
    };
    try {
      const shortestPath = await receiveShortestPath(requestData);
      if (shortestPath) {
        visualizeShortestPath(shortestPath);
      }
    } catch (error) {
      console.error(error);
    }
}
</script>
<style>
@import url('https://fonts.googlepis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    
    * {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    .title {
        margin: 20px 0;
    }

    .chat {
      width: 100%;
      height: 70%;
      border-radius: 20px;
    }

    .name > span {
        color: #bbb;
    }

    .message-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 500px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .message-left,
    .message-right {
        list-style: none;
        padding: 8px 12px;
        margin: 12px;
        max-width: 250px;
        font-size: 18px;
        word-wrap: break-word;
    }

    .message-left {
        border-radius: 20px 20px 20px 0px;
        align-self: flex-start;
        background-color: #fff;
        box-shadow: -2px 2px 4px #dcdcdc;
    }

    .message-right {
        border-radius: 20px 20px 0px 20px;
        align-self: flex-end;
        background-color: #2d2d2d;
        box-shadow: 2px 2px 4px #dcdcdc;
        color: #f6f6f6;
    }

    .message-left > p > span,
    .message-right > p > span {
        display: block;
        font-style: italic;
        font-size: 12px;
        margin-top: 4px;
    }

    .feedback {
        font-style: italic;
        font-size: 14px;
        padding: 0px 16px 16px 16px;
        color: #2d2d2d;
        text-align: center;
    }

    .message-form {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    #message-input {
        flex-grow: 1;
        height: 48px;
        font-size: 16px;
        width: 90%;
        border: none;
        outline: none;
        padding: 0 12px;
        background-color:#dcdcdc;
        border-radius: 20px;
    }

    .send-button {
        font-size: 16px;
        border: none;
        width: 20%;
        outline: none;
        background-color: #fff;
        cursor: pointer;
    }

    .v-divider {
        height: 48px;
        width: 2px;
        background-color: #f6f6f6;
    }

    .clients-total {
        margin: 20px 0;
        color: #7e7e7e;
    }

    .vertices-border, .vertex-border, .submit-button-border, .message-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        gap: 20px;
        padding: 20px;
        margin-right: 40px;
        border: 2px solid #14532d;
        border-radius: 10px;

        width: 90%;
        background-color: #bbf7d0;
    }

    .message-info {
        display: flex;
        width: 90%;

        flex-direction: column;

        border: 1px red solid;
    }

    input {
        position: relative;
        height: 30px;
        width: 100%;
        outline: none;
        border: 1px solid black;
        border-radius: 5px;

        padding-left: 10px;
        background-color: white;
    }

    button {
        border-radius: 10px;
        border: 1px solid black;
        background-color: white;

        width: 80%;
    }

    #graph-area {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        background-color: white;
    }

    .vertex {
        position: absolute;
        z-index: 2;
        cursor: grab;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 100%;
        color: white;
        font-size: 15px;
        user-select: none;
        background-color: #0c4a6e;
    }

    .edge {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        overflow: visible;
        height: 1px;
        border-radius: 1px;
        font-size: 12.5px;
        color: black;
        user-select: none;
        background-color: #999;
        transform-origin: top left;
    }
    main {
        position: relative;
        width: 100%;
        height: 600px;
        border: 1px solid #ccc;
        font-family: IBB Plex Mono, monospace;
    }
</style>