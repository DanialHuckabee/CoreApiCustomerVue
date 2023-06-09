<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import axios, { AxiosError } from "axios";
import CardComponent from "./CardComponent.vue";
import { HandleError } from "@/types/Types";

// Kendi ortamınızdaki server side projesinin URL'si ile değiştiriniz.
const yourWebApiUrl = "https://localhost:7294";
// Kullanıcıya gösterilen mesaj
const waitString = ref("");
// yapılan işlemler
const logs = ref([] as Array<string>);

function Convert() {
    logs.value.push("Sizin sunucu katmanına ConvertToPdf isteği gönderiliyor.");
    axios
        .get(yourWebApiUrl + "/Onaylarim/ConvertToPdf", { responseType: "blob" })
        .then((e) => {
            logs.value.push("Sizin sunucu katmanına ConvertToPdf isteği gönderildi. Detaylar için console'a bakınız.");
            console.log("Sizin sunucu katmanına ConvertToPdf isteği gönderildi.", e);
            if (e.data.error) {
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
                logs.value.push("Dosya indirildi.");
            }
        })
        .catch((error) => {
            logs.value.push("Sizin sunucu katmanına ConvertToPdf isteği gönderilemedi. Mesaj: " + HandleError(error) + " Detaylar için console'a bakınız.");
            console.log("Sizin sunucu katmanına ConvertToPdf isteği gönderilemedi.", error);
        });

    1;
}
</script>

<template>
    <main class="py-8 space-y-4">
        <CardComponent title="Convert to PDF">
            <template v-slot:icon>
                <ArrowPathIcon></ArrowPathIcon>
            </template>
            <template v-slot:content>
                <div class="flex flex-col">
                    <div class="text-sm text-gray-700">
                        <p>Aşağıdaki butonla örnek work dosyasını PDF'e dönüştürebilirsiniz.</p>
                    </div>
                    <div class="mt-6 max-w-sm">
                        <button
                            @click="Convert()"
                            type="button"
                            class="rounded-md bg-orange-200 px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-offset-2 focus:ring-offset-orange-200"
                        >
                            Dönüştür
                        </button>
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
