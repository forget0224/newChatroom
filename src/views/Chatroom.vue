<script setup>
import { ref as dbRef, set, push, child } from "firebase/database";
import { chatroomRefList, db } from "../db";
import { ref } from "vue";
import dayjs from "dayjs";

const message = ref("");
const username = ref("");
const isLockName = ref(false);

function isSelf(name) {
  return username.value === name
}

const time = dayjs().format("H:mm A");

const addMessage = () => {
  if (!message.value.trim()) {
    return;
  }
  console.log(message.value);
  const newKey = push(child(dbRef(db), "messages")).key;
  set(dbRef(db, "messages/" + newKey), {
    username: username.value,
    message: message.value,
    timeStamp: time,
    dbKey: newKey,
  });
  message.value = "";
};


</script>

<template >
  <div class="bg-slate-50 h-screen w-screen">
    <div class="container bg-slate-50 h-screen w-full m-auto flex sm:flex-row flex-col">
      <aside class="sm:h-screen h-[100px] w-96 bg-slate-50">
        <div class="m-auto w-80">
          <h1 class="text-slate-500 text-3xl sm:mt-40 pt-4">Live Chat Room</h1>
          <div class="sm:mt-20 pt-4 text-slate-500 flex">
            <label for="username" class="">username</label>
            <input v-model="username" @keyup.enter="isLockName = true" :disabled="isLockName" type="text" id="username"
              placeholder="name type here" class="rounded pl-2 ml-3 w-40" />
            <button @click="isLockName = true"
              class="rounded bg-slate-500 text-slate-100 ml-3 w-16 hover:bg-slate-400 hover:cursor-pointer">
              <button>{{ isLockName ? 'done' : 'send' }}</button>
            </button>
          </div>
        </div>
      </aside>
      <main class="sm:h-screen grow relative h-[70%]">
        <div class="message-box  h-[70%] overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-slate-600 sm:mt-10 mt-6 bg-[#cbd5e1] sm:w-[1000px] m-auto" >
          <template v-for="item in chatroomRefList" :key="item.id">
            <div class="message-other  h-36 flex flex-wrap relative">
              <div class="flex h-20 max-w-[80%] min-w-[60%] m-auto items-center   absolute  shadow-lg mt-4"
                :class="[{ ' left-8  rounded-tl-lg rounded-tr-lg rounded-br-lg bg-white': !isSelf(item.username) }, { ' right-8 rounded-tl-lg rounded-tr-lg rounded-bl-lg flex-row-reverse bg-slate-200': isSelf(item.username) }]">
                <div class="rounded-full bg-slate-300 w-16 sm:h-16 h-12 self-auto flex justify-center "
                  :class="[{ 'ml-3': !isSelf(item.username) }, { 'mr-3': isSelf(item.username) }]">
                  <span class="text-4xl justify-center  flex items-center font-mono">{{ item.username.slice(0, 1)
                  }}</span>
                </div>
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
          </template>
        </div>

        <div class="type-box absolute b-0 w-full h-16">
          <div class="flex h-[80px] w-[80%] m-auto items-center">
            <div class="rounded-full bg-slate-500 w-16 sm:h-16 h-14 self-auto flex justify-center">
              <span class="text-4xl justify-center  flex items-center font-mono">
                {{ isLockName ? username.slice(0, 1) : '' }}</span>
            </div>
            <input type="text" class="h-16 w-11/12 bg-transparent pl-3 focus:border-transparent ml-3 outline-0"
              placeholder="type something.." v-model="message" @keyup.enter="addMessage" :disabled="!username" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>