<template>
  <Card :header="true" :headerTitle="sender" style="width: 100%; height: 100%;">
    <div class="chat">
      <ul class="message-container" ref="messageContainer"></ul>
      <form @submit.prevent="sendMessageAction" class="message-form" id="message-form">
        <input type="text" v-model="message" name="message" id="message-input"/>
        <button type="submit" class="send-button"><img class="send-img" src="../icons/send-svgrepo-com.svg"></button>
      </form>
    </div>
    <Message />
  </Card>
</template>

<script setup>
import { receiver, sender } from '@/pages/UserPage/values/value';
import { ref, onMounted } from 'vue';
import moment from 'moment';
import Card from './Card.vue';
import Message from './Message.vue';
import { status } from '../values/values';
import { io } from 'socket.io-client';

const messageTone = new Audio('/message-tone.mp3');
const messageContainer = ref(null);
const socket = io();
const message = ref('')

onMounted(() => {
  messageContainer.value = document.querySelector('.message-container');

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('chat-message', (data) => {
    messageTone.play();
    addMessageToUI(false, data);
  });

  socket.on('feedback', (data) => {
    clearFeedback();
    const element = `
      <li class="message-feedback">
        <p class="feedback" id="feedback">${data.feedback}</p>
      </li>
    `;
    messageContainer.value.innerHTML += element;
  });
});

const sendMessageAction = () => {
  let shortestPath = JSON.parse(localStorage.getItem('shortest'));
  if (!sender.value || !receiver.value) {
    status.value.visible = true;
    status.value.type = 'error'
    status.value.message = 'Select sender and reciever'
    return;
  }

  if (shortestPath == null) {
    status.value.visible = true;
    status.value.type = 'error'
    status.value.message = 'There is no path between sender and receiver'
    return;
  }

  if (!message.value.trim()) {
    status.value.visible = true;
    status.value.type = 'error'
    status.value.message = 'Write a message'
    return;
  }

  const data = {
    name: sender.value,
    message: message.value,
    dateTime: new Date(),
  };

  socket.emit('message', data);
  addMessageToUI(true, data)
  message.value = '';
};

function addMessageToUI(isOwnMessage, data) {
  clearFeedback();
  const element = `
    <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
      <p class="message">
        <span>${sender} -> ${receiver} ● ${moment(data.dateTime).fromNow()}</span>
        ${data.message}
      </p>
    </li>
  `;
  messageContainer.value.innerHTML += element;
  scrollToBottom();
}

function scrollToBottom() {
  messageContainer.value.scrollTo(0, messageContainer.value.scrollHeight);
}

function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
</script>

<style>
.send-img {
  width: 30px;
  height: 30px;
}
</style>
