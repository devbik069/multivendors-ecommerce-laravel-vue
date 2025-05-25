<script setup>
import { useFileManager } from "@/admin/stores";
const fileManger = useFileManager();

const sendToUpload = async (files, xhr, formData) => {
    try {
        await fileManger.fiileUpload(formData);
    } catch (error) {}
};
</script>

<template>
    <div style="padding: 0 20px">
        <DropZone
            :maxFiles="Number(10000000000)"
            url="http://localhost:5000/item"
            :uploadOnDrop="true"
            :multipleUpload="true"
            :parallelUpload="1"
            :acceptedFiles="[
                'png',
                'image',
                'jpg',
                'jpeg',
                'gif',
                'ttif',
                'webp',
            ]"
            @sending="sendToUpload"
        />
    </div>
</template>
<style>
.dropzone__item--style {
    border: 1px solid #888;
    border-radius: 10px;
    margin: 5px 4px;
}
</style>
