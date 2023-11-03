<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import CardComponent from "./CardComponent.vue";
import store from "@/types/Store";

// baplanılacak API URL
const url = ref("");

onMounted(() => {
    url.value = store.API_URL;
});

function Save() {
    store.API_URL = url.value;
}
</script>

<template>
    <main class="py-8 space-y-4">
        <CardComponent title="Ayarlar">
            <template v-slot:icon>
                <Cog6ToothIcon></Cog6ToothIcon>
            </template>
            <template v-slot:content>
                <div class="flex items-end">
                    <div class="">
                        <div class="text-sm text-gray-700">
                            <p>Müşterinin procy servis adresini giriniz. Sonunda bölme işareti olmadan.</p>
                        </div>
                        <div class="flex flex-col mt-2">
                            <div class="mt-2 max-w-sm">
                                <input type="text" name="url" id="url" v-model="url"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                    placeholder="5339992200" />
                            </div>
                        </div>
                    </div>
                    <div class="flex-grow"></div>
                    <div>
                        <button @click="Save()" type="button"
                            class="rounded-md bg-orange-200 px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-offset-2 focus:ring-offset-orange-200">
                            Kaydet
                        </button>
                    </div>
                </div>
            </template>
        </CardComponent>
    </main>
</template>
