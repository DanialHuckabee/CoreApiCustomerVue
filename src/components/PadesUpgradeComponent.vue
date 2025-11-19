<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import axios, { AxiosError } from "axios";
import CardComponent from "./CardComponent.vue";
import { DocumentTextIcon } from "@heroicons/vue/24/outline";
import { HandleError } from "@/types/HandleError";
import store from "@/types/Store";
import { v4 as uuidv4 } from "uuid";

// Kullanıcıya gösterilen mesaj
const waitString = ref("");
// yapılan işlemler
const logs = ref([] as Array<string>);

function UpgradePades() {
  const operationId = uuidv4();
  logs.value.push("Sizin sunucu katmanına UpgradePades isteği gönderiliyor.");
  axios
    .get(store.API_URL + "/Onaylarim/UpgradePades")
    .then((e) => {
      logs.value.push("Sizin sunucu katmanına UpgradePades isteği gönderildi. Detaylar için console'a bakınız.");
      console.log("Sizin sunucu katmanına UpgradePades isteği gönderildi.", e);
      if (e.data.error) {
        waitString.value = "Hata oluştu. " + e.data.error;
      } else {
        logs.value.push("e-İmzalar zenginleştirildi.");
        console.log("e", e.data);
        DownloadFile(e.data);
      }
    })
    .catch((error) => {
      logs.value.push("Sizin sunucu katmanına UpgradePades isteği gönderilemedi. Mesaj: " + HandleError(error) + " Detaylar için console'a bakınız.");
      console.log("Sizin sunucu katmanına UpgradePades isteği gönderilemedi.", error);
    });
}

function DownloadFile(operationId: string) {
  axios
    .get(store.API_URL + "/Onaylarim/DownloadSignedFileFromOnaylarimApi?operationId=" + operationId, { responseType: "blob" })
    .then((e) => {
      if (e.data.error) {
        console.log("ee", e);
        waitString.value = "Hata oluştu. " + e.data.error;
      } else {
        let filename = "dosya.pdf";
        const contentDisposition = e.headers["Content-Disposition"];
        if (contentDisposition) {
          const match = contentDisposition.match(/filename[^;\n]*=(UTF-\d['"]*)?((['"]).*?[.]$\2|[^;\n]*)?/gi);
          if (match && match[1]) {
            const a1 = match[1].split("''")[1];
            if (a1) {
              filename = decodeURI(a1);
            }
          }
        }
        const fileURL = window.URL.createObjectURL(new Blob([e.data]));
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", filename);
        document.body.appendChild(fileLink);
        fileLink.click();
      }
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        waitString.value = "Hata oluştu. " + error.response.data;
      } else {
        waitString.value = "Hata oluştu. " + error.code;
      }
    })
    .catch((error: Error | AxiosError) => {
      waitString.value = "Hata oluştu. " + error.message;
    });
}
</script>

<template>
  <main class="py-8 space-y-4">
    <CardComponent title="Add Layers">
      <template v-slot:icon>
        <DocumentTextIcon></DocumentTextIcon>
      </template>
      <template v-slot:content>
        <div class="flex flex-col">
          <div class="text-sm text-gray-700">
            <p>Aşağıdaki butonla örnek PDF dosyasındaki e-imzaları zenginleştirebilirsiniz.</p>
          </div>

          <div class="mt-6 max-w-sm">
            <button @click="UpgradePades()" type="button" class="rounded-md bg-orange-200 px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-offset-2 focus:ring-offset-orange-200">Zenginleştir</button>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200" v-if="waitString">
          <p class="max-w-2xl text-sm leading-6 text-gray-500">{{ waitString }}</p>
        </div>
      </template>
    </CardComponent>
    <div class="pt-4 border-t border-gray-200 text-xs" v-if="logs && logs.length > 0">
      <p class="leading-6 text-sm font-medium">İşlemler</p>

      <p v-for="(logItem, index) in logs" :key="index" class="">{{ logItem }}</p>
    </div>
  </main>
</template>
