<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="rounded-md bg-gray-50 p-4 border border-gray-200 shadow-md">
        <div class="flex">
            <div class="flex-shrink-0">
                <div class="h-5 w-5 text-gray-400" aria-hidden="true">
                    <slot name="icon"></slot>
                </div>
            </div>
            <div class="ml-3 w-full">
                <h3 class="text-sm font-medium text-gray-800">{{ title }}</h3>

                <div class="mt-2">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
