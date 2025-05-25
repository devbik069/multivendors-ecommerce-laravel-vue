<script setup>
import { useFileManager } from "@/admin/stores";
const fileManger = useFileManager();

const props = defineProps({
    data: {
        type: Object,
    },
});


function bytesToKB(bytes) {
    return (bytes / 1024).toFixed(1);
}

const fileRemove = async (fileId) => {
    try {
        await fileManger.removeFile(fileId);
    } catch (error) {

    }
}
</script>

<template>
    <div
        class="dropzone__item dropzone--has-thumbnail dropzone--has-error dropzone__item--style"
    >
        <div class="dropzone__item-thumbnail">
            <img :src="'/' + data.file_name" />
        </div>
        <div class="dropzone__item-controls" @click="fileRemove(data?.id)">
            <div class="dropzone__item-control">
                <i class="fa fa-trash-alt"></i>
            </div>
        </div>

        <div class="dropzone__details dropzone__details--style">
            <div class="dropzone__file-size"><span><strong>{{ bytesToKB(data.file_size) }}</strong> KB</span></div>
            <div class="dropzone__filename"><span>{{ data.file_original_name }}</span></div>
        </div>
    </div>
</template>
<style>
.dropzone__item--style {
    border: 1px solid #888;
    border-radius: 10px;
    margin: 5px 4px !important;
}
</style>
