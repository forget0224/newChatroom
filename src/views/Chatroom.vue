<script setup>
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set, push, child } from "firebase/database";

import { useDatabaseList } from "vuefire";

import { ref } from "vue";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCJsaZIQ1kvricEaX1Z16FPxl877wDF4BU",
  authDomain: "chatroom-b3dde.firebaseapp.com",
  databaseURL: "https://chatroom-b3dde-default-rtdb.firebaseio.com",
  projectId: "chatroom-b3dde",
  storageBucket: "chatroom-b3dde.appspot.com",
  messagingSenderId: "624073790623",
  appId: "1:624073790623:web:4cab518f2f4874d649feaa",
});
const db = getDatabase(firebaseApp);

const chatroomRefList = useDatabaseList(dbRef(db, "/messages/"));

const message = ref("");
const username = ref("");


const tempUsername = ref("");
const addUsername = function () {
  username.value = tempUsername.value;
  //   username.value='';
};

const getTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const format = hours >= 12 ? "PM" : "AM";
  return ` ${hours}:${minutes} ${format}`;
};

const addMessage = () => {
  if (!message.value.trim()) {
    return;
  }
  console.log(message.value);
  const newKey = push(child(dbRef(db), "messages")).key;
  set(dbRef(db, "messages/" + newKey), {
    username: username.value,
    message: message.value,
    timeStamp: getTime(),
    dbKey: newKey,
  });
  message.value = "";
};

// const listt = chatroomRefList;

// // 別人傳的
// const otherMessage = () => {
//   listt.filter((rawValue) => rawValue.username != tempUsername);
// };
// //自己傳的
// const selfMessage = () => {
//   listt.filter((rawValue) => rawValue.username == tempUsername);
// };

// console.log(listt);

// onMounted(() => {
//       // ...
//     });

</script>

<template >
  <div class="bg-slate-50 h-screen w-screen">
  <div class="container bg-slate-50 h-screen w-full m-auto flex">
    <div class="left-side h-screen w-96 bg-slate-50">
      <div class="m-auto w-80">
        <h1 class="text-slate-500 text-3xl mt-40">Live Chat Room</h1>
        <div class="mt-20 text-slate-500 flex">
          <label for="username" class="">username</label>
          <input
            v-model="tempUsername"
            @keyup.enter="addUsername"
            :disabled="username.length"
            type="text"
            name="username"
            placeholder="type here"
            class="rounded pl-2 ml-3 w-40"
          />
          <input
            type="button"
            value="send"
            class="rounded bg-slate-500 text-slate-100 ml-3 w-16"
            @click="addUsername"
          />
        </div>
      </div>
    </div>
    <div class="right-side h-screen  grow relative">
      <div class="message-box  h-[85%] overflow-y-scroll">
        <template v-for="item in chatroomRefList" :key="item.id">
          <!-- <template v-if="item.username !== tempUsername"> -->
            <div class="message-other  h-36 flex flex-wrap relative" >
              <div class="flex h-20 max-w-[80%] min-w-[60%] m-auto items-center bg-white  absolute  shadow-lg" :class="[{ ' left-8  rounded-tl-lg rounded-tr-lg rounded-br-lg': item.username != username } ,{ ' right-8 rounded-tl-lg rounded-tr-lg rounded-bl-lg flex-row-reverse': item.username == username }]">
                <div class="rounded-full bg-slate-300 w-16 h-16 self-auto flex justify-center " :class="[{ 'ml-3': item.username != username } ,{ 'mr-3': item.username == username }]"
                ><span class="text-4xl justify-center  flex items-center font-mono">{{ item.username.slice(0, 1) }}</span></div>
                <div class="ml-3 w-11/12">
                  <div class="text-slate-500">{{ item.username }}</div>
                  <div class="w-11/12 break-words min-h-[2rem]">
                    {{ item.message }}
                  </div>
                </div>

                <div class="message-time absolute -bottom-10 ml-3 text-sm">
                  {{ item.timeStamp }}
                </div>
              </div>
            </div>
          <!-- </template> -->

          <!-- <template v-if="item.username == tempUsername"> -->
            <!-- <div class="message-self h-36 flex flex-wrap relative">
              <div
                class="flex h-20 max-w-[80%] min-w-[60%] m-auto items-center bg-white  absolute right-8 shadow-lg"
              >
                <div
                  class="rounded-full bg-slate-300 w-16 h-16 self-auto mr-3"
                ></div>
                <div class="ml-3 w-11/12 relative">
                  <div class="w-11/12 break-words min-h-[2rem]">
                    {{ item.message }}
                  </div>
                </div>
                <div class="message-time absolute -bottom-10 ml-3 text-sm">
                  {{ item.timeStamp }}
                </div>
              </div>
            </div> -->
          <!-- </template> -->
        </template>
      </div>

      <div class="type-box absolute bottom-8 w-full h-16">
        <div class="flex h-full w-[92.6667%] m-auto">
          <div class="rounded-full bg-slate-500 w-16 h-16 self-auto flex justify-center">
            <span class="text-4xl justify-center  flex items-center font-mono">
{{ username.slice(0, 1) }}</span>
          </div>
          <input
            type="text"
            class="h-16 w-11/12 bg-transparent pl-3 focus:border-transparent ml-3 outline-0"
            placeholder="type something.."
            v-model="message"
            @keyup.enter="addMessage"
            :disabled="!username"
          />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
