<script setup lang="ts">
import { ref, shallowRef } from "@vue/runtime-core";
import SignComponent from "./components/SignComponent.vue";
import MobileSignComponent from "./components/MobileSignComponent.vue";
import PdfConvertComponent from "./components/PdfConvertComponent.vue";
import PdfAddLayers from "./components/PdfAddLayers.vue";
import SettingsComponent from "./components/SettingsComponent.vue";

const tabs = [
    { name: "e-İmza", tag: shallowRef(SignComponent) },
    { name: "Mobil İmza", tag: shallowRef(MobileSignComponent) },
    { name: "PDF Convert", tag: shallowRef(PdfConvertComponent) },
    { name: "PDF Add Layers", tag: shallowRef(PdfAddLayers) },
    { name: "Settings", tag: shallowRef(SettingsComponent) },
];

const selectedTab = ref(tabs[0]);

function selectTab(tab: any) {
    selectedTab.value = tab;
}
</script>

<template>
    <div class="mx-auto max-w-4xl sm:px-6 lg:px-8 py-8">
        <div class="md:flex md:items-center md:justify-between sm:px-0 px-4">
            <div class="min-w-0 flex-1">
                <h2 class="text-3xl font-thin leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">ONAYLARIM
                    Prime API Demo</h2>
            </div>
        </div>

        <div class="mt-6">
            <div class="sm:hidden">
                <label for="tabs" class="sr-only">Select a tab</label>
                <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                <select id="tabs" name="tabs"
                    class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    <option v-for="tab in tabs" :key="tab.name">{{ tab.name }}</option>
                </select>
            </div>
            <div class="hidden sm:block">
                <div class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        <div v-for="tab in tabs" :key="tab.name" :class="[
                            tab.name === selectedTab.name ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer',
                            'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                        ]" :aria-current="tab.name === selectedTab.name ? 'page' : undefined"
                            @click="selectTab(tab)">
                            {{ tab.name }}
                        </div>
                    </nav>
                </div>
            </div>

            <component :is="selectedTab.tag"></component>
        </div>
    </div>
</template>
